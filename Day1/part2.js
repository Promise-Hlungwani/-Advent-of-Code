// --- Part Two ---
document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) {
    console.error('No file selected.');
    return;
  }

  let calories = [];
  let currentElfCalories = [];
  const reader = new FileReader();

  reader.onload = (e) => {
    const lines = e.target.result.split('\n');
    for (const line of lines) {
      if (line.trim()) {
        currentElfCalories.push(parseInt(line));
      } else {
        calories.push(currentElfCalories);
        currentElfCalories = [];
      }
    }

    // If the last Elf's food list is not empty, we need to append it to the calories list.
    if (currentElfCalories.length > 0) {
      calories.push(currentElfCalories);
    }

    // Find the top three Elves carrying the most Calories.
    const topThreeCalories = calories
      .map((elfCalories) => elfCalories.reduce((sum, cal) => sum + cal, 0))
      .sort((a, b) => b - a)
      .slice(0, 3);

    // Calculate the total Calories carried by the top three Elves.
    const totalCaloriesTopThree = topThreeCalories.reduce(
      (sum, cal) => sum + cal,
      0
    );

    // Print the result.
    console.log(totalCaloriesTopThree);
  };

  reader.onerror = (e) => {
    console.error('Error reading file:', e);
  };

  reader.readAsText(file);
});
