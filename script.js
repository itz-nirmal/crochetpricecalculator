/**
 * ===================================
 * Crochet Price Calculator - Script
 * ===================================
 */

// Constants
const YARN_PRICE_PER_GRAM = 2;
const STANDARD_PACKAGING_COST = 10;
const PLATFORM_FEE_PERCENTAGE = 0.03;

// DOM Elements
const form = document.getElementById('calculatorForm');
const yarnWeightInput = document.getElementById('yarnWeight');
const additionalPackagingInput = document.getElementById('additionalPackaging');
const customMarginInput = document.getElementById('customMargin');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const errorMessage = document.getElementById('errorMessage');
const resultSection = document.getElementById('resultSection');

// Result Display Elements
const yarnCostDisplay = document.getElementById('yarnCostDisplay');
const standardPackagingDisplay = document.getElementById('standardPackagingDisplay');
const additionalPackagingDisplay = document.getElementById('additionalPackagingDisplay');
const addonsDisplay = document.getElementById('addonsDisplay');
const addonsDetail = document.getElementById('addonsDetail');
const customMarginDisplay = document.getElementById('customMarginDisplay');
const subtotalDisplay = document.getElementById('subtotalDisplay');
const platformFeeDisplay = document.getElementById('platformFeeDisplay');
const finalPriceDisplay = document.getElementById('finalPriceDisplay');

/**
 * Format currency to 2 decimal places
 * @param {number} value - The numeric value to format
 * @returns {string} - Formatted currency string with ₹ symbol
 */
function formatCurrency(value) {
    return '₹' + value.toFixed(2);
}

/**
 * Get all selected add-ons and their total cost
 * @returns {Object} - Object containing selected add-ons array and total cost
 */
function getSelectedAddons() {
    const checkboxes = document.querySelectorAll('input[name="addons"]:checked');
    const selectedAddons = [];
    let addonsTotal = 0;

    checkboxes.forEach(checkbox => {
        const price = parseFloat(checkbox.value);
        const name = checkbox.dataset.name;
        
        // Get the quantity input for this addon (sibling in the addon-item)
        const addonItem = checkbox.closest('.addon-item');
        const quantityInput = addonItem.querySelector('.addon-quantity');
        const quantity = parseInt(quantityInput.value) || 1;
        
        const totalPrice = price * quantity;
        selectedAddons.push({ name, price, quantity, totalPrice });
        addonsTotal += totalPrice;
    });

    return { selectedAddons, addonsTotal };
}

/**
 * Validate input values
 * @returns {Object} - Object containing isValid boolean and errorMessage string
 */
function validateInputs() {
    const yarnWeight = parseFloat(yarnWeightInput.value);

    // Check if yarn weight is empty or invalid
    if (isNaN(yarnWeight) || yarnWeightInput.value === '') {
        return { 
            isValid: false, 
            errorMessage: 'Please enter yarn weight in grams' 
        };
    }

    // Check for negative values
    if (yarnWeight < 0) {
        return { 
            isValid: false, 
            errorMessage: 'Yarn weight cannot be negative' 
        };
    }

    const additionalPackaging = parseFloat(additionalPackagingInput.value) || 0;
    const customMargin = parseFloat(customMarginInput.value) || 0;

    if (additionalPackaging < 0) {
        return { 
            isValid: false, 
            errorMessage: 'Additional packaging cost cannot be negative' 
        };
    }

    if (customMargin < 0) {
        return { 
            isValid: false, 
            errorMessage: 'Custom margin cannot be negative' 
        };
    }

    return { isValid: true, errorMessage: '' };
}

/**
 * Calculate and display the final price
 */
function calculatePrice() {
    // Validate inputs first
    const validation = validateInputs();
    
    if (!validation.isValid) {
        showError(validation.errorMessage);
        hideResult();
        return;
    }

    // Clear error message
    hideError();

    // Get input values
    const yarnWeight = parseFloat(yarnWeightInput.value) || 0;
    const additionalPackaging = parseFloat(additionalPackagingInput.value) || 0;
    const customMargin = parseFloat(customMarginInput.value) || 0;
    const { selectedAddons, addonsTotal } = getSelectedAddons();

    // Calculate costs
    // 1. Yarn Cost = grams × 2
    const yarnCost = yarnWeight * YARN_PRICE_PER_GRAM;

    // 2. Standard Packaging = ₹10 (fixed)
    const standardPackaging = STANDARD_PACKAGING_COST;

    // 3. Calculate Subtotal (before platform fee)
    const subtotal = yarnCost + standardPackaging + additionalPackaging + addonsTotal + customMargin;

    // 4. Platform Fee = 3% of Subtotal
    const platformFee = subtotal * PLATFORM_FEE_PERCENTAGE;

    // 5. Final Price = Subtotal + Platform Fee
    const finalPrice = subtotal + platformFee;

    // Display results
    displayResults({
        yarnCost,
        standardPackaging,
        additionalPackaging,
        selectedAddons,
        addonsTotal,
        customMargin,
        subtotal,
        platformFee,
        finalPrice
    });
}

/**
 * Display the calculated results
 * @param {Object} results - Object containing all calculated values
 */
function displayResults(results) {
    // Update display values
    yarnCostDisplay.textContent = formatCurrency(results.yarnCost);
    standardPackagingDisplay.textContent = formatCurrency(results.standardPackaging);
    additionalPackagingDisplay.textContent = formatCurrency(results.additionalPackaging);
    customMarginDisplay.textContent = formatCurrency(results.customMargin);
    addonsDisplay.textContent = formatCurrency(results.addonsTotal);
    subtotalDisplay.textContent = formatCurrency(results.subtotal);
    platformFeeDisplay.textContent = formatCurrency(results.platformFee);
    finalPriceDisplay.textContent = formatCurrency(results.finalPrice);

    // Show add-ons detail if any selected
    if (results.selectedAddons.length > 0) {
        const addonsList = results.selectedAddons
            .map(addon => `${addon.name}${addon.quantity > 1 ? ' x' + addon.quantity : ''}: ₹${addon.totalPrice}`)
            .join(', ');
        addonsDetail.textContent = addonsList;
        addonsDetail.style.display = 'block';
    } else {
        addonsDetail.style.display = 'none';
    }

    // Show result section with fade-in effect
    showResult();
}

/**
 * Show the result section with fade-in effect
 */
function showResult() {
    resultSection.classList.add('show');
    // Trigger reflow to enable transition
    resultSection.offsetHeight;
    resultSection.classList.add('fade-in');
}

/**
 * Hide the result section
 */
function hideResult() {
    resultSection.classList.remove('show', 'fade-in');
}

/**
 * Show error message
 * @param {string} message - The error message to display
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.classList.remove('show');
}

/**
 * Reset all form values to default
 */
function resetForm() {
    // Reset input fields
    yarnWeightInput.value = '';
    additionalPackagingInput.value = '0';
    customMarginInput.value = '0';

    // Uncheck all add-ons
    const checkboxes = document.querySelectorAll('input[name="addons"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset all quantity fields to 1
    const quantityInputs = document.querySelectorAll('.addon-quantity');
    quantityInputs.forEach(input => {
        input.value = 1;
    });

    // Hide error and result
    hideError();
    hideResult();
}

/**
 * Initialize event listeners
 */
function init() {
    // Calculate button click
    calculateBtn.addEventListener('click', calculatePrice);

    // Reset button click
    resetBtn.addEventListener('click', resetForm);

    // Auto-clear "0" when user starts typing in number fields
    const numberInputs = [additionalPackagingInput, customMarginInput];
    
    numberInputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Clear the field if it contains only "0"
            if (this.value === '0') {
                this.value = '';
            }
        });
        
        input.addEventListener('blur', function() {
            // Restore "0" if the field is empty
            if (this.value === '') {
                this.value = '0';
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
