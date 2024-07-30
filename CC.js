const select = document.querySelectorAll(".currency"),
    inputCurrency = document.getElementById('input_currency'),
    outputCurrency = document.getElementById('output_currency'),
    errorMessage = document.getElementById('error-message');

fetch(`https://api.frankfurter.app/currencies`)
    .then(data => data.json())
    .then(data => {
        const entries = Object.entries(data);
        for (let i = 0; i < entries.length; i++) {
            select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
            select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
        }
    });

function clearFields() {
    inputCurrency.value = "";
    outputCurrency.value = "";
    errorMessage.textContent = "";
}

function convert() {
    const fromCurrency = select[0].value;
    const toCurrency = select[1].value;
    const amount = parseFloat(inputCurrency.value);

    if (isNaN(amount)) {
        errorMessage.textContent = "Please enter a valid amount";
        return;
    }

    if (fromCurrency === toCurrency) {
        errorMessage.textContent = "Please select different currencies";
        return;
    }

    errorMessage.textContent = ""; // Clear previous error

    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
        .then(response => response.json())
        .then(data => {
            outputCurrency.value = (amount * data.rates[toCurrency]).toFixed(2);
        })
        .catch(error => {
            console.error('Error fetching exchange rate:', error);
            errorMessage.textContent = "An error occurred";
        });
}
