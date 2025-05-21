// Grab input and output elements by their IDs
const orderInput   = document.getElementById('orderCost');
const finalInput   = document.getElementById('finalCostAud');
const itemInput    = document.getElementById('itemCost');
const resultArea   = document.getElementById('result-area');
const resultValue  = document.getElementById('adjustedPriceValue');
const decimalsSelect = document.getElementById('decimalPlaces');

// Function to calculate and display adjusted item price
function updateResult() {
  // Parse input values as floats
  const orderTotal = parseFloat(orderInput.value);
  const finalTotalAud = parseFloat(finalInput.value);
  const itemCost = parseFloat(itemInput.value);

  // Check that all inputs are valid numbers and positive
  if (!isNaN(orderTotal) && orderTotal > 0 &&
      !isNaN(finalTotalAud) && finalTotalAud >= 0 &&
      !isNaN(itemCost) && itemCost > 0) {
    if (orderTotal === 0) {
      // Avoid division by zero (not expected due to min validation)
      resultArea.style.display = 'none';
      return;
    }

    // Calculate cost rate and adjusted item cost
    const costRate = finalTotalAud / orderTotal;
    const adjustedCostAud = itemCost * costRate;

    // Get desired decimal places from the dropdown
    const decimals = parseInt(decimalsSelect.value, 10) || 2;

    // Format the result to the specified decimal places
    resultValue.textContent = '$' + adjustedCostAud.toFixed(decimals);

    // Show the result section
    resultArea.style.display = 'block';
  } else {
    // If any input is missing/invalid, hide the result
    resultArea.style.display = 'none';
  }
}

// Attach event listeners for input events and dropdown changes
orderInput.addEventListener('input', updateResult);
finalInput.addEventListener('input', updateResult);
itemInput.addEventListener('input', updateResult);
decimalsSelect.addEventListener('change', updateResult);