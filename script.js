document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const bodyElement = document.body;

    function applyTheme(theme) {
        if (theme === 'light') {
            bodyElement.classList.add('theme-light'); bodyElement.classList.remove('theme-dark');
            if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            bodyElement.classList.remove('theme-light'); bodyElement.classList.add('theme-dark');
            if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    }
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme || 'dark');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            applyTheme(bodyElement.classList.contains('theme-light') ? 'dark' : 'light');
        });
    }

    // --- DOM Elements (Ensure all IDs match your HTML exactly) ---
    // Tabs
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Dashboard
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
    const dashUpNextWorkoutEl = document.getElementById('dash-up-next-workout'); // Placeholder
    const dashGreetingEl = document.getElementById('dash-greeting'); // ✨ New

    // Log Workout
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
    const workoutTimerDisplay = document.getElementById('workout-timer-display');
    const startTimerBtn = document.getElementById('start-timer-btn');
    const stopTimerBtn = document.getElementById('stop-timer-btn');
    const resetTimerBtn = document.getElementById('reset-timer-btn');

    // Routines
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

    // History
    const workoutHistoryContainer = document.getElementById('workout-history-container');
    const prevMonthBtn = document.getElementById('prev-month-btn'); // CRITICAL: Check this ID in HTML
    const nextMonthBtn = document.getElementById('next-month-btn'); // CRITICAL: Check this ID in HTML
    const calendarMonthYearDisplay = document.getElementById('calendar-month-year');
    const calendarGridContainer = document.getElementById('calendar-grid-container');

    // Exercise Library
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

    // Measurements
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
    // const progressPhotoUploadInput = document.getElementById('progress-photo-upload'); // Complex
    // const progressPhotosGallery = document.getElementById('progress-photos-gallery'); // Complex

    // Nutrition
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


    // --- Global State --- (as before)
    let activeWorkoutLog = [];
    let currentSessionDate = null;
    let currentCalendarDate = new Date();
    let editingRoutineId = null;
    let currentRoutineExercisesData = [];
    let workoutTimerInterval = null;
    let workoutTimerSeconds = 0;
    let userSettings = {};

    // --- LOCALSTORAGE KEYS --- (as before)
    const WORKOUT_STORAGE_KEY = 'cuteTrackerV3_workouts'; // Incremented version for safety
    const ROUTINES_STORAGE_KEY = 'cuteTrackerV3_routines';
    const EXERCISES_STORAGE_KEY = 'cuteTrackerV3_exercises';
    const MEASUREMENTS_STORAGE_KEY = 'cuteTrackerV3_measurements';
    const NUTRITION_STORAGE_KEY = 'cuteTrackerV3_nutrition';
    const SETTINGS_STORAGE_KEY = 'cuteTrackerV3_settings';

    // --- Utility & LocalStorage Helpers --- (as before)
    function generateId() { return Date.now().toString(36) + Math.random().toString(36).substr(2, 5); }
    function getData(key, defaultValue = []) { const data = localStorage.getItem(key); try { return data ? JSON.parse(data) : defaultValue; } catch (e) { console.error(`Error parsing ${key}:`, e); return defaultValue; } }
    function saveData(key, data) { try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) { console.error(`Error saving ${key}:`, e); } }

    // --- User Settings ---
    function loadUserSettings() {
        userSettings = getData(SETTINGS_STORAGE_KEY, {
            userName: "Fitness Star", // ✨ New
            weightUnit: 'kg', measurementUnit: 'cm', defaultKcalGoal: 2500,
            defaultProteinGoal: 150, smartDefaults: true, showConfetti: true // ✨ New
        });
        document.querySelectorAll('#user-weight-unit').forEach(el => el.textContent = userSettings.weightUnit);
        document.querySelectorAll('#user-measurement-unit').forEach(el => el.textContent = userSettings.measurementUnit);
        if(kcalGoalInput && !kcalGoalInput.value) kcalGoalInput.value = userSettings.defaultKcalGoal;
        if(proteinGoalInput && !proteinGoalInput.value) proteinGoalInput.value = userSettings.defaultProteinGoal;
    }
    // function saveUserSettings() { saveData(SETTINGS_STORAGE_KEY, userSettings); loadUserSettings(); } // For a settings UI


    // --- Tab Navigation Logic --- (as before, with specific tab load calls)
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            tab.classList.add('active');
            const targetTabId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) targetContent.classList.add('active');

            // Call specific load/render functions for the activated tab
            if (targetTabId === "dashboardTab") loadDashboardData();
            else if (targetTabId === "historyTab") { renderCalendar(); renderWorkoutHistory(); }
            else if (targetTabId === "routinesTab") { loadRoutines(); hideRoutineForm(); }
            else if (targetTabId === "exercisesTab") { loadExerciseLibrary(); populateMuscleGroupFilter(); populateExerciseSelectors(); }
            else if (targetTabId === "measurementsTab") { loadMeasurements(); setDefaultMeasurementDate(); }
            else if (targetTabId === "nutritionTab") { loadNutritionData(); setDefaultNutritionDate(); }
        });
    });
    function switchTab(tabId) { const tabButton = document.querySelector(`.tab-link[data-tab="${tabId}"]`); if (tabButton) tabButton.click(); }

    // --- Workout Timer Logic --- (as before)
    function formatTime(totalSeconds) { /* ... */ const h = Math.floor(totalSeconds / 3600), m = Math.floor((totalSeconds % 3600) / 60), s = totalSeconds % 60; let ts = ""; if (h > 0) ts += `${String(h).padStart(2, '0')}:`; ts += `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`; return ts;}
    if (workoutTimerDisplay) workoutTimerDisplay.textContent = formatTime(0);
    if (startTimerBtn) startTimerBtn.onclick = () => { if (workoutTimerInterval) return; startTimerBtn.disabled = true; if(stopTimerBtn) stopTimerBtn.disabled = false; workoutTimerInterval = setInterval(() => { workoutTimerSeconds++; if (workoutTimerDisplay) workoutTimerDisplay.textContent = formatTime(workoutTimerSeconds); }, 1000);};
    if (stopTimerBtn) stopTimerBtn.onclick = () => { clearInterval(workoutTimerInterval); workoutTimerInterval = null; if(startTimerBtn) startTimerBtn.disabled = false; if(stopTimerBtn) stopTimerBtn.disabled = true; if(workoutDurationInput && workoutTimerSeconds > 0) workoutDurationInput.value = Math.round(workoutTimerSeconds / 60);};
    if (resetTimerBtn) resetTimerBtn.onclick = () => { clearInterval(workoutTimerInterval); workoutTimerInterval = null; workoutTimerSeconds = 0; if (workoutTimerDisplay) workoutTimerDisplay.textContent = formatTime(0); if(startTimerBtn) startTimerBtn.disabled = false; if(stopTimerBtn) stopTimerBtn.disabled = true;};

    // --- Dashboard Logic ---
    function loadDashboardData() {
        if (dashboardDateEl) dashboardDateEl.textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        if (dashGreetingEl) { // ✨ Dynamic Greeting
            const hour = new Date().getHours();
            let greeting = "Hello";
            if (hour < 12) greeting = "Good Morning"; else if (hour < 18) greeting = "Good Afternoon"; else greeting = "Good Evening";
            dashGreetingEl.textContent = `${greeting}, ${userSettings.userName}! ☀️`;
        }

        const todayStr = new Date().toISOString().split('T')[0];
        const workouts = getData(WORKOUT_STORAGE_KEY);
        const todayEntry = workouts.find(w => w.date === todayStr);
        if (dashWorkoutStatusEl) { /* ... as before ... */ }

        const nutritionData = getData(NUTRITION_STORAGE_KEY);
        const todayNutrition = nutritionData.find(n => n.date === todayStr);
        if (todayNutrition) {
            if (dashKcalConsumedEl) dashKcalConsumedEl.textContent = todayNutrition.kcalConsumed || 0;
            if (dashKcalGoalEl) dashKcalGoalEl.textContent = todayNutrition.kcalGoal || userSettings.defaultKcalGoal;
            if (dashProteinConsumedEl) dashProteinConsumedEl.textContent = todayNutrition.proteinConsumed || 0;
            if (dashProteinGoalEl) dashProteinGoalEl.textContent = todayNutrition.proteinGoal || userSettings.defaultProteinGoal;
            // ✨ Basic Progress Bar for Nutrition (Conceptual)
            // const kcalProgress = Math.min(100, ((todayNutrition.kcalConsumed || 0) / (todayNutrition.kcalGoal || userSettings.defaultKcalGoal)) * 100);
            // document.getElementById('kcal-progress-bar').style.width = `${kcalProgress}%`; // Requires HTML for progress bar
        } else { /* ... set defaults ... */ }

        // Streak and Last workout (as before)
        // ...

        const quotes = ["Believe in your #selfie! 🤳", "You're stronger than you think! ✨", "Every rep counts! 💖", "Make today awesome! 🌟", "Be your own hero! 🦸‍♀️", "Progress, not perfection! 🚀"];
        if (dashMotivationQuoteEl) dashMotivationQuoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];

        populateQuickStartWorkouts();
        // Dashboard button event listeners
        const dashButtons = {
            'dash-log-workout-btn': () => switchTab('logWorkoutTab'),
            'dash-start-routine-btn': () => { switchTab('routinesTab'); /* TODO: Prompt to select routine */ },
            'dash-log-rest-day-btn': () => { logRestDayPrompt(new Date().toISOString().split('T')[0]); },
            'dash-log-nutrition-btn': () => switchTab('nutritionTab'),
            'dash-log-measurement-btn': () => switchTab('measurementsTab')
        };
        for (const btnId in dashButtons) {
            const btn = document.getElementById(btnId);
            if (btn) btn.onclick = dashButtons[btnId];
        }
    }
    function populateQuickStartWorkouts() { /* ... as before ... */ }


    // --- Log Workout/Session Tab Logic ---
    // ... (setDefaultLogDate, exerciseForm submit listener, addExerciseToCurrentLogDOM as per previous "streamlined" version) ...
    // ... (finishWorkoutBtn listener as per previous "streamlined" version, including confetti placeholder) ...
    // ... (resetLogFormAndSession, logRestDayPrompt as before) ...
    // Make sure to use `activeWorkoutLog` for current session data.
    // `findLastPerformance` helper for smart defaults (as before).

    // --- Routines Tab Logic ---
    // ... (showRoutineForm, hideRoutineForm, addExerciseToCurrentRoutineData, renderCurrentRoutineExercisesDOM, handleSaveRoutine, loadRoutines, deleteRoutine, startWorkoutFromRoutine as per previous "streamlined" version) ...

    // --- History Tab Logic (Calendar & Session List) ---
    function renderCalendar() {
        // ... (Full calendar logic as before, including tooltip functions) ...
        // This is where the check for prevMonthBtn and nextMonthBtn being defined is crucial.
        // The elements must exist in HTML.
        if (!calendarGridContainer || !calendarMonthYearDisplay) {
            console.warn("Calendar elements not found, skipping calendar render.");
            return;
        }
        // ... rest of calendar rendering
    }
    // Calendar Tooltip Functions (as before)
    let calendarTooltip;
    function showCalendarTooltip(event, entries) { /* ... */ }
    function hideCalendarTooltip() { /* ... */ }

    // Ensure these event listeners are only added if buttons exist
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1); renderCalendar(); });
    } else {
        console.warn("prevMonthBtn not found in History tab HTML.");
    }
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1); renderCalendar(); });
    } else {
        console.warn("nextMonthBtn not found in History tab HTML.");
    }

    function renderWorkoutHistory() { /* ... (as before, parsing new log structure) ... */ }

    // --- Exercise Library Tab Logic ---
    // ... (showExerciseLibModal, hideExerciseLibModal, handleSaveExerciseToLib, loadExerciseLibrary, deleteExerciseFromLib, populateMuscleGroupFilter, populateExerciseSelectors as before) ...
    // ✨ Placeholder: Inside loadExerciseLibrary, for each card:
    // card.innerHTML += `<div class="exercise-last-logged">Last: 100kg x 5 (placeholder)</div>`;
    function prePopulateExerciseLibrary() { /* ... (as before, with your exercises) ... */ }
    function prePopulateRoutines() { /* ... (as before, with your 4 routines) ... */ }


    // --- Body Measurements Tab Logic --- (as before)
    // ... (setDefaultMeasurementDate, handleLogMeasurement, loadMeasurements) ...
    // ... (Photo upload is still complex for localStorage) ...

    // --- Nutrition Tab Logic --- (as before)
    // ... (setDefaultNutritionDate, handleLogNutrition, loadNutritionData) ...

    // --- Initial Page Load Setup ---
    function initializeApp() {
        console.log("🚀 Initializing Cute Workout Buddy! 🌸");
        loadUserSettings(); // Load settings first

        prePopulateExerciseLibrary();
        prePopulateRoutines();

        setDefaultLogDate();
        setDefaultMeasurementDate();
        setDefaultNutritionDate();

        loadExerciseLibrary();
        populateMuscleGroupFilter();
        populateExerciseSelectors();

        loadRoutines();
        loadMeasurements();
        loadNutritionData();

        // Render history elements only if on history tab or if it's the default
        // The tab switching logic will handle calls for other tabs.
        // renderCalendar(); // Called by tab switcher if history is active
        // renderWorkoutHistory(); // Called by tab switcher

        loadDashboardData(); // Load dashboard, which might be the default active

        // Ensure default active tab is correctly set and its content loaded
        const activeTabLink = document.querySelector('.tab-link.active');
        if (activeTabLink) {
            const activeTabId = activeTabLink.getAttribute('data-tab');
            // Manually trigger the load function for the initially active tab
            // This ensures its content is ready if it's not the dashboard.
            if (activeTabId === "historyTab") { renderCalendar(); renderWorkoutHistory(); }
            else if (activeTabId === "routinesTab") { loadRoutines(); hideRoutineForm(); }
            // ... and so on for other tabs if they could be default.
        } else { // Fallback if no tab is marked active in HTML
            const firstTab = document.querySelector('.tab-link[data-tab="dashboardTab"]');
            if (firstTab) firstTab.click();
        }
         console.log("🎉 App Initialized! Let's get fit! ✨");
    }

    initializeApp();
});
