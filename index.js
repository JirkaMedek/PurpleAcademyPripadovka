const express = require('express')
const fetch = require('cross-fetch')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const conversion = require('./models/conversion')
const Conversion = require('./models/conversion')

//initialization of server on port 3000
app.listen(3000, () => console.log("listening at 3000"))
app.use(express.static('public'))
app.use(express.json())

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
        if (key === request.body.fromCurrencySlValue) {
            fromCurrency = value
        }
        if (key === request.body.toCurrencySlValue ) {
            toCurrency = value
        }

    })

    //calculation of conversion rate
    const conversionRate = toCurrency / fromCurrency
    const connvertedAmount = Math.round((request.body.amonut * conversionRate + Number.EPSILON) * 100) /100
    
    //save to DB
    const conversion = new Conversion({
        fromCurrency: request.body.fromCurrencySlValue,
        toCurrency: request.body.toCurrencySlValue,
        amonutToConvert: request.body.amonut,
        fromCurrencyName: request.body.fromCurrencyName,
        toCurrencyName: request.body.toCurrencyName,
        conversionRate: conversionRate,
        convertedAmount: connvertedAmount  
    })
    const savedConversions = await conversion.save()

    response.json({
        status:"Converted",
        fromCurrency: request.body.fromCurrencySlValue,
        toCurrency: request.body.toCurrencySlValue,
        baseAmount: request.body.amonut,
        convertedAmount: connvertedAmount,
        fromCurrencyName: request.body.fromCurrencyName,
        toCurrencyName: request.body.toCurrencyName    
    })
})

//get currencie for drop-down list
app.get('/currencies', async (request, response) => {
    const fetch_response = await fetch('https://openexchangerates.org/api/currencies.json')
    const currencyJson = await fetch_response.json()
    response.json(currencyJson)
})

//DB data for statistics
app.get('/conversions', async (request, response) => {
    const conversions = await conversion.find()
    const fetch_response = await fetch('https://openexchangerates.org/api/currencies.json')
    const currencyJson = await fetch_response.json()
    let mostConvertedCurrencyName =""
    const mostConvertedCurrency = await conversion.aggregate([
        [
            {
              '$group': {
                '_id': '$fromCurrency', 
                'count': {
                  '$sum': 1
                }
              }
            }, {
              '$sort': {
                'count': -1
              }
            }
          ]
    ]).limit(1)

    //getting full name of most converted symbol
    Object.entries(currencyJson).forEach(([key, value]) => {
        if (key === mostConvertedCurrency[0]._id){
            mostConvertedCurrencyName = value
        }
    })
    
    //total amount converted
    let totalAmount = 0
    for (let i = 0; i < conversions.length; i++) {
        totalAmount += conversions[i].amonutToConvert
    }

    response.json({
        numberOfConversions: conversions.length,
        mostConvertedCurrencyName:mostConvertedCurrencyName,
        totalConvertedAmount:totalAmount
    })
})

