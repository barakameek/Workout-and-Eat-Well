document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const bodyElement = document.body;

    function applyTheme(theme) {
        if (theme === 'light') {
            bodyElement.classList.add('theme-light');
            bodyElement.classList.remove('theme-dark');
            if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else { // Default to dark
            bodyElement.classList.remove('theme-light');
            bodyElement.classList.add('theme-dark');
            if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    }
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme || 'dark'); // Apply saved theme or default to dark

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let newTheme = bodyElement.classList.contains('theme-light') ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    // --- Tab Navigation Elements ---
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // --- Dashboard Elements ---
    const dashboardDateEl = document.getElementById('dashboard-date');
    const quickStartGrid = document.getElementById('quick-start-workouts')?.querySelector('.quick-start-grid');
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
    const exerciseNameInput = document.getElementById('exercise-name');
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
    let editingRoutineId = null;
    let currentRoutineExercisesData = [];


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
    const exerciseLibIdInput = document.getElementById('exercise-lib-id');
    const exLibNameInput = document.getElementById('ex-lib-name');
    const exLibMuscleInput = document.getElementById('ex-lib-muscle');
    const exLibSecondaryMuscleInput = document.getElementById('ex-lib-secondary-muscle');
    const exLibEquipmentInput = document.getElementById('ex-lib-equipment');
    const exLibInstructionsInput = document.getElementById('ex-lib-instructions');
    const exLibVideoInput = document.getElementById('ex-lib-video');


    // --- Body Measurements Tab Elements ---
    const logMeasurementForm = document.getElementById('log-measurement-form');
    const measurementDateInput = document.getElementById('measurement-date');
    const bodyWeightInput = document.getElementById('body-weight');
    const bodyFatInput = document.getElementById('body-fat');
    const chestSizeInput = document.getElementById('chest-size');
    const waistSizeInput = document.getElementById('waist-size');
    const armSizeInput = document.getElementById('arm-size');
    const thighSizeInput = document.getElementById('thigh-size');
    const measurementNotesInput = document.getElementById('measurement-notes');
    const measurementHistoryListContainer = document.getElementById('measurement-history-list');
    const progressPhotoUploadInput = document.getElementById('progress-photo-upload');
    const progressPhotosGallery = document.getElementById('progress-photos-gallery');


    // --- Nutrition Tab Elements ---
    const nutritionLogForm = document.getElementById('nutrition-log-form');
    const nutritionDateInput = document.getElementById('nutrition-date');
    const kcalGoalInput = document.getElementById('kcal-goal');
    const kcalConsumedInput = document.getElementById('kcal-consumed');
    const proteinGoalInput = document.getElementById('protein-goal');
    const proteinConsumedInput = document.getElementById('protein-consumed');
    const carbsConsumedInput = document.getElementById('carbs-consumed');
    const fatsConsumedInput = document.getElementById('fats-consumed');
    const nutritionNotesInput = document.getElementById('nutrition-notes');
    const nutritionSummaryEl = document.getElementById('nutrition-summary');


    // --- Global State ---
    let currentWorkoutSessionExercisesData = [];
    let currentSessionDate = null;
    let currentCalendarDate = new Date();

    // --- LOCALSTORAGE KEYS ---
    const WORKOUT_STORAGE_KEY = 'cuteTracker_workouts';
    const ROUTINES_STORAGE_KEY = 'cuteTracker_routines';
    const EXERCISES_STORAGE_KEY = 'cuteTracker_exercises';
    const MEASUREMENTS_STORAGE_KEY = 'cuteTracker_measurements';
    const NUTRITION_STORAGE_KEY = 'cuteTracker_nutrition';
    // const SETTINGS_STORAGE_KEY = 'cuteTracker_settings'; // For future settings

    // --- Utility Functions ---
    function generateId() { return Date.now().toString(36) + Math.random().toString(36).substr(2, 5); }

    // --- LocalStorage Helper Functions (Generic) ---
    function getData(key, defaultValue = []) {
        const data = localStorage.getItem(key);
        try { return data ? JSON.parse(data) : defaultValue; }
        catch (e) { console.error(`Error parsing ${key}:`, e); return defaultValue; }
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

            if (targetTabId === "dashboardTab") loadDashboardData();
            if (targetTabId === "historyTab") { renderCalendar(); renderWorkoutHistory(); }
            if (targetTabId === "routinesTab") { loadRoutines(); hideRoutineForm(); }
            if (targetTabId === "exercisesTab") { loadExerciseLibrary(); populateMuscleGroupFilter(); populateExerciseSelectors(); }
            if (targetTabId === "measurementsTab") { loadMeasurements(); setDefaultMeasurementDate(); }
            if (targetTabId === "nutritionTab") { loadNutritionData(); setDefaultNutritionDate(); }
        });
    });

    function switchTab(tabId) {
        const tabButton = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
        if (tabButton) tabButton.click();
    }

    // --- Dashboard Logic ---
    function loadDashboardData() {
        if (dashboardDateEl) dashboardDateEl.textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        const todayStr = new Date().toISOString().split('T')[0];
        const workouts = getData(WORKOUT_STORAGE_KEY);
        const todayWorkoutEntry = workouts.find(w => w.date === todayStr && w.type !== "REST_DAY");
        const todayRestDayEntry = workouts.find(w => w.date === todayStr && w.type === "REST_DAY");

        if (dashWorkoutStatusEl) {
            if (todayWorkoutEntry) dashWorkoutStatusEl.textContent = `Completed: ${todayWorkoutEntry.name || 'Workout'} 💪`;
            else if (todayRestDayEntry) dashWorkoutStatusEl.textContent = "Rest Day Logged 😴";
            else dashWorkoutStatusEl.textContent = "Not Logged Yet 🤔";
        }

        const nutritionData = getData(NUTRITION_STORAGE_KEY);
        const todayNutrition = nutritionData.find(n => n.date === todayStr);
        if (todayNutrition) {
            if (dashKcalConsumedEl) dashKcalConsumedEl.textContent = todayNutrition.kcalConsumed || 0;
            if (dashKcalGoalEl) dashKcalGoalEl.textContent = todayNutrition.kcalGoal || 2500;
            if (dashProteinConsumedEl) dashProteinConsumedEl.textContent = todayNutrition.proteinConsumed || 0;
            if (dashProteinGoalEl) dashProteinGoalEl.textContent = todayNutrition.proteinGoal || 150;
        } else {
            if (dashKcalConsumedEl) dashKcalConsumedEl.textContent = "0";
            if (dashKcalGoalEl) dashKcalGoalEl.textContent = getData(SETTINGS_STORAGE_KEY, { kcalGoal: 2500 }).kcalGoal; // Default goal
            if (dashProteinConsumedEl) dashProteinConsumedEl.textContent = "0";
            if (dashProteinGoalEl) dashProteinGoalEl.textContent = getData(SETTINGS_STORAGE_KEY, { proteinGoal: 150 }).proteinGoal;
        }

        // TODO: Implement workout streak (count consecutive days with workouts/rest_days from `workouts` data)
        if (dashWorkoutStreakEl) dashWorkoutStreakEl.textContent = "0"; // Placeholder
        // TODO: Find the last workout date from `workouts` data
        const lastWorkout = workouts.filter(w => w.type !== "REST_DAY").sort((a,b) => new Date(b.date) - new Date(a.date))[0];
        if (dashLastWorkoutInfoEl) dashLastWorkoutInfoEl.textContent = lastWorkout ? new Date(lastWorkout.date+'T00:00:00').toLocaleDateString() : "Never";


        const quotes = ["Believe in your #selfie! 🤳", "You're stronger than you think! ✨", "Every rep counts! 💖", "Make today awesome! 🌟"];
        if (dashMotivationQuoteEl) dashMotivationQuoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];

        populateQuickStartWorkouts();

        if(dashLogWorkoutBtn) dashLogWorkoutBtn.onclick = () => switchTab('logWorkoutTab');
        if(dashStartRoutineBtn) dashStartRoutineBtn.onclick = () => switchTab('routinesTab');
        if(dashLogRestDayBtn) dashLogRestDayBtn.onclick = () => { switchTab('logWorkoutTab'); setTimeout(() => logRestDayPrompt(new Date().toISOString().split('T')[0]), 100); };
        if(dashLogNutritionBtn) dashLogNutritionBtn.onclick = () => switchTab('nutritionTab');
        if(dashLogMeasurementBtn) dashLogMeasurementBtn.onclick = () => switchTab('measurementsTab');
    }

    function populateQuickStartWorkouts() {
        if (!quickStartGrid) return;
        quickStartGrid.innerHTML = ''; // Clear existing
        const routines = getData(ROUTINES_STORAGE_KEY);
        // Show first few routines or predefined ones
        const routinesToShow = routines.slice(0, 4); // Show up to 4
        if (routinesToShow.length === 0) {
            quickStartGrid.innerHTML = '<p>Create some routines in "My Routines" to see them here! 😊</p>';
        }

        routinesToShow.forEach(routine => {
            const tile = document.createElement('button');
            tile.className = 'quick-start-tile';
            tile.dataset.routineId = routine.id; // Changed from routine-name
            tile.innerHTML = `
                <h4>${routine.name}</h4>
                <p>${routine.description || `${routine.exercises.length} exercises`}</p>
                <i class="fas fa-chevron-circle-right"></i>`;
            tile.onclick = () => startWorkoutFromRoutine(routine.id);
            quickStartGrid.appendChild(tile);
        });
    }


    // --- Log Workout/Session Tab Logic ---
    function setDefaultLogDate() {
        if (workoutDateInput) {
            const today = new Date();
            workoutDateInput.value = currentSessionDate || today.toISOString().split('T')[0];
        }
    }

    if(exerciseForm) exerciseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const date = workoutDateInput.value;
        const exerciseNameVal = exerciseNameInput.value.trim();
        const setsVal = document.getElementById('sets').value;
        const repsVal = document.getElementById('reps').value.trim();
        const weightVal = document.getElementById('weight').value;
        const weightUnitVal = document.getElementById('weight-unit').value;
        const notesVal = document.getElementById('exercise-notes').value.trim();

        if (!date || !exerciseNameVal || !setsVal || !repsVal) {
            alert('Oops! Please fill in Date, Exercise Name, Sets, and Reps. 💖'); return;
        }

        if (currentWorkoutSessionExercisesData.length === 0) {
            currentSessionDate = date;
            const workoutName = workoutSessionNameInput.value.trim();
            if (currentWorkoutDateDisplay) currentWorkoutDateDisplay.textContent = `Date: ${new Date(date + 'T00:00:00').toLocaleDateString()}`;
            if (currentWorkoutNameDisplay) currentWorkoutNameDisplay.textContent = workoutName ? `Name: ${workoutName}` : '';
        } else if (date !== currentSessionDate) {
            alert("Date changed! Current session is under the first date. Save to start a new one. 😊");
            workoutDateInput.value = currentSessionDate; return;
        }

        let actualRepsParsed = null;
        if (!repsVal.includes('-') && !isNaN(parseInt(repsVal))) actualRepsParsed = parseInt(repsVal);

        const exerciseData = {
            id: generateId(), name: exerciseNameVal, sets: parseInt(setsVal), reps: repsVal,
            actualReps: actualRepsParsed, weight: parseFloat(weightVal) || 0, unit: weightUnitVal, notes: notesVal
        };
        currentWorkoutSessionExercisesData.push(exerciseData);
        addExerciseToCurrentLogDOM(exerciseData);
        // Don't reset date or session name, just exercise fields
        exerciseNameInput.value = '';
        document.getElementById('sets').value = '';
        document.getElementById('reps').value = '';
        document.getElementById('weight').value = '';
        document.getElementById('exercise-notes').value = '';
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
            <div class="exercise-actions"><button class="delete-btn"><i class="fas fa-trash-alt"></i></button></div>`; // Added icon
        li.querySelector('.delete-btn').addEventListener('click', () => {
            currentWorkoutSessionExercisesData = currentWorkoutSessionExercisesData.filter(ex => ex.id !== exercise.id);
            li.remove();
            if (currentWorkoutSessionExercisesData.length === 0 && finishWorkoutBtn) finishWorkoutBtn.style.display = 'none';
        });
        if (loggedExercisesList) loggedExercisesList.appendChild(li);
    }

    if (finishWorkoutBtn) finishWorkoutBtn.addEventListener('click', function() {
        if (currentWorkoutSessionExercisesData.length === 0) { alert("No exercises logged. Add some sparkle! ✨"); return; }
        if (!currentSessionDate) { alert("Oops, please set a date! 📅"); return; }

        const sessionName = workoutSessionNameInput.value.trim();
        const duration = workoutDurationInput.value.trim();

        const newWorkoutSession = {
            id: generateId(), date: currentSessionDate, name: sessionName || "My Awesome Workout 💪",
            duration: duration ? parseInt(duration) : null,
            type: "WORKOUT", exercises: [...currentWorkoutSessionExercisesData]
        };
        const allWorkouts = getData(WORKOUT_STORAGE_KEY);
        allWorkouts.push(newWorkoutSession);
        allWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date));
        saveData(WORKOUT_STORAGE_KEY, allWorkouts);
        alert("Workout saved! You're amazing! 🥳");
        resetLogFormAndSession();
        loadDashboardData();
        renderCalendar(); renderWorkoutHistory();
    });

    function resetLogFormAndSession() {
        currentWorkoutSessionExercisesData = [];
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
        const notes = prompt(`Log rest day for ${new Date(restDate+'T00:00:00').toLocaleDateString()}? (Optional notes for your chill time 🧘‍♀️):`, "");

        if (notes === null) { alert("Rest day logging cancelled. That's okay! 👍"); return; }

        const restDayEntry = { id: generateId(), date: restDate, type: "REST_DAY", notes: notes || "" };
        const allEntries = getData(WORKOUT_STORAGE_KEY);
        const existingEntryIndex = allEntries.findIndex(entry => entry.date === restDate);

        if (existingEntryIndex > -1) {
            if (confirm(`An entry already exists for ${restDate}. Overwrite it with a rest day? 🤔`)) {
                allEntries.splice(existingEntryIndex, 1, restDayEntry);
            } else { alert("Rest day not logged."); return; }
        } else {
            allEntries.push(restDayEntry);
        }
        allEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
        saveData(WORKOUT_STORAGE_KEY, allEntries);
        alert("Rest day logged for " + new Date(restDate+'T00:00:00').toLocaleDateString() + "! Sweet dreams! 🌙");
        loadDashboardData(); renderCalendar(); renderWorkoutHistory();
    }
    if(logRestDayBtnMain) logRestDayBtnMain.addEventListener('click', () => logRestDayPrompt());


    // --- Routines Tab Logic ---
    if (createNewRoutineBtn) createNewRoutineBtn.addEventListener('click', () => showRoutineForm());
    if (cancelRoutineEditBtn) cancelRoutineEditBtn.addEventListener('click', hideRoutineForm);
    if (routineForm) routineForm.addEventListener('submit', handleSaveRoutine);
    if (addExerciseToRoutineBtn) addExerciseToRoutineBtn.addEventListener('click', addExerciseToCurrentRoutineData);

    function showRoutineForm(routine = null) {
        if (createEditRoutineSection) createEditRoutineSection.style.display = 'block';
        if (routinesListContainer) routinesListContainer.style.display = 'none';
        currentRoutineExercisesData = [];
        if (routineFormTitle) routineFormTitle.textContent = routine ? "Edit Routine ✨" : "Create New Routine 💖";
        if (routine) {
            editingRoutineId = routine.id;
            if (routineNameInput) routineNameInput.value = routine.name;
            if (routineDescriptionInput) routineDescriptionInput.value = routine.description || "";
            currentRoutineExercisesData = [...(routine.exercises || [])];
        } else {
            editingRoutineId = null;
            if (routineForm) routineForm.reset();
        }
        renderCurrentRoutineExercisesDOM();
    }
    function hideRoutineForm() {
        if (createEditRoutineSection) createEditRoutineSection.style.display = 'none';
        if (routinesListContainer) routinesListContainer.style.display = 'block';
        editingRoutineId = null;
        currentRoutineExercisesData = [];
    }
    function addExerciseToCurrentRoutineData() {
        const selectedExName = addExerciseToRoutineSelect.value;
        const sets = routineExerciseSetsInput.value.trim();
        const reps = routineExerciseRepsInput.value.trim();
        if (!selectedExName || !sets || !reps) { alert("Select an exercise, and enter sets & reps, please! 😊"); return; }
        currentRoutineExercisesData.push({ name: selectedExName, sets: sets, reps: reps, id: generateId() });
        renderCurrentRoutineExercisesDOM();
        addExerciseToRoutineSelect.value = "";
        routineExerciseSetsInput.value = "";
        routineExerciseRepsInput.value = "";
    }
    function renderCurrentRoutineExercisesDOM() {
        if (!routineExercisesList) return;
        routineExercisesList.innerHTML = "";
        currentRoutineExercisesData.forEach(ex => {
            const item = document.createElement('div');
            item.className = 'routine-exercise-item';
            item.innerHTML = `<span>${ex.name} - Sets: ${ex.sets}, Reps: ${ex.reps}</span>
                              <button type="button" class="delete-routine-ex-btn" data-id="${ex.id}"><i class="fas fa-times-circle"></i></button>`;
            item.querySelector('.delete-routine-ex-btn').onclick = (e) => {
                const exId = e.target.dataset.id;
                currentRoutineExercisesData = currentRoutineExercisesData.filter(currEx => currEx.id !== exId);
                renderCurrentRoutineExercisesDOM();
            };
            routineExercisesList.appendChild(item);
        });
    }
    function handleSaveRoutine(event) {
        event.preventDefault();
        const name = routineNameInput.value.trim();
        if (!name || currentRoutineExercisesData.length === 0) { alert("Routine name and at least one exercise are needed! 🌟"); return; }
        const newRoutine = {
            id: editingRoutineId || generateId(), name: name,
            description: routineDescriptionInput.value.trim(), exercises: currentRoutineExercisesData
        };
        let routines = getData(ROUTINES_STORAGE_KEY);
        if (editingRoutineId) {
            routines = routines.map(r => r.id === editingRoutineId ? newRoutine : r);
        } else {
            routines.push(newRoutine);
        }
        saveData(ROUTINES_STORAGE_KEY, routines);
        alert(`Routine "${name}" saved! Great job! 🎉`);
        hideRoutineForm();
        loadRoutines();
        populateQuickStartWorkouts(); // Update dashboard quick starts
    }
    function loadRoutines() {
        if (!routinesListContainer) return;
        const routines = getData(ROUTINES_STORAGE_KEY);
        routinesListContainer.innerHTML = "";
        if (routines.length === 0) {
            routinesListContainer.innerHTML = '<p>No routines created yet. Let’s make one! 🌈</p>'; return;
        }
        routines.forEach(routine => {
            const card = document.createElement('div');
            card.className = 'routine-card';
            card.innerHTML = `
                <div><h4>${routine.name}</h4><small>${routine.description || `${routine.exercises.length} exercises`}</small></div>
                <div class="routine-actions">
                    <button class="start-routine-btn" data-id="${routine.id}" title="Start this Routine"><i class="fas fa-play"></i></button>
                    <button class="edit-routine-btn" data-id="${routine.id}" title="Edit Routine"><i class="fas fa-edit"></i></button>
                    <button class="delete-routine-btn" data-id="${routine.id}" title="Delete Routine"><i class="fas fa-trash"></i></button>
                </div>`;
            card.querySelector('.start-routine-btn').onclick = () => startWorkoutFromRoutine(routine.id);
            card.querySelector('.edit-routine-btn').onclick = () => showRoutineForm(routine);
            card.querySelector('.delete-routine-btn').onclick = () => deleteRoutine(routine.id, routine.name);
            routinesListContainer.appendChild(card);
        });
    }
    function deleteRoutine(id, name) {
        if (!confirm(`Are you sure you want to delete routine: "${name}"? 😢`)) return;
        let routines = getData(ROUTINES_STORAGE_KEY);
        routines = routines.filter(r => r.id !== id);
        saveData(ROUTINES_STORAGE_KEY, routines);
        loadRoutines();
        populateQuickStartWorkouts();
    }
    function startWorkoutFromRoutine(routineId) {
        const routines = getData(ROUTINES_STORAGE_KEY);
        const routine = routines.find(r => r.id === routineId);
        if (!routine) { alert("Routine not found. Spooky! 👻"); return; }
        resetLogFormAndSession();
        switchTab('logWorkoutTab');
        currentSessionDate = new Date().toISOString().split('T')[0];
        setDefaultLogDate();
        if (workoutSessionNameInput) workoutSessionNameInput.value = routine.name;
        if (currentWorkoutDateDisplay) currentWorkoutDateDisplay.textContent = `Date: ${new Date(currentSessionDate + 'T00:00:00').toLocaleDateString()}`;
        if (currentWorkoutNameDisplay) currentWorkoutNameDisplay.textContent = `Name: ${routine.name}`;

        currentWorkoutSessionExercisesData = routine.exercises.map(ex => ({
            ...ex, id: generateId(), weight: "", notes: "", actualReps: null
        }));
        currentWorkoutSessionExercisesData.forEach(addExerciseToCurrentLogDOM);
        if (finishWorkoutBtn && currentWorkoutSessionExercisesData.length > 0) finishWorkoutBtn.style.display = 'block';
        alert(`Loaded exercises from routine: "${routine.name}". Let's get to it! 🔥`);
    }
    if(startFromRoutineActualBtn) startFromRoutineActualBtn.addEventListener('click', () => {
        const routines = getData(ROUTINES_STORAGE_KEY);
        if (routines.length > 0) {
            // TODO: Implement a proper routine selection modal/dropdown for this button
            alert("Please select a routine from the 'My Routines' tab or the Dashboard for now! 😊");
            switchTab('routinesTab');
        } else {
            alert("No routines available. Please create one in 'My Routines' first! 💖");
            switchTab('routinesTab');
        }
    });


    // --- History Tab Logic (Calendar & Session List) ---
    // (renderCalendar and renderWorkoutHistory are largely the same as previous full JS)
    function renderCalendar() {
        if (!calendarGridContainer) return;
        calendarGridContainer.innerHTML = '';
        const year = currentCalendarDate.getFullYear();
        const month = currentCalendarDate.getMonth();
        if (calendarMonthYearDisplay) calendarMonthYearDisplay.textContent = `${currentCalendarDate.toLocaleString('default', { month: 'long' })} ${year} 🗓️`;

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
                    indicator.innerHTML = '😴'; // Emoji for rest
                    indicator.style.backgroundColor = 'transparent';
                    indicator.style.fontSize = '1.2em';
                } else {
                     indicator.innerHTML = '💪'; // Emoji for workout
                     indicator.style.backgroundColor = 'transparent';
                     indicator.style.fontSize = '1.2em';
                }
                dayCell.appendChild(indicator);
                dayCell.dataset.date = currentDateString;
                dayCell.title = isRestDay ? `Rest Day 😌` : `${entriesOnThisDay.filter(e=>e.type !== "REST_DAY").length} workout(s) 🔥`;
                dayCell.onclick = () => {
                    const sessionElements = document.querySelectorAll(`.workout-session[data-date-marker="${currentDateString}"]`);
                    if (sessionElements.length > 0) {
                        sessionElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                        sessionElements.forEach(el => el.classList.add('highlighted-session'));
                        setTimeout(() => sessionElements.forEach(el => el.classList.remove('highlighted-session')), 2500);
                    } else { alert(`Details for ${new Date(currentDateString+'T00:00:00').toLocaleDateString()} 🧐`);}
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
            workoutHistoryContainer.innerHTML = '<p>No sessions or rest days logged yet. Let’s make some memories! ✨</p>'; return;
        }
        allEntries.forEach(entry => {
            const sessionDiv = document.createElement('div');
            sessionDiv.className = 'workout-session';
            sessionDiv.dataset.sessionId = entry.id;
            sessionDiv.dataset.dateMarker = entry.date;
            const formattedDate = new Date(entry.date + 'T00:00:00');
            let sessionHtml = `<h3 class="workout-session-date">${formattedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>`;
            if (entry.type === "REST_DAY") {
                sessionHtml += `<div class="history-exercise-item rest-day-entry"><strong>😴 REST DAY 😴</strong>
                                ${entry.notes ? `<em>Notes: ${entry.notes}</em>` : ''}</div>`;
            } else { // WORKOUT
                if(entry.name && entry.name !== "My Awesome Workout 💪") sessionHtml += `<p style="font-style:italic; margin-top:-15px; margin-bottom:10px;">${entry.name}</p>`;
                if(entry.duration) sessionHtml += `<p style="font-size:0.9em; margin-top:-10px; margin-bottom:10px;">Duration: ${entry.duration} mins ⏱️</p>`;
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
        exerciseLibModal.style.display = 'flex';
        if (exerciseLibModalTitle) exerciseLibModalTitle.textContent = exercise ? "Edit Exercise Details ✏️" : "Add New Exercise to Library ➕";
        if (exercise) {
            if(exerciseLibIdInput) exerciseLibIdInput.value = exercise.id;
            if(exLibNameInput) exLibNameInput.value = exercise.name;
            if(exLibMuscleInput) exLibMuscleInput.value = exercise.primaryMuscle || "";
            if(exLibSecondaryMuscleInput) exLibSecondaryMuscleInput.value = exercise.secondaryMuscles || "";
            if(exLibEquipmentInput) exLibEquipmentInput.value = exercise.equipment || "";
            if(exLibInstructionsInput) exLibInstructionsInput.value = exercise.instructions || "";
            if(exLibVideoInput) exLibVideoInput.value = exercise.videoUrl || "";
        } else {
            if (exerciseLibForm) exerciseLibForm.reset();
            if(exerciseLibIdInput) exerciseLibIdInput.value = "";
        }
    }
    function hideExerciseLibModal() { if (exerciseLibModal) exerciseLibModal.style.display = 'none'; }

    function handleSaveExerciseToLib(event) {
        event.preventDefault();
        const id = exerciseLibIdInput.value;
        const name = exLibNameInput.value.trim();
        if (!name) { alert("Exercise name is required, pretty please! 🙏"); return; }
        const newExercise = {
            id: id || generateId(), name: name,
            primaryMuscle: exLibMuscleInput.value.trim(),
            secondaryMuscles: exLibSecondaryMuscleInput.value.trim(),
            equipment: exLibEquipmentInput.value.trim(),
            instructions: exLibInstructionsInput.value.trim(),
            videoUrl: exLibVideoInput.value.trim()
        };
        let exercises = getData(EXERCISES_STORAGE_KEY);
        if (id) { exercises = exercises.map(ex => ex.id === id ? newExercise : ex); }
        else { exercises.push(newExercise); }
        saveData(EXERCISES_STORAGE_KEY, exercises);
        alert(`Exercise "${name}" saved to library! Hooray! 📚`);
        hideExerciseLibModal();
        loadExerciseLibrary();
        populateExerciseSelectors();
        populateMuscleGroupFilter();
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
            exerciseLibraryListContainer.innerHTML = '<p>No exercises found or library is empty. Add some! 🧐</p>'; return;
        }
        exercises.forEach(ex => {
            const card = document.createElement('div');
            card.className = 'exercise-lib-card';
            card.innerHTML = `
                <h4>${ex.name} <i class="fas fa-info-circle exercise-info-icon" title="View Details"></i></h4>
                <p><strong>Muscle:</strong> ${ex.primaryMuscle || 'N/A'}</p>
                <p><strong>Equipment:</strong> ${ex.equipment || 'N/A'}</p>
                <div class="exercise-lib-actions">
                    <button class="edit-ex-lib-btn" data-id="${ex.id}" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="delete-ex-lib-btn" data-id="${ex.id}" title="Delete"><i class="fas fa-trash"></i></button>
                </div>`;
            // TODO: Clicking info icon or card could show full details in a modal/expanded view
            card.querySelector('.edit-ex-lib-btn').onclick = () => showExerciseLibModal(ex);
            card.querySelector('.delete-ex-lib-btn').onclick = () => deleteExerciseFromLib(ex.id, ex.name);
            exerciseLibraryListContainer.appendChild(card);
        });
    }
    function deleteExerciseFromLib(id, name) {
        if(!confirm(`Delete "${name}" from library? This won't affect past logs. Are you sure? 🤔`)) return;
        let exercises = getData(EXERCISES_STORAGE_KEY);
        exercises = exercises.filter(ex => ex.id !== id);
        saveData(EXERCISES_STORAGE_KEY, exercises);
        loadExerciseLibrary();
        populateExerciseSelectors();
        populateMuscleGroupFilter();
    }
    function populateMuscleGroupFilter() {
        if (!filterMuscleGroupSelect) return;
        const exercises = getData(EXERCISES_STORAGE_KEY);
        const muscleGroups = new Set(exercises.map(ex => ex.primaryMuscle).filter(Boolean).map(m => m.trim()).sort());
        const currentVal = filterMuscleGroupSelect.value;
        filterMuscleGroupSelect.innerHTML = '<option value="">All Muscle Groups 🎯</option>';
        muscleGroups.forEach(mg => {
            const option = document.createElement('option');
            option.value = mg; option.textContent = mg;
            filterMuscleGroupSelect.appendChild(option);
        });
        filterMuscleGroupSelect.value = currentVal;
    }
    function populateExerciseSelectors() {
        const exercises = getData(EXERCISES_STORAGE_KEY);
        const sortedExercises = [...exercises].sort((a,b) => a.name.localeCompare(b.name));

        if (commonExercisesDatalist) {
            commonExercisesDatalist.innerHTML = "";
            sortedExercises.forEach(ex => {
                const option = document.createElement('option'); option.value = ex.name;
                commonExercisesDatalist.appendChild(option);
            });
        }
        if (addExerciseToRoutineSelect) {
            const currentVal = addExerciseToRoutineSelect.value;
            addExerciseToRoutineSelect.innerHTML = '<option value="">-- Select Exercise to Add --</option>';
            sortedExercises.forEach(ex => {
                const option = document.createElement('option');
                option.value = ex.name; option.textContent = ex.name;
                addExerciseToRoutineSelect.appendChild(option);
            });
            addExerciseToRoutineSelect.value = currentVal;
        }
    }

    function prePopulateExerciseLibrary() {
        let exercises = getData(EXERCISES_STORAGE_KEY);
        if (exercises.length > 0) return; // Don't re-populate if library already has items

        const defaultExercises = [
            // Day 1 – Upper Push
            { name: "Barbell Bench Press", primaryMuscle: "Chest", secondaryMuscles: "Shoulders, Triceps", equipment: "Barbell" },
            { name: "Standing Overhead Press", primaryMuscle: "Shoulders", secondaryMuscles: "Triceps", equipment: "Barbell" },
            { name: "Close-Grip Bench Press", primaryMuscle: "Triceps", secondaryMuscles: "Chest", equipment: "Barbell" },
            { name: "Barbell Front Raise", primaryMuscle: "Shoulders", equipment: "Barbell" },
            { name: "Plate Raise", primaryMuscle: "Shoulders", equipment: "Plate" },
            { name: "Overhead Triceps Extension (Barbell)", primaryMuscle: "Triceps", equipment: "Barbell" },
            { name: "Overhead Triceps Extension (Plate)", primaryMuscle: "Triceps", equipment: "Plate" },
            // Day 2 – Lower Body
            { name: "Barbell Back Squat", primaryMuscle: "Quads", secondaryMuscles: "Glutes, Hamstrings", equipment: "Barbell" },
            { name: "Romanian Deadlift (RDL)", primaryMuscle: "Hamstrings", secondaryMuscles: "Glutes, Lower Back", equipment: "Barbell" },
            { name: "Walking Lunges", primaryMuscle: "Quads", secondaryMuscles: "Glutes", equipment: "Bodyweight/Dumbbell/Barbell" },
            { name: "Static Lunges", primaryMuscle: "Quads", secondaryMuscles: "Glutes", equipment: "Bodyweight/Dumbbell" },
            { name: "Paused Squat", primaryMuscle: "Quads", secondaryMuscles: "Glutes", equipment: "Barbell" },
            { name: "Calf Raises (Barbell)", primaryMuscle: "Calves", equipment: "Barbell" },
            { name: "Calf Raises (Holding Plates)", primaryMuscle: "Calves", equipment: "Plate" },
            // Day 3 – Upper Pull
            { name: "Barbell Bent-Over Rows", primaryMuscle: "Back", secondaryMuscles: "Biceps, Lats", equipment: "Barbell" },
            { name: "Deadlifts", primaryMuscle: "Back", secondaryMuscles: "Hamstrings, Glutes, Quads, Core", equipment: "Barbell" },
            { name: "Barbell Curls", primaryMuscle: "Biceps", equipment: "Barbell" },
            { name: "Shrugs (Barbell)", primaryMuscle: "Traps", equipment: "Barbell" },
            { name: "Reverse-Grip Rows (Underhand)", primaryMuscle: "Back", secondaryMuscles: "Biceps", equipment: "Barbell" },
            // Day 4 – Full-Body Growth & Power
            { name: "Front Squat", primaryMuscle: "Quads", secondaryMuscles: "Core, Glutes", equipment: "Barbell" },
            { name: "Incline Bench Press", primaryMuscle: "Chest", secondaryMuscles: "Shoulders, Triceps", equipment: "Barbell/Dumbbell" },
            // Overhead Press is already there
            { name: "Power Clean", primaryMuscle: "Full Body", secondaryMuscles: "Legs, Back, Shoulders", equipment: "Barbell" },
            // Barbell Curl & Close-Grip Bench Press already there
            // Common additions:
            { name: "Push-ups", primaryMuscle: "Chest", secondaryMuscles: "Shoulders, Triceps", equipment: "Bodyweight" },
            { name: "Pull-ups", primaryMuscle: "Back", secondaryMuscles: "Biceps, Lats", equipment: "Bodyweight/Pull-up bar" },
            { name: "Dips", primaryMuscle: "Triceps", secondaryMuscles: "Chest, Shoulders", equipment: "Dip Bars/Bench" },
            { name: "Plank", primaryMuscle: "Core", equipment: "Bodyweight"},
            { name: "Running", primaryMuscle: "Cardio", equipment: "N/A"},
            { name: "Cycling", primaryMuscle: "Cardio", secondaryMuscles: "Legs", equipment: "Bike"}
        ];

        const exercisesWithIds = defaultExercises.map(ex => ({ ...ex, id: generateId() }));
        saveData(EXERCISES_STORAGE_KEY, exercisesWithIds);
        console.log("Default exercises populated into library.");
    }

    function prePopulateRoutines() {
        let routines = getData(ROUTINES_STORAGE_KEY);
        if (routines.length > 0) return; // Don't re-populate

        const defaultRoutines = [
            { name: "🌸 Upper Push Day", description: "Chest, Shoulders, Triceps Focus!", exercises: [
                { name: "Barbell Bench Press", sets: "4", reps: "6-10", id: generateId() },
                { name: "Standing Overhead Press", sets: "4", reps: "6-10", id: generateId() },
                { name: "Close-Grip Bench Press", sets: "3", reps: "8-12", id: generateId() },
                { name: "Barbell Front Raise", sets: "3", reps: "12-15", id: generateId() },
                { name: "Overhead Triceps Extension (Barbell)", sets: "3", reps: "12-15", id: generateId() }
            ]},
            { name: "🦵 Leg Power Day", description: "Legs & Glutes Blast!", exercises: [
                { name: "Barbell Back Squat", sets: "4", reps: "6-10", id: generateId() },
                { name: "Romanian Deadlift (RDL)", sets: "3", reps: "8-12", id: generateId() },
                { name: "Walking Lunges", sets: "3", reps: "10-15 each", id: generateId() },
                { name: "Paused Squat", sets: "3", reps: "8", id: generateId() },
                { name: "Calf Raises (Barbell)", sets: "3", reps: "15-20", id: generateId() }
            ]},
             { name: "💪 Upper Pull Day", description: "Back, Biceps, Traps Time!", exercises: [
                { name: "Barbell Bent-Over Rows", sets: "4", reps: "6-10", id: generateId() },
                { name: "Deadlifts", sets: "3", reps: "5-8", id: generateId() },
                { name: "Barbell Curls", sets: "3", reps: "10-12", id: generateId() },
                { name: "Shrugs (Barbell)", sets: "3", reps: "12-15", id: generateId() },
                { name: "Reverse-Grip Rows (Underhand)", sets: "3", reps: "8-10", id: generateId() }
            ]},
            { name: "🌟 Full Body Growth", description: "Overall Power and Growth!", exercises: [
                { name: "Front Squat", sets: "3", reps: "6-8", id: generateId() },
                { name: "Incline Bench Press", sets: "4", reps: "8-10", id: generateId() },
                { name: "Standing Overhead Press", sets: "3", reps: "10", id: generateId()}, // Note: OHP is repeated here per your plan
                { name: "Power Clean", sets: "3", reps: "3-5", id: generateId()},
                { name: "Barbell Curls", sets: "3", reps: "12-15", id: generateId() }, // Note: Superset needs manual handling by user
                { name: "Close-Grip Bench Press", sets: "3", reps: "12-15", id: generateId() } // during workout
            ]}
        ];
        const routinesWithIds = defaultRoutines.map(r => ({ ...r, id: generateId() }));
        saveData(ROUTINES_STORAGE_KEY, routinesWithIds);
        console.log("Default routines populated.");
    }


    // --- Body Measurements Tab Logic ---
    if (logMeasurementForm) logMeasurementForm.addEventListener('submit', handleLogMeasurement);
    // if (progressPhotoUploadInput) progressPhotoUploadInput.addEventListener('change', handlePhotoUpload); // More complex

    function setDefaultMeasurementDate() { if (measurementDateInput) measurementDateInput.value = new Date().toISOString().split('T')[0]; }
    function handleLogMeasurement(event) {
        event.preventDefault();
        const measurement = {
            id: generateId(), date: measurementDateInput.value,
            weight: bodyWeightInput.value ? parseFloat(bodyWeightInput.value) : null,
            bodyFat: bodyFatInput.value ? parseFloat(bodyFatInput.value) : null,
            chest: chestSizeInput.value ? parseFloat(chestSizeInput.value) : null,
            waist: waistSizeInput.value ? parseFloat(waistSizeInput.value) : null,
            arm: armSizeInput.value ? parseFloat(armSizeInput.value) : null,
            thigh: thighSizeInput.value ? parseFloat(thighSizeInput.value) : null,
            notes: measurementNotesInput.value.trim()
        };
        if (!measurement.date) { alert("Date is required for measurements! 📅"); return; }
        let measurements = getData(MEASUREMENTS_STORAGE_KEY);
        measurements.push(measurement);
        measurements.sort((a,b) => new Date(b.date) - new Date(a.date));
        saveData(MEASUREMENTS_STORAGE_KEY, measurements);
        alert("Measurements logged! You're tracking it! 📏");
        logMeasurementForm.reset();
        setDefaultMeasurementDate();
        loadMeasurements();
    }
    function loadMeasurements() {
        if (!measurementHistoryListContainer) return;
        const measurements = getData(MEASUREMENTS_STORAGE_KEY);
        measurementHistoryListContainer.innerHTML = "";
        if(measurements.length === 0) {
            measurementHistoryListContainer.innerHTML = "<p>No measurements logged yet. Let's start! 💖</p>"; return;
        }
        // TODO: Display measurement history (table or cards) with edit/delete
        // TODO: Implement charts for measurements
        const list = document.createElement('ul');
        list.className = 'simple-history-list'; // Style this
        measurements.forEach(m => {
            const item = document.createElement('li');
            item.innerHTML = `<strong>${new Date(m.date+'T00:00:00').toLocaleDateString()}</strong>:
                Weight: ${m.weight || '-'} kg,
                Body Fat: ${m.bodyFat || '-'}%,
                Chest: ${m.chest || '-'} cm,
                Waist: ${m.waist || '-'} cm,
                Arm: ${m.arm || '-'} cm,
                Thigh: ${m.thigh || '-'} cm
                ${m.notes ? `<br><em>Notes: ${m.notes}</em>` : ''}`;
            list.appendChild(item);
        });
        measurementHistoryListContainer.appendChild(list);
        // loadProgressPhotos(); // Placeholder for photo display
        if (progressPhotosGallery) progressPhotosGallery.innerHTML = "<p>Photo gallery (display) coming soon! 📸</p>";

    }
    // TODO: Complex logic for handlePhotoUpload and loadProgressPhotos using IndexedDB or similar for actual image storage


    // --- Nutrition Tab Logic ---
    if (nutritionLogForm) nutritionLogForm.addEventListener('submit', handleLogNutrition);

    function setDefaultNutritionDate() { if (nutritionDateInput) nutritionDateInput.value = new Date().toISOString().split('T')[0]; }
    function handleLogNutrition(event) {
        event.preventDefault();
        const nutritionEntry = {
            id: generateId(), date: nutritionDateInput.value,
            kcalGoal: kcalGoalInput.value ? parseInt(kcalGoalInput.value) : null,
            kcalConsumed: kcalConsumedInput.value ? parseInt(kcalConsumedInput.value) : null,
            proteinGoal: proteinGoalInput.value ? parseInt(proteinGoalInput.value) : null,
            proteinConsumed: proteinConsumedInput.value ? parseInt(proteinConsumedInput.value) : null,
            carbsConsumed: carbsConsumedInput.value ? parseInt(carbsConsumedInput.value) : null,
            fatsConsumed: fatsConsumedInput.value ? parseInt(fatsConsumedInput.value) : null,
            notes: nutritionNotesInput.value.trim()
        };
        if (!nutritionEntry.date || nutritionEntry.kcalConsumed === null) { alert("Date and Kcal Consumed are required for nutrition log! 🍎"); return; }
        let nutritionData = getData(NUTRITION_STORAGE_KEY);
        // Check if entry for this date already exists, if so, offer to update
        const existingEntryIndex = nutritionData.findIndex(n => n.date === nutritionEntry.date);
        if (existingEntryIndex > -1) {
            if (confirm("Nutrition data for this date already exists. Overwrite? 🤔")) {
                nutritionData[existingEntryIndex] = nutritionEntry; // Update
            } else {
                return; // Do nothing if user cancels overwrite
            }
        } else {
            nutritionData.push(nutritionEntry);
        }
        nutritionData.sort((a,b) => new Date(b.date) - new Date(a.date));
        saveData(NUTRITION_STORAGE_KEY, nutritionData);
        alert("Nutrition logged! Fueling up! 🥗");
        nutritionLogForm.reset(); // Or just clear consumed fields
        setDefaultNutritionDate();
        loadNutritionData();
        loadDashboardData();
    }
    function loadNutritionData() {
        // TODO: Display nutrition history and summaries/charts
        const nutritionData = getData(NUTRITION_STORAGE_KEY);
        if (nutritionSummaryEl) {
            if(nutritionData.length === 0) {
                nutritionSummaryEl.innerHTML = "<p>No nutrition data logged yet. What did you eat today? 😋</p>";
            } else {
                // Basic display for now
                nutritionSummaryEl.innerHTML = "<h3>Recent Nutrition Entries:</h3><ul class='simple-history-list'>";
                nutritionData.slice(0,5).forEach(n => { // Show last 5
                    nutritionSummaryEl.innerHTML += `<li><strong>${new Date(n.date+'T00:00:00').toLocaleDateString()}</strong>:
                    ${n.kcalConsumed} Kcal / ${n.kcalGoal || '-'} Kcal Goal,
                    ${n.proteinConsumed}g Protein / ${n.proteinGoal || '-'}g Goal
                    </li>`;
                });
                nutritionSummaryEl.innerHTML += "</ul>";
            }
        }
    }

    // --- Initial Page Load Setup ---
    function initializeApp() {
        prePopulateExerciseLibrary(); // Populate library with defaults if empty
        prePopulateRoutines();      // Populate with default routines if empty

        setDefaultLogDate();
        setDefaultMeasurementDate();
        setDefaultNutritionDate();

        loadExerciseLibrary();
        populateMuscleGroupFilter();
        populateExerciseSelectors();

        loadRoutines();
        loadMeasurements();
        loadNutritionData();

        renderCalendar();
        renderWorkoutHistory();

        loadDashboardData();

        const firstTab = document.querySelector('.tab-link[data-tab="dashboardTab"]');
        if (firstTab) firstTab.click(); // Programmatically click to trigger all load functions for the tab
        else { // Fallback if dashboard tab isn't first
            const fallbackFirstTab = document.querySelector('.tab-link');
            if(fallbackFirstTab) fallbackFirstTab.click();
        }
    }

    initializeApp();
});
