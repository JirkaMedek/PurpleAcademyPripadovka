const express = require('express');
const fetch = require('cross-fetch');

const app = express()
app.listen(3000, () => console.log("listening at 3000"))
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))

app.post('/convert', async (request, response) => {
    const response_url = await fetch('https://openexchangerates.org/api/latest.json?app_id=6127736247b044c698bc473d9b813beb')
    const currencyJson = await response_url.json()

    let fromCurrency = 0
    let toCurrency = 0
    //get conversion rate to USD for both currencies
    Object.entries(currencyJson.rates).forEach(([key, value]) => {
        if (key === request.body.fromCurrencyDtlValue) {
            fromCurrency = value
        } else if (key === request.body.toCurrencyDtlValue ) {
            toCurrency = value
        }

    })

    const conversionRate = toCurrency / fromCurrency
    const connvertedAmount = request.body.amonut * conversionRate

    console.log(request.body)
    response.json({
        status:"Converted",
        fromCurrency: request.body.fromCurrencyDtlValue,
        toCurrency: request.body.toCurrencyDtlValue,
        baseAmount: request.body.amonut,
        convertedAmount: connvertedAmount,
        fromCurrencyName: request.body.fromCurrencyName,
        toCurrencyName: request.body.toCurrencyName    
    })
})

app.get('/currencies', async (request, response) => {
    const fetch_response = await fetch('https://openexchangerates.org/api/currencies.json')
    const currencyJson = await fetch_response.json()
    response.json(currencyJson)
})

