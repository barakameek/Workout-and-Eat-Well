document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const exerciseForm = document.getElementById('log-exercise-form');
    const loggedExercisesList = document.getElementById('logged-exercises-list');
    const workoutDateInput = document.getElementById('workout-date');
    const currentWorkoutDateDisplay = document.getElementById('current-workout-date-display');
    const finishWorkoutBtn = document.getElementById('finish-workout-btn');
    const exerciseNameInput = document.getElementById('exercise-name'); // For focus

    let currentWorkoutSessionDate = null; // To store the date of the current workout session

    // Event listener for the exercise form submission
    exerciseForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission (page reload)

        // Get values from the form fields
        const date = workoutDateInput.value;
        const exerciseName = exerciseNameInput.value.trim();
        const sets = document.getElementById('sets').value;
        const reps = document.getElementById('reps').value.trim();
        const weight = document.getElementById('weight').value;
        const weightUnit = document.getElementById('weight-unit').value;
        const notes = document.getElementById('exercise-notes').value.trim();

        // Basic validation: Ensure required fields are filled
        if (!date || !exerciseName || !sets || !reps) {
            alert('Please fill in all required fields (Date, Exercise Name, Sets, Reps).');
            return; // Stop further execution if validation fails
        }

        // Set or update the displayed workout session date
        // This happens if it's the first exercise or if the list was cleared
        if (!currentWorkoutSessionDate || loggedExercisesList.children.length === 0) {
            currentWorkoutSessionDate = date;
            // Parse the date string to avoid timezone issues and format it nicely
            const formattedDate = new Date(date + 'T00:00:00'); // Adding time component helps some browsers
            currentWorkoutDateDisplay.textContent = `Workout Date: ${formattedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`;
        }
        // Note: If the user changes the date mid-session while exercises are logged,
        // this current logic doesn't start a "new session" display automatically.
        // The individual exercises would effectively be under the initially set date display.
        // More complex logic could be added here if needed.

        // Create an object to hold the exercise data
        const exerciseData = {
            name: exerciseName,
            sets: sets,
            reps: reps,
            weight: weight,
            unit: weightUnit,
            notes: notes
        };

        // Add the new exercise to the DOM (the visible list)
        addExerciseToDOM(exerciseData);

        // Reset the form for the next entry
        exerciseForm.reset();
        // Since the date is part of the form, resetting clears it.
        // We can re-apply the current session date or today's date if preferred.
        // For now, let's re-apply the current session date for consistency within a single log entry session.
        workoutDateInput.value = currentWorkoutSessionDate;


        // Set focus back to the exercise name input for quick subsequent entries
        exerciseNameInput.focus();

        // Show the "Finish Workout" button if it's currently hidden and there are exercises
        if (finishWorkoutBtn.style.display === 'none' && loggedExercisesList.children.length > 0) {
            finishWorkoutBtn.style.display = 'block';
        }
    });

    // Function to add an exercise to the visible list in the DOM
    function addExerciseToDOM(exercise) {
        const li = document.createElement('li'); // Create a new list item element

        // Prepare the weight display string
        let weightDisplay = "";
        if (exercise.weight && parseFloat(exercise.weight) > 0) {
            weightDisplay = `Weight: ${exercise.weight} ${exercise.unit}`;
        } else if (exercise.weight && parseFloat(exercise.weight) === 0 && exercise.unit) {
             // Handles cases like "Bodyweight" where weight is 0 but a unit might be present
             weightDisplay = `Weight: Bodyweight / 0 ${exercise.unit}`;
        }
        // If no weight is entered, weightDisplay remains an empty string

        // Populate the list item's HTML content
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

        // Add event listener for the delete button within this new list item
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            li.remove(); // Remove the list item from the DOM

            // If all exercises are deleted, hide the finish button and clear the date display
            if (loggedExercisesList.children.length === 0) {
                finishWorkoutBtn.style.display = 'none';
                currentWorkoutDateDisplay.textContent = '';
                currentWorkoutSessionDate = null; // Reset the session date
                // Optionally set date input back to today if the session is cleared
                setDefaultDate();
            }
        });

        // Append the new list item to the unordered list
        loggedExercisesList.appendChild(li);
    }

    // Function to set the default date in the date input field
    function setDefaultDate() {
        if (workoutDateInput) {
            const today = new Date();
            // Format date as YYYY-MM-DD for the input[type="date"] field
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, add 1
            const day = String(today.getDate()).padStart(2, '0');
            workoutDateInput.value = `${year}-${month}-${day}`;
        }
    }

    // Call setDefaultDate once when the script loads to set the initial date
    setDefaultDate();

    // Event listener for the "Finish Workout" button (currently a placeholder)
    finishWorkoutBtn.addEventListener('click', function() {
        if (loggedExercisesList.children.length === 0) {
            alert("No exercises logged for this workout session.");
            return;
        }

        // In a real application, you would collect all exercise data here.
        // For example, by iterating through `loggedExercisesList.children`
        // or, ideally, from an array of `exerciseData` objects that you'd maintain.
        console.log("Workout session finished. Data to save (not implemented):");
        // Example of how you might collect data (requires storing `exerciseData` separately)
        // currentWorkoutExercises.forEach(ex => console.log(ex));

        alert("Workout finished! (Data saving is not implemented in this version).");

        // Optional: Clear the list and reset for a new workout after "saving"
        // loggedExercisesList.innerHTML = ''; // Clear all child elements
        // currentWorkoutDateDisplay.textContent = '';
        // finishWorkoutBtn.style.display = 'none';
        // currentWorkoutSessionDate = null;
        // setDefaultDate(); // Reset date input to today
    });
});
