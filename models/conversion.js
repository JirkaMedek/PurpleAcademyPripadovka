const mongoose = require('mongoose')

const ConversionSchema = mongoose.Schema({
    fromCurrency: String,
    toCurrency: String,
    amonutToConvert: Number,
    fromCurrencyName: String,
    toCurrencyName: String,
    conversionRate: Number,
    ConvertedAmount: Number
})

module.exports = mongoose.model('Conversion', ConversionSchema)