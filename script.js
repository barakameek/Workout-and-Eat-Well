document.addEventListener('DOMContentLoaded', () => {
    // --- Tab Navigation ---
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active'));
            tab.classList.add('active');

            const targetTab = tab.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
            // If switching to progress tab, and an exercise is selected, refresh charts
            if (targetTab === "progressTab" && progressExerciseSelect.value) {
                updateAllCharts(progressExerciseSelect.value);
            }
        });
    });

    // --- Existing Workout Log Elements ---
    const exerciseForm = document.getElementById('log-exercise-form');
    const loggedExercisesList = document.getElementById('logged-exercises-list'); // For current workout
    const workoutDateInput = document.getElementById('workout-date');
    const currentWorkoutDateDisplay = document.getElementById('current-workout-date-display');
    const finishWorkoutBtn = document.getElementById('finish-workout-btn');
    const exerciseNameInput = document.getElementById('exercise-name');

    // --- New Elements ---
    const workoutHistoryContainer = document.getElementById('workout-history-container');
    const progressExerciseSelect = document.getElementById('progress-exercise-select');
    const prTableBody = document.querySelector('#pr-table tbody');


    // --- Global State for Current Workout ---
    let currentWorkoutExercises = []; // Array to hold exercises for the current session before saving
    let currentSessionDate = null;

    // --- Chart Instances (to be initialized later) ---
    let maxWeightChartInstance = null;
    let e1rmChartInstance = null;
    let volumeChartInstance = null;

    // --- LOCALSTORAGE KEY ---
    const WORKOUT_STORAGE_KEY = 'workoutTrackerData';

    // --- Load All Saved Workouts from localStorage ---
    function getAllWorkouts() {
        const data = localStorage.getItem(WORKOUT_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    // --- Save All Workouts to localStorage ---
    function saveAllWorkouts(workouts) {
        localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(workouts));
    }

    // --- Initialize Default Date ---
    function setDefaultDate() {
        if (workoutDateInput) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const todayString = `${year}-${month}-${day}`;

            // Set for current workout log if no session is active
            if (!currentSessionDate) {
                 workoutDateInput.value = todayString;
            } else {
                workoutDateInput.value = currentSessionDate; // Persist session date on form
            }
        }
    }
    setDefaultDate(); // Set date on initial load

    // --- Current Workout Log Logic (Modified) ---
    exerciseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const date = workoutDateInput.value;
        // ... (rest of form value retrieval as before)
        const exerciseName = exerciseNameInput.value.trim();
        const sets = document.getElementById('sets').value;
        const reps = document.getElementById('reps').value.trim();
        const weight = document.getElementById('weight').value;
        const weightUnit = document.getElementById('weight-unit').value;
        const notes = document.getElementById('exercise-notes').value.trim();

        if (!date || !exerciseName || !sets || !reps) {
            alert('Please fill in all required fields (Date, Exercise Name, Sets, Reps).');
            return;
        }

        // Update current session date if this is the first exercise of the session
        if (currentWorkoutExercises.length === 0) {
            currentSessionDate = date;
            const formattedDate = new Date(date + 'T00:00:00');
            currentWorkoutDateDisplay.textContent = `Workout Date: ${formattedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`;
        } else if (date !== currentSessionDate) {
            // If date changes mid-session, alert user or handle as new session.
            // For now, we'll stick with the initially set currentSessionDate for the ongoing log.
            // You could prompt to save current and start new.
            alert("Date changed. Current workout session is still under the initially set date. Save this workout to start a new one with a different date.");
            workoutDateInput.value = currentSessionDate; // Revert date input to session date
            return;
        }


        const exerciseData = {
            id: Date.now(), // Unique ID for the exercise entry for easier management
            name: exerciseName,
            sets: parseInt(sets), // Store as number
            reps: reps, // Keep as string for ranges like "8-10"
            actualReps: reps.includes('-') ? null : parseInt(reps), // Store actual reps if not a range for calculations
            weight: parseFloat(weight) || 0, // Store as number, default to 0 if empty
            unit: weightUnit,
            notes: notes
        };

        currentWorkoutExercises.push(exerciseData);
        addExerciseToCurrentLogDOM(exerciseData); // Update DOM for current workout

        exerciseForm.reset();
        setDefaultDate(); // Re-apply session date or today's date
        exerciseNameInput.focus();

        if (finishWorkoutBtn.style.display === 'none' && currentWorkoutExercises.length > 0) {
            finishWorkoutBtn.style.display = 'block';
        }
    });

    function addExerciseToCurrentLogDOM(exercise) {
        const li = document.createElement('li');
        li.dataset.id = exercise.id; // Store exercise ID on the element

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
            const exerciseIdToRemove = parseInt(li.dataset.id);
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
            alert("Please set a date for this workout.");
            workoutDateInput.focus();
            return;
        }

        const newWorkoutSession = {
            id: Date.now(), // Unique ID for the session
            date: currentSessionDate,
            exercises: [...currentWorkoutExercises] // Create a copy
        };

        const allWorkouts = getAllWorkouts();
        allWorkouts.push(newWorkoutSession);
        allWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
        saveAllWorkouts(allWorkouts);

        alert("Workout finished and saved!");

        // Reset current workout state
        currentWorkoutExercises = [];
        loggedExercisesList.innerHTML = '';
        currentWorkoutDateDisplay.textContent = '';
        finishWorkoutBtn.style.display = 'none';
        currentSessionDate = null;
        setDefaultDate(); // Reset date input to today

        // Refresh history and progress views
        renderWorkoutHistory();
        populateProgressExerciseSelect();
        // If an exercise is selected in progress tab, clear its charts or update
        if (progressExerciseSelect.value) {
            clearCharts(); // A new function to clear chart data
            updateAllCharts(progressExerciseSelect.value);
        } else {
            clearCharts();
        }
    });


    // --- History Tab Logic ---
    function renderWorkoutHistory() {
        const allWorkouts = getAllWorkouts();
        workoutHistoryContainer.innerHTML = ''; // Clear previous content

        if (allWorkouts.length === 0) {
            workoutHistoryContainer.innerHTML = '<p>No workouts saved yet. Complete a workout in the "Log Workout" tab and click "Finish & Save Workout".</p>';
            return;
        }

        allWorkouts.forEach(session => {
            const sessionDiv = document.createElement('div');
            sessionDiv.className = 'workout-session';
            sessionDiv.dataset.sessionId = session.id;

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
            // Future: Add edit/delete buttons for the session
            // sessionHtml += `<button class="delete-session-btn" data-session-id="${session.id}">Delete Session</button>`;
            sessionDiv.innerHTML = sessionHtml;
            workoutHistoryContainer.appendChild(sessionDiv);
        });
    }


    // --- Progress Tab Logic ---
    function populateProgressExerciseSelect() {
        const allWorkouts = getAllWorkouts();
        const uniqueExerciseNames = new Set();
        allWorkouts.forEach(session => {
            session.exercises.forEach(ex => uniqueExerciseNames.add(ex.name));
        });

        progressExerciseSelect.innerHTML = '<option value="">-- Select an Exercise --</option>'; // Reset
        Array.from(uniqueExerciseNames).sort().forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            progressExerciseSelect.appendChild(option);
        });
    }

    progressExerciseSelect.addEventListener('change', function() {
        const selectedExercise = this.value;
        if (selectedExercise) {
            updateAllCharts(selectedExercise);
            displayPersonalRecords(selectedExercise);
        } else {
            clearCharts();
            clearPRTable();
        }
    });

    function getExerciseDataForProgress(exerciseName) {
        const allWorkouts = getAllWorkouts();
        let exerciseEntries = [];
        allWorkouts.forEach(session => {
            session.exercises.forEach(ex => {
                if (ex.name === exerciseName) {
                    // Ensure actualReps is a number for calculations.
                    // If reps is a range like "8-10", we might take the average or highest for e1RM.
                    // For simplicity, we'll use 'actualReps' if available, or try to parse 'reps'.
                    let repsForCalc = ex.actualReps;
                    if (repsForCalc == null && typeof ex.reps === 'string' && !ex.reps.includes('-')) {
                        repsForCalc = parseInt(ex.reps);
                    } else if (repsForCalc == null && typeof ex.reps === 'string' && ex.reps.includes('-')) {
                        // Handle rep ranges e.g., "8-10" -> take highest for PR potential
                        repsForCalc = parseInt(ex.reps.split('-')[1]);
                    }


                    if (ex.weight > 0 && repsForCalc > 0) { // Only include entries with weight and valid reps for most charts
                        exerciseEntries.push({
                            date: session.date,
                            weight: ex.weight,
                            reps: repsForCalc, // Use the determined repsForCalc
                            sets: ex.sets,
                            unit: ex.unit
                        });
                    }
                }
            });
        });
        // Sort by date ascending for charts
        return exerciseEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    function calculateE1RM(weight, reps) {
        if (reps === 0) return 0;
        if (reps === 1) return weight; // Epley and others are approximations, 1RM is 1RM
        return weight * (1 + (reps / 30)); // Epley formula
    }

    function updateAllCharts(exerciseName) {
        const data = getExerciseDataForProgress(exerciseName);
        if (!data || data.length === 0) {
            alert(`No data found for ${exerciseName} with weight and reps.`);
            clearCharts();
            return;
        }
        renderMaxWeightChart(data);
        renderE1RMChart(data);
        renderVolumeChart(data);
    }

    function createChartConfig(labels, datasetsData, yAxisLabel) {
        return {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasetsData // datasetsData should be an array of dataset objects
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: { display: true, text: 'Date', color: '#e0e0e0' },
                        ticks: { color: '#b0b0b0' }
                    },
                    y: {
                        title: { display: true, text: yAxisLabel, color: '#e0e0e0' },
                        ticks: { color: '#b0b0b0' },
                        beginAtZero: false // Usually better not to begin at zero for weight/strength
                    }
                },
                plugins: {
                    legend: { labels: { color: '#e0e0e0'} }
                }
            }
        };
    }

    function renderMaxWeightChart(data) {
        if (maxWeightChartInstance) maxWeightChartInstance.destroy();
        const labels = data.map(d => new Date(d.date + 'T00:00:00').toLocaleDateString());
        const weights = data.map(d => d.weight);
        const unit = data.length > 0 ? data[0].unit : 'units';

        maxWeightChartInstance = new Chart(document.getElementById('maxWeightChart'),
            createChartConfig(labels, [{
                label: `Max Weight Lifted (${unit})`,
                data: weights,
                borderColor: '#00c6fb',
                tension: 0.1
            }], `Weight (${unit})`)
        );
    }

    function renderE1RMChart(data) {
        if (e1rmChartInstance) e1rmChartInstance.destroy();
        const labels = data.map(d => new Date(d.date + 'T00:00:00').toLocaleDateString());
        const e1rms = data.map(d => parseFloat(calculateE1RM(d.weight, d.reps).toFixed(2)));
        const unit = data.length > 0 ? data[0].unit : 'units';


        e1rmChartInstance = new Chart(document.getElementById('e1rmChart'),
            createChartConfig(labels, [{
                label: `Estimated 1RM (${unit})`,
                data: e1rms,
                borderColor: '#28a745',
                tension: 0.1
            }], `e1RM (${unit})`)
        );
    }

    function renderVolumeChart(data) {
        if (volumeChartInstance) volumeChartInstance.destroy();
        const labels = data.map(d => new Date(d.date + 'T00:00:00').toLocaleDateString());
        const volumes = data.map(d => d.sets * d.reps * d.weight); // Simple volume
        const unit = data.length > 0 ? `Volume (${data[0].unit})` : 'Volume';

        volumeChartInstance = new Chart(document.getElementById('volumeChart'),
             createChartConfig(labels, [{
                label: `Total Volume (${unit})`,
                data: volumes,
                borderColor: '#ffc107',
                tension: 0.1,
                type: 'bar' // Volume often looks good as a bar chart
            }], unit)
        );
         // For bar chart, ensure y-axis starts at zero for better context
        if (volumeChartInstance) volumeChartInstance.options.scales.y.beginAtZero = true;
        volumeChartInstance.update();
    }

    function displayPersonalRecords(exerciseName) {
        const allWorkouts = getAllWorkouts();
        const prs = {}; // Store PRs like { 5: {weight: 100, date: '...'}, 1: {weight:120, date:'...'} }

        allWorkouts.forEach(session => {
            session.exercises.forEach(ex => {
                if (ex.name === exerciseName && ex.weight > 0) {
                    let repsArray = [];
                    if (typeof ex.reps === 'string' && ex.reps.includes('-')) {
                        // For ranges like "6-8", consider both ends or highest
                        const parts = ex.reps.split('-').map(p => parseInt(p.trim()));
                        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                             for (let r = parts[0]; r <= parts[1]; r++) repsArray.push(r); // Or just parts[1]
                        }
                    } else if (!isNaN(parseInt(ex.reps))) {
                        repsArray.push(parseInt(ex.reps));
                    }

                    repsArray.forEach(r => {
                        if (r > 0) {
                             if (!prs[r] || ex.weight > prs[r].weight || (ex.weight === prs[r].weight && new Date(session.date) > new Date(prs[r].date))) {
                                prs[r] = { weight: ex.weight, date: session.date, unit: ex.unit };
                            }
                        }
                    });
                }
            });
        });

        prTableBody.innerHTML = ''; // Clear previous PRs
        const repCountsToShow = [1, 3, 5, 8, 10, 12, 15, 20]; // Common PR rep ranges
        repCountsToShow.forEach(rc => {
            const prData = prs[rc];
            const row = prTableBody.insertRow();
            row.insertCell().textContent = `${rc} Reps`;
            if (prData) {
                row.insertCell().textContent = `${prData.weight} ${prData.unit}`;
                row.insertCell().textContent = new Date(prData.date + 'T00:00:00').toLocaleDateString();
            } else {
                row.insertCell().textContent = '-';
                row.insertCell().textContent = '-';
            }
        });
        if (Object.keys(prs).length === 0) {
             prTableBody.innerHTML = '<tr><td colspan="3">No PR data available for this exercise.</td></tr>';
        }
    }


    function clearCharts() {
        if (maxWeightChartInstance) maxWeightChartInstance.destroy();
        if (e1rmChartInstance) e1rmChartInstance.destroy();
        if (volumeChartInstance) volumeChartInstance.destroy();
        maxWeightChartInstance = null;
        e1rmChartInstance = null;
        volumeChartInstance = null;
    }
    function clearPRTable() {
        prTableBody.innerHTML = '<tr><td colspan="3">Select an exercise to view PRs.</td></tr>';
    }


    // --- Initial Load ---
    renderWorkoutHistory();
    populateProgressExerciseSelect();
    clearPRTable(); // Initialize PR table
});
