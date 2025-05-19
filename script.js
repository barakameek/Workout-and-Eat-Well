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

    // --- DOM Elements ---
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
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
    const workoutHistoryContainer = document.getElementById('workout-history-container');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const calendarMonthYearDisplay = document.getElementById('calendar-month-year');
    const calendarGridContainer = document.getElementById('calendar-grid-container');
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
    const exLibImageInput = document.getElementById('ex-lib-image');
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
    const progressPhotosGallery = document.getElementById('progress-photos-gallery');
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
    let userSettings = {};

    // --- LOCALSTORAGE KEYS ---
    const WORKOUT_STORAGE_KEY = 'cuteTrackerV4_workouts';
    const ROUTINES_STORAGE_KEY = 'cuteTrackerV4_routines';
    const EXERCISES_STORAGE_KEY = 'cuteTrackerV4_exercises';
    const MEASUREMENTS_STORAGE_KEY = 'cuteTrackerV4_measurements';
    const NUTRITION_STORAGE_KEY = 'cuteTrackerV4_nutrition';
    const SETTINGS_STORAGE_KEY = 'cuteTrackerV4_settings';

    // --- ALL FUNCTION DEFINITIONS ---

    function generateId() { return Date.now().toString(36) + Math.random().toString(36).substring(2, 7); }
    function getData(key, defaultValue = []) { const data = localStorage.getItem(key); try { return data ? JSON.parse(data) : defaultValue; } catch (e) { console.error(`Error parsing ${key}: ${e.message}`); return defaultValue; } }
    function saveData(key, data) { try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) { console.error(`Error saving ${key}: ${e.message}.`); if (e.name === 'QuotaExceededError') alert("😥 Oh no! We're out of space to save your data. Try clearing some old history or export your data.");}}

    function loadUserSettings() {
        userSettings = getData(SETTINGS_STORAGE_KEY, {
            userName: "Fitness Star", weightUnit: 'kg', measurementUnit: 'cm',
            defaultKcalGoal: 2500, defaultProteinGoal: 150, smartDefaults: true, showConfetti: true
        });
        document.querySelectorAll('#user-weight-unit').forEach(el => el.textContent = userSettings.weightUnit);
        document.querySelectorAll('#user-measurement-unit').forEach(el => el.textContent = userSettings.measurementUnit);
        if(kcalGoalInput && (kcalGoalInput.value === "" || kcalGoalInput.value === "2500")) kcalGoalInput.value = userSettings.defaultKcalGoal;
        if(proteinGoalInput && (proteinGoalInput.value === "" || proteinGoalInput.value === "150")) proteinGoalInput.value = userSettings.defaultProteinGoal;
        if(settingUserNameInput) settingUserNameInput.value = userSettings.userName;
        if(settingWeightUnitSelect) settingWeightUnitSelect.value = userSettings.weightUnit;
        if(settingMeasureUnitSelect) settingMeasureUnitSelect.value = userSettings.measurementUnit;
        if(settingKcalGoalInput) settingKcalGoalInput.value = userSettings.defaultKcalGoal;
        if(settingProteinGoalInput) settingProteinGoalInput.value = userSettings.defaultProteinGoal;
        if(settingSmartDefaultsCheckbox) settingSmartDefaultsCheckbox.checked = userSettings.smartDefaults;
        if(settingShowConfettiCheckbox) settingShowConfettiCheckbox.checked = userSettings.showConfetti;
    }
    function saveUserSettings() {
        if(settingUserNameInput) userSettings.userName = settingUserNameInput.value.trim() || "Fitness Star";
        if(settingWeightUnitSelect) userSettings.weightUnit = settingWeightUnitSelect.value;
        if(settingMeasureUnitSelect) userSettings.measurementUnit = settingMeasureUnitSelect.value;
        if(settingKcalGoalInput) userSettings.defaultKcalGoal = parseInt(settingKcalGoalInput.value) || 2500;
        if(settingProteinGoalInput) userSettings.defaultProteinGoal = parseInt(settingProteinGoalInput.value) || 150;
        if(settingSmartDefaultsCheckbox) userSettings.smartDefaults = settingSmartDefaultsCheckbox.checked;
        if(settingShowConfettiCheckbox) userSettings.showConfetti = settingShowConfettiCheckbox.checked;
        saveData(SETTINGS_STORAGE_KEY, userSettings); loadUserSettings(); loadDashboardData(); alert("Settings saved! ✨");
    }

    function exportAllData() {
        const allData = { workouts: getData(WORKOUT_STORAGE_KEY), routines: getData(ROUTINES_STORAGE_KEY), exercises: getData(EXERCISES_STORAGE_KEY), measurements: getData(MEASUREMENTS_STORAGE_KEY), nutrition: getData(NUTRITION_STORAGE_KEY), settings: userSettings };
        const jsonString = JSON.stringify(allData, null, 2); const blob = new Blob([jsonString], {type: "application/json"});
        const url = URL.createObjectURL(blob); const a = document.createElement('a');
        a.href = url; a.download = `workout_buddy_data_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        alert("Data exported! Keep it safe! 💾");
    }
    function importAllDataFile(file) {
        if (!file) { alert("No file selected for import. 📁"); return; }
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedAllData = JSON.parse(event.target.result);
                if (confirm("This will OVERWRITE existing data. Are you sure you want to import? 😮")) {
                    if(importedAllData.workouts !== undefined) saveData(WORKOUT_STORAGE_KEY, importedAllData.workouts);
                    if(importedAllData.routines !== undefined) saveData(ROUTINES_STORAGE_KEY, importedAllData.routines);
                    if(importedAllData.exercises !== undefined) saveData(EXERCISES_STORAGE_KEY, importedAllData.exercises);
                    if(importedAllData.measurements !== undefined) saveData(MEASUREMENTS_STORAGE_KEY, importedAllData.measurements);
                    if(importedAllData.nutrition !== undefined) saveData(NUTRITION_STORAGE_KEY, importedAllData.nutrition);
                    if(importedAllData.settings !== undefined) saveData(SETTINGS_STORAGE_KEY, importedAllData.settings);
                    alert("Data imported successfully! Refreshing app... 🔄");
                    initializeApp();
                }
            } catch (err) { alert("Error importing file. It might not be a valid JSON backup. 😥"); console.error("Import error:", err); }
        };
        reader.readAsText(file);
    }
    function clearAllLocalData() {
        if(confirm("🚨 DANGER! 🚨 Are you ABSOLUTELY sure you want to delete ALL your data? This cannot be undone!")) {
            if(confirm("FINAL WARNING! Seriously, all progress, routines, everything will be GONE. Still proceed? 😱")) {
                localStorage.removeItem(WORKOUT_STORAGE_KEY); localStorage.removeItem(ROUTINES_STORAGE_KEY);
                localStorage.removeItem(EXERCISES_STORAGE_KEY); localStorage.removeItem(MEASUREMENTS_STORAGE_KEY);
                localStorage.removeItem(NUTRITION_STORAGE_KEY); localStorage.removeItem(SETTINGS_STORAGE_KEY);
                alert("All data cleared. It's a fresh start! 🌱"); initializeApp();
            }
        }
    }

    function switchTab(tabId) { const tabButton = document.querySelector(`.tab-link[data-tab="${tabId}"]`); if (tabButton) tabButton.click(); }
    function formatTime(totalSeconds) { const h = Math.floor(totalSeconds / 3600), m = Math.floor((totalSeconds % 3600) / 60), s = totalSeconds % 60; let ts = ""; if (h > 0) ts += `${String(h).padStart(2, '0')}:`; ts += `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`; return ts;}

    function loadDashboardData() {
        if (dashboardDateEl) dashboardDateEl.textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        if (dashGreetingEl) { const hour = new Date().getHours(); let greeting = "Hello"; if (hour < 5 || hour >= 22) greeting = "Good Night 🌙"; else if (hour < 12) greeting = "Good Morning ☀️"; else if (hour < 18) greeting = "Good Afternoon 🌻"; else greeting = "Good Evening 🌆"; dashGreetingEl.textContent = `${greeting}, ${userSettings.userName}!`; }
        const todayStr = new Date().toISOString().split('T')[0];
        const workouts = getData(WORKOUT_STORAGE_KEY);
        const todayEntry = workouts.find(w => w.date === todayStr);
        if (dashWorkoutStatusEl) { if (todayEntry && todayEntry.type === "WORKOUT") dashWorkoutStatusEl.textContent = `Completed: ${todayEntry.name || 'Workout'} 💪`; else if (todayEntry && todayEntry.type === "REST_DAY") dashWorkoutStatusEl.textContent = "Rest Day Logged 😴"; else dashWorkoutStatusEl.textContent = "Not Logged Yet 🤔"; }
        const nutritionData = getData(NUTRITION_STORAGE_KEY);
        const todayNutrition = nutritionData.find(n => n.date === todayStr);
        let kcalC = 0, kcalG = userSettings.defaultKcalGoal, protC = 0, protG = userSettings.defaultProteinGoal;
        if (todayNutrition) { kcalC = todayNutrition.kcalConsumed || 0; kcalG = todayNutrition.kcalGoal || userSettings.defaultKcalGoal; protC = todayNutrition.proteinConsumed || 0; protG = todayNutrition.proteinGoal || userSettings.defaultProteinGoal;}
        if (dashKcalConsumedEl) dashKcalConsumedEl.textContent = kcalC; if (dashKcalGoalEl) dashKcalGoalEl.textContent = kcalG;
        if (dashProteinConsumedEl) dashProteinConsumedEl.textContent = protC; if (dashProteinGoalEl) dashProteinGoalEl.textContent = protG;
        if (kcalProgressBar) kcalProgressBar.style.width = `${Math.min(100, (kcalC / (kcalG || 1)) * 100)}%`;
        if (proteinProgressBar) proteinProgressBar.style.width = `${Math.min(100, (protC / (protG || 1)) * 100)}%`;
        let streak = 0; let currentDateIter = new Date(); for (let i = 0; i < 365; i++) { const dateStr = currentDateIter.toISOString().split('T')[0]; if (workouts.some(w => w.date === dateStr)) { streak++; currentDateIter.setDate(currentDateIter.getDate() - 1); } else { break; } }
        if (dashWorkoutStreakEl) dashWorkoutStreakEl.textContent = `${streak} days 🔥`;
        const workoutsOnly = workouts.filter(w => w.type === "WORKOUT"); const lastWorkout = workoutsOnly.length > 0 ? workoutsOnly.sort((a,b) => new Date(b.date) - new Date(a.date))[0] : null;
        if (dashLastWorkoutInfoEl) dashLastWorkoutInfoEl.textContent = lastWorkout ? `on ${new Date(lastWorkout.date+'T00:00:00').toLocaleDateString()}: "${lastWorkout.name}"` : "Never 😲";
        if (dashUpNextWorkoutEl) { let upNextText = "Time for another great workout! 🚀"; if(lastWorkout) { const routines = getData(ROUTINES_STORAGE_KEY); if(routines.length > 0) { const lastRoutineIndex = routines.findIndex(r => r.name === lastWorkout.name); if(lastRoutineIndex > -1) { const nextRoutine = routines[(lastRoutineIndex + 1) % routines.length]; upNextText = `Maybe try "${nextRoutine.name}" today? 😉`; } else { upNextText = `How about starting with "${routines[0].name}" today? ✨`; }}} else if (getData(ROUTINES_STORAGE_KEY).length > 0) { upNextText = `Ready for your first workout? Try "${getData(ROUTINES_STORAGE_KEY)[0].name}"! 🎉`;} dashUpNextWorkoutEl.textContent = upNextText; }
        const quotes = ["Believe in your #selfie! 🤳", "You're stronger than you think! ✨", "Every rep counts! 💖", "Make today awesome! 🌟", "Be your own hero! 🦸‍♀️", "Progress, not perfection! 🚀", "One day or day one. You decide. 🎯", "The body achieves what the mind believes. 🧠💪"];
        if (dashMotivationQuoteEl) dashMotivationQuoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
        populateQuickStartWorkouts();
        const dashButtons = { 'dash-log-workout-btn': () => switchTab('logWorkoutTab'), 'dash-start-routine-btn': () => switchTab('routinesTab'), 'dash-log-rest-day-btn': () => { logRestDayPrompt(new Date().toISOString().split('T')[0]); }, 'dash-log-nutrition-btn': () => switchTab('nutritionTab'), 'dash-log-measurement-btn': () => switchTab('measurementsTab') };
        for (const btnId in dashButtons) { const btn = document.getElementById(btnId); if (btn) btn.onclick = dashButtons[btnId]; }
    }
    function populateQuickStartWorkouts() {
        if (!quickStartGrid) return; quickStartGrid.innerHTML = ''; const routines = getData(ROUTINES_STORAGE_KEY); const routinesToShow = routines.slice(0, 4);
        if (routinesToShow.length === 0) { quickStartGrid.innerHTML = '<p>Create some routines in "My Routines" to see them here! 😊</p>'; return; }
        routinesToShow.forEach(routine => { const tile = document.createElement('button'); tile.className = 'quick-start-tile'; tile.dataset.routineId = routine.id; tile.innerHTML = `<h4>${routine.name}</h4><p>${routine.description || `${routine.exercises.length} exercises`}</p><i class="fas fa-chevron-circle-right"></i>`; tile.onclick = () => startWorkoutFromRoutine(routine.id); quickStartGrid.appendChild(tile); });
    }

    function setDefaultLogDate() { if (workoutDateInput) { const today = new Date(); workoutDateInput.value = currentSessionDate || today.toISOString().split('T')[0]; } }
    function addExerciseToCurrentLogDOM(exercise) {
        const li = document.createElement('li'); li.className = 'active-workout-exercise';
        const exerciseIndexInLog = activeWorkoutLog.indexOf(exercise); // Use index for robust targeting
        li.dataset.exerciseIndex = exerciseIndexInLog;

        let exerciseHtml = `<div class="exercise-header"><strong>${exercise.name}</strong><span>Target: ${exercise.targetSets} sets, ${exercise.targetReps} reps</span></div><div class="sets-container">`;
        exercise.loggedSets.forEach((set, setIndex) => {
            let lastPerfWeight = "", lastPerfReps = "";
            if(userSettings.smartDefaults) { const lastTimeDone = findLastPerformance(exercise.name, set.setNumber); if (lastTimeDone) { lastPerfWeight = lastTimeDone.weight; lastPerfReps = lastTimeDone.reps; }}
            exerciseHtml += `<div class="set-row ${set.completed ? 'completed' : ''}" data-set-index="${setIndex}"><span class="set-number">Set ${set.setNumber}:</span><input type="number" class="set-weight-input" placeholder="Wt (${userSettings.weightUnit})" value="${set.weight || lastPerfWeight}" title="Weight"><input type="text" class="set-reps-input" placeholder="Reps" value="${set.reps || lastPerfReps}" title="Reps"><button class="log-set-btn" title="Log this set">${set.completed ? '<i class="fas fa-check-circle"></i> Done!' : '<i class="far fa-circle"></i> Log'}</button></div>`;
        });
        exerciseHtml += `</div><div class="exercise-actions-footer"><textarea class="exercise-session-notes" placeholder="Notes for ${exercise.name}... ✏️">${exercise.notes}</textarea><button class="remove-exercise-from-log-btn" title="Remove this exercise"><i class="fas fa-times"></i></button></div>`;
        li.innerHTML = exerciseHtml;

        const setsContainer = li.querySelector('.sets-container');
        setsContainer.addEventListener('input', (e) => { const setRow = e.target.closest('.set-row'); if (!setRow) return; const currentSetIndex = parseInt(setRow.dataset.setIndex); const exIdx = parseInt(setRow.closest('.active-workout-exercise').dataset.exerciseIndex); if (e.target.classList.contains('set-weight-input')) activeWorkoutLog[exIdx].loggedSets[currentSetIndex].weight = e.target.value; else if (e.target.classList.contains('set-reps-input')) activeWorkoutLog[exIdx].loggedSets[currentSetIndex].reps = e.target.value; });
        setsContainer.addEventListener('click', (e) => { const logButton = e.target.closest('.log-set-btn'); if(!logButton) return; const setRow = logButton.closest('.set-row'); const exIdx = parseInt(setRow.closest('.active-workout-exercise').dataset.exerciseIndex); const currentSetIndex = parseInt(setRow.dataset.setIndex); const currentSet = activeWorkoutLog[exIdx].loggedSets[currentSetIndex]; if (currentSet.weight && currentSet.reps) { currentSet.completed = !currentSet.completed; setRow.classList.toggle('completed', currentSet.completed); logButton.innerHTML = currentSet.completed ? '<i class="fas fa-check-circle"></i> Done!' : '<i class="far fa-circle"></i> Log'; } else if (currentSet.completed) { currentSet.completed = false; setRow.classList.remove('completed'); logButton.innerHTML = '<i class="far fa-circle"></i> Log'; } else { alert("Please enter weight and reps for this set first! 😊"); } });
        li.querySelector('.exercise-session-notes').oninput = (e) => { const exIdx = parseInt(e.target.closest('.active-workout-exercise').dataset.exerciseIndex); activeWorkoutLog[exIdx].notes = e.target.value; };
        li.querySelector('.remove-exercise-from-log-btn').onclick = (e) => { if(confirm(`Remove ${exercise.name} from this workout? 🤔`)){ const exIdx = parseInt(e.target.closest('.active-workout-exercise').dataset.exerciseIndex); activeWorkoutLog.splice(exIdx, 1); renderActiveWorkoutLogDOM(); if (activeWorkoutLog.length === 0 && finishWorkoutBtn) finishWorkoutBtn.style.display = 'none'; }};
        if (loggedExercisesList) loggedExercisesList.appendChild(li);
    }
    function renderActiveWorkoutLogDOM() { if (!loggedExercisesList) return; loggedExercisesList.innerHTML = ""; activeWorkoutLog.forEach(addExerciseToCurrentLogDOM); }
    function findLastPerformance(exerciseName, setNumberTarget) { const allWorkouts = getData(WORKOUT_STORAGE_KEY).filter(w => w.type === "WORKOUT"); for (let i = 0; i < allWorkouts.length; i++) { const session = allWorkouts[i]; const exerciseLog = session.exercises.find(ex => ex.name === exerciseName); if (exerciseLog && exerciseLog.log && exerciseLog.log.length >= setNumberTarget) { return exerciseLog.log[setNumberTarget - 1]; }} return null; }
    function resetLogFormAndSession() { activeWorkoutLog = []; if (loggedExercisesList) loggedExercisesList.innerHTML = ''; if (currentWorkoutDateDisplay) currentWorkoutDateDisplay.textContent = ''; if (currentWorkoutNameDisplay) currentWorkoutNameDisplay.textContent = ''; if (finishWorkoutBtn) finishWorkoutBtn.style.display = 'none'; currentSessionDate = null; if (workoutSessionNameInput) workoutSessionNameInput.value = ''; if (workoutDurationInput) workoutDurationInput.value = ''; setDefaultLogDate(); if (exerciseForm) exerciseForm.reset(); }
    function logRestDayPrompt(dateToLog = null) { const restDate = dateToLog || (workoutDateInput ? workoutDateInput.value : null) || new Date().toISOString().split('T')[0]; const notes = prompt(`Log rest day for ${new Date(restDate+'T00:00:00').toLocaleDateString()}? (Optional notes for your chill time 🧘‍♀️):`, ""); if (notes === null) { alert("Rest day logging cancelled. That's okay! 👍"); return; } const restDayEntry = { id: generateId(), date: restDate, type: "REST_DAY", notes: notes || "" }; const allEntries = getData(WORKOUT_STORAGE_KEY); const existingEntryIndex = allEntries.findIndex(entry => entry.date === restDate); if (existingEntryIndex > -1) { if (confirm(`An entry already exists for ${restDate}. Overwrite it with a rest day? 🤔`)) { allEntries.splice(existingEntryIndex, 1, restDayEntry); } else { alert("Rest day not logged."); return; } } else { allEntries.push(restDayEntry); } allEntries.sort((a, b) => new Date(b.date) - new Date(a.date)); saveData(WORKOUT_STORAGE_KEY, allEntries); alert("Rest day logged for " + new Date(restDate+'T00:00:00').toLocaleDateString() + "! Sweet dreams! 🌙"); loadDashboardData(); renderCalendar(); renderWorkoutHistory(); }

    function showRoutineForm(routine = null) { if (createEditRoutineSection) createEditRoutineSection.style.display = 'block'; if (routinesListContainer) routinesListContainer.style.display = 'none'; currentRoutineExercisesData = []; if (routineFormTitle) routineFormTitle.textContent = routine ? "Edit Routine ✨" : "Create New Routine 💖"; if (routine) { editingRoutineId = routine.id; if (routineNameInput) routineNameInput.value = routine.name; if (routineDescriptionInput) routineDescriptionInput.value = routine.description || ""; currentRoutineExercisesData = [...(routine.exercises || [])]; } else { editingRoutineId = null; if (routineForm) routineForm.reset(); } renderCurrentRoutineExercisesDOM(); }
    function hideRoutineForm() { if (createEditRoutineSection) createEditRoutineSection.style.display = 'none'; if (routinesListContainer) routinesListContainer.style.display = 'block'; editingRoutineId = null; currentRoutineExercisesData = []; }
    function addExerciseToCurrentRoutineData() { const selectedExName = addExerciseToRoutineSelect.value; const sets = routineExerciseSetsInput.value.trim(); const reps = routineExerciseRepsInput.value.trim(); if (!selectedExName || !sets || !reps) { alert("Select an exercise, and enter sets & reps, please! 😊"); return; } currentRoutineExercisesData.push({ name: selectedExName, sets: sets, reps: reps, id: generateId() }); renderCurrentRoutineExercisesDOM(); addExerciseToRoutineSelect.value = ""; routineExerciseSetsInput.value = ""; routineExerciseRepsInput.value = ""; }
    function renderCurrentRoutineExercisesDOM() { if (!routineExercisesList) return; routineExercisesList.innerHTML = ""; currentRoutineExercisesData.forEach(ex => { const item = document.createElement('div'); item.className = 'routine-exercise-item'; item.innerHTML = `<span>${ex.name} - Sets: ${ex.sets}, Reps: ${ex.reps}</span><button type="button" class="delete-routine-ex-btn" data-id="${ex.id}"><i class="fas fa-times-circle"></i></button>`; item.querySelector('.delete-routine-ex-btn').onclick = (e) => { const exId = e.target.closest('.delete-routine-ex-btn').dataset.id; currentRoutineExercisesData = currentRoutineExercisesData.filter(currEx => currEx.id !== exId); renderCurrentRoutineExercisesDOM(); }; routineExercisesList.appendChild(item); }); }
    function handleSaveRoutine(event) { event.preventDefault(); const name = routineNameInput.value.trim(); if (!name || currentRoutineExercisesData.length === 0) { alert("Routine name and at least one exercise are needed! 🌟"); return; } const newRoutine = { id: editingRoutineId || generateId(), name: name, description: routineDescriptionInput.value.trim(), exercises: currentRoutineExercisesData }; let routines = getData(ROUTINES_STORAGE_KEY); if (editingRoutineId) { routines = routines.map(r => r.id === editingRoutineId ? newRoutine : r); } else { routines.push(newRoutine); } saveData(ROUTINES_STORAGE_KEY, routines); alert(`Routine "${name}" saved! Great job! 🎉`); hideRoutineForm(); loadRoutines(); populateQuickStartWorkouts(); }
    function loadRoutines() { if (!routinesListContainer) return; const routines = getData(ROUTINES_STORAGE_KEY); routinesListContainer.innerHTML = ""; if (routines.length === 0) { routinesListContainer.innerHTML = '<p>No routines created yet. Let’s make one! 🌈</p>'; return; } routines.forEach(routine => { const card = document.createElement('div'); card.className = 'routine-card'; card.innerHTML = `<div><h4>${routine.name}</h4><small>${routine.description || `${routine.exercises.length} exercises`}</small></div><div class="routine-actions"><button class="start-routine-btn" data-id="${routine.id}" title="Start this Routine"><i class="fas fa-play"></i></button><button class="edit-routine-btn" data-id="${routine.id}" title="Edit Routine"><i class="fas fa-edit"></i></button><button class="delete-routine-btn" data-id="${routine.id}" title="Delete Routine"><i class="fas fa-trash"></i></button></div>`; card.querySelector('.start-routine-btn').onclick = () => startWorkoutFromRoutine(routine.id); card.querySelector('.edit-routine-btn').onclick = () => showRoutineForm(routine); card.querySelector('.delete-routine-btn').onclick = () => deleteRoutine(routine.id, routine.name); routinesListContainer.appendChild(card); }); }
    function deleteRoutine(id, name) { if (!confirm(`Are you sure you want to delete routine: "${name}"? 😢`)) return; let routines = getData(ROUTINES_STORAGE_KEY); routines = routines.filter(r => r.id !== id); saveData(ROUTINES_STORAGE_KEY, routines); loadRoutines(); populateQuickStartWorkouts(); }
    function startWorkoutFromRoutine(routineId) { const routines = getData(ROUTINES_STORAGE_KEY); const routine = routines.find(r => r.id === routineId); if (!routine) { alert("Oopsie! Routine not found. 👻"); return; } resetLogFormAndSession(); switchTab('logWorkoutTab'); currentSessionDate = new Date().toISOString().split('T')[0]; setDefaultLogDate(); if (workoutSessionNameInput) workoutSessionNameInput.value = routine.name; if (currentWorkoutDateDisplay) currentWorkoutDateDisplay.textContent = `Date: ${new Date(currentSessionDate + 'T00:00:00').toLocaleDateString()}`; if (currentWorkoutNameDisplay) currentWorkoutNameDisplay.textContent = `Name: ${routine.name}`; activeWorkoutLog = routine.exercises.map(exFromRoutine => { const numSets = parseInt(exFromRoutine.sets) || 1; const setsData = []; for (let i = 0; i < numSets; i++) { setsData.push({ setNumber: i + 1, weight: '', reps: '', completed: false }); } return { routineExerciseId: exFromRoutine.id, name: exFromRoutine.name, targetSets: exFromRoutine.sets, targetReps: exFromRoutine.reps, loggedSets: setsData, notes: "", unit: userSettings.weightUnit }; }); renderActiveWorkoutLogDOM(); if (finishWorkoutBtn && activeWorkoutLog.length > 0) finishWorkoutBtn.style.display = 'block'; alert(`Let's go! 💪 Routine "${routine.name}" loaded. Fill in your sets!`); }

    let calendarTooltip; function showCalendarTooltip(event, entries) { hideCalendarTooltip(); calendarTooltip = document.createElement('div'); calendarTooltip.className = 'calendar-tooltip'; let content = `<strong>${new Date(entries[0].date+'T00:00:00').toLocaleDateString()}</strong><hr>`; entries.forEach(entry => { if (entry.type === "REST_DAY") content += `<p>😴 Rest Day</p>`; else content += `<p>💪 ${entry.name || 'Workout'}</p>`; }); calendarTooltip.innerHTML = content; document.body.appendChild(calendarTooltip); const rect = event.target.getBoundingClientRect(); calendarTooltip.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (calendarTooltip.offsetWidth / 2)}px`; calendarTooltip.style.top = `${rect.bottom + window.scrollY + 8}px`; if(calendarTooltip.offsetLeft < 0) calendarTooltip.style.left = '5px'; if(calendarTooltip.offsetLeft + calendarTooltip.offsetWidth > window.innerWidth) calendarTooltip.style.left = `${window.innerWidth - calendarTooltip.offsetWidth - 5}px`;} function hideCalendarTooltip() { if (calendarTooltip) { calendarTooltip.remove(); calendarTooltip = null; } }
    function renderCalendar() { if (!calendarGridContainer || !calendarMonthYearDisplay) { console.warn("Calendar elements missing."); return; } calendarGridContainer.innerHTML = ''; const year = currentCalendarDate.getFullYear(); const month = currentCalendarDate.getMonth(); calendarMonthYearDisplay.textContent = `${currentCalendarDate.toLocaleString('default', { month: 'long' })} ${year} 🗓️`; const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; daysOfWeek.forEach(day => {const el = document.createElement('div'); el.className = 'calendar-day-header'; el.textContent = day; calendarGridContainer.appendChild(el);}); const firstDayOfMonth = new Date(year, month, 1).getDay(); const daysInMonth = new Date(year, month + 1, 0).getDate(); const allEntries = getData(WORKOUT_STORAGE_KEY); for (let i = 0; i < firstDayOfMonth; i++) {const el = document.createElement('div'); el.className = 'calendar-day other-month'; calendarGridContainer.appendChild(el);} for (let day = 1; day <= daysInMonth; day++) { const dayCell = document.createElement('div'); dayCell.className = 'calendar-day'; const dayNumEl = document.createElement('span'); dayNumEl.className = 'day-number'; dayNumEl.textContent = day; dayCell.appendChild(dayNumEl); const currentDateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; const today = new Date(); if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) dayCell.classList.add('today'); const entriesOnThisDay = allEntries.filter(e => e.date === currentDateString); if (entriesOnThisDay.length > 0) { const isRestDay = entriesOnThisDay.some(e => e.type === "REST_DAY"); const indicator = document.createElement('div'); indicator.className = 'workout-indicator'; if (isRestDay) { dayCell.classList.add('rest-day'); indicator.innerHTML = '😴'; } else { indicator.innerHTML = '💪'; } indicator.style.backgroundColor = 'transparent'; indicator.style.fontSize = '1.2em'; dayCell.appendChild(indicator); dayCell.dataset.date = currentDateString; dayCell.title = isRestDay ? `Rest Day 😌` : `${entriesOnThisDay.filter(e=>e.type !== "REST_DAY").length} workout(s) 🔥`; dayCell.onclick = () => { const sessionElements = document.querySelectorAll(`.workout-session[data-date-marker="${currentDateString}"]`); if (sessionElements.length > 0) { sessionElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); sessionElements.forEach(el => el.classList.add('highlighted-session')); setTimeout(() => sessionElements.forEach(el => el.classList.remove('highlighted-session')), 2500); } else { alert(`Details for ${new Date(currentDateString+'T00:00:00').toLocaleDateString()} 🧐`);}}; dayCell.onmouseenter = (e) => showCalendarTooltip(e, entriesOnThisDay); dayCell.onmouseleave = hideCalendarTooltip;} calendarGridContainer.appendChild(dayCell);} const totalCells = firstDayOfMonth + daysInMonth; const remainingCells = (7 - (totalCells % 7)) % 7; for (let i = 0; i < remainingCells; i++) {const el = document.createElement('div'); el.className = 'calendar-day other-month'; calendarGridContainer.appendChild(el);}}
    function renderWorkoutHistory() { if (!workoutHistoryContainer) return; const allEntries = getData(WORKOUT_STORAGE_KEY); workoutHistoryContainer.innerHTML = ''; if (allEntries.length === 0) { workoutHistoryContainer.innerHTML = '<p>No sessions or rest days logged yet. Let’s make some memories! ✨</p>'; return; } allEntries.forEach(entry => { const sessionDiv = document.createElement('div'); sessionDiv.className = 'workout-session'; sessionDiv.dataset.sessionId = entry.id; sessionDiv.dataset.dateMarker = entry.date; const formattedDate = new Date(entry.date + 'T00:00:00'); let sessionHtml = `<h3 class="workout-session-date">${formattedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>`; if (entry.type === "REST_DAY") { sessionHtml += `<div class="history-exercise-item rest-day-entry"><strong>😴 REST DAY 😴</strong>${entry.notes ? `<em>Notes: ${entry.notes}</em>` : ''}</div>`; } else { if(entry.name && entry.name !== "My Awesome Workout 💪") sessionHtml += `<p class="session-title-history">${entry.name}</p>`; if(entry.duration) sessionHtml += `<p class="session-duration-history">Duration: ${entry.duration} mins ⏱️</p>`; sessionHtml += '<ul class="history-exercise-list">'; entry.exercises.forEach(ex => { sessionHtml += `<li class="history-exercise-item"><strong>${ex.name}</strong> (${ex.setsPerformed} sets performed)`; if (ex.log && ex.log.length > 0) { ex.log.forEach((setLog, index) => { sessionHtml += `<div><small>Set ${index + 1}: ${setLog.reps} reps @ ${setLog.weight} ${ex.unit || userSettings.weightUnit}</small></div>`; });} if (ex.notes) sessionHtml += `<em>Notes: ${ex.notes}</em>`; sessionHtml += `</li>`; }); sessionHtml += '</ul>'; } sessionDiv.innerHTML = sessionHtml; workoutHistoryContainer.appendChild(sessionDiv); });}

    function showExerciseLibModal(exercise = null) { if (!exerciseLibModal) return; exerciseLibModal.style.display = 'flex'; if (exerciseLibModalTitle) exerciseLibModalTitle.textContent = exercise ? "Edit Exercise Details ✏️" : "Add New Exercise to Library ➕"; if (exercise) { if(exerciseLibIdInput) exerciseLibIdInput.value = exercise.id; if(exLibNameInput) exLibNameInput.value = exercise.name; if(exLibMuscleInput) exLibMuscleInput.value = exercise.primaryMuscle || ""; if(exLibSecondaryMuscleInput) exLibSecondaryMuscleInput.value = exercise.secondaryMuscles || ""; if(exLibEquipmentInput) exLibEquipmentInput.value = exercise.equipment || ""; if(exLibInstructionsInput) exLibInstructionsInput.value = exercise.instructions || ""; if(exLibVideoInput) exLibVideoInput.value = exercise.videoUrl || ""; if(exLibImageInput) exLibImageInput.value = exercise.imageUrl || "";} else { if (exerciseLibForm) exerciseLibForm.reset(); if(exerciseLibIdInput) exerciseLibIdInput.value = "";}}
    function hideExerciseLibModal() { if (exerciseLibModal) exerciseLibModal.style.display = 'none'; }
    function handleSaveExerciseToLib(event) { event.preventDefault(); const id = exerciseLibIdInput.value; const name = exLibNameInput.value.trim(); if (!name) { alert("Exercise name is required, pretty please! 🙏"); return; } const newExercise = { id: id || generateId(), name: name, primaryMuscle: exLibMuscleInput.value.trim(), secondaryMuscles: exLibSecondaryMuscleInput.value.trim(), equipment: exLibEquipmentInput.value.trim(), instructions: exLibInstructionsInput.value.trim(), videoUrl: exLibVideoInput.value.trim(), imageUrl: exLibImageInput.value.trim() }; let exercises = getData(EXERCISES_STORAGE_KEY); if (id) { exercises = exercises.map(ex => ex.id === id ? newExercise : ex); } else { exercises.push(newExercise); } saveData(EXERCISES_STORAGE_KEY, exercises); alert(`Exercise "${name}" saved to library! Hooray! 📚`); hideExerciseLibModal(); loadExerciseLibrary(); populateExerciseSelectors(); populateMuscleGroupFilter(); }
    function loadExerciseLibrary(searchTerm = "", muscleFilter = "") { if (!exerciseLibraryListContainer) return; let exercises = getData(EXERCISES_STORAGE_KEY); if (searchTerm) exercises = exercises.filter(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase())); if (muscleFilter) exercises = exercises.filter(ex => ex.primaryMuscle && ex.primaryMuscle.toLowerCase() === muscleFilter.toLowerCase()); exerciseLibraryListContainer.innerHTML = ""; if (exercises.length === 0) { exerciseLibraryListContainer.innerHTML = '<p>No exercises found or library is empty. Add some! 🧐</p>'; return; } exercises.forEach(ex => { const card = document.createElement('div'); card.className = 'exercise-lib-card'; card.innerHTML = `${ex.imageUrl ? `<img src="${ex.imageUrl}" alt="${ex.name}" class="exercise-lib-img">` : '<div class="exercise-lib-image-placeholder"><i class="fas fa-image"></i></div>'}<h4>${ex.name} <i class="fas fa-info-circle exercise-info-icon" title="View Details"></i></h4><p><strong>Muscle:</strong> ${ex.primaryMuscle || 'N/A'}</p><p><strong>Equipment:</strong> ${ex.equipment || 'N/A'}</p><div class="exercise-lib-actions"><button class="edit-ex-lib-btn" data-id="${ex.id}" title="Edit"><i class="fas fa-edit"></i></button><button class="delete-ex-lib-btn" data-id="${ex.id}" title="Delete"><i class="fas fa-trash"></i></button></div>`; const infoIcon = card.querySelector('.exercise-info-icon'); if(infoIcon) infoIcon.addEventListener('click', (e) => { e.stopPropagation(); alert(`Exercise: ${ex.name}\n\nInstructions:\n${ex.instructions || 'No instructions provided.'}\n\nVideo: ${ex.videoUrl || 'No video link.'}`); }); card.querySelector('.edit-ex-lib-btn').onclick = () => showExerciseLibModal(ex); card.querySelector('.delete-ex-lib-btn').onclick = () => deleteExerciseFromLib(ex.id, ex.name); exerciseLibraryListContainer.appendChild(card); });}
    function deleteExerciseFromLib(id, name) { if(!confirm(`Delete "${name}" from library? This won't affect past logs. Are you sure? 🤔`)) return; let exercises = getData(EXERCISES_STORAGE_KEY); exercises = exercises.filter(ex => ex.id !== id); saveData(EXERCISES_STORAGE_KEY, exercises); loadExerciseLibrary(); populateExerciseSelectors(); populateMuscleGroupFilter(); }
    function populateMuscleGroupFilter() { if (!filterMuscleGroupSelect) return; const exercises = getData(EXERCISES_STORAGE_KEY); const muscleGroups = new Set(exercises.map(ex => ex.primaryMuscle).filter(Boolean).map(m => m.trim()).sort()); const currentVal = filterMuscleGroupSelect.value; filterMuscleGroupSelect.innerHTML = '<option value="">All Muscle Groups 🎯</option>'; muscleGroups.forEach(mg => { const option = document.createElement('option'); option.value = mg; option.textContent = mg; filterMuscleGroupSelect.appendChild(option); }); filterMuscleGroupSelect.value = currentVal; }
    function populateExerciseSelectors() { const exercises = getData(EXERCISES_STORAGE_KEY); const sortedExercises = [...exercises].sort((a,b) => a.name.localeCompare(b.name)); if (commonExercisesDatalist) { commonExercisesDatalist.innerHTML = ""; sortedExercises.forEach(ex => { const option = document.createElement('option'); option.value = ex.name; commonExercisesDatalist.appendChild(option); });} if (addExerciseToRoutineSelect) { const currentVal = addExerciseToRoutineSelect.value; addExerciseToRoutineSelect.innerHTML = '<option value="">-- Select Exercise to Add --</option>'; sortedExercises.forEach(ex => { const option = document.createElement('option'); option.value = ex.name; option.textContent = ex.name; addExerciseToRoutineSelect.appendChild(option); }); addExerciseToRoutineSelect.value = currentVal; }}
    function prePopulateExerciseLibrary() { let exercises = getData(EXERCISES_STORAGE_KEY); if (exercises.length > 0 && !localStorage.getItem('forceExerciseRepopulateV4')) return; const defaultExercises = [ { name: "Barbell Bench Press", primaryMuscle: "Chest", equipment: "Barbell" }, { name: "Standing Overhead Press", primaryMuscle: "Shoulders", equipment: "Barbell" }, { name: "Close-Grip Bench Press", primaryMuscle: "Triceps", equipment: "Barbell" }, { name: "Barbell Front Raise", primaryMuscle: "Shoulders", equipment: "Barbell" }, { name: "Plate Raise", primaryMuscle: "Shoulders", equipment: "Plate" }, { name: "Overhead Triceps Extension (Barbell)", primaryMuscle: "Triceps", equipment: "Barbell" }, { name: "Barbell Back Squat", primaryMuscle: "Quads", equipment: "Barbell" }, { name: "Romanian Deadlift (RDL)", primaryMuscle: "Hamstrings", equipment: "Barbell" }, { name: "Walking Lunges", primaryMuscle: "Quads", equipment: "Bodyweight" }, { name: "Paused Squat", primaryMuscle: "Quads", equipment: "Barbell" }, { name: "Calf Raises (Barbell)", primaryMuscle: "Calves", equipment: "Barbell" }, { name: "Barbell Bent-Over Rows", primaryMuscle: "Back", equipment: "Barbell" }, { name: "Deadlifts", primaryMuscle: "Back", equipment: "Barbell" }, { name: "Barbell Curls", primaryMuscle: "Biceps", equipment: "Barbell" }, { name: "Shrugs (Barbell)", primaryMuscle: "Traps", equipment: "Barbell" }, { name: "Reverse-Grip Rows (Underhand)", primaryMuscle: "Back", equipment: "Barbell" }, { name: "Front Squat", primaryMuscle: "Quads", equipment: "Barbell" }, { name: "Incline Bench Press", primaryMuscle: "Chest", equipment: "Barbell" }, { name: "Power Clean", primaryMuscle: "Full Body", equipment: "Barbell" }, { name: "Push-ups", primaryMuscle: "Chest", equipment: "Bodyweight" }, { name: "Pull-ups", primaryMuscle: "Back", equipment: "Pull-up bar" }, { name: "Dips", primaryMuscle: "Triceps", equipment: "Dip Bars" }, { name: "Plank", primaryMuscle: "Core", equipment: "Bodyweight"}, { name: "Running", primaryMuscle: "Cardio", equipment: "N/A"}, { name: "Cycling", primaryMuscle: "Cardio", equipment: "Bike"} ]; const exercisesWithIds = defaultExercises.map(ex => ({ ...ex, id: generateId(), instructions: `Perform ${ex.name} focusing on good form. ✨`, videoUrl: '', imageUrl: '' })); saveData(EXERCISES_STORAGE_KEY, exercisesWithIds); localStorage.setItem('forceExerciseRepopulateV4', 'done'); console.log("Default exercises populated."); }
    function prePopulateRoutines() { let routines = getData(ROUTINES_STORAGE_KEY); if (routines.length > 0 && !localStorage.getItem('forceRoutineRepopulateV4')) return; const defaultRoutines = [ { name: "🌸 Upper Push Day", description: "Chest, Shoulders, Triceps Focus!", exercises: [ { name: "Barbell Bench Press", sets: "4", reps: "6-10", id: generateId() }, { name: "Standing Overhead Press", sets: "4", reps: "6-10", id: generateId() }, { name: "Close-Grip Bench Press", sets: "3", reps: "8-12", id: generateId() }, { name: "Barbell Front Raise", sets: "3", reps: "12-15", id: generateId() }, { name: "Overhead Triceps Extension (Barbell)", sets: "3", reps: "12-15", id: generateId() } ]}, { name: "🦵 Leg Power Day", description: "Legs & Glutes Blast!", exercises: [ { name: "Barbell Back Squat", sets: "4", reps: "6-10", id: generateId() }, { name: "Romanian Deadlift (RDL)", sets: "3", reps: "8-12", id: generateId() }, { name: "Walking Lunges", sets: "3", reps: "10-15 each", id: generateId() }, { name: "Paused Squat", sets: "3", reps: "8", id: generateId() }, { name: "Calf Raises (Barbell)", sets: "3", reps: "15-20", id: generateId() } ]}, { name: "💪 Upper Pull Day", description: "Back, Biceps, Traps Time!", exercises: [ { name: "Barbell Bent-Over Rows", sets: "4", reps: "6-10", id: generateId() }, { name: "Deadlifts", sets: "3", reps: "5-8", id: generateId() }, { name: "Barbell Curls", sets: "3", reps: "10-12", id: generateId() }, { name: "Shrugs (Barbell)", sets: "3", reps: "12-15", id: generateId() }, { name: "Reverse-Grip Rows (Underhand)", sets: "3", reps: "8-10", id: generateId() } ]}, { name: "🌟 Full Body Sparkle", description: "Overall Power and Growth!", exercises: [ { name: "Barbell Back Squat", sets: "3", reps: "6-8", id: generateId() }, { name: "Barbell Bench Press", sets: "3", reps: "6-8", id: generateId() }, { name: "Barbell Bent-Over Rows", sets: "3", reps: "6-8", id: generateId() }, { name: "Standing Overhead Press", sets: "3", reps: "8-10", id: generateId() }]} ]; const routinesWithIds = defaultRoutines.map(r => ({ ...r, id: generateId() })); saveData(ROUTINES_STORAGE_KEY, routinesWithIds); localStorage.setItem('forceRoutineRepopulateV4', 'done'); console.log("Default routines populated.");}

    function setDefaultMeasurementDate() { if (measurementDateInput) measurementDateInput.value = new Date().toISOString().split('T')[0]; }
    function handleLogMeasurement(event) { event.preventDefault(); const measurement = { id: generateId(), date: measurementDateInput.value, weight: bodyWeightInput.value ? parseFloat(bodyWeightInput.value) : null, bodyFat: bodyFatInput.value ? parseFloat(bodyFatInput.value) : null, chest: chestSizeInput.value ? parseFloat(chestSizeInput.value) : null, waist: waistSizeInput.value ? parseFloat(waistSizeInput.value) : null, arm: armSizeInput.value ? parseFloat(armSizeInput.value) : null, thigh: thighSizeInput.value ? parseFloat(thighSizeInput.value) : null, notes: measurementNotesInput.value.trim() }; if (!measurement.date) { alert("Date is required for measurements! 📅"); return; } let measurements = getData(MEASUREMENTS_STORAGE_KEY); measurements.push(measurement); measurements.sort((a,b) => new Date(b.date) - new Date(a.date)); saveData(MEASUREMENTS_STORAGE_KEY, measurements); alert("Measurements logged! You're tracking it! 📏"); if (logMeasurementForm) logMeasurementForm.reset(); setDefaultMeasurementDate(); loadMeasurements(); }
    function loadMeasurements() { if (!measurementHistoryListContainer) return; const measurements = getData(MEASUREMENTS_STORAGE_KEY); measurementHistoryListContainer.innerHTML = ""; if(measurements.length === 0) { measurementHistoryListContainer.innerHTML = "<p>No measurements logged yet. Let's start! 💖</p>"; return; } const list = document.createElement('ul'); list.className = 'simple-history-list'; measurements.forEach(m => { const item = document.createElement('li'); item.innerHTML = `<strong>${new Date(m.date+'T00:00:00').toLocaleDateString()}</strong>: Wt: ${m.weight || '-'} ${userSettings.weightUnit}, BF: ${m.bodyFat || '-'}%, Chest: ${m.chest || '-'} ${userSettings.measurementUnit}, Waist: ${m.waist || '-'} ${userSettings.measurementUnit} ...`; list.appendChild(item); }); measurementHistoryListContainer.appendChild(list); if (progressPhotosGallery) progressPhotosGallery.innerHTML = "<p>Photo gallery (display) coming soon! 📸</p>";}

    function setDefaultNutritionDate() { if (nutritionDateInput) nutritionDateInput.value = new Date().toISOString().split('T')[0]; }
    function handleLogNutrition(event) { event.preventDefault(); const nutritionEntry = { id: generateId(), date: nutritionDateInput.value, kcalGoal: kcalGoalInput.value ? parseInt(kcalGoalInput.value) : null, kcalConsumed: kcalConsumedInput.value ? parseInt(kcalConsumedInput.value) : null, proteinGoal: proteinGoalInput.value ? parseInt(proteinGoalInput.value) : null, proteinConsumed: proteinConsumedInput.value ? parseInt(proteinConsumedInput.value) : null, carbsConsumed: carbsConsumedInput.value ? parseInt(carbsConsumedInput.value) : null, fatsConsumed: fatsConsumedInput.value ? parseInt(fatsConsumedInput.value) : null, notes: nutritionNotesInput.value.trim() }; if (!nutritionEntry.date || nutritionEntry.kcalConsumed === null) { alert("Date and Kcal Consumed are required for nutrition log! 🍎"); return; } let nutritionData = getData(NUTRITION_STORAGE_KEY); const existingEntryIndex = nutritionData.findIndex(n => n.date === nutritionEntry.date); if (existingEntryIndex > -1) { if (confirm("Nutrition data for this date already exists. Overwrite? 🤔")) { nutritionData[existingEntryIndex] = nutritionEntry; } else { return; } } else { nutritionData.push(nutritionEntry); } nutritionData.sort((a,b) => new Date(b.date) - new Date(a.date)); saveData(NUTRITION_STORAGE_KEY, nutritionData); alert("Nutrition logged! Fueling up! 🥗"); if(nutritionLogForm) nutritionLogForm.reset(); setDefaultNutritionDate(); loadNutritionData(); loadDashboardData(); }
    function loadNutritionData() { if (!nutritionSummaryEl) return; const nutritionData = getData(NUTRITION_STORAGE_KEY); if(nutritionData.length === 0) { nutritionSummaryEl.innerHTML = "<p>No nutrition data logged yet. What did you eat today? 😋</p>"; } else { nutritionSummaryEl.innerHTML = "<h3>Recent Nutrition Entries:</h3><ul class='simple-history-list'>"; nutritionData.slice(0,7).forEach(n => { nutritionSummaryEl.innerHTML += `<li><strong>${new Date(n.date+'T00:00:00').toLocaleDateString()}</strong>: ${n.kcalConsumed} Kcal / ${n.kcalGoal || '-'} Goal, ${n.proteinConsumed}g Protein / ${n.proteinGoal || '-'}g Goal</li>`; }); nutritionSummaryEl.innerHTML += "</ul>";}}


    // --- ATTACH EVENT LISTENERS ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active')); tabContents.forEach(content => content.classList.remove('active'));
            tab.classList.add('active'); const targetTabId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTabId); if (targetContent) targetContent.classList.add('active');
            if (targetTabId === "dashboardTab") loadDashboardData();
            else if (targetTabId === "historyTab") { renderCalendar(); renderWorkoutHistory(); }
            else if (targetTabId === "routinesTab") { loadRoutines(); hideRoutineForm(); }
            else if (targetTabId === "exercisesTab") { loadExerciseLibrary(); populateMuscleGroupFilter(); populateExerciseSelectors(); }
            else if (targetTabId === "measurementsTab") { loadMeasurements(); setDefaultMeasurementDate(); }
            else if (targetTabId === "nutritionTab") { loadNutritionData(); setDefaultNutritionDate(); }
            else if (targetTabId === "settingsTab") { loadUserSettings(); }
        });
    });

    if(exerciseForm) exerciseForm.addEventListener('submit', function(event) {
        event.preventDefault(); const date = workoutDateInput.value; const exerciseNameVal = exerciseNameInput.value.trim(); const setsVal = document.getElementById('sets').value; const repsVal = document.getElementById('reps').value.trim(); const notesVal = document.getElementById('exercise-notes').value.trim();
        if (!date || !exerciseNameVal || !setsVal || !repsVal) { alert('Oops! Please fill in Date, Exercise Name, Target Sets, and Target Reps. 💖'); return; }
        if (activeWorkoutLog.length === 0) { currentSessionDate = date; const workoutName = workoutSessionNameInput.value.trim(); if (currentWorkoutDateDisplay) currentWorkoutDateDisplay.textContent = `Date: ${new Date(date + 'T00:00:00').toLocaleDateString()}`; if (currentWorkoutNameDisplay) currentWorkoutNameDisplay.textContent = workoutName ? `Name: ${workoutName}` : ''; }
        else if (date !== currentSessionDate) { alert("Date changed! Current session is under the first date. Save to start a new one. 😊"); workoutDateInput.value = currentSessionDate; return; }
        const numSets = parseInt(setsVal) || 1; const setsData = []; for (let i = 0; i < numSets; i++) { setsData.push({ setNumber: i + 1, weight: '', reps: '', completed: false }); }
        const newExerciseLog = { id: generateId(), name: exerciseNameVal, targetSets: setsVal, targetReps: repsVal, loggedSets: setsData, notes: notesVal, unit: userSettings.weightUnit };
        activeWorkoutLog.push(newExerciseLog); renderActiveWorkoutLogDOM();
        exerciseNameInput.value = ''; document.getElementById('sets').value = ''; document.getElementById('reps').value = ''; document.getElementById('exercise-notes').value = '';
        exerciseNameInput.focus(); if (finishWorkoutBtn) finishWorkoutBtn.style.display = 'block';
    });
    if(finishWorkoutBtn) finishWorkoutBtn.addEventListener('click', function() {
        if (activeWorkoutLog.length === 0) { alert("No exercises logged. Add some magic! ✨"); return; } if (!currentSessionDate) { alert("Oops, please set a date! 📅"); return; }
        const sessionName = workoutSessionNameInput.value.trim();
        const duration = workoutDurationInput.value.trim() || (workoutTimerSeconds > 0 ? Math.round(workoutTimerSeconds / 60) : null);
        const processedExercisesForSaving = activeWorkoutLog.map(exercise => { const completedSets = exercise.loggedSets.filter(set => set.completed && set.weight && set.reps); if (completedSets.length === 0) return null; return { name: exercise.name, setsPerformed: completedSets.length, log: completedSets.map(s => ({ weight: s.weight, reps: s.reps })), unit: exercise.unit || userSettings.weightUnit, notes: exercise.notes || "" }; }).filter(ex => ex !== null);
        if (processedExercisesForSaving.length === 0) { alert("No actual sets were logged with weight and reps. Please log some sets! 💪"); return; }
        const newWorkoutSession = { id: generateId(), date: currentSessionDate, name: sessionName || "My Awesome Workout 💪", duration: duration ? parseInt(duration) : null, type: "WORKOUT", exercises: processedExercisesForSaving };
        const allWorkouts = getData(WORKOUT_STORAGE_KEY); allWorkouts.push(newWorkoutSession); allWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date)); saveData(WORKOUT_STORAGE_KEY, allWorkouts);
        alert("Workout saved! You're amazing! 🥳");
        if(userSettings.showConfetti && typeof confetti === 'function') { confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 }, colors: ['#ff7eb9', '#b5a7ff', '#a0ffe6', '#f0ad4e', '#00c6fb'] }); }
        resetLogFormAndSession();
        if (workoutTimerInterval) { clearInterval(workoutTimerInterval); workoutTimerInterval = null; } workoutTimerSeconds = 0; if(workoutTimerDisplay) workoutTimerDisplay.textContent = formatTime(0); if(startTimerBtn) startTimerBtn.disabled = false; if(stopTimerBtn) stopTimerBtn.disabled = true;
        loadDashboardData(); renderCalendar(); renderWorkoutHistory();
    });
    if(logRestDayBtnMain) logRestDayBtnMain.addEventListener('click', () => logRestDayPrompt());
    if(startFromRoutineActualBtn) startFromRoutineActualBtn.addEventListener('click', () => { const routines = getData(ROUTINES_STORAGE_KEY); if (routines.length > 0) { alert("Please select a routine from 'My Routines' tab or a Quick Start tile on the Dashboard for now! 😊 This button will have a selector soon!"); switchTab('routinesTab'); } else { alert("No routines available. Create one in 'My Routines' first! 💖"); switchTab('routinesTab'); }});
    if (createNewRoutineBtn) createNewRoutineBtn.addEventListener('click', () => showRoutineForm());
    if (cancelRoutineEditBtn) cancelRoutineEditBtn.addEventListener('click', hideRoutineForm);
    if (routineForm) routineForm.addEventListener('submit', handleSaveRoutine);
    if (addExerciseToRoutineBtn) addExerciseToRoutineBtn.addEventListener('click', addExerciseToCurrentRoutineData);
    if (prevMonthBtn) prevMonthBtn.addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1); renderCalendar(); });
    if (nextMonthBtn) nextMonthBtn.addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1); renderCalendar(); });
    if (addNewExerciseToLibBtn) addNewExerciseToLibBtn.addEventListener('click', () => showExerciseLibModal());
    if (closeExerciseLibModalBtn) closeExerciseLibModalBtn.addEventListener('click', () => hideExerciseLibModal());
    if (exerciseLibForm) exerciseLibForm.addEventListener('submit', handleSaveExerciseToLib);
    if (searchExerciseLibraryInput) searchExerciseLibraryInput.addEventListener('input', (e) => loadExerciseLibrary(e.target.value, filterMuscleGroupSelect ? filterMuscleGroupSelect.value : ""));
    if (filterMuscleGroupSelect) filterMuscleGroupSelect.addEventListener('change', (e) => loadExerciseLibrary(searchExerciseLibraryInput ? searchExerciseLibraryInput.value : "", e.target.value));
    if (logMeasurementForm) logMeasurementForm.addEventListener('submit', handleLogMeasurement);
    if (nutritionLogForm) nutritionLogForm.addEventListener('submit', handleLogNutrition);
    if (settingsForm) settingsForm.addEventListener('submit', (e) => { e.preventDefault(); saveUserSettings(); });
    if (exportDataBtn) exportDataBtn.addEventListener('click', exportAllData);
    if (importDataBtnAction && importDataFile) importDataBtnAction.addEventListener('click', () => { if(importDataFile.files.length > 0) importAllDataFile(importDataFile.files[0]); else alert("Please select a file first. 📁"); });
    if (clearAllDataBtn) clearAllDataBtn.addEventListener('click', clearAllLocalData);

    // --- Initial Page Load Setup ---
    function initializeApp() {
        console.log("🚀 Initializing Cute Workout Buddy! 🌸 v2.4");
        loadUserSettings(); prePopulateExerciseLibrary(); prePopulateRoutines();
        setDefaultLogDate(); setDefaultMeasurementDate(); setDefaultNutritionDate();
        loadExerciseLibrary(); populateMuscleGroupFilter(); populateExerciseSelectors();
        loadRoutines();
        const firstTabLink = document.querySelector('.tab-link[data-tab="dashboardTab"]');
        if (firstTabLink) { if (!firstTabLink.classList.contains('active')) { firstTabLink.click(); } else { loadDashboardData(); }
        } else { const fallbackFirstTab = document.querySelector('.tab-link'); if (fallbackFirstTab) fallbackFirstTab.click(); }
        console.log("🎉 App Initialized & Ready to Rock! Let's get those gains (or just have fun)! ✨");
    }

    initializeApp();
});
