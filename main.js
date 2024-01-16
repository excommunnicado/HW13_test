function convertCurrency() {
    let amountInput = document.getElementById("amount");
    let amount = amountInput.value;
    let fromCurrency = document.getElementById("fromCurrency").value;
    let toCurrency = document.getElementById("toCurrency").value;
    let convertationResultDiv = document.getElementById("convertationResult");
    let convertationErrorDiv = document.getElementById("convertationError");

    let APIURL = `https://v6.exchangerate-api.com/v6/465d8278437417991c4a2b3b/latest/${fromCurrency}`;


    if (!isValidInput(amount)) {
        convertationResultDiv.innerHTML = "";
        convertationErrorDiv.innerHTML = "Ошибка: Разрешен ввод только числовых значений";
        return;
    }
    function isValidInput(input) {
        return !isNaN(parseFloat(input));
    }

    fetch(APIURL)
        .then(response => response.json())
        .then(data => {
            if (data.conversion_rates.hasOwnProperty(toCurrency)) {
                let rate = data.conversion_rates[toCurrency];
                let result = amount * rate;
                convertationResultDiv.innerHTML = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
                convertationErrorDiv.innerHTML = "";
            } else {
                convertationResultDiv.innerHTML = "";
                convertationErrorDiv.innerHTML = "Ошибка: Не удается найти выбранную валютную пару.";
            }
        })
        .catch(error => {
            convertationResultDiv.innerHTML = "";
            convertationErrorDiv.innerHTML = "Ошибка: API недоступно";
        });
}

window.convertCurrency = convertCurrency;
