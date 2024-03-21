document.addEventListener("DOMContentLoaded", function () {
  // Function to create a Promise that resolves after a random time between 1 and 3 seconds
  function createPromise() {
    return new Promise((resolve) => {
      const randomTime = Math.floor(Math.random() * 3000) + 1000; // Random time between 1 and 3 seconds in milliseconds
      setTimeout(() => {
        resolve(randomTime / 1000); // Resolve with time taken in seconds
      }, randomTime);
    });
  }

  // Array to store all promises
  const promises = [
    createPromise(), // Promise 1
    createPromise(), // Promise 2
    createPromise(), // Promise 3
  ];

  // Add loading text to the table
  const outputTable = document.getElementById("output");
  const loadingRow = document.createElement("tr");
  const loadingCell = document.createElement("td");
  loadingCell.setAttribute("colspan", "2");
  loadingCell.textContent = "Loading...";
  loadingRow.appendChild(loadingCell);
  outputTable.appendChild(loadingRow);

  // Wait for all promises to resolve
  Promise.all(promises)
    .then((results) => {
      // Remove loading text
      outputTable.removeChild(loadingRow);

      // Populate the table with the resolved promises
      results.forEach((time, index) => {
        const newRow = document.createElement("tr");
        const promiseName = document.createElement("td");
        const timeTaken = document.createElement("td");

        promiseName.textContent = `Promise ${index + 1}`;
        timeTaken.textContent = time.toFixed(3);

        newRow.appendChild(promiseName);
        newRow.appendChild(timeTaken);
        outputTable.appendChild(newRow);
      });

      // Calculate and add total time taken
      const totalTime = results.reduce((acc, curr) => acc + curr, 0);
      const totalRow = document.createElement("tr");
      const totalName = document.createElement("td");
      const totalTimeTaken = document.createElement("td");

      totalName.textContent = "Total";
      totalTimeTaken.textContent = totalTime.toFixed(3);

      totalRow.appendChild(totalName);
      totalRow.appendChild(totalTimeTaken);
      outputTable.appendChild(totalRow);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
