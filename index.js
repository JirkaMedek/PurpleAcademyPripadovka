const express = require('express')
const fetch = require('cross-fetch')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const conversion = require('./models/conversion')

app.listen(3000, () => console.log("listening at 3000"))
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))

//conect to DB
mongoose.connect(process.env.DB_Connection,
 () => console.log('connectd to db')
)


//on client request covert curencies
app.post('/convert', async (request, response) => {
    const api_key = process.env.API_KEY
    const response_url = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${api_key}`)
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
    const connvertedAmount = Math.round((request.body.amonut * conversionRate + Number.EPSILON) * 100) /100

    //save to DB
    const conversion = new Conversion({
        fromCurrency: request.body.fromCurrencyDtlValue,
        toCurrency: request.body.toCurrencyDtlValue,
        amonutToConvert: request.body.amonut,
        fromCurrencyName: request.body.fromCurrencyName,
        toCurrencyName: request.body.toCurrencyName,
        conversionRate: conversionRate,
        convertedAmount: connvertedAmount   
    })
    const savedConversions = await conversion.save()

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

//get currencie for dropbox
app.get('/currencies', async (request, response) => {
    const fetch_response = await fetch('https://openexchangerates.org/api/currencies.json')
    const currencyJson = await fetch_response.json()
    response.json(currencyJson)
})


app.get('/conversions', async (request, response) => {
    const conversions = await conversion.find()
    console.log(conversions.length)

    response.json({
        numberOfConversions: conversions.length,
    })
})

