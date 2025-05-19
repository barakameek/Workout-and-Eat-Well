document.addEventListener('DOMContentLoaded', () => {
    const exerciseForm = document.getElementById('log-exercise-form');
    const loggedExercisesList = document.getElementById('logged-exercises-list');
    const workoutDateInput = document.getElementById('workout-date');
    const currentWorkoutDateDisplay = document.getElementById('current-workout-date-display');
    const finishWorkoutBtn = document.getElementById('finish-workout-btn');

    let currentWorkoutSessionDate = null; // To store the date of the current workout session

    exerciseForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission (page reload)

        // Get values from the form
        const date = workoutDateInput.value;
        const exerciseName = document.getElementById('exercise-name').value.trim();
        const sets = document.getElementById('sets').value;
        const reps = document.getElementById('reps').value.trim();
        const weight = document.getElementById('weight').value;
        const weightUnit = document.getElementById('weight-unit').value;
        const notes = document.getElementById('exercise-notes').value.trim();

        // Basic validation
        if (!date || !exerciseName || !sets || !reps) {
            alert('Please fill in all required fields (Date, Exercise Name, Sets, Reps).');
            return;
        }

        // Set or update the displayed workout session date
        if (!currentWorkoutSessionDate || loggedExercisesList.children.length === 0) {
            currentWorkoutSessionDate = date;
            const formattedDate = new Date(date + 'T00:00:00'); // Ensure correct date parsing
            currentWorkoutDateDisplay.textContent = `Workout Date: ${formattedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`;
        } else if (date !== currentWorkoutSessionDate && loggedExercisesList.children.length > 0) {
            // Optional: Alert user if they change date mid-session, or handle new session logic
            // For now, we'll just proceed. The individual exercise logs will have their own dates if saved.
        }


        const exerciseData = {
            // We'll store the date with each exercise internally if we save them later
            // For now, we're just using it for the overall session display.
            name: exerciseName,
            sets: sets,
            reps: reps,
            weight: weight,
            unit: weightUnit,
            notes: notes
        };

        addExerciseToDOM(exerciseData);
        exerciseForm.reset(); // Clear the form fields
        document.getElementById('exercise-name').focus(); // Focus back on exercise name for quick entry

        // Show the "Finish Workout" button if it's hidden
        if (finishWorkoutBtn.style.display === 'none') {
            finishWorkoutBtn.style.display = 'block';
        }
    });

    function addExerciseToDOM(exercise) {
        const li = document.createElement('li');

        let weightDisplay = "";
        if (exercise.weight && parseFloat(exercise.weight) > 0) {
            weightDisplay = `Weight: ${exercise.weight} ${exercise.unit}`;
        } else if (exercise.weight && parseFloat(exercise.weight) === 0) {
             weightDisplay = `Weight: Bodyweight or 0 ${exercise.unit}`;
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

        // Add event listener for the delete button
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            li.remove();
            // If all exercises are deleted, hide the finish button and clear date display
            if (loggedExercisesList.children.length === 0) {
                finishWorkoutBtn.style.display = 'none';
                currentWorkoutDateDisplay.textContent = '';
                currentWorkoutSessionDate = null;
            }
        });

        loggedExercisesList.appendChild(li);
    }

    // Set default date to today for convenience
    if (workoutDateInput) {
        const today = new Date();
        // Format date as YYYY-MM-DD for the input field
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
        workoutDateInput.value = `${year}-${month}-${day}`;
    }

    // "Finish Workout" button functionality (placeholder for now)
    finishWorkoutBtn.addEventListener('click', function() {
        if (loggedExercisesList.children.length === 0) {
            alert("No exercises logged for this workout.");
            return;
        }
        // In a real app, here you would collect all data from `loggedExercisesList`
        // (or an internal array of exerciseData objects) and send it to a backend or localStorage.
        alert("Workout finished! (Data saving not implemented yet).");
        // Optionally clear the list for a new workout
        // loggedExercisesList.innerHTML = '';
        // currentWorkoutDateDisplay.textContent = '';
        // finishWorkoutBtn.style.display = 'none';
        // currentWorkoutSessionDate = null;
    });

});
