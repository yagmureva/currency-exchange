document.addEventListener("DOMContentLoaded", function () {
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const amount = document.getElementById("amount");
  const convertButton = document.getElementById("convert");
  const resultDisplay = document.getElementById("conversionResult");

  convertButton.addEventListener("click", performConversion);

  function performConversion() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = parseFloat(amount.value);
    if (isNaN(amountValue)) {
      resultDisplay.innerText = "Please enter a valid amount.";
      return;
    }

    const apiKey = "1bd1c44ffdf9e866b3f41d32";
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amountValue}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "success") {
          resultDisplay.innerText = `Your conversion is: ${from} ${amountValue} = ${to} ${data.conversion_result.toFixed(
            2
          )}`;
        } else {
          resultDisplay.innerText = "Conversion failed. Please try again.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        resultDisplay.innerText = "Error in conversion. Check console.";
      });
  }
});
