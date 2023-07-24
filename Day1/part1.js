//--- Day 1: Calorie Counting Part one ---

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

    // Find the Elf carrying the most Calories.
    let maxCalories = 0;
    for (const elfCalories of calories) {
      const totalCalories = elfCalories.reduce((sum, cal) => sum + cal, 0);
      maxCalories = Math.max(maxCalories, totalCalories);
    }

    // Print the number of total Calories carried by the Elf carrying the most Calories.
    console.log(maxCalories);
  };

  reader.onerror = (e) => {
    console.error('Error reading file:', e);
  };

  reader.readAsText(file);
});
