document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const bodyElement = document.body;

    function applyTheme(theme) {
        // ... (Theme logic as before - keeping it concise here for overall script length)
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
    applyTheme(savedTheme || 'dark'); // Apply saved theme or default to dark
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            applyTheme(bodyElement.classList.contains('theme-light') ? 'dark' : 'light');
        });
    }

    // --- DOM Elements (Grouped by Tab/Functionality for clarity) ---
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
    const dashUpNextWorkoutEl = document.getElementById('dash-up-next-workout'); // ✨ New Idea element

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
    const workoutTimerDisplay = document.getElementById('workout-timer-display'); // ✨ New Idea element
    const startTimerBtn = document.getElementById('start-timer-btn'); // ✨ New Idea element
    const stopTimerBtn = document.getElementById('stop-timer-btn'); // ✨ New Idea element
    const resetTimerBtn = document.getElementById('reset-timer-btn'); // ✨ New Idea element

    // Routines
    const createNewRoutineBtn = document.getElementById('create-new-routine-btn');
    const routinesListContainer = document.getElementById('routines-list-container');
    const createEditRoutineSection = document.getElementById('create-edit-routine-section');
    // ... (other routine elements as before)

    // History
    const workoutHistoryContainer = document.getElementById('workout-history-container');
    // ... (calendar elements as before)

    // Exercise Library
    const addNewExerciseToLibBtn = document.getElementById('add-new-exercise-to-lib-btn');
    // ... (other exercise lib elements as before)

    // Measurements & Nutrition (elements as before)

    // --- Global State ---
    let activeWorkoutLog = []; // For current interactive workout log
    let currentSessionDate = null;
    let currentCalendarDate = new Date();
    let editingRoutineId = null;
    let currentRoutineExercisesData = [];
    let workoutTimerInterval = null; // ✨ For workout timer
    let workoutTimerSeconds = 0; // ✨ For workout timer
    let userSettings = {}; // ✨ For user preferences

    // --- LOCALSTORAGE KEYS (as before) ---
    const WORKOUT_STORAGE_KEY = 'cuteTrackerV2_workouts';
    const ROUTINES_STORAGE_KEY = 'cuteTrackerV2_routines';
    const EXERCISES_STORAGE_KEY = 'cuteTrackerV2_exercises';
    const MEASUREMENTS_STORAGE_KEY = 'cuteTrackerV2_measurements';
    const NUTRITION_STORAGE_KEY = 'cuteTrackerV2_nutrition';
    const SETTINGS_STORAGE_KEY = 'cuteTrackerV2_settings'; // ✨ New

    // --- Utility & LocalStorage Helpers (as before) ---
    function generateId() { /* ... */ return Date.now().toString(36) + Math.random().toString(36).substr(2, 5); }
    function getData(key, defaultValue = []) { /* ... */ const data = localStorage.getItem(key); try { return data ? JSON.parse(data) : defaultValue; } catch (e) { console.error(`Error parsing ${key}:`, e); return defaultValue; } }
    function saveData(key, data) { /* ... */ try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) { console.error(`Error saving ${key}:`, e); } }

    // ✨ Load User Settings ---
    function loadUserSettings() {
        userSettings = getData(SETTINGS_STORAGE_KEY, {
            weightUnit: 'kg', // Default 'kg' or 'lbs'
            measurementUnit: 'cm', // Default 'cm' or 'in'
            defaultKcalGoal: 2500,
            defaultProteinGoal: 150,
            smartDefaults: true // ✨ Enable smart defaults for exercises
        });
        // Apply units to relevant places in UI
        document.querySelectorAll('#user-weight-unit').forEach(el => el.textContent = userSettings.weightUnit);
        document.querySelectorAll('#user-measurement-unit').forEach(el => el.textContent = userSettings.measurementUnit);
        if(kcalGoalInput && !kcalGoalInput.value) kcalGoalInput.value = userSettings.defaultKcalGoal;
        if(proteinGoalInput && !proteinGoalInput.value) proteinGoalInput.value = userSettings.defaultProteinGoal;
    }
    function saveUserSettings() {
        saveData(SETTINGS_STORAGE_KEY, userSettings);
        loadUserSettings(); // Re-apply to UI
    }
    // TODO: Add a Settings Tab UI to modify userSettings

    // --- Tab Navigation Logic (as before, with calls to specific tab load functions) ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => { /* ... as before ... */
            // Ensure specific load functions are called
            const targetTabId = tab.getAttribute('data-tab');
            if (targetTabId === "dashboardTab") loadDashboardData();
            if (targetTabId === "historyTab") { renderCalendar(); renderWorkoutHistory(); }
            if (targetTabId === "routinesTab") { loadRoutines(); hideRoutineForm(); }
            if (targetTabId === "exercisesTab") { loadExerciseLibrary(); populateMuscleGroupFilter(); populateExerciseSelectors(); }
            // ... etc. for other tabs
        });
    });
    function switchTab(tabId) { /* ... as before ... */ }


    // --- ✨ Workout Timer Logic ---
    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        let timeString = "";
        if (hours > 0) timeString += `${String(hours).padStart(2, '0')}:`;
        timeString += `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        return timeString;
    }
    if (workoutTimerDisplay) workoutTimerDisplay.textContent = formatTime(0);

    if (startTimerBtn) startTimerBtn.addEventListener('click', () => {
        if (workoutTimerInterval) return; // Already running
        startTimerBtn.disabled = true;
        if(stopTimerBtn) stopTimerBtn.disabled = false;
        workoutTimerInterval = setInterval(() => {
            workoutTimerSeconds++;
            if (workoutTimerDisplay) workoutTimerDisplay.textContent = formatTime(workoutTimerSeconds);
        }, 1000);
    });
    if (stopTimerBtn) stopTimerBtn.addEventListener('click', () => {
        clearInterval(workoutTimerInterval);
        workoutTimerInterval = null;
        if(startTimerBtn) startTimerBtn.disabled = false;
        if(stopTimerBtn) stopTimerBtn.disabled = true;
        // Optionally auto-fill duration input
        if(workoutDurationInput && workoutTimerSeconds > 0) {
            workoutDurationInput.value = Math.round(workoutTimerSeconds / 60);
        }
    });
    if (resetTimerBtn) resetTimerBtn.addEventListener('click', () => {
        clearInterval(workoutTimerInterval);
        workoutTimerInterval = null;
        workoutTimerSeconds = 0;
        if (workoutTimerDisplay) workoutTimerDisplay.textContent = formatTime(0);
        if(startTimerBtn) startTimerBtn.disabled = false;
        if(stopTimerBtn) stopTimerBtn.disabled = true;
    });


    // --- Dashboard Logic ---
    function loadDashboardData() {
        // ... (Date display as before) ...
        if (dashboardDateEl) dashboardDateEl.textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        const todayStr = new Date().toISOString().split('T')[0];
        const workouts = getData(WORKOUT_STORAGE_KEY); // This contains workouts AND rest days
        const todayEntry = workouts.find(w => w.date === todayStr);

        if (dashWorkoutStatusEl) {
            if (todayEntry && todayEntry.type === "WORKOUT") dashWorkoutStatusEl.textContent = `Completed: ${todayEntry.name || 'Workout'} 💪`;
            else if (todayEntry && todayEntry.type === "REST_DAY") dashWorkoutStatusEl.textContent = "Rest Day Logged 😴";
            else dashWorkoutStatusEl.textContent = "Not Logged Yet 🤔";
        }

        const nutritionData = getData(NUTRITION_STORAGE_KEY);
        const todayNutrition = nutritionData.find(n => n.date === todayStr);
        if (todayNutrition) {
            if (dashKcalConsumedEl) dashKcalConsumedEl.textContent = todayNutrition.kcalConsumed || 0;
            if (dashKcalGoalEl) dashKcalGoalEl.textContent = todayNutrition.kcalGoal || userSettings.defaultKcalGoal;
            if (dashProteinConsumedEl) dashProteinConsumedEl.textContent = todayNutrition.proteinConsumed || 0;
            if (dashProteinGoalEl) dashProteinGoalEl.textContent = todayNutrition.proteinGoal || userSettings.defaultProteinGoal;
        } else {
            if (dashKcalConsumedEl) dashKcalConsumedEl.textContent = "0";
            if (dashKcalGoalEl) dashKcalGoalEl.textContent = userSettings.defaultKcalGoal;
            if (dashProteinConsumedEl) dashProteinConsumedEl.textContent = "0";
            if (dashProteinGoalEl) dashProteinGoalEl.textContent = userSettings.defaultProteinGoal;
        }

        // ✨ Calculate Streak (Simplified: consecutive days with any entry)
        let streak = 0;
        let currentDate = new Date();
        for (let i = 0; i < 365; i++) { // Check up to a year back
            const dateStr = currentDate.toISOString().split('T')[0];
            if (workouts.some(w => w.date === dateStr)) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }
        if (dashWorkoutStreakEl) dashWorkoutStreakEl.textContent = `${streak} days 🔥`;

        const lastWorkout = workouts.filter(w => w.type === "WORKOUT").sort((a,b) => new Date(b.date) - new Date(a.date))[0];
        if (dashLastWorkoutInfoEl) dashLastWorkoutInfoEl.textContent = lastWorkout ? `on ${new Date(lastWorkout.date+'T00:00:00').toLocaleDateString()}: ${lastWorkout.name}` : "Never 😲";

        // ✨ Up Next Workout (Placeholder - needs scheduling logic or pattern detection)
        if (dashUpNextWorkoutEl) {
            if (lastWorkout) {
                // Very simple: suggest next routine in sequence if routines exist
                const routines = getData(ROUTINES_STORAGE_KEY);
                if (routines.length > 0) {
                    const lastRoutineIndex = routines.findIndex(r => r.name === lastWorkout.name); // Simple name match
                    const nextRoutine = routines[(lastRoutineIndex + 1) % routines.length];
                    dashUpNextWorkoutEl.textContent = `Maybe ${nextRoutine.name} today? 😉`;
                } else {
                    dashUpNextWorkoutEl.textContent = "Time for another great workout! 🚀";
                }
            } else {
                 dashUpNextWorkoutEl.textContent = "Ready for your first workout? 🎉";
            }
        }


        const quotes = ["Believe in your #selfie! 🤳", "You're stronger than you think! ✨", "Every rep counts! 💖", "Make today awesome! 🌟", "Be your own hero! 🦸‍♀️"];
        if (dashMotivationQuoteEl) dashMotivationQuoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];

        populateQuickStartWorkouts();
        // ... (Dashboard button event listeners as before) ...
        if(dashLogWorkoutBtn) dashLogWorkoutBtn.onclick = () => switchTab('logWorkoutTab');
        if(dashStartRoutineBtn) dashStartRoutineBtn.onclick = () => { switchTab('routinesTab'); /* TODO: Maybe open a "select routine" modal */ };
        if(dashLogRestDayBtn) dashLogRestDayBtn.onclick = () => { logRestDayPrompt(new Date().toISOString().split('T')[0]); };
        if(dashLogNutritionBtn) dashLogNutritionBtn.onclick = () => switchTab('nutritionTab');
        if(dashLogMeasurementBtn) dashLogMeasurementBtn.onclick = () => switchTab('measurementsTab');
    }

    function populateQuickStartWorkouts() { /* ... (as before, but ensure it works) ... */
        if (!quickStartGrid) return;
        quickStartGrid.innerHTML = '';
        const routines = getData(ROUTINES_STORAGE_KEY);
        const routinesToShow = routines.slice(0, 4);
        if (routinesToShow.length === 0) {
            quickStartGrid.innerHTML = '<p>Create some routines in "My Routines" to see them here! 😊</p>'; return;
        }
        routinesToShow.forEach(routine => {
            const tile = document.createElement('button');
            tile.className = 'quick-start-tile';
            tile.dataset.routineId = routine.id;
            tile.innerHTML = `<h4>${routine.name}</h4><p>${routine.description || `${routine.exercises.length} exercises`}</p><i class="fas fa-chevron-circle-right"></i>`;
            tile.onclick = () => startWorkoutFromRoutine(routine.id);
            quickStartGrid.appendChild(tile);
        });
    }


    // --- Log Workout/Session Tab Logic (Streamlined interactive logging) ---
    function setDefaultLogDate() { /* ... (as before) ... */ }

    if(exerciseForm) exerciseForm.addEventListener('submit', function(event) {
        // ... (Form submission for one-off exercises, adding to activeWorkoutLog)
        // ... (Ensure it uses the new renderActiveWorkoutLogDOM structure)
        event.preventDefault();
        const date = workoutDateInput.value;
        const exerciseNameVal = exerciseNameInput.value.trim();
        const setsVal = document.getElementById('sets').value;
        const repsVal = document.getElementById('reps').value.trim(); // For target reps
        const notesVal = document.getElementById('exercise-notes').value.trim();

        if (!date || !exerciseNameVal || !setsVal || !repsVal) {
            alert('Oops! Please fill in Date, Exercise Name, Target Sets, and Target Reps. 💖'); return;
        }
        // ... (Session date handling as before) ...
        if (activeWorkoutLog.length === 0) { // First exercise of a custom session
           currentSessionDate = date;
           const workoutName = workoutSessionNameInput.value.trim();
           if (currentWorkoutDateDisplay) currentWorkoutDateDisplay.textContent = `Date: ${new Date(date + 'T00:00:00').toLocaleDateString()}`;
           if (currentWorkoutNameDisplay) currentWorkoutNameDisplay.textContent = workoutName ? `Name: ${workoutName}` : '';
        } else if (date !== currentSessionDate) {
           alert("Date changed! Current session is under the first date. Save to start a new one. 😊");
           workoutDateInput.value = currentSessionDate; return;
        }

        const numSets = parseInt(setsVal) || 1;
        const setsData = [];
        for (let i = 0; i < numSets; i++) {
            setsData.push({ setNumber: i + 1, weight: '', reps: '', completed: false });
        }
        const newExerciseLog = {
            id: generateId(), name: exerciseNameVal,
            targetSets: setsVal, targetReps: repsVal,
            loggedSets: setsData, notes: notesVal
        };
        activeWorkoutLog.push(newExerciseLog);
        renderActiveWorkoutLogDOM();
        // Clear only the one-off exercise specific fields
        exerciseNameInput.value = ''; document.getElementById('sets').value = '';
        document.getElementById('reps').value = ''; document.getElementById('weight').value = ''; // Weight from form is not used for sets
        document.getElementById('exercise-notes').value = '';
        exerciseNameInput.focus();
        if (finishWorkoutBtn) finishWorkoutBtn.style.display = 'block';
    });

    function renderActiveWorkoutLogDOM() {
        // ... (Interactive set logging DOM creation and event listeners as defined in previous response) ...
        // ... (Ensure it uses activeWorkoutLog)
        if (!loggedExercisesList) return;
        loggedExercisesList.innerHTML = "";

        activeWorkoutLog.forEach((exercise, exerciseIndex) => {
            const exerciseLi = document.createElement('li');
            exerciseLi.className = 'active-workout-exercise';
            exerciseLi.dataset.exerciseIndex = exerciseIndex;

            let exerciseHtml = `
                <div class="exercise-header">
                    <strong>${exercise.name}</strong>
                    <span>Target: ${exercise.targetSets} sets, ${exercise.targetReps} reps</span>
                </div>
                <div class="sets-container">`;

            exercise.loggedSets.forEach((set, setIndex) => {
                // ✨ Smart Default: Pre-fill weight/reps from last time this exercise was done
                let lastPerfWeight = ""; let lastPerfReps = "";
                if(userSettings.smartDefaults) {
                    const lastTimeDone = findLastPerformance(exercise.name, set.setNumber);
                    if (lastTimeDone) {
                        lastPerfWeight = lastTimeDone.weight;
                        lastPerfReps = lastTimeDone.reps;
                    }
                }

                exerciseHtml += `
                    <div class="set-row ${set.completed ? 'completed' : ''}" data-set-index="${setIndex}">
                        <span class="set-number">Set ${set.setNumber}:</span>
                        <input type="number" class="set-weight-input" placeholder="Wt (${userSettings.weightUnit})" value="${set.weight || lastPerfWeight}" title="Weight">
                        <input type="text" class="set-reps-input" placeholder="Reps" value="${set.reps || lastPerfReps}" title="Reps">
                        <button class="log-set-btn" title="Log this set">${set.completed ? '<i class="fas fa-check-circle"></i> Done!' : '<i class="far fa-circle"></i> Log'}</button>
                    </div>`;
            });
            exerciseHtml += `</div>
                <div class="exercise-actions-footer">
                    <textarea class="exercise-session-notes" placeholder="Notes for ${exercise.name}... ✏️">${exercise.notes}</textarea>
                    <button class="remove-exercise-from-log-btn" title="Remove this exercise"><i class="fas fa-times"></i></button>
                </div>`;
            exerciseLi.innerHTML = exerciseHtml;

            // Event listeners (input, log-set-btn, notes, remove-exercise-btn)
            // ... (Copied from previous detailed response, ensure they update activeWorkoutLog[exerciseIndex].loggedSets[setIndex] etc.)
            const setsContainer = exerciseLi.querySelector('.sets-container');
            setsContainer.addEventListener('input', (e) => { /* ... update activeWorkoutLog ... */
                const setRow = e.target.closest('.set-row'); if (!setRow) return;
                const currentSetIndex = parseInt(setRow.dataset.setIndex);
                if (e.target.classList.contains('set-weight-input')) activeWorkoutLog[exerciseIndex].loggedSets[currentSetIndex].weight = e.target.value;
                else if (e.target.classList.contains('set-reps-input')) activeWorkoutLog[exerciseIndex].loggedSets[currentSetIndex].reps = e.target.value;
            });
            setsContainer.addEventListener('click', (e) => { /* ... toggle set.completed, update button text ... */
                const logButton = e.target.closest('.log-set-btn'); if(!logButton) return;
                const setRow = logButton.closest('.set-row');
                const currentSetIndex = parseInt(setRow.dataset.setIndex);
                const currentSet = activeWorkoutLog[exerciseIndex].loggedSets[currentSetIndex];
                if (currentSet.weight && currentSet.reps) {
                    currentSet.completed = !currentSet.completed;
                    setRow.classList.toggle('completed', currentSet.completed);
                    logButton.innerHTML = currentSet.completed ? '<i class="fas fa-check-circle"></i> Done!' : '<i class="far fa-circle"></i> Log';
                } else if (currentSet.completed) { /* Allow un-completing */
                    currentSet.completed = false; setRow.classList.remove('completed');
                    logButton.innerHTML = '<i class="far fa-circle"></i> Log';
                } else { alert("Please enter weight and reps for this set first! 😊"); }
            });
            exerciseLi.querySelector('.exercise-session-notes').oninput = (e) => activeWorkoutLog[exerciseIndex].notes = e.target.value;
            exerciseLi.querySelector('.remove-exercise-from-log-btn').onclick = () => {
                if(confirm(`Remove ${exercise.name} from this workout? 🤔`)){
                    activeWorkoutLog.splice(exerciseIndex, 1); renderActiveWorkoutLogDOM();
                    if (activeWorkoutLog.length === 0 && finishWorkoutBtn) finishWorkoutBtn.style.display = 'none';
                }
            };
            loggedExercisesList.appendChild(exerciseLi);
        });
    }

    // ✨ Smart Default Helper: Find last performance of an exercise for a specific set number
    function findLastPerformance(exerciseName, setNumberTarget) {
        const allWorkouts = getData(WORKOUT_STORAGE_KEY).filter(w => w.type === "WORKOUT");
        for (let i = 0; i < allWorkouts.length; i++) { // Iterate recent first
            const session = allWorkouts[i];
            const exerciseLog = session.exercises.find(ex => ex.name === exerciseName);
            if (exerciseLog && exerciseLog.log && exerciseLog.log.length >= setNumberTarget) {
                return exerciseLog.log[setNumberTarget - 1]; // setNumberTarget is 1-indexed
            }
        }
        return null;
    }


    if (finishWorkoutBtn) finishWorkoutBtn.addEventListener('click', function() {
        // ... (Saving logic using activeWorkoutLog, creating processedExercisesForSaving)
        // ... (as defined in previous response, ensure unit is included in processedExercisesForSaving)
        if (activeWorkoutLog.length === 0) { alert("No exercises logged. Add some magic! ✨"); return; }
        if (!currentSessionDate) { alert("Oops, please ensure a date is set for this session! 📅"); return; }
        const sessionName = workoutSessionNameInput.value.trim();
        const duration = workoutDurationInput.value.trim() || (workoutTimerSeconds > 0 ? Math.round(workoutTimerSeconds / 60) : null);

        const processedExercisesForSaving = activeWorkoutLog.map(exercise => {
           const completedSets = exercise.loggedSets.filter(set => set.completed && set.weight && set.reps);
           if (completedSets.length === 0) return null;
           return {
               name: exercise.name, setsPerformed: completedSets.length,
               log: completedSets.map(s => ({ weight: s.weight, reps: s.reps })),
               unit: userSettings.weightUnit, // ✨ Use user's preferred unit for saving
               notes: exercise.notes || ""
           };
        }).filter(ex => ex !== null);

        if (processedExercisesForSaving.length === 0) {
           alert("No actual sets were logged with weight and reps. Please log some sets! 💪"); return;
        }
        const newWorkoutSession = {
           id: generateId(), date: currentSessionDate, name: sessionName || "My Awesome Workout 💪",
           duration: duration ? parseInt(duration) : null, type: "WORKOUT", exercises: processedExercisesForSaving
        };
        const allWorkouts = getData(WORKOUT_STORAGE_KEY);
        allWorkouts.push(newWorkoutSession);
        allWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date));
        saveData(WORKOUT_STORAGE_KEY, allWorkouts);
        alert("Workout saved! You're amazing! 🥳");

        // ✨ Confetti Time! (Placeholder - requires a library like 'canvas-confetti')
        // if (typeof confetti === 'function') { confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } }); }

        resetLogFormAndSession();
        // Stop and reset timer if it was running
        if (workoutTimerInterval) { clearInterval(workoutTimerInterval); workoutTimerInterval = null; }
        workoutTimerSeconds = 0; if(workoutTimerDisplay) workoutTimerDisplay.textContent = formatTime(0);
        if(startTimerBtn) startTimerBtn.disabled = false; if(stopTimerBtn) stopTimerBtn.disabled = true;

        loadDashboardData(); renderCalendar(); renderWorkoutHistory();
    });

    function resetLogFormAndSession() { /* ... (as before, clears activeWorkoutLog) ... */ }
    function logRestDayPrompt(dateToLog = null) { /* ... (as before) ... */ }
    if(logRestDayBtnMain) logRestDayBtnMain.addEventListener('click', () => logRestDayPrompt());

    // --- Routines Tab Logic (Largely as before, ensure startWorkoutFromRoutine uses new active log) ---
    // ... (showRoutineForm, hideRoutineForm, addExerciseToCurrentRoutineData, renderCurrentRoutineExercisesDOM, handleSaveRoutine, loadRoutines, deleteRoutine) ...
    // Make sure startWorkoutFromRoutine is updated:
    function startWorkoutFromRoutine(routineId) {
        const routines = getData(ROUTINES_STORAGE_KEY);
        const routine = routines.find(r => r.id === routineId);
        if (!routine) { alert("Oopsie! Routine not found. 👻"); return; }
        resetLogFormAndSession();
        switchTab('logWorkoutTab');
        currentSessionDate = new Date().toISOString().split('T')[0];
        setDefaultLogDate();
        if (workoutSessionNameInput) workoutSessionNameInput.value = routine.name;
        if (currentWorkoutDateDisplay) currentWorkoutDateDisplay.textContent = `Date: ${new Date(currentSessionDate + 'T00:00:00').toLocaleDateString()}`;
        if (currentWorkoutNameDisplay) currentWorkoutNameDisplay.textContent = `Name: ${routine.name}`;

        activeWorkoutLog = routine.exercises.map(exerciseFromRoutine => {
           const numSets = parseInt(exerciseFromRoutine.sets) || 1;
           const setsData = [];
           for (let i = 0; i < numSets; i++) {
               setsData.push({ setNumber: i + 1, weight: '', reps: '', completed: false });
           }
           return {
               routineExerciseId: exerciseFromRoutine.id, name: exerciseFromRoutine.name,
               targetSets: exerciseFromRoutine.sets, targetReps: exerciseFromRoutine.reps,
               loggedSets: setsData, notes: "", unit: userSettings.weightUnit // ✨ Add default unit
           };
        });
        renderActiveWorkoutLogDOM();
        if (finishWorkoutBtn && activeWorkoutLog.length > 0) finishWorkoutBtn.style.display = 'block';
        alert(`Let's go! 💪 Routine "${routine.name}" loaded. Fill in your sets!`);
    }
    if(startFromRoutineActualBtn) startFromRoutineActualBtn.onclick = () => { /* ... as before ... */ };


    // --- History Tab Logic (Calendar & Session List - with more interactive calendar idea) ---
    function renderCalendar() {
        // ... (Calendar DOM generation as before) ...
        // ✨ Enhancement: Add tooltip on hover for days with workouts
        // Inside the loop for `if (entriesOnThisDay.length > 0)`:
        // dayCell.onmouseenter = (event) => showCalendarTooltip(event, entriesOnThisDay);
        // dayCell.onmouseleave = hideCalendarTooltip;
        // ...
        if (!calendarGridContainer) return;
        calendarGridContainer.innerHTML = '';
        const year = currentCalendarDate.getFullYear();
        const month = currentCalendarDate.getMonth();
        if (calendarMonthYearDisplay) calendarMonthYearDisplay.textContent = `${currentCalendarDate.toLocaleString('default', { month: 'long' })} ${year} 🗓️`;
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => { /* ... add headers ... */ });
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const allEntries = getData(WORKOUT_STORAGE_KEY);
        for (let i = 0; i < firstDayOfMonth; i++) { /* ... add empty cells ... */ }

        for (let day = 1; day <= daysInMonth; day++) {
            // ... (dayCell creation, today check as before) ...
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
                if (isRestDay) { dayCell.classList.add('rest-day'); indicator.innerHTML = '😴'; }
                else { indicator.innerHTML = '💪'; }
                indicator.style.backgroundColor = 'transparent'; indicator.style.fontSize = '1.2em';
                dayCell.appendChild(indicator);
                dayCell.dataset.date = currentDateString;
                dayCell.title = isRestDay ? `Rest Day 😌` : `${entriesOnThisDay.filter(e=>e.type !== "REST_DAY").length} workout(s) 🔥`;
                dayCell.onclick = () => { /* ... scroll to session ... */ };
                // ✨ Tooltip on hover
                dayCell.onmouseenter = (e) => showCalendarTooltip(e, entriesOnThisDay);
                dayCell.onmouseleave = hideCalendarTooltip;
            }
            calendarGridContainer.appendChild(dayCell);
        }
        // ... (Fill remaining cells) ...
    }
    // ✨ Calendar Tooltip Functions
    let calendarTooltip;
    function showCalendarTooltip(event, entries) {
        hideCalendarTooltip(); // Remove existing
        calendarTooltip = document.createElement('div');
        calendarTooltip.className = 'calendar-tooltip'; // Style this
        let content = `<strong>${new Date(entries[0].date+'T00:00:00').toLocaleDateString()}</strong><hr>`;
        entries.forEach(entry => {
            if (entry.type === "REST_DAY") content += `<p>😴 Rest Day</p>`;
            else content += `<p>💪 ${entry.name || 'Workout'}</p>`;
        });
        calendarTooltip.innerHTML = content;
        document.body.appendChild(calendarTooltip);
        // Position tooltip (simple version, can be improved)
        const rect = event.target.getBoundingClientRect();
        calendarTooltip.style.left = `${rect.left + window.scrollX}px`;
        calendarTooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
    }
    function hideCalendarTooltip() {
        if (calendarTooltip) { calendarTooltip.remove(); calendarTooltip = null; }
    }

    if (prevMonthBtn) prevMonthBtn.addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1); renderCalendar(); });
    if (nextMonthBtn) nextMonthBtn.addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1); renderCalendar(); });

    function renderWorkoutHistory() {
        // ... (Render history using new `ex.log` structure from processed workout data) ...
        // ... (This part needs to parse `ex.log` which is an array of {weight, reps})
        if (!workoutHistoryContainer) return;
        const allEntries = getData(WORKOUT_STORAGE_KEY);
        workoutHistoryContainer.innerHTML = '';
        if (allEntries.length === 0) { /* ... no entries message ... */ return; }
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
                if(entry.name && entry.name !== "My Awesome Workout 💪") sessionHtml += `<p class="session-title-history">${entry.name}</p>`;
                if(entry.duration) sessionHtml += `<p class="session-duration-history">Duration: ${entry.duration} mins ⏱️</p>`;
                sessionHtml += '<ul class="history-exercise-list">';
                entry.exercises.forEach(ex => {
                    sessionHtml += `<li class="history-exercise-item"><strong>${ex.name}</strong> (${ex.setsPerformed} sets performed)`;
                    if (ex.log && ex.log.length > 0) {
                        ex.log.forEach((setLog, index) => {
                            sessionHtml += `<div><small>Set ${index + 1}: ${setLog.reps} reps @ ${setLog.weight} ${ex.unit || userSettings.weightUnit}</small></div>`;
                        });
                    }
                    if (ex.notes) sessionHtml += `<em>Notes: ${ex.notes}</em>`;
                    sessionHtml += `</li>`;
                });
                sessionHtml += '</ul>';
            }
            sessionDiv.innerHTML = sessionHtml;
            workoutHistoryContainer.appendChild(sessionDiv);
        });
    }

    // --- Exercise Library Tab Logic (with pre-population) ---
    // ... (showExerciseLibModal, hideExerciseLibModal, handleSaveExerciseToLib, loadExerciseLibrary, deleteExerciseFromLib, populateMuscleGroupFilter, populateExerciseSelectors as before)
    // Ensure prePopulateExerciseLibrary and prePopulateRoutines are called in initializeApp
    function prePopulateExerciseLibrary() { /* ... (as before, with your exercises) ... */ }
    function prePopulateRoutines() { /* ... (as before, with your 4 routines) ... */ }


    // --- Body Measurements & Nutrition Tab Logic (mostly as before, stubs for advanced features) ---
    // ... (setDefaultMeasurementDate, handleLogMeasurement, loadMeasurements, handlePhotoUpload, loadProgressPhotos) ...
    // ... (setDefaultNutritionDate, handleLogNutrition, loadNutritionData) ...


    // --- Initial Page Load Setup ---
    function initializeApp() {
        loadUserSettings(); // ✨ Load settings first

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

        renderCalendar();
        renderWorkoutHistory();

        loadDashboardData();

        const firstTab = document.querySelector('.tab-link[data-tab="dashboardTab"]');
        if (firstTab) firstTab.click();
        else {
            const fallbackFirstTab = document.querySelector('.tab-link');
            if(fallbackFirstTab) fallbackFirstTab.click();
        }
    }

    initializeApp();
});
