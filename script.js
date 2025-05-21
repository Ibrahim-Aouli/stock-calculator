// Grab input and output elements by their IDs
const itemInput    = document.getElementById('itemCost');
const orderInput   = document.getElementById('orderCost');
const discountInput = document.getElementById('totalDiscount');
const finalInput   = document.getElementById('finalCostAud');
const resultArea   = document.getElementById('result-area');
const resultValue  = document.getElementById('adjustedPriceValue');

// Function to calculate and display adjusted item price
function updateResult() {
  // Parse input values as floats
  const itemCost = parseFloat(itemInput.value);
  const orderTotal = parseFloat(orderInput.value);
  const totalDiscount = parseFloat(discountInput.value);
  const finalTotalAud = parseFloat(finalInput.value);

  // Check that all inputs are valid numbers and positive
  if (!isNaN(orderTotal) && orderTotal > 0 &&
      !isNaN(finalTotalAud) && finalTotalAud >= 0 &&
      !isNaN(itemCost) && itemCost > 0 &&
      !isNaN(totalDiscount) && totalDiscount >= 0) {
    if (orderTotal === 0) {
      // Avoid division by zero (not expected due to min validation)
      resultArea.style.display = 'none';
      return;
    }

    // Step 1: Calculate the discounted items cost
    const discountedItemsCost = orderTotal - totalDiscount;

    // Step 2: Calculate the discount rate
    const discountRate = totalDiscount / orderTotal;

    // Step 3: Calculate the item cost with the discount applied
    const itemCostWithDiscount = itemCost * (1 - discountRate);

    // Step 4: Calculate the dollar difference (optional)
    const dollarDifference = finalTotalAud - discountedItemsCost;

    // Step 5: Calculate the dollar difference rate
    const dollarDifferenceRate = finalTotalAud / discountedItemsCost;

    // Step 6: Calculate the final cost of the item in AUD
    const finalItemCostAud = itemCostWithDiscount * dollarDifferenceRate;

    // Get desired decimal places from the dropdown
    const decimals = 2;

    // Format the result to the specified decimal places
    resultValue.textContent = '$' + finalItemCostAud.toFixed(decimals);

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
discountInput.addEventListener('input', updateResult);