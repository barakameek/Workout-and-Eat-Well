document.addEventListener('DOMContentLoaded', () => {
    // --- Tab Navigation Elements ---
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // --- Workout Log Elements ---
    const exerciseForm = document.getElementById('log-exercise-form');
    const loggedExercisesList = document.getElementById('logged-exercises-list'); // For current workout
    const workoutDateInput = document.getElementById('workout-date');
    const currentWorkoutDateDisplay = document.getElementById('current-workout-date-display');
    const finishWorkoutBtn = document.getElementById('finish-workout-btn');
    const exerciseNameInput = document.getElementById('exercise-name');

    // --- History Tab Elements ---
    const workoutHistoryContainer = document.getElementById('workout-history-container');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const calendarMonthYearDisplay = document.getElementById('calendar-month-year');
    const calendarGridContainer = document.getElementById('calendar-grid-container');

    // --- Global State for Current Workout Session ---
    let currentWorkoutExercises = []; // Array to hold exercises for the current session before saving
    let currentSessionDate = null;

    // --- Calendar State ---
    let currentCalendarDate = new Date(); // To keep track of the month/year being viewed in the calendar

    // --- LOCALSTORAGE KEY ---
    const WORKOUT_STORAGE_KEY = 'workoutTrackerData';

    // --- Tab Navigation Logic ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Deactivate all tabs and content
            tabs.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate clicked tab and corresponding content
            tab.classList.add('active');
            const targetTabId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Specific actions when switching tabs
            if (targetTabId === "historyTab") {
                renderCalendar(); // Render calendar when history tab is active
                renderWorkoutHistory(); // Refresh history list
            }
            // No action needed for "logWorkoutTab" for now, as it's the default view
        });
    });

    // --- LocalStorage Helper Functions ---
    function getAllWorkouts() {
        const data = localStorage.getItem(WORKOUT_STORAGE_KEY);
        try {
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Error parsing workouts from localStorage:", e);
            return []; // Return empty array on error
        }
    }

    function saveAllWorkouts(workouts) {
        try {
            localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(workouts));
        } catch (e) {
            console.error("Error saving workouts to localStorage:", e);
        }
    }

    // --- Initialize Default Date for Workout Log ---
    function setDefaultDate() {
        if (workoutDateInput) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const todayString = `${year}-${month}-${day}`;

            if (!currentSessionDate) { // If no active session, default to today
                 workoutDateInput.value = todayString;
            } else { // Otherwise, keep the active session's date
                workoutDateInput.value = currentSessionDate;
            }
        }
    }

    // --- Workout Log Tab Logic ---
    exerciseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const date = workoutDateInput.value;
        const exerciseName = exerciseNameInput.value.trim();
        const sets = document.getElementById('sets').value;
        const reps = document.getElementById('reps').value.trim(); // Keep as string initially
        const weight = document.getElementById('weight').value;
        const weightUnit = document.getElementById('weight-unit').value;
        const notes = document.getElementById('exercise-notes').value.trim();

        if (!date || !exerciseName || !sets || !reps) {
            alert('Please fill in all required fields (Date, Exercise Name, Sets, Reps).');
            return;
        }

        if (currentWorkoutExercises.length === 0) { // First exercise in this session
            currentSessionDate = date;
            const formattedDate = new Date(date + 'T00:00:00'); // Avoid timezone issues
            currentWorkoutDateDisplay.textContent = `Workout Date: ${formattedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`;
        } else if (date !== currentSessionDate) {
            alert("Date changed. Current workout session is still under the initially set date. Please save this workout to start a new one with a different date.");
            workoutDateInput.value = currentSessionDate; // Revert date input to session date
            return;
        }

        // Try to parse actual reps if a single number is provided
        let actualRepsParsed = null;
        if (!reps.includes('-') && !isNaN(parseInt(reps))) {
            actualRepsParsed = parseInt(reps);
        }

        const exerciseData = {
            id: Date.now() + Math.random(), // More unique ID (float)
            name: exerciseName,
            sets: parseInt(sets),
            reps: reps, // Store original reps string (e.g., "8-10" or "12")
            actualReps: actualRepsParsed, // Store parsed single rep number if available
            weight: parseFloat(weight) || 0, // Store as number, default to 0 if empty/invalid
            unit: weightUnit,
            notes: notes
        };

        currentWorkoutExercises.push(exerciseData);
        addExerciseToCurrentLogDOM(exerciseData);

        exerciseForm.reset();
        setDefaultDate(); // Re-apply session date or today's date
        exerciseNameInput.focus();

        if (finishWorkoutBtn.style.display === 'none' && currentWorkoutExercises.length > 0) {
            finishWorkoutBtn.style.display = 'block';
        }
    });

    function addExerciseToCurrentLogDOM(exercise) {
        const li = document.createElement('li');
        li.dataset.id = exercise.id; // Store exercise ID on the DOM element

        let weightDisplay = "";
        if (exercise.weight > 0) {
            weightDisplay = `Weight: ${exercise.weight} ${exercise.unit}`;
        } else if (exercise.weight === 0 && exercise.unit) {
             weightDisplay = `Weight: Bodyweight / 0 ${exercise.unit}`;
        }

        li.innerHTML = `
            <div class="exercise-details">
                <strong>${exercise.name}</strong><br>
                Sets: ${exercise.sets}, Reps: ${exercise.reps}<br>
                ${weightDisplay ? `${weightDisplay}<br>` : ''}
                ${exercise.notes ? `<em>Notes: ${exercise.notes}</em>` : ''}
            </div>
            <div class="exercise-actions">
                <button class="delete-btn">Delete</button>
            </div>
        `;

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            const exerciseIdToRemove = parseFloat(li.dataset.id); // Ensure type consistency for filtering
            currentWorkoutExercises = currentWorkoutExercises.filter(ex => ex.id !== exerciseIdToRemove);
            li.remove();
            if (currentWorkoutExercises.length === 0) {
                finishWorkoutBtn.style.display = 'none';
                currentWorkoutDateDisplay.textContent = '';
                currentSessionDate = null;
                setDefaultDate(); // Reset date input to today if session is cleared
            }
        });
        loggedExercisesList.appendChild(li);
    }

    finishWorkoutBtn.addEventListener('click', function() {
        if (currentWorkoutExercises.length === 0) {
            alert("No exercises logged for this workout.");
            return;
        }
        if (!currentSessionDate) {
            alert("Please ensure a date is set for this workout (this shouldn't happen if exercises are logged).");
            workoutDateInput.focus();
            return;
        }

        const newWorkoutSession = {
            id: Date.now(), // Unique ID for the session
            date: currentSessionDate,
            exercises: [...currentWorkoutExercises] // Create a copy of exercises
        };

        const allWorkouts = getAllWorkouts();
        allWorkouts.push(newWorkoutSession);
        allWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
        saveAllWorkouts(allWorkouts);

        alert("Workout finished and saved successfully!");

        // Reset current workout session state
        currentWorkoutExercises = [];
        loggedExercisesList.innerHTML = ''; // Clear exercises from current log display
        currentWorkoutDateDisplay.textContent = ''; // Clear date display
        finishWorkoutBtn.style.display = 'none'; // Hide finish button
        currentSessionDate = null; // Reset session date
        setDefaultDate(); // Reset date input to today

        // Refresh History tab (including calendar) as new data is available
        renderCalendar();
        renderWorkoutHistory();
    });

    // --- History Tab Logic (Calendar & Session List) ---
    function renderCalendar() {
        calendarGridContainer.innerHTML = ''; // Clear previous grid

        const year = currentCalendarDate.getFullYear();
        const month = currentCalendarDate.getMonth(); // 0-indexed

        calendarMonthYearDisplay.textContent = `${currentCalendarDate.toLocaleString('default', { month: 'long' })} ${year}`;

        // Add day headers (Sun, Mon, Tue...)
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayHeaderEl = document.createElement('div');
            dayHeaderEl.classList.add('calendar-day-header');
            dayHeaderEl.textContent = day;
            calendarGridContainer.appendChild(dayHeaderEl);
        });

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday...
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get last day of month

        const allWorkouts = getAllWorkouts(); // Get all saved workout data

        // Create cells for previous month's days (to fill the first week)
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day', 'other-month');
            calendarGridContainer.appendChild(emptyCell);
        }

        // Create cells for current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            const dayNumberSpan = document.createElement('span');
            dayNumberSpan.classList.add('day-number');
            dayNumberSpan.textContent = day;
            dayCell.appendChild(dayNumberSpan);

            const currentDateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            // Check if today
            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayCell.classList.add('today');
            }

            // Check if workout exists for this day
            const workoutsOnThisDay = allWorkouts.filter(w => w.date === currentDateString);
            if (workoutsOnThisDay.length > 0) {
                const indicator = document.createElement('div');
                indicator.classList.add('workout-indicator');
                dayCell.appendChild(indicator);

                dayCell.dataset.date = currentDateString; // Store date for click events
                dayCell.title = `${workoutsOnThisDay.length} workout(s) on ${new Date(currentDateString+'T00:00:00').toLocaleDateString()}`;

                dayCell.addEventListener('click', () => {
                    // Scroll to or highlight the workout session in the list below
                    const sessionElement = document.querySelector(`.workout-session[data-date-marker="${currentDateString}"]`);
                    if (sessionElement) {
                        sessionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Add a temporary highlight class
                        sessionElement.classList.add('highlighted-session');
                        setTimeout(() => sessionElement.classList.remove('highlighted-session'), 2000);
                    } else {
                        // Fallback/alternative if no element found or for summary
                        alert(`Workouts on ${new Date(currentDateString+'T00:00:00').toLocaleDateString()}:\n${workoutsOnThisDay.map(s => s.exercises.map(e => e.name).join(', ')).join('\n---\n')}`);
                    }
                });
            }
            calendarGridContainer.appendChild(dayCell);
        }

        // Add cells for next month's days to fill the grid (optional)
        const totalCells = firstDayOfMonth + daysInMonth;
        const remainingCells = (7 - (totalCells % 7)) % 7;
        for (let i = 0; i < remainingCells; i++) {
             const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day', 'other-month');
            calendarGridContainer.appendChild(emptyCell);
        }
    }

    // Event listeners for calendar navigation buttons
    prevMonthBtn.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar();
    });

    function renderWorkoutHistory() {
        const allWorkouts = getAllWorkouts();
        workoutHistoryContainer.innerHTML = ''; // Clear previous content

        if (allWorkouts.length === 0) {
            workoutHistoryContainer.innerHTML = '<p>No workouts saved yet. Log a workout and click "Finish & Save Workout".</p>';
            return;
        }

        allWorkouts.forEach(session => {
            const sessionDiv = document.createElement('div');
            sessionDiv.className = 'workout-session';
            sessionDiv.dataset.sessionId = session.id;
            sessionDiv.dataset.dateMarker = session.date; // Add data attribute for calendar linking

            const formattedDate = new Date(session.date + 'T00:00:00');
            let sessionHtml = `<h3 class="workout-session-date">${formattedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>`;
            sessionHtml += '<ul class="history-exercise-list">';

            session.exercises.forEach(ex => {
                let weightDisplay = "";
                if (ex.weight > 0) {
                    weightDisplay = ` - ${ex.weight} ${ex.unit}`;
                } else if (ex.weight === 0 && ex.unit) {
                     weightDisplay = ` - Bodyweight / 0 ${ex.unit}`;
                }
                sessionHtml += `
                    <li class="history-exercise-item">
                        <strong>${ex.name}</strong>
                        <div>Sets: ${ex.sets}, Reps: ${ex.reps}${weightDisplay}</div>
                        ${ex.notes ? `<em>Notes: ${ex.notes}</em>` : ''}
                    </li>`;
            });
            sessionHtml += '</ul>';
            sessionDiv.innerHTML = sessionHtml;
            workoutHistoryContainer.appendChild(sessionDiv);
        });
    }

    // --- Initial Page Load Setup ---
    setDefaultDate(); // Set initial date for log form

    // Set the first tab ("Log Workout") as active on initial load
    const firstTab = document.querySelector('.tab-link[data-tab="logWorkoutTab"]');
    const firstTabContent = document.getElementById('logWorkoutTab');
    if (firstTab && firstTabContent) {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        firstTab.classList.add('active');
        firstTabContent.classList.add('active');
    }

    // Call renderCalendar and renderWorkoutHistory for the History tab if it's the default active tab
    // or when that tab is first selected. Since Log Workout is default, these will be called via tab click.
});
