document.addEventListener('DOMContentLoaded', () => {
    // --- Tab Navigation Elements ---
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // --- Dashboard Elements ---
    const dashboardDateEl = document.getElementById('dashboard-date');
    const dashWorkoutStatusEl = document.getElementById('dash-workout-status');
    const dashKcalConsumedEl = document.getElementById('dash-kcal-consumed');
    const dashKcalGoalEl = document.getElementById('dash-kcal-goal');
    const dashProteinConsumedEl = document.getElementById('dash-protein-consumed');
    const dashProteinGoalEl = document.getElementById('dash-protein-goal');
    const dashWorkoutStreakEl = document.getElementById('dash-workout-streak');
    const dashLastWorkoutInfoEl = document.getElementById('dash-last-workout-info');
    const dashMotivationQuoteEl = document.getElementById('dash-motivation-quote');
    const dashLogWorkoutBtn = document.getElementById('dash-log-workout-btn');
    const dashStartRoutineBtn = document.getElementById('dash-start-routine-btn');
    const dashLogRestDayBtn = document.getElementById('dash-log-rest-day-btn');
    const dashLogNutritionBtn = document.getElementById('dash-log-nutrition-btn');
    const dashLogMeasurementBtn = document.getElementById('dash-log-measurement-btn');


    // --- Workout Log Elements ---
    const exerciseForm = document.getElementById('log-exercise-form');
    const loggedExercisesList = document.getElementById('logged-exercises-list');
    const workoutDateInput = document.getElementById('workout-date');
    const workoutSessionNameInput = document.getElementById('workout-session-name');
    const workoutDurationInput = document.getElementById('workout-duration');
    const currentWorkoutDateDisplay = document.getElementById('current-workout-date-display');
    const currentWorkoutNameDisplay = document.getElementById('current-workout-name-display');
    const finishWorkoutBtn = document.getElementById('finish-workout-btn');
    const exerciseNameInput = document.getElementById('exercise-name'); // In log form
    const commonExercisesDatalist = document.getElementById('common-exercises');
    const logRestDayBtnMain = document.getElementById('log-rest-day-btn-main');
    const startFromRoutineActualBtn = document.getElementById('start-from-routine-actual-btn');


    // --- Routines Tab Elements ---
    const createNewRoutineBtn = document.getElementById('create-new-routine-btn');
    const routinesListContainer = document.getElementById('routines-list-container');
    const createEditRoutineSection = document.getElementById('create-edit-routine-section');
    const routineFormTitle = document.getElementById('routine-form-title');
    const routineForm = document.getElementById('routine-form');
    const routineNameInput = document.getElementById('routine-name');
    const routineDescriptionInput = document.getElementById('routine-description');
    const routineExercisesList = document.getElementById('routine-exercises-list');
    const addExerciseToRoutineSelect = document.getElementById('add-exercise-to-routine-select');
    const routineExerciseSetsInput = document.getElementById('routine-exercise-sets');
    const routineExerciseRepsInput = document.getElementById('routine-exercise-reps');
    const addExerciseToRoutineBtn = document.getElementById('add-exercise-to-routine-btn');
    const saveRoutineBtn = document.getElementById('save-routine-btn');
    const cancelRoutineEditBtn = document.getElementById('cancel-routine-edit-btn');
    let editingRoutineId = null; // To track if editing an existing routine
    let currentRoutineExercises = []; // Temp storage for exercises while creating/editing a routine


    // --- History Tab Elements ---
    const workoutHistoryContainer = document.getElementById('workout-history-container');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const calendarMonthYearDisplay = document.getElementById('calendar-month-year');
    const calendarGridContainer = document.getElementById('calendar-grid-container');

    // --- Exercise Library Tab Elements ---
    const searchExerciseLibraryInput = document.getElementById('search-exercise-library');
    const filterMuscleGroupSelect = document.getElementById('filter-muscle-group');
    const addNewExerciseToLibBtn = document.getElementById('add-new-exercise-to-lib-btn');
    const exerciseLibraryListContainer = document.getElementById('exercise-library-list');
    const exerciseLibModal = document.getElementById('exercise-lib-modal');
    const closeExerciseLibModalBtn = document.getElementById('close-exercise-lib-modal');
    const exerciseLibModalTitle = document.getElementById('exercise-lib-modal-title');
    const exerciseLibForm = document.getElementById('exercise-lib-form');
    const exerciseLibIdInput = document.getElementById('exercise-lib-id'); // Hidden input for editing
    const exLibNameInput = document.getElementById('ex-lib-name');
    // ... (other ex lib form inputs)

    // --- Body Measurements Tab Elements ---
    const logMeasurementForm = document.getElementById('log-measurement-form');
    const measurementDateInput = document.getElementById('measurement-date');
    const bodyWeightInput = document.getElementById('body-weight');
    // ... (other measurement form inputs)
    const measurementHistoryListContainer = document.getElementById('measurement-history-list');
    const progressPhotoUploadInput = document.getElementById('progress-photo-upload');
    const progressPhotosGallery = document.getElementById('progress-photos-gallery');


    // --- Nutrition Tab Elements ---
    const nutritionLogForm = document.getElementById('nutrition-log-form');
    const nutritionDateInput = document.getElementById('nutrition-date');
    const kcalGoalInput = document.getElementById('kcal-goal');
    const kcalConsumedInput = document.getElementById('kcal-consumed');
    // ... (other nutrition form inputs)


    // --- Global State ---
    let currentWorkoutSessionExercises = []; // For exercises in the current log session
    let currentSessionDate = null;
    let currentCalendarDate = new Date();

    // --- LOCALSTORAGE KEYS ---
    const WORKOUT_STORAGE_KEY = 'ultimateTracker_workouts';
    const ROUTINES_STORAGE_KEY = 'ultimateTracker_routines';
    const EXERCISES_STORAGE_KEY = 'ultimateTracker_exercises';
    const MEASUREMENTS_STORAGE_KEY = 'ultimateTracker_measurements';
    const NUTRITION_STORAGE_KEY = 'ultimateTracker_nutrition';
    const SETTINGS_STORAGE_KEY = 'ultimateTracker_settings';

    // --- Utility Functions ---
    function generateId() { return Date.now() + Math.random().toString(36).substr(2, 9); }

    // --- LocalStorage Helper Functions (Generic) ---
    function getData(key) {
        const data = localStorage.getItem(key);
        try { return data ? JSON.parse(data) : []; }
        catch (e) { console.error(`Error parsing ${key}:`, e); return []; }
    }
    function saveData(key, data) {
        try { localStorage.setItem(key, JSON.stringify(data)); }
        catch (e) { console.error(`Error saving ${key}:`, e); }
    }

    // --- Tab Navigation Logic ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            tab.classList.add('active');
            const targetTabId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) targetContent.classList.add('active');

            // Actions on tab switch
            if (targetTabId === "dashboardTab") loadDashboardData();
            if (targetTabId === "historyTab") { renderCalendar(); renderWorkoutHistory(); }
            if (targetTabId === "routinesTab") { loadRoutines(); hideRoutineForm(); }
            if (targetTabId === "exercisesTab") { loadExerciseLibrary(); populateMuscleGroupFilter(); populateExerciseSelectors(); }
            if (targetTabId === "measurementsTab") { loadMeasurements(); setDefaultMeasurementDate(); }
            if (targetTabId === "nutritionTab") { loadNutritionData(); setDefaultNutritionDate(); }
        });
    });

    // --- Dashboard Logic ---
    function loadDashboardData() {
        if (dashboardDateEl) dashboardDateEl.textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        const todayStr = new Date().toISOString().split('T')[0];
        const workouts = getData(WORKOUT_STORAGE_KEY);
        const todayWorkout = workouts.find(w => w.date === todayStr && w.type !== "REST_DAY");
        const todayRestDay = workouts.find(w => w.date === todayStr && w.type === "REST_DAY");

        if (dashWorkoutStatusEl) {
            if (todayWorkout) dashWorkoutStatusEl.textContent = `Completed: ${todayWorkout.name || 'Workout'}`;
            else if (todayRestDay) dashWorkoutStatusEl.textContent = "Rest Day Logged";
            else dashWorkoutStatusEl.textContent = "Not Logged";
        }

        // TODO: Implement Kcal/Protein summary from nutrition data
        if (dashKcalConsumedEl) dashKcalConsumedEl.textContent = "0"; // Placeholder
        if (dashProteinConsumedEl) dashProteinConsumedEl.textContent = "0"; // Placeholder

        // TODO: Implement workout streak and last workout info
        if (dashWorkoutStreakEl) dashWorkoutStreakEl.textContent = "0"; // Placeholder
        if (dashLastWorkoutInfoEl) dashLastWorkoutInfoEl.textContent = "Never"; // Placeholder

        // TODO: Dynamic motivation quotes
        const quotes = ["The only bad workout is the one that didn't happen.", "Sweat is just fat crying.", "Strive for progress, not perfection."];
        if (dashMotivationQuoteEl) dashMotivationQuoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];

        // Dashboard button event listeners (navigate to tabs or open forms)
        if(dashLogWorkoutBtn) dashLogWorkoutBtn.onclick = () => switchTab('logWorkoutTab');
        if(dashStartRoutineBtn) dashStartRoutineBtn.onclick = () => switchTab('routinesTab'); // Or directly open routine selection
        if(dashLogRestDayBtn) dashLogRestDayBtn.onclick = () => { switchTab('logWorkoutTab'); setTimeout(logRestDayPrompt, 100); }; // Open log tab then prompt
        if(dashLogNutritionBtn) dashLogNutritionBtn.onclick = () => switchTab('nutritionTab');
        if(dashLogMeasurementBtn) dashLogMeasurementBtn.onclick = () => switchTab('measurementsTab');
    }

    function switchTab(tabId) {
        const tabButton = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
        if (tabButton) tabButton.click();
    }

    // --- Log Workout/Session Tab Logic ---
    function setDefaultLogDate() {
        if (workoutDateInput) {
            const today = new Date();
            workoutDateInput.value = currentSessionDate || today.toISOString().split('T')[0];
        }
    }

    exerciseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const date = workoutDateInput.value;
        const exerciseName = exerciseNameInput.value.trim();
        const sets = document.getElementById('sets').value;
        const reps = document.getElementById('reps').value.trim();
        const weight = document.getElementById('weight').value;
        const weightUnit = document.getElementById('weight-unit').value;
        const notes = document.getElementById('exercise-notes').value.trim();

        if (!date || !exerciseName || !sets || !reps) {
            alert('Please fill in Date, Exercise Name, Sets, and Reps.'); return;
        }

        if (currentWorkoutSessionExercises.length === 0) {
            currentSessionDate = date;
            const workoutName = workoutSessionNameInput.value.trim();
            if (currentWorkoutDateDisplay) currentWorkoutDateDisplay.textContent = `Date: ${new Date(date + 'T00:00:00').toLocaleDateString()}`;
            if (currentWorkoutNameDisplay) currentWorkoutNameDisplay.textContent = workoutName ? `Name: ${workoutName}` : '';
        } else if (date !== currentSessionDate) {
            alert("Date changed. Current session is under the initial date. Save to start new.");
            workoutDateInput.value = currentSessionDate; return;
        }

        let actualRepsParsed = null;
        if (!reps.includes('-') && !isNaN(parseInt(reps))) actualRepsParsed = parseInt(reps);

        const exerciseData = {
            id: generateId(), name: exerciseName, sets: parseInt(sets), reps: reps,
            actualReps: actualRepsParsed, weight: parseFloat(weight) || 0, unit: weightUnit, notes: notes
        };
        currentWorkoutSessionExercises.push(exerciseData);
        addExerciseToCurrentLogDOM(exerciseData);
        exerciseForm.reset(); // exerciseNameInput.value = ''; // Keep date and session name
        exerciseNameInput.focus();
        if (finishWorkoutBtn) finishWorkoutBtn.style.display = 'block';
    });

    function addExerciseToCurrentLogDOM(exercise) {
        const li = document.createElement('li');
        li.dataset.id = exercise.id;
        let weightDisplay = exercise.weight > 0 ? `Weight: ${exercise.weight} ${exercise.unit}` : (exercise.weight === 0 && exercise.unit ? `Weight: Bodyweight / 0 ${exercise.unit}` : "");
        li.innerHTML = `
            <div class="exercise-details">
                <strong>${exercise.name}</strong><br>
                Sets: ${exercise.sets}, Reps: ${exercise.reps}<br>
                ${weightDisplay ? `${weightDisplay}<br>` : ''}
                ${exercise.notes ? `<em>Notes: ${exercise.notes}</em>` : ''}
            </div>
            <div class="exercise-actions"><button class="delete-btn">Delete</button></div>`;
        li.querySelector('.delete-btn').addEventListener('click', () => {
            currentWorkoutSessionExercises = currentWorkoutSessionExercises.filter(ex => ex.id !== exercise.id);
            li.remove();
            if (currentWorkoutSessionExercises.length === 0 && finishWorkoutBtn) finishWorkoutBtn.style.display = 'none';
        });
        if (loggedExercisesList) loggedExercisesList.appendChild(li);
    }

    if (finishWorkoutBtn) finishWorkoutBtn.addEventListener('click', function() {
        if (currentWorkoutSessionExercises.length === 0) { alert("No exercises logged."); return; }
        if (!currentSessionDate) { alert("Please set a date."); return; }

        const sessionName = workoutSessionNameInput.value.trim();
        const duration = workoutDurationInput.value.trim();

        const newWorkoutSession = {
            id: generateId(), date: currentSessionDate, name: sessionName || "Workout",
            duration: duration ? parseInt(duration) : null,
            type: "WORKOUT", exercises: [...currentWorkoutSessionExercises]
        };
        const allWorkouts = getData(WORKOUT_STORAGE_KEY);
        allWorkouts.push(newWorkoutSession);
        allWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date));
        saveData(WORKOUT_STORAGE_KEY, allWorkouts);
        alert("Workout saved!");
        resetLogFormAndSession();
        loadDashboardData(); // Refresh dashboard
        renderCalendar(); renderWorkoutHistory(); // Refresh history
    });

    function resetLogFormAndSession() {
        currentWorkoutSessionExercises = [];
        if (loggedExercisesList) loggedExercisesList.innerHTML = '';
        if (currentWorkoutDateDisplay) currentWorkoutDateDisplay.textContent = '';
        if (currentWorkoutNameDisplay) currentWorkoutNameDisplay.textContent = '';
        if (finishWorkoutBtn) finishWorkoutBtn.style.display = 'none';
        currentSessionDate = null;
        if (workoutSessionNameInput) workoutSessionNameInput.value = '';
        if (workoutDurationInput) workoutDurationInput.value = '';
        setDefaultLogDate();
    }

    function logRestDayPrompt(dateToLog = null) {
        const restDate = dateToLog || workoutDateInput.value || new Date().toISOString().split('T')[0];
        const notes = prompt(`Log rest day for ${new Date(restDate+'T00:00:00').toLocaleDateString()}? (Optional notes):`, "");

        if (notes === null) { alert("Rest day logging cancelled."); return; } // User pressed cancel

        const restDayEntry = { id: generateId(), date: restDate, type: "REST_DAY", notes: notes || "" };
        const allEntries = getData(WORKOUT_STORAGE_KEY);
        const existingEntryIndex = allEntries.findIndex(entry => entry.date === restDate);

        if (existingEntryIndex > -1) {
            if (confirm(`An entry already exists for ${restDate}. Overwrite it with a rest day?`)) {
                allEntries.splice(existingEntryIndex, 1, restDayEntry); // Replace
            } else { alert("Rest day not logged."); return; }
        } else {
            allEntries.push(restDayEntry);
        }
        allEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
        saveData(WORKOUT_STORAGE_KEY, allEntries);
        alert("Rest day logged for " + new Date(restDate+'T00:00:00').toLocaleDateString() + "!");
        loadDashboardData(); renderCalendar(); renderWorkoutHistory();
    }
    if(logRestDayBtnMain) logRestDayBtnMain.addEventListener('click', () => logRestDayPrompt());


    // --- Routines Tab Logic ---
    if (createNewRoutineBtn) createNewRoutineBtn.addEventListener('click', showRoutineForm);
    if (cancelRoutineEditBtn) cancelRoutineEditBtn.addEventListener('click', hideRoutineForm);
    if (routineForm) routineForm.addEventListener('submit', handleSaveRoutine);
    if (addExerciseToRoutineBtn) addExerciseToRoutineBtn.addEventListener('click', addExerciseToCurrentRoutine);

    function showRoutineForm(routine = null) { // Pass routine to edit
        if (createEditRoutineSection) createEditRoutineSection.style.display = 'block';
        if (routinesListContainer) routinesListContainer.style.display = 'none'; // Hide list when form is shown
        currentRoutineExercises = []; // Reset temp exercises
        if (routineFormTitle) routineFormTitle.textContent = routine ? "Edit Routine" : "Create New Routine";
        if (routine) {
            editingRoutineId = routine.id;
            if (routineNameInput) routineNameInput.value = routine.name;
            if (routineDescriptionInput) routineDescriptionInput.value = routine.description || "";
            currentRoutineExercises = [...(routine.exercises || [])];
        } else {
            editingRoutineId = null;
            if (routineForm) routineForm.reset();
        }
        renderCurrentRoutineExercises();
    }
    function hideRoutineForm() {
        if (createEditRoutineSection) createEditRoutineSection.style.display = 'none';
        if (routinesListContainer) routinesListContainer.style.display = 'block';
        editingRoutineId = null;
        currentRoutineExercises = [];
    }
    function addExerciseToCurrentRoutine() {
        const selectedExName = addExerciseToRoutineSelect.value;
        const sets = routineExerciseSetsInput.value.trim();
        const reps = routineExerciseRepsInput.value.trim();
        if (!selectedExName || !sets || !reps) { alert("Select exercise, and enter sets & reps."); return; }
        currentRoutineExercises.push({ name: selectedExName, sets: sets, reps: reps, id: generateId() });
        renderCurrentRoutineExercises();
        // Clear inputs for next exercise
        addExerciseToRoutineSelect.value = "";
        routineExerciseSetsInput.value = "";
        routineExerciseRepsInput.value = "";
    }
    function renderCurrentRoutineExercises() {
        if (!routineExercisesList) return;
        routineExercisesList.innerHTML = "";
        currentRoutineExercises.forEach(ex => {
            const item = document.createElement('div');
            item.className = 'routine-exercise-item';
            item.innerHTML = `<span>${ex.name} - Sets: ${ex.sets}, Reps: ${ex.reps}</span>
                              <button type="button" class="delete-routine-ex-btn" data-id="${ex.id}">×</button>`;
            item.querySelector('.delete-routine-ex-btn').onclick = (e) => {
                const exId = e.target.dataset.id;
                currentRoutineExercises = currentRoutineExercises.filter(currEx => currEx.id !== exId);
                renderCurrentRoutineExercises();
            };
            routineExercisesList.appendChild(item);
        });
    }
    function handleSaveRoutine(event) {
        event.preventDefault();
        const name = routineNameInput.value.trim();
        if (!name || currentRoutineExercises.length === 0) { alert("Routine name and at least one exercise are required."); return; }
        const newRoutine = {
            id: editingRoutineId || generateId(),
            name: name,
            description: routineDescriptionInput.value.trim(),
            exercises: currentRoutineExercises
        };
        let routines = getData(ROUTINES_STORAGE_KEY);
        if (editingRoutineId) { // Editing existing
            routines = routines.map(r => r.id === editingRoutineId ? newRoutine : r);
        } else { // New routine
            routines.push(newRoutine);
        }
        saveData(ROUTINES_STORAGE_KEY, routines);
        alert(`Routine "${name}" saved!`);
        hideRoutineForm();
        loadRoutines();
    }
    function loadRoutines() {
        if (!routinesListContainer) return;
        const routines = getData(ROUTINES_STORAGE_KEY);
        routinesListContainer.innerHTML = "";
        if (routines.length === 0) {
            routinesListContainer.innerHTML = '<p>No routines created yet.</p>'; return;
        }
        routines.forEach(routine => {
            const card = document.createElement('div');
            card.className = 'routine-card';
            card.innerHTML = `
                <div>
                    <h4>${routine.name}</h4>
                    <small>${routine.description || ""}</small>
                </div>
                <div class="routine-actions">
                    <button class="start-routine-btn" data-id="${routine.id}"><i class="fas fa-play"></i> Start</button>
                    <button class="edit-routine-btn" data-id="${routine.id}"><i class="fas fa-edit"></i> Edit</button>
                    <button class="delete-routine-btn" data-id="${routine.id}"><i class="fas fa-trash"></i> Delete</button>
                </div>`;
            card.querySelector('.start-routine-btn').onclick = () => startWorkoutFromRoutine(routine.id);
            card.querySelector('.edit-routine-btn').onclick = () => showRoutineForm(routine);
            card.querySelector('.delete-routine-btn').onclick = () => deleteRoutine(routine.id, routine.name);
            routinesListContainer.appendChild(card);
        });
    }
    function deleteRoutine(id, name) {
        if (!confirm(`Are you sure you want to delete routine: "${name}"?`)) return;
        let routines = getData(ROUTINES_STORAGE_KEY);
        routines = routines.filter(r => r.id !== id);
        saveData(ROUTINES_STORAGE_KEY, routines);
        loadRoutines();
    }
    function startWorkoutFromRoutine(routineId) {
        const routines = getData(ROUTINES_STORAGE_KEY);
        const routine = routines.find(r => r.id === routineId);
        if (!routine) { alert("Routine not found."); return; }

        resetLogFormAndSession(); // Clear any ongoing log
        switchTab('logWorkoutTab'); // Go to log tab

        currentSessionDate = new Date().toISOString().split('T')[0]; // Default to today
        setDefaultLogDate();
        if (workoutSessionNameInput) workoutSessionNameInput.value = routine.name; // Pre-fill session name
        if (currentWorkoutDateDisplay) currentWorkoutDateDisplay.textContent = `Date: ${new Date(currentSessionDate + 'T00:00:00').toLocaleDateString()}`;
        if (currentWorkoutNameDisplay) currentWorkoutNameDisplay.textContent = `Name: ${routine.name}`;


        currentWorkoutSessionExercises = routine.exercises.map(ex => ({
            ...ex, // Spread existing properties like name, sets, reps
            id: generateId(), // New unique ID for this specific logged instance
            weight: "", // User will fill these in
            notes: "",
            actualReps: null // User will effectively log this by what they enter in "reps" field for this session
        }));

        currentWorkoutSessionExercises.forEach(addExerciseToCurrentLogDOM);
        if (finishWorkoutBtn && currentWorkoutSessionExercises.length > 0) finishWorkoutBtn.style.display = 'block';
        alert(`Loaded exercises from routine: "${routine.name}". Fill in weights and actual reps.`);
    }
    if(startFromRoutineActualBtn) startFromRoutineActualBtn.addEventListener('click', () => {
        // This button would ideally show a modal to select a routine
        // For now, let's assume it triggers the first routine or prompts
        const routines = getData(ROUTINES_STORAGE_KEY);
        if (routines.length > 0) {
            // TODO: Implement a routine selection UI here
            startWorkoutFromRoutine(routines[0].id); // Placeholder: starts first routine
        } else {
            alert("No routines available. Please create one first.");
            switchTab('routinesTab');
        }
    });


    // --- History Tab Logic (Calendar & Session List) ---
    function renderCalendar() {
        if (!calendarGridContainer) return;
        calendarGridContainer.innerHTML = '';
        const year = currentCalendarDate.getFullYear();
        const month = currentCalendarDate.getMonth();
        if (calendarMonthYearDisplay) calendarMonthYearDisplay.textContent = `${currentCalendarDate.toLocaleString('default', { month: 'long' })} ${year}`;

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayHeaderEl = document.createElement('div');
            dayHeaderEl.className = 'calendar-day-header'; dayHeaderEl.textContent = day;
            calendarGridContainer.appendChild(dayHeaderEl);
        });

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const allEntries = getData(WORKOUT_STORAGE_KEY);

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day other-month'; calendarGridContainer.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div'); dayCell.className = 'calendar-day';
            const dayNumberSpan = document.createElement('span'); dayNumberSpan.className = 'day-number';
            dayNumberSpan.textContent = day; dayCell.appendChild(dayNumberSpan);
            const currentDateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) dayCell.classList.add('today');

            const entriesOnThisDay = allEntries.filter(e => e.date === currentDateString);
            if (entriesOnThisDay.length > 0) {
                const isRestDay = entriesOnThisDay.some(e => e.type === "REST_DAY");
                const indicator = document.createElement('div'); indicator.className = 'workout-indicator';
                if (isRestDay) {
                    dayCell.classList.add('rest-day');
                    indicator.style.backgroundColor = '#6c757d'; // Grey for rest
                } // else green (default) for workout
                dayCell.appendChild(indicator);
                dayCell.dataset.date = currentDateString;
                dayCell.title = isRestDay ? `Rest Day` : `${entriesOnThisDay.filter(e=>e.type !== "REST_DAY").length} workout(s)`;
                dayCell.onclick = () => {
                    const sessionElement = document.querySelector(`.workout-session[data-date-marker="${currentDateString}"]`);
                    if (sessionElement) {
                        sessionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        sessionElement.classList.add('highlighted-session');
                        setTimeout(() => sessionElement.classList.remove('highlighted-session'), 2000);
                    } else { alert(`Details for ${new Date(currentDateString+'T00:00:00').toLocaleDateString()}`);}
                };
            }
            calendarGridContainer.appendChild(dayCell);
        }
        const totalCells = firstDayOfMonth + daysInMonth;
        const remainingCells = (7 - (totalCells % 7)) % 7;
        for (let i = 0; i < remainingCells; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day other-month'; calendarGridContainer.appendChild(emptyCell);
        }
    }
    if (prevMonthBtn) prevMonthBtn.addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1); renderCalendar(); });
    if (nextMonthBtn) nextMonthBtn.addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1); renderCalendar(); });

    function renderWorkoutHistory() {
        if (!workoutHistoryContainer) return;
        const allEntries = getData(WORKOUT_STORAGE_KEY);
        workoutHistoryContainer.innerHTML = '';
        if (allEntries.length === 0) {
            workoutHistoryContainer.innerHTML = '<p>No sessions or rest days logged yet.</p>'; return;
        }
        allEntries.forEach(entry => {
            const sessionDiv = document.createElement('div');
            sessionDiv.className = 'workout-session';
            sessionDiv.dataset.sessionId = entry.id;
            sessionDiv.dataset.dateMarker = entry.date;
            const formattedDate = new Date(entry.date + 'T00:00:00');
            let sessionHtml = `<h3 class="workout-session-date">${formattedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>`;
            if (entry.type === "REST_DAY") {
                sessionHtml += `<div class="history-exercise-item rest-day-entry"><strong>REST DAY</strong>
                                ${entry.notes ? `<em>Notes: ${entry.notes}</em>` : ''}</div>`;
            } else { // WORKOUT
                if(entry.name && entry.name !== "Workout") sessionHtml += `<p style="font-style:italic; margin-top:-15px; margin-bottom:10px;">${entry.name}</p>`;
                if(entry.duration) sessionHtml += `<p style="font-size:0.9em; margin-top:-10px; margin-bottom:10px;">Duration: ${entry.duration} mins</p>`;
                sessionHtml += '<ul class="history-exercise-list">';
                entry.exercises.forEach(ex => {
                    let weightDisplay = ex.weight > 0 ? ` - ${ex.weight} ${ex.unit}` : (ex.weight === 0 && ex.unit ? ` - Bodyweight / 0 ${ex.unit}` : "");
                    sessionHtml += `<li class="history-exercise-item"><strong>${ex.name}</strong>
                                    <div>Sets: ${ex.sets}, Reps: ${ex.reps}${weightDisplay}</div>
                                    ${ex.notes ? `<em>Notes: ${ex.notes}</em>` : ''}</li>`;
                });
                sessionHtml += '</ul>';
            }
            // TODO: Add edit/delete buttons for history entries
            sessionDiv.innerHTML = sessionHtml;
            workoutHistoryContainer.appendChild(sessionDiv);
        });
    }

    // --- Exercise Library Tab Logic ---
    if (addNewExerciseToLibBtn) addNewExerciseToLibBtn.addEventListener('click', () => showExerciseLibModal());
    if (closeExerciseLibModalBtn) closeExerciseLibModalBtn.addEventListener('click', () => hideExerciseLibModal());
    if (exerciseLibForm) exerciseLibForm.addEventListener('submit', handleSaveExerciseToLib);
    if (searchExerciseLibraryInput) searchExerciseLibraryInput.addEventListener('input', (e) => loadExerciseLibrary(e.target.value, filterMuscleGroupSelect.value));
    if (filterMuscleGroupSelect) filterMuscleGroupSelect.addEventListener('change', (e) => loadExerciseLibrary(searchExerciseLibraryInput.value, e.target.value));


    function showExerciseLibModal(exercise = null) {
        if (!exerciseLibModal) return;
        exerciseLibModal.style.display = 'flex'; // Use flex for centering
        if (exerciseLibModalTitle) exerciseLibModalTitle.textContent = exercise ? "Edit Exercise" : "Add New Exercise";
        if (exercise) { // Populate form for editing
            if(exerciseLibIdInput) exerciseLibIdInput.value = exercise.id;
            if(exLibNameInput) exLibNameInput.value = exercise.name;
            // TODO: Populate other fields (muscle, secondary, equipment, instructions, video)
            document.getElementById('ex-lib-muscle').value = exercise.primaryMuscle || "";
            document.getElementById('ex-lib-secondary-muscle').value = exercise.secondaryMuscles || "";
            document.getElementById('ex-lib-equipment').value = exercise.equipment || "";
            document.getElementById('ex-lib-instructions').value = exercise.instructions || "";
            document.getElementById('ex-lib-video').value = exercise.videoUrl || "";
        } else { // Clear form for new
            if (exerciseLibForm) exerciseLibForm.reset();
            if(exerciseLibIdInput) exerciseLibIdInput.value = ""; // Clear hidden ID
        }
    }
    function hideExerciseLibModal() { if (exerciseLibModal) exerciseLibModal.style.display = 'none'; }

    function handleSaveExerciseToLib(event) {
        event.preventDefault();
        const id = exerciseLibIdInput.value;
        const name = exLibNameInput.value.trim();
        if (!name) { alert("Exercise name is required."); return; }
        const newExercise = {
            id: id || generateId(),
            name: name,
            primaryMuscle: document.getElementById('ex-lib-muscle').value.trim(),
            secondaryMuscles: document.getElementById('ex-lib-secondary-muscle').value.trim(),
            equipment: document.getElementById('ex-lib-equipment').value.trim(),
            instructions: document.getElementById('ex-lib-instructions').value.trim(),
            videoUrl: document.getElementById('ex-lib-video').value.trim()
        };
        let exercises = getData(EXERCISES_STORAGE_KEY);
        if (id) { // Editing
            exercises = exercises.map(ex => ex.id === id ? newExercise : ex);
        } else { // Adding new
            exercises.push(newExercise);
        }
        saveData(EXERCISES_STORAGE_KEY, exercises);
        alert(`Exercise "${name}" saved to library!`);
        hideExerciseLibModal();
        loadExerciseLibrary();
        populateExerciseSelectors(); // Update datalists and selects
    }

    function loadExerciseLibrary(searchTerm = "", muscleFilter = "") {
        if (!exerciseLibraryListContainer) return;
        let exercises = getData(EXERCISES_STORAGE_KEY);
        if (searchTerm) {
            exercises = exercises.filter(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (muscleFilter) {
            exercises = exercises.filter(ex => ex.primaryMuscle && ex.primaryMuscle.toLowerCase() === muscleFilter.toLowerCase());
        }
        exerciseLibraryListContainer.innerHTML = "";
        if (exercises.length === 0) {
            exerciseLibraryListContainer.innerHTML = '<p>No exercises found or library is empty.</p>'; return;
        }
        exercises.forEach(ex => {
            const card = document.createElement('div');
            card.className = 'exercise-lib-card'; // Style this card
            // TODO: Display exercise details (name, muscle, equipment, maybe small image/icon)
            card.innerHTML = `<h4>${ex.name}</h4>
                              <p>Muscle: ${ex.primaryMuscle || 'N/A'}</p>
                              <p>Equipment: ${ex.equipment || 'N/A'}</p>
                              <button class="edit-ex-lib-btn" data-id="${ex.id}">Edit</button>
                              <button class="delete-ex-lib-btn" data-id="${ex.id}">Delete</button>`;
            card.querySelector('.edit-ex-lib-btn').onclick = () => showExerciseLibModal(ex);
            card.querySelector('.delete-ex-lib-btn').onclick = () => deleteExerciseFromLib(ex.id, ex.name);
            exerciseLibraryListContainer.appendChild(card);
        });
    }
    function deleteExerciseFromLib(id, name) {
        if(!confirm(`Delete "${name}" from library? This won't affect past logs.`)) return;
        let exercises = getData(EXERCISES_STORAGE_KEY);
        exercises = exercises.filter(ex => ex.id !== id);
        saveData(EXERCISES_STORAGE_KEY, exercises);
        loadExerciseLibrary();
        populateExerciseSelectors();
    }
    function populateMuscleGroupFilter() {
        if (!filterMuscleGroupSelect) return;
        const exercises = getData(EXERCISES_STORAGE_KEY);
        const muscleGroups = new Set(exercises.map(ex => ex.primaryMuscle).filter(Boolean));
        filterMuscleGroupSelect.innerHTML = '<option value="">All Muscle Groups</option>';
        muscleGroups.forEach(mg => {
            const option = document.createElement('option');
            option.value = mg; option.textContent = mg;
            filterMuscleGroupSelect.appendChild(option);
        });
    }
    function populateExerciseSelectors() { // For datalist and routine exercise select
        const exercises = getData(EXERCISES_STORAGE_KEY);
        if (commonExercisesDatalist) {
            commonExercisesDatalist.innerHTML = "";
            exercises.forEach(ex => {
                const option = document.createElement('option');
                option.value = ex.name;
                commonExercisesDatalist.appendChild(option);
            });
        }
        if (addExerciseToRoutineSelect) {
            const currentVal = addExerciseToRoutineSelect.value;
            addExerciseToRoutineSelect.innerHTML = '<option value="">-- Select Exercise to Add --</option>';
            exercises.forEach(ex => {
                const option = document.createElement('option');
                option.value = ex.name; option.textContent = ex.name;
                addExerciseToRoutineSelect.appendChild(option);
            });
            addExerciseToRoutineSelect.value = currentVal; // Try to preserve selection
        }
    }


    // --- Body Measurements Tab Logic ---
    if (logMeasurementForm) logMeasurementForm.addEventListener('submit', handleLogMeasurement);
    if (progressPhotoUploadInput) progressPhotoUploadInput.addEventListener('change', handlePhotoUpload);

    function setDefaultMeasurementDate() { if (measurementDateInput) measurementDateInput.value = new Date().toISOString().split('T')[0]; }
    function handleLogMeasurement(event) {
        event.preventDefault();
        const measurement = {
            id: generateId(),
            date: measurementDateInput.value,
            weight: bodyWeightInput.value ? parseFloat(bodyWeightInput.value) : null,
            bodyFat: document.getElementById('body-fat').value ? parseFloat(document.getElementById('body-fat').value) : null,
            // TODO: Get other measurement values (chest, waist, arm, thigh, notes)
            notes: document.getElementById('measurement-notes').value.trim()
        };
        if (!measurement.date) { alert("Date is required for measurements."); return; }
        let measurements = getData(MEASUREMENTS_STORAGE_KEY);
        measurements.push(measurement);
        measurements.sort((a,b) => new Date(b.date) - new Date(a.date));
        saveData(MEASUREMENTS_STORAGE_KEY, measurements);
        alert("Measurements logged!");
        logMeasurementForm.reset();
        setDefaultMeasurementDate();
        loadMeasurements();
    }
    function loadMeasurements() {
        if (!measurementHistoryListContainer) return;
        const measurements = getData(MEASUREMENTS_STORAGE_KEY);
        measurementHistoryListContainer.innerHTML = "";
        if(measurements.length === 0) {
            measurementHistoryListContainer.innerHTML = "<p>No measurements logged yet.</p>"; return;
        }
        // TODO: Display measurement history (table or cards)
        // TODO: Implement charts for measurements
        measurements.forEach(m => {
            const item = document.createElement('div');
            item.className = 'measurement-history-item'; // Style this
            item.textContent = `${new Date(m.date+'T00:00:00').toLocaleDateString()}: Weight ${m.weight || '-'} kg, BF ${m.bodyFat || '-'} %`;
            measurementHistoryListContainer.appendChild(item);
        });
        loadProgressPhotos(); // Also load photos when measurements are loaded/updated
    }
    function handlePhotoUpload(event) {
        const files = event.target.files;
        if (!files.length) return;
        // TODO: Handle multiple files, save them (base64 to localStorage or use IndexedDB for larger files)
        // This is complex for localStorage due to size limits.
        alert(`Photo upload selected (${files.length} files). Saving actual photos is complex with localStorage.`);
        // For now, just log. Real implementation needs careful storage strategy.
        console.log("Photos to upload:", files);
    }
    function loadProgressPhotos() {
        if(!progressPhotosGallery) return;
        // TODO: Retrieve and display saved photos (from localStorage base64 or IndexedDB)
        progressPhotosGallery.innerHTML = "<p>Photo gallery feature coming soon (requires advanced storage).</p>";
    }


    // --- Nutrition Tab Logic ---
    if (nutritionLogForm) nutritionLogForm.addEventListener('submit', handleLogNutrition);

    function setDefaultNutritionDate() { if (nutritionDateInput) nutritionDateInput.value = new Date().toISOString().split('T')[0]; }
    function handleLogNutrition(event) {
        event.preventDefault();
        const nutritionEntry = {
            id: generateId(),
            date: nutritionDateInput.value,
            kcalGoal: kcalGoalInput.value ? parseInt(kcalGoalInput.value) : null,
            kcalConsumed: kcalConsumedInput.value ? parseInt(kcalConsumedInput.value) : null,
            // TODO: Get other nutrition values (protein, carbs, fats, notes)
            notes: document.getElementById('nutrition-notes').value.trim()
        };
        if (!nutritionEntry.date || nutritionEntry.kcalConsumed === null) { alert("Date and Kcal Consumed are required."); return; }
        let nutritionData = getData(NUTRITION_STORAGE_KEY);
        nutritionData.push(nutritionEntry);
        nutritionData.sort((a,b) => new Date(b.date) - new Date(a.date));
        saveData(NUTRITION_STORAGE_KEY, nutritionData);
        alert("Nutrition logged!");
        nutritionLogForm.reset();
        setDefaultNutritionDate();
        loadNutritionData();
        loadDashboardData(); // Refresh dashboard with new nutrition info
    }
    function loadNutritionData() {
        // TODO: Display nutrition history and summaries/charts
        console.log("Nutrition data loaded (display not implemented yet):", getData(NUTRITION_STORAGE_KEY));
        const nutritionSummaryEl = document.getElementById('nutrition-summary');
        if(nutritionSummaryEl) nutritionSummaryEl.innerHTML = "<p>Nutrition summaries and charts coming soon.</p>";
    }

    // --- Initial Page Load Setup ---
    function initializeApp() {
        setDefaultLogDate();
        setDefaultMeasurementDate();
        setDefaultNutritionDate();

        loadExerciseLibrary(); // Load library first so other parts can use it
        populateMuscleGroupFilter();
        populateExerciseSelectors();

        loadRoutines();
        loadMeasurements();
        loadNutritionData();

        renderCalendar();
        renderWorkoutHistory();

        loadDashboardData(); // Load dashboard last as it might depend on other data

        // Set the first tab ("Dashboard") as active on initial load
        const firstTab = document.querySelector('.tab-link[data-tab="dashboardTab"]');
        const firstTabContent = document.getElementById('dashboardTab');
        if (firstTab && firstTabContent) {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            firstTab.classList.add('active');
            firstTabContent.classList.add('active');
        } else { // Fallback if dashboard tab isn't first or found
            const fallbackFirstTab = document.querySelector('.tab-link');
            if(fallbackFirstTab) fallbackFirstTab.click();
        }
    }

    initializeApp();
});
