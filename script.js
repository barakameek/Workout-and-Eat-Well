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

    // --- Progress Tab Elements ---
    const progressExerciseSelect = document.getElementById('progress-exercise-select');
    const prTableBody = document.querySelector('#pr-table tbody');
    const maxWeightCanvas = document.getElementById('maxWeightChart');
    const e1rmCanvas = document.getElementById('e1rmChart');
    const volumeCanvas = document.getElementById('volumeChart');


    // --- Global State for Current Workout ---
    let currentWorkoutExercises = []; // Array to hold exercises for the current session before saving
    let currentSessionDate = null;

    // --- Chart Instances (to be initialized later) ---
    let maxWeightChartInstance = null;
    let e1rmChartInstance = null;
    let volumeChartInstance = null;

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

            // If switching to progress tab, and an exercise is selected, refresh charts
            if (targetTabId === "progressTab") {
                // Ensure select is populated if it's empty and data exists
                if (progressExerciseSelect.options.length <= 1 && getAllWorkouts().length > 0) {
                    populateProgressExerciseSelect();
                }
                if (progressExerciseSelect.value) {
                    updateAllCharts(progressExerciseSelect.value);
                    displayPersonalRecords(progressExerciseSelect.value);
                } else {
                    clearCharts();
                    clearPRTable();
                }
            } else if (targetTabId === "historyTab") {
                renderWorkoutHistory(); // Refresh history view when tab is clicked
            }
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
            id: Date.now() + Math.random(), // More unique ID
            name: exerciseName,
            sets: parseInt(sets),
            reps: reps, // Store original reps string (e.g., "8-10" or "12")
            actualReps: actualRepsParsed, // Store parsed single rep number if available
            weight: parseFloat(weight) || 0,
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
        li.dataset.id = exercise.id;

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
            const exerciseIdToRemove = parseFloat(li.dataset.id); // Ensure type consistency
            currentWorkoutExercises = currentWorkoutExercises.filter(ex => ex.id !== exerciseIdToRemove);
            li.remove();
            if (currentWorkoutExercises.length === 0) {
                finishWorkoutBtn.style.display = 'none';
                currentWorkoutDateDisplay.textContent = '';
                currentSessionDate = null;
                setDefaultDate();
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
            id: Date.now(),
            date: currentSessionDate,
            exercises: [...currentWorkoutExercises]
        };

        const allWorkouts = getAllWorkouts();
        allWorkouts.push(newWorkoutSession);
        allWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
        saveAllWorkouts(allWorkouts);

        alert("Workout finished and saved successfully!");

        // Reset current workout state
        currentWorkoutExercises = [];
        loggedExercisesList.innerHTML = '';
        currentWorkoutDateDisplay.textContent = '';
        finishWorkoutBtn.style.display = 'none';
        currentSessionDate = null;
        setDefaultDate();

        // Refresh other views that depend on this data
        renderWorkoutHistory(); // Update history tab
        populateProgressExerciseSelect(); // Update exercise dropdown in progress tab

        // Clear or update charts in progress tab
        if (progressExerciseSelect.value) { // If an exercise was selected
            updateAllCharts(progressExerciseSelect.value);
            displayPersonalRecords(progressExerciseSelect.value);
        } else {
            clearCharts();
            clearPRTable();
        }
    });

    // --- History Tab Logic ---
    function renderWorkoutHistory() {
        const allWorkouts = getAllWorkouts();
        workoutHistoryContainer.innerHTML = '';

        if (allWorkouts.length === 0) {
            workoutHistoryContainer.innerHTML = '<p>No workouts saved yet. Log a workout and click "Finish & Save Workout".</p>';
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

        const currentSelectedValue = progressExerciseSelect.value; // Preserve selection if possible
        progressExerciseSelect.innerHTML = '<option value="">-- Select an Exercise --</option>';
        Array.from(uniqueExerciseNames).sort().forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            progressExerciseSelect.appendChild(option);
        });
        // Try to re-select previously selected exercise
        if (uniqueExerciseNames.has(currentSelectedValue)) {
            progressExerciseSelect.value = currentSelectedValue;
        } else if (progressExerciseSelect.options.length > 1) {
            // If previous selection gone, clear charts if new list has items
             clearCharts(); clearPRTable();
        }
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
                    let repsForCalc = null;
                    if (ex.actualReps !== undefined && ex.actualReps !== null && !isNaN(parseInt(ex.actualReps))) {
                        repsForCalc = parseInt(ex.actualReps);
                    } else if (typeof ex.reps === 'string') {
                        if (!ex.reps.includes('-')) {
                            const parsed = parseInt(ex.reps);
                            if(!isNaN(parsed)) repsForCalc = parsed;
                        } else {
                            const parts = ex.reps.split('-');
                            if (parts.length === 2) {
                                const parsedPart = parseInt(parts[1].trim()); // Use highest of range for potential
                                if(!isNaN(parsedPart)) repsForCalc = parsedPart;
                            }
                        }
                    } else if (typeof ex.reps === 'number' && !isNaN(ex.reps)) {
                        repsForCalc = ex.reps;
                    }

                    if (ex.weight > 0 && repsForCalc !== null && repsForCalc > 0) {
                        exerciseEntries.push({
                            date: session.date,
                            weight: ex.weight,
                            reps: repsForCalc,
                            sets: ex.sets,
                            unit: ex.unit
                        });
                    }
                }
            });
        });
        return exerciseEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    function calculateE1RM(weight, reps) {
        if (!reps || reps <= 0 || !weight || weight <=0) return 0;
        if (reps === 1) return weight;
        return weight * (1 + (reps / 30)); // Epley formula
    }

    function updateAllCharts(exerciseName) {
        const data = getExerciseDataForProgress(exerciseName);
        if (!data || data.length === 0) {
            console.warn(`No chartable data found for ${exerciseName}. Ensure entries have weight > 0 and valid reps.`);
            clearCharts();
            return;
        }
        renderMaxWeightChart(data);
        renderE1RMChart(data);
        renderVolumeChart(data);
    }

    function createChartConfig(labels, datasetsData, yAxisLabel) {
        const defaultColors = ['#00c6fb', '#28a745', '#ffc107', '#6f42c1', '#fd7e14'];
        datasetsData.forEach((dataset, index) => {
            dataset.borderColor = dataset.borderColor || defaultColors[index % defaultColors.length];
            dataset.backgroundColor = dataset.backgroundColor || (dataset.borderColor + '80'); // For bar/area charts
            dataset.pointBackgroundColor = dataset.borderColor;
            dataset.pointBorderColor = '#fff';
            dataset.pointHoverBackgroundColor = '#fff';
            dataset.pointHoverBorderColor = dataset.borderColor;
        });

        return {
            type: 'line',
            data: { labels: labels, datasets: datasetsData },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: { display: true, text: 'Date', color: '#e0e0e0' },
                        ticks: { color: '#b0b0b0' },
                        grid: { color: '#3a3f4b' }
                    },
                    y: {
                        title: { display: true, text: yAxisLabel, color: '#e0e0e0' },
                        ticks: { color: '#b0b0b0' },
                        grid: { color: '#3a3f4b' },
                        beginAtZero: false
                    }
                },
                plugins: {
                    legend: { labels: { color: '#e0e0e0'} },
                    tooltip: {
                        backgroundColor: '#1f232a', // Darker tooltip
                        titleColor: '#00c6fb', // Accent for title
                        bodyColor: '#e0e0e0',
                        borderColor: '#3a3f4b',
                        borderWidth: 1,
                        padding: 10,
                        cornerRadius: 4,
                        boxPadding: 3
                    }
                }
            }
        };
    }

    function renderMaxWeightChart(data) {
        if (maxWeightChartInstance) maxWeightChartInstance.destroy();
        const labels = data.map(d => new Date(d.date + 'T00:00:00').toLocaleDateString());
        const weights = data.map(d => d.weight);
        const unit = data.length > 0 ? data[0].unit : 'units';

        maxWeightChartInstance = new Chart(maxWeightCanvas,
            createChartConfig(labels, [{
                label: `Weight Lifted (${unit})`,
                data: weights,
                tension: 0.1
            }], `Weight (${unit})`)
        );
    }

    function renderE1RMChart(data) {
        if (e1rmChartInstance) e1rmChartInstance.destroy();
        const labels = data.map(d => new Date(d.date + 'T00:00:00').toLocaleDateString());
        const e1rms = data.map(d => parseFloat(calculateE1RM(d.weight, d.reps).toFixed(2)));
        const unit = data.length > 0 ? data[0].unit : 'units';

        e1rmChartInstance = new Chart(e1rmCanvas,
            createChartConfig(labels, [{
                label: `Estimated 1RM (${unit})`,
                data: e1rms,
                borderColor: '#28a745', // Different color
                tension: 0.1
            }], `e1RM (${unit})`)
        );
    }

    function renderVolumeChart(data) {
        if (volumeChartInstance) volumeChartInstance.destroy();
        const labels = data.map(d => new Date(d.date + 'T00:00:00').toLocaleDateString());
        const volumes = data.map(d => d.sets * d.reps * d.weight);
        const unitSuffix = data.length > 0 ? data[0].unit : 'units';
        const yAxisLabel = `Total Volume (Weight x Reps x Sets)`;

        const config = createChartConfig(labels, [{
            label: `Session Volume (${unitSuffix})`,
            data: volumes,
            type: 'bar', // Bar chart for volume
            borderColor: '#ffc107', // Different color
            backgroundColor: '#ffc107' + '80'
        }], yAxisLabel);

        config.options.scales.y.beginAtZero = true; // Volume charts usually start at zero
        volumeChartInstance = new Chart(volumeCanvas, config);
    }

    function displayPersonalRecords(exerciseName) {
        const allWorkouts = getAllWorkouts();
        const prs = {};

        allWorkouts.forEach(session => {
            session.exercises.forEach(ex => {
                if (ex.name === exerciseName && ex.weight > 0) {
                    let repsForPR = null;
                    if (ex.actualReps !== undefined && ex.actualReps !== null && !isNaN(parseInt(ex.actualReps))) {
                        repsForPR = parseInt(ex.actualReps);
                    } else if (typeof ex.reps === 'string' && !ex.reps.includes('-')) {
                         const parsed = parseInt(ex.reps);
                         if(!isNaN(parsed)) repsForPR = parsed;
                    } else if (typeof ex.reps === 'number' && !isNaN(ex.reps)){
                        repsForPR = ex.reps;
                    }
                    // For PRs, we typically don't consider ranges unless a specific rep count was achieved.
                    // If a range was logged like "3-5", a PR is usually for 3, 4, or 5 reps specifically.
                    // So, only use actualReps or single rep values.

                    if (repsForPR !== null && repsForPR > 0) {
                        if (!prs[repsForPR] || ex.weight > prs[repsForPR].weight ||
                            (ex.weight === prs[repsForPR].weight && new Date(session.date) > new Date(prs[repsForPR].date))) {
                            prs[repsForPR] = { weight: ex.weight, date: session.date, unit: ex.unit };
                        }
                    }
                }
            });
        });

        prTableBody.innerHTML = '';
        const repCountsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20];
        let prsFound = false;
        repCountsToShow.forEach(rc => {
            const prData = prs[rc];
            const row = prTableBody.insertRow();
            row.insertCell().textContent = `${rc} Rep Max`;
            if (prData) {
                row.insertCell().textContent = `${prData.weight} ${prData.unit}`;
                row.insertCell().textContent = new Date(prData.date + 'T00:00:00').toLocaleDateString();
                prsFound = true;
            } else {
                row.insertCell().textContent = '-';
                row.insertCell().textContent = '-';
            }
        });
        if (!prsFound) {
             prTableBody.innerHTML = '<tr><td colspan="3">No PRs recorded for this exercise for these rep counts. Ensure exact rep counts are logged.</td></tr>';
        }
    }

    function clearCharts() {
        if (maxWeightChartInstance) { maxWeightChartInstance.destroy(); maxWeightChartInstance = null; }
        if (e1rmChartInstance) { e1rmChartInstance.destroy(); e1rmChartInstance = null; }
        if (volumeChartInstance) { volumeChartInstance.destroy(); volumeChartInstance = null; }
    }

    function clearPRTable() {
        if (prTableBody) { // Check if element exists
            prTableBody.innerHTML = '<tr><td colspan="3">Select an exercise to view PRs.</td></tr>';
        }
    }

    // --- Initial Page Load Setup ---
    setDefaultDate(); // Set initial date for log form
    renderWorkoutHistory(); // Load and display any saved workouts
    populateProgressExerciseSelect(); // Populate exercise dropdown for progress tab
    clearPRTable(); // Ensure PR table is clear initially
    clearCharts(); // Ensure charts are clear initially

    // Set the first tab ("Log Workout") as active on initial load
    const firstTab = document.querySelector('.tab-link[data-tab="logWorkoutTab"]');
    const firstTabContent = document.getElementById('logWorkoutTab');
    if (firstTab && firstTabContent) {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        firstTab.classList.add('active');
        firstTabContent.classList.add('active');
    }
});
