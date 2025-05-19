document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const bodyElement = document.body;

    function applyTheme(theme) {
        if (theme === 'light') {
            bodyElement.classList.add('theme-light'); bodyElement.classList.remove('theme-dark');
            if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', theme);
        } else { // Default to dark
            bodyElement.classList.remove('theme-light'); bodyElement.classList.add('theme-dark');
            if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    }
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme || 'dark'); // Apply saved theme or default to dark

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const newTheme = bodyElement.classList.contains('theme-light') ? 'dark' : 'light';
            applyTheme(newTheme);
            // ✨ Re-render elements that might have theme-dependent styles if not purely CSS
        });
    }

    // --- DOM Elements (Ensure all IDs match your HTML exactly) ---
    // (Copied from previous, assuming they are correct in your HTML)
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
    const dashUpNextWorkoutEl = document.getElementById('dash-up-next-workout');
    const dashGreetingEl = document.getElementById('dash-greeting');
    const kcalProgressBar = document.getElementById('kcal-progress-bar');
    const proteinProgressBar = document.getElementById('protein-progress-bar');
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
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
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
    const exLibImageInput = document.getElementById('ex-lib-image'); // For Exercise Image URL
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
    // const progressPhotoUploadInput = document.getElementById('progress-photo-upload');
    // const progressPhotosGallery = document.getElementById('progress-photos-gallery');
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
    // Settings (If uncommented in HTML and tab button added)
    const settingsForm = document.getElementById('user-settings-form');
    const settingUserNameInput = document.getElementById('setting-user-name');
    const settingWeightUnitSelect = document.getElementById('setting-weight-unit');
    const settingMeasureUnitSelect = document.getElementById('setting-measure-unit');
    const settingKcalGoalInput = document.getElementById('setting-kcal-goal');
    const settingProteinGoalInput = document.getElementById('setting-protein-goal');
    const settingSmartDefaultsCheckbox = document.getElementById('setting-smart-defaults');
    const settingShowConfettiCheckbox = document.getElementById('setting-show-confetti');
    const exportDataBtn = document.getElementById('export-data-btn');
    const importDataFile = document.getElementById('import-data-file');
    const importDataBtnAction = document.getElementById('import-data-btn-action');
    const clearAllDataBtn = document.getElementById('clear-all-data-btn');


    // --- Global State ---
    let activeWorkoutLog = [];
    let currentSessionDate = null;
    let currentCalendarDate = new Date();
    let editingRoutineId = null;
    let currentRoutineExercisesData = [];
    let workoutTimerInterval = null;
    let workoutTimerSeconds = 0;
    let userSettings = {}; // Loaded by loadUserSettings()

    // --- LOCALSTORAGE KEYS ---
    const WORKOUT_STORAGE_KEY = 'cuteTrackerV4_workouts'; // Versioning keys can help with schema changes
    const ROUTINES_STORAGE_KEY = 'cuteTrackerV4_routines';
    const EXERCISES_STORAGE_KEY = 'cuteTrackerV4_exercises';
    const MEASUREMENTS_STORAGE_KEY = 'cuteTrackerV4_measurements';
    const NUTRITION_STORAGE_KEY = 'cuteTrackerV4_nutrition';
    const SETTINGS_STORAGE_KEY = 'cuteTrackerV4_settings';

    // --- Utility & LocalStorage Helper Functions ---
    function generateId() { return Date.now().toString(36) + Math.random().toString(36).substring(2, 7); }
    function getData(key, defaultValue = []) { const data = localStorage.getItem(key); try { return data ? JSON.parse(data) : defaultValue; } catch (e) { console.error(`Error parsing ${key}: ${e.message}`); return defaultValue; } }
    function saveData(key, data) { try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) { console.error(`Error saving ${key}: ${e.message}. Data might be too large for localStorage.`); if (e.name === 'QuotaExceededError') alert("😥 Oh no! We're out of space to save your data. Try clearing some old history or export your data.");}}


    // --- User Settings ---
    function loadUserSettings() {
        userSettings = getData(SETTINGS_STORAGE_KEY, {
            userName: "Fitness Star", weightUnit: 'kg', measurementUnit: 'cm',
            defaultKcalGoal: 2500, defaultProteinGoal: 150, smartDefaults: true, showConfetti: true
        });
        // Apply to UI (e.g., unit spans, default form values)
        document.querySelectorAll('#user-weight-unit').forEach(el => el.textContent = userSettings.weightUnit);
        document.querySelectorAll('#user-measurement-unit').forEach(el => el.textContent = userSettings.measurementUnit);

        if (kcalGoalInput && (kcalGoalInput.value === "" || kcalGoalInput.value === "2500")) kcalGoalInput.value = userSettings.defaultKcalGoal; // Only set if empty or default
        if (proteinGoalInput && (proteinGoalInput.value === "" || proteinGoalInput.value === "150")) proteinGoalInput.value = userSettings.defaultProteinGoal;

        // Populate settings form if it exists
        if(settingUserNameInput) settingUserNameInput.value = userSettings.userName;
        if(settingWeightUnitSelect) settingWeightUnitSelect.value = userSettings.weightUnit;
        if(settingMeasureUnitSelect) settingMeasureUnitSelect.value = userSettings.measurementUnit;
        if(settingKcalGoalInput) settingKcalGoalInput.value = userSettings.defaultKcalGoal;
        if(settingProteinGoalInput) settingProteinGoalInput.value = userSettings.defaultProteinGoal;
        if(settingSmartDefaultsCheckbox) settingSmartDefaultsCheckbox.checked = userSettings.smartDefaults;
        if(settingShowConfettiCheckbox) settingShowConfettiCheckbox.checked = userSettings.showConfetti;
    }
    function saveUserSettings() {
        // Called when settings form is submitted
        if(settingUserNameInput) userSettings.userName = settingUserNameInput.value.trim() || "Fitness Star";
        if(settingWeightUnitSelect) userSettings.weightUnit = settingWeightUnitSelect.value;
        if(settingMeasureUnitSelect) userSettings.measurementUnit = settingMeasureUnitSelect.value;
        if(settingKcalGoalInput) userSettings.defaultKcalGoal = parseInt(settingKcalGoalInput.value) || 2500;
        if(settingProteinGoalInput) userSettings.defaultProteinGoal = parseInt(settingProteinGoalInput.value) || 150;
        if(settingSmartDefaultsCheckbox) userSettings.smartDefaults = settingSmartDefaultsCheckbox.checked;
        if(settingShowConfettiCheckbox) userSettings.showConfetti = settingShowConfettiCheckbox.checked;

        saveData(SETTINGS_STORAGE_KEY, userSettings);
        loadUserSettings(); // Re-apply to ensure UI reflects changes
        loadDashboardData(); // Refresh dashboard as goals might have changed
        alert("Settings saved! ✨");
    }
    if(settingsForm) settingsForm.addEventListener('submit', (e) => { e.preventDefault(); saveUserSettings(); });

    // --- Data Management (Settings Tab) ---
    if(exportDataBtn) exportDataBtn.addEventListener('click', () => {
        const allData = {
            workouts: getData(WORKOUT_STORAGE_KEY),
            routines: getData(ROUTINES_STORAGE_KEY),
            exercises: getData(EXERCISES_STORAGE_KEY),
            measurements: getData(MEASUREMENTS_STORAGE_KEY),
            nutrition: getData(NUTRITION_STORAGE_KEY),
            settings: userSettings
        };
        const jsonString = JSON.stringify(allData, null, 2);
        const blob = new Blob([jsonString], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `workout_buddy_data_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert("Data exported! Keep it safe! 💾");
    });

    if(importDataBtnAction && importDataFile) importDataBtnAction.addEventListener('click', () => {
        if(!importDataFile.files || importDataFile.files.length === 0) {
            alert("Please select a JSON file to import. 📁"); return;
        }
        const file = importDataFile.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedAllData = JSON.parse(event.target.result);
                if (confirm("This will overwrite existing data. Are you sure you want to import? 😮")) {
                    if(importedAllData.workouts) saveData(WORKOUT_STORAGE_KEY, importedAllData.workouts);
                    if(importedAllData.routines) saveData(ROUTINES_STORAGE_KEY, importedAllData.routines);
                    if(importedAllData.exercises) saveData(EXERCISES_STORAGE_KEY, importedAllData.exercises);
                    if(importedAllData.measurements) saveData(MEASUREMENTS_STORAGE_KEY, importedAllData.measurements);
                    if(importedAllData.nutrition) saveData(NUTRITION_STORAGE_KEY, importedAllData.nutrition);
                    if(importedAllData.settings) saveData(SETTINGS_STORAGE_KEY, importedAllData.settings);
                    alert("Data imported successfully! Refreshing app... 🔄");
                    initializeApp(); // Re-initialize to reflect imported data
                }
            } catch (err) {
                alert("Error importing file. It might not be a valid JSON backup. 😥");
                console.error("Import error:", err);
            }
        };
        reader.readAsText(file);
    });

    if(clearAllDataBtn) clearAllDataBtn.addEventListener('click', () => {
        if(confirm("🚨 DANGER! 🚨 Are you ABSOLUTELY sure you want to delete ALL your data? This cannot be undone!")) {
            if(confirm("FINAL WARNING! Seriously, all progress, routines, everything will be GONE. Still proceed? 😱")) {
                localStorage.removeItem(WORKOUT_STORAGE_KEY);
                localStorage.removeItem(ROUTINES_STORAGE_KEY);
                localStorage.removeItem(EXERCISES_STORAGE_KEY);
                localStorage.removeItem(MEASUREMENTS_STORAGE_KEY);
                localStorage.removeItem(NUTRITION_STORAGE_KEY);
                localStorage.removeItem(SETTINGS_STORAGE_KEY); // Also clear settings
                alert("All data cleared. It's a fresh start! 🌱");
                initializeApp(); // Re-initialize app
            }
        }
    });


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
            else if (targetTabId === "historyTab") { renderCalendar(); renderWorkoutHistory(); }
            else if (targetTabId === "routinesTab") { loadRoutines(); hideRoutineForm(); }
            else if (targetTabId === "exercisesTab") { loadExerciseLibrary(); populateMuscleGroupFilter(); populateExerciseSelectors(); }
            else if (targetTabId === "measurementsTab") { loadMeasurements(); setDefaultMeasurementDate(); }
            else if (targetTabId === "nutritionTab") { loadNutritionData(); setDefaultNutritionDate(); }
            else if (targetTabId === "settingsTab") { loadUserSettings(); /* Load current settings into form */ }
        });
    });
    function switchTab(tabId) { const tabButton = document.querySelector(`.tab-link[data-tab="${tabId}"]`); if (tabButton) tabButton.click(); }


    // --- Workout Timer Logic --- (as before, with checks for element existence)
    function formatTime(totalSeconds) { const h = Math.floor(totalSeconds / 3600), m = Math.floor((totalSeconds % 3600) / 60), s = totalSeconds % 60; let ts = ""; if (h > 0) ts += `${String(h).padStart(2, '0')}:`; ts += `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`; return ts;}
    if (workoutTimerDisplay) workoutTimerDisplay.textContent = formatTime(0);
    if (startTimerBtn) startTimerBtn.addEventListener('click', () => { if (workoutTimerInterval) return; startTimerBtn.disabled = true; if(stopTimerBtn) stopTimerBtn.disabled = false; workoutTimerInterval = setInterval(() => { workoutTimerSeconds++; if (workoutTimerDisplay) workoutTimerDisplay.textContent = formatTime(workoutTimerSeconds); }, 1000);});
    if (stopTimerBtn) stopTimerBtn.addEventListener('click', () => { clearInterval(workoutTimerInterval); workoutTimerInterval = null; if(startTimerBtn) startTimerBtn.disabled = false; if(stopTimerBtn) stopTimerBtn.disabled = true; if(workoutDurationInput && workoutTimerSeconds > 0 && !workoutDurationInput.value) workoutDurationInput.value = Math.round(workoutTimerSeconds / 60);});
    if (resetTimerBtn) resetTimerBtn.addEventListener('click', () => { clearInterval(workoutTimerInterval); workoutTimerInterval = null; workoutTimerSeconds = 0; if (workoutTimerDisplay) workoutTimerDisplay.textContent = formatTime(0); if(startTimerBtn) startTimerBtn.disabled = false; if(stopTimerBtn) stopTimerBtn.disabled = true;});


    // --- Dashboard Logic ---
    function loadDashboardData() {
        if (dashboardDateEl) dashboardDateEl.textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        if (dashGreetingEl) { const hour = new Date().getHours(); let greeting = "Hello"; if (hour < 12) greeting = "Good Morning ☀️"; else if (hour < 18) greeting = "Good Afternoon 🌻"; else greeting = "Good Evening 🌙"; dashGreetingEl.textContent = `${greeting}, ${userSettings.userName}!`; }
        const todayStr = new Date().toISOString().split('T')[0];
        const workouts = getData(WORKOUT_STORAGE_KEY);
        const todayEntry = workouts.find(w => w.date === todayStr);
        if (dashWorkoutStatusEl) { if (todayEntry && todayEntry.type === "WORKOUT") dashWorkoutStatusEl.textContent = `Completed: ${todayEntry.name || 'Workout'} 💪`; else if (todayEntry && todayEntry.type === "REST_DAY") dashWorkoutStatusEl.textContent = "Rest Day Logged 😴"; else dashWorkoutStatusEl.textContent = "Not Logged Yet 🤔"; }

        const nutritionData = getData(NUTRITION_STORAGE_KEY);
        const todayNutrition = nutritionData.find(n => n.date === todayStr);
        let kcalC = 0, kcalG = userSettings.defaultKcalGoal, protC = 0, protG = userSettings.defaultProteinGoal;
        if (todayNutrition) {
            kcalC = todayNutrition.kcalConsumed || 0; kcalG = todayNutrition.kcalGoal || userSettings.defaultKcalGoal;
            protC = todayNutrition.proteinConsumed || 0; protG = todayNutrition.proteinGoal || userSettings.defaultProteinGoal;
        }
        if (dashKcalConsumedEl) dashKcalConsumedEl.textContent = kcalC;
        if (dashKcalGoalEl) dashKcalGoalEl.textContent = kcalG;
        if (dashProteinConsumedEl) dashProteinConsumedEl.textContent = protC;
        if (dashProteinGoalEl) dashProteinGoalEl.textContent = protG;
        if (kcalProgressBar) kcalProgressBar.style.width = `${Math.min(100, (kcalC / (kcalG || 1)) * 100)}%`; // Avoid division by zero
        if (proteinProgressBar) proteinProgressBar.style.width = `${Math.min(100, (protC / (protG || 1)) * 100)}%`;

        let streak = 0; let currentDateIter = new Date();
        for (let i = 0; i < 365; i++) { const dateStr = currentDateIter.toISOString().split('T')[0]; if (workouts.some(w => w.date === dateStr)) { streak++; currentDateIter.setDate(currentDateIter.getDate() - 1); } else { break; } }
        if (dashWorkoutStreakEl) dashWorkoutStreakEl.textContent = `${streak} days 🔥`;
        const workoutsOnly = workouts.filter(w => w.type === "WORKOUT");
        const lastWorkout = workoutsOnly.length > 0 ? workoutsOnly.sort((a,b) => new Date(b.date) - new Date(a.date))[0] : null;
        if (dashLastWorkoutInfoEl) dashLastWorkoutInfoEl.textContent = lastWorkout ? `on ${new Date(lastWorkout.date+'T00:00:00').toLocaleDateString()}: "${lastWorkout.name}"` : "Never 😲";

        if (dashUpNextWorkoutEl) {
            let upNextText = "Time for another great workout! 🚀";
            if(lastWorkout) {
                const routines = getData(ROUTINES_STORAGE_KEY);
                if(routines.length > 0) {
                    const lastRoutineIndex = routines.findIndex(r => r.name === lastWorkout.name);
                    if(lastRoutineIndex > -1) {
                        const nextRoutine = routines[(lastRoutineIndex + 1) % routines.length];
                        upNextText = `Maybe try "${nextRoutine.name}" today? 😉`;
                    } else { // Last workout was custom
                         upNextText = `How about starting with "${routines[0].name}" today? ✨`;
                    }
                }
            } else if (getData(ROUTINES_STORAGE_KEY).length > 0) {
                 upNextText = `Ready for your first workout? Try "${getData(ROUTINES_STORAGE_KEY)[0].name}"! 🎉`;
            }
            dashUpNextWorkoutEl.textContent = upNextText;
        }
        const quotes = ["Believe in your #selfie! 🤳", "You're stronger than you think! ✨", "Every rep counts! 💖", "Make today awesome! 🌟", "Be your own hero! 🦸‍♀️", "Progress, not perfection! 🚀", "One day or day one. You decide. 🎯"];
        if (dashMotivationQuoteEl) dashMotivationQuoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
        populateQuickStartWorkouts();
        // Dashboard button event listeners
        const dashButtons = { 'dash-log-workout-btn': () => switchTab('logWorkoutTab'), 'dash-start-routine-btn': () => switchTab('routinesTab'), 'dash-log-rest-day-btn': () => { logRestDayPrompt(new Date().toISOString().split('T')[0]); }, 'dash-log-nutrition-btn': () => switchTab('nutritionTab'), 'dash-log-measurement-btn': () => switchTab('measurementsTab') };
        for (const btnId in dashButtons) { const btn = document.getElementById(btnId); if (btn) btn.onclick = dashButtons[btnId]; }
    }
    function populateQuickStartWorkouts() { /* ... as before ... */ }


    // --- Log Workout/Session Tab Logic --- (Using activeWorkoutLog for interactive logging)
    // ... (setDefaultLogDate as before) ...
    // ... (exerciseForm 'submit' listener for one-off exercises, using renderActiveWorkoutLogDOM, as before) ...
    // ... (renderActiveWorkoutLogDOM with smart defaults using findLastPerformance, as before) ...
    // ... (findLastPerformance helper function, as before) ...
    // ... (finishWorkoutBtn 'click' listener using activeWorkoutLog, processing sets, confetti, timer reset, as before) ...
    // ... (resetLogFormAndSession, as before) ...
    // ... (logRestDayPrompt, as before) ...

    // --- Routines Tab Logic ---
    // ... (showRoutineForm, hideRoutineForm, addExerciseToCurrentRoutineData, renderCurrentRoutineExercisesDOM, handleSaveRoutine, loadRoutines, deleteRoutine, startWorkoutFromRoutine as before) ...

    // --- History Tab Logic ---
    // ... (renderCalendar with tooltip functions, renderWorkoutHistory as before) ...
    // Ensure prevMonthBtn and nextMonthBtn listeners are correctly set up (done in ATTACH EVENT LISTENERS section now)

    // --- Exercise Library Tab Logic ---
    // ... (showExerciseLibModal, hideExerciseLibModal, handleSaveExerciseToLib, loadExerciseLibrary, deleteExerciseFromLib, populateMuscleGroupFilter, populateExerciseSelectors as before) ...
    // ✨ In loadExerciseLibrary, to show image:
    // card.innerHTML = `
    //    ${ex.imageUrl ? `<img src="${ex.imageUrl}" alt="${ex.name}" class="exercise-lib-img">` : '<div class="exercise-lib-image-placeholder"><i class="fas fa-image"></i></div>'}
    //    <h4>${ex.name} ... </h4> ...`;
    // (Needs CSS for .exercise-lib-img)
    function prePopulateExerciseLibrary() { /* ... as before ... */ }
    function prePopulateRoutines() { /* ... as before ... */ }


    // --- Body Measurements Tab Logic --- (as before)
    // ... (setDefaultMeasurementDate, handleLogMeasurement, loadMeasurements) ...

    // --- Nutrition Tab Logic --- (as before)
    // ... (setDefaultNutritionDate, handleLogNutrition, loadNutritionData) ...


    // --- ATTACH ALL STATIC EVENT LISTENERS (after all functions are defined) ---
    // This section consolidates event listener attachments for elements that exist on page load.
    // Dynamic elements (like delete buttons in lists) have listeners attached when they are created.

    // Theme
    // (Theme toggle button listener is at the very top, which is fine as it's simple and self-contained)

    // Dashboard Buttons (listeners are attached within loadDashboardData as they are part of its UI update)

    // Log Workout Controls
    if(exerciseForm) exerciseForm.addEventListener('submit', function(event) { /* ... full logic ... */ });
    if(finishWorkoutBtn) finishWorkoutBtn.addEventListener('click', function() { /* ... full logic ... */ });
    if(logRestDayBtnMain) logRestDayBtnMain.addEventListener('click', () => logRestDayPrompt());
    if(startFromRoutineActualBtn) startFromRoutineActualBtn.addEventListener('click', () => {
        const routines = getData(ROUTINES_STORAGE_KEY);
        if (routines.length > 0) {
            // TODO: Implement a proper routine selection UI here
            alert("Feature Coming Soon! For now, please start routines from the Dashboard or 'My Routines' tab. 😊");
            // Example: startWorkoutFromRoutine(routines[0].id); // Placeholder: starts first routine
        } else {
            alert("No routines available. Please create one first! 💖");
            switchTab('routinesTab');
        }
    });

    // Routines Tab Controls
    if (createNewRoutineBtn) createNewRoutineBtn.addEventListener('click', () => showRoutineForm());
    if (cancelRoutineEditBtn) cancelRoutineEditBtn.addEventListener('click', hideRoutineForm);
    if (routineForm) routineForm.addEventListener('submit', handleSaveRoutine);
    if (addExerciseToRoutineBtn) addExerciseToRoutineBtn.addEventListener('click', addExerciseToCurrentRoutineData);

    // History Tab Calendar Controls
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1); renderCalendar(); });
    } else { console.warn("prevMonthBtn not found - ensure ID is correct in HTML and element exists."); }
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1); renderCalendar(); });
    } else { console.warn("nextMonthBtn not found - ensure ID is correct in HTML and element exists."); }

    // Exercise Library Controls
    if (addNewExerciseToLibBtn) addNewExerciseToLibBtn.addEventListener('click', () => showExerciseLibModal());
    if (closeExerciseLibModalBtn) closeExerciseLibModalBtn.addEventListener('click', () => hideExerciseLibModal());
    if (exerciseLibForm) exerciseLibForm.addEventListener('submit', handleSaveExerciseToLib);
    if (searchExerciseLibraryInput) searchExerciseLibraryInput.addEventListener('input', (e) => loadExerciseLibrary(e.target.value, filterMuscleGroupSelect ? filterMuscleGroupSelect.value : ""));
    if (filterMuscleGroupSelect) filterMuscleGroupSelect.addEventListener('change', (e) => loadExerciseLibrary(searchExerciseLibraryInput ? searchExerciseLibraryInput.value : "", e.target.value));

    // Measurements Tab Form
    if (logMeasurementForm) logMeasurementForm.addEventListener('submit', handleLogMeasurement);
    // if (progressPhotoUploadInput) progressPhotoUploadInput.addEventListener('change', handlePhotoUpload);

    // Nutrition Tab Form
    if (nutritionLogForm) nutritionLogForm.addEventListener('submit', handleLogNutrition);

    // Settings Tab Form (if uncommented and tab button added)
    if (settingsForm) settingsForm.addEventListener('submit', (e) => { e.preventDefault(); saveUserSettings(); });
    if (exportDataBtn) exportDataBtn.addEventListener('click', () => { /* ... export logic ... */ });
    if (importDataBtnAction && importDataFile) importDataBtnAction.addEventListener('click', () => { /* ... import logic ... */ });
    if (clearAllDataBtn) clearAllDataBtn.addEventListener('click', () => { /* ... clear all data logic ... */ });


    // --- Initial Page Load Setup ---
    function initializeApp() {
        console.log("🚀 Initializing Cute Workout Buddy! 🌸 v2.0"); // Version bump for fun
        loadUserSettings();
        prePopulateExerciseLibrary();
        prePopulateRoutines();
        setDefaultLogDate();
        setDefaultMeasurementDate();
        setDefaultNutritionDate();

        // Load initial data for non-active tabs too, so selectors can be populated
        loadExerciseLibrary(); // For datalists
        populateMuscleGroupFilter();
        populateExerciseSelectors();
        loadRoutines(); // For quick starts

        // Measurements and Nutrition don't strictly need pre-loading unless parts are shown elsewhere
        // loadMeasurements();
        // loadNutritionData();

        // Activate the default tab (Dashboard) and load its data
        const firstTabLink = document.querySelector('.tab-link[data-tab="dashboardTab"]');
        if (firstTabLink) {
            if (!firstTabLink.classList.contains('active')) { // Only click if not already marked active in HTML
                firstTabLink.click(); // This will trigger loadDashboardData via the tab click handler
            } else {
                loadDashboardData(); // Manually load if it was already active
            }
        } else { // Fallback if dashboard isn't default/found
            const fallbackFirstTab = document.querySelector('.tab-link');
            if (fallbackFirstTab) fallbackFirstTab.click();
        }
        console.log("🎉 App Initialized & Ready to Rock! Let's get those gains (or just have fun)! ✨");
    }

    initializeApp();
});
