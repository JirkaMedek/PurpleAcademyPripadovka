let conversionRate = 0
let connvertedAmount = 0
let currecyListItems = ""
let fromCurrency = 0
let toCurrency = 0
const fromCurrencyDtl = document.getElementById("fromCurrency-dtl")
const toCurrencyDtl = document.getElementById("toCurrency-dtl")
const convertBtn = document.getElementById("convert-btn")
const inputAmountEl = document.getElementById("inputAmount-el")
const convertedEl = document.getElementById("converted-el")

getCurrencies()

//function for getting list of currencies
async function getCurrencies () {
    const response = await fetch('/currencies')
    const currencyJson = await response.json()
    
    //getting hmtl to fill option
    Object.entries(currencyJson).forEach(([key, value]) => {
        currecyListItems += `<option value="${key}">${value}</option>`
    })

    //fill option
    fromCurrencyDtl.innerHTML = currecyListItems
    toCurrencyDtl.innerHTML = currecyListItems
  
};

convertBtn.addEventListener("click", () => {
    if (inputAmountEl.value > 0) {
        getExchangeRate()
    } else {
        convertedEl.textContent = "Amout which you wish to convert must be greater than 0"
    }
})

//function for getting exchange rate to USD
async function getExchangeRate () {
    const amonut = inputAmountEl.value 
    const fromCurrencyDtlValue = fromCurrencyDtl.value
    const toCurrencyDtlValue = toCurrencyDtl.value
    const fromCurrencyName = fromCurrencyDtl.options[fromCurrencyDtl.selectedIndex].text
    const toCurrencyName = toCurrencyDtl.options[toCurrencyDtl.selectedIndex].text
    const data ={fromCurrencyDtlValue, toCurrencyDtlValue, amonut, fromCurrencyName, toCurrencyName}
    const options = {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
    }
    const response = await fetch('/convert', options)
    const convertedJson = await response.json()

    convertedEl.innerHTML = `${convertedJson.baseAmount} ${convertedJson.fromCurrencyName} is <strong>${convertedJson.convertedAmount}</strong> ${convertedJson.toCurrencyName}`
 
}

//calculates conversion rate and shows it
function showConversion() {
    conversionRate = toCurrency / fromCurrency
    connvertedAmount = inputAmountEl.value * conversionRate
    convertedEl.innerHTML = `${inputAmountEl.value} ${fromCurrencyDtl.options[fromCurrencyDtl.selectedIndex].text} is <strong>${connvertedAmount}</strong> ${toCurrencyDtl.options[toCurrencyDtl.selectedIndex].text}`  
}




   //test pro moji api
async function serverContact() {
   const fromCurrencyDtlValue = fromCurrencyDtl.value
   const toCurrencyDtlValue = toCurrencyDtl.value
   const data ={fromCurrencyDtlValue, toCurrencyDtlValue}
   const options = {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
   }
   const responseSr = await fetch('/api', options)
   const json = await responseSr.json()
   console.log(json)
}
   ///konec testu
