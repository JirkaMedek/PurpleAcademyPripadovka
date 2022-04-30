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
    const response = await fetch('https://openexchangerates.org/api/currencies.json')
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
    convert()
})


function convert () {
    if (inputAmountEl.value > 0) {
        getExchangeRate()
        //function for getting list of currencies
        async function getExchangeRate () {
            const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=6127736247b044c698bc473d9b813beb')
            const currencyJson = await response.json()
            console.log(currencyJson)

            //get conversion rate to USD for both currencies
            Object.entries(currencyJson.rates).forEach(([key, value]) => {
                if (key === fromCurrencyDtl.value) {
                    fromCurrency = value
                } else if (key === toCurrencyDtl.value) {
                    toCurrency = value
                }

            })
            
            //calculates conversion rate and shows it
            conversionRate = toCurrency / fromCurrency
            connvertedAmount = inputAmountEl.value * conversionRate
            convertedEl.innerHTML = `${inputAmountEl.value} ${fromCurrencyDtl.options[fromCurrencyDtl.selectedIndex].text} is <strong>${connvertedAmount}</strong> ${toCurrencyDtl.options[toCurrencyDtl.selectedIndex].text}` 

        }

        


    }
}




