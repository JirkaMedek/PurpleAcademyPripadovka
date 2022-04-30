const testJson = {"success":true,"timestamp":1651340643,"base":"EUR","date":"2022-04-30","rates":{"AED":3.873046,"AFN":90.684168,"ALL":121.000003,"AMD":477.94612,"ANG":1.900346,"AOA":427.708468,"ARS":121.575206,"AUD":1.492116,"AWG":1.89856,"AZN":1.796773,"BAM":1.952077,"BBD":2.129006,"BDT":91.383694,"BGN":1.95292,"BHD":0.397416,"BIF":2126.850962,"BMD":1.054463,"BND":1.454803,"BOB":7.259841,"BRL":5.243579,"BSD":1.054473,"BTC":2.7521689e-5,"BTN":80.566292,"BWP":12.765855,"BYN":3.549875,"BYR":20667.465971,"BZD":2.125413,"CAD":1.354273,"CDF":2122.633494,"CHF":1.026662,"CLF":0.032578,"CLP":898.940285,"CNY":6.96842,"COP":4175.323724,"CRC":697.738435,"CUC":1.054463,"CUP":27.943258,"CVE":110.455368,"CZK":24.598296,"DJF":187.399499,"DKK":7.438221,"DOP":58.048578,"DZD":152.602158,"EGP":19.492787,"ERN":15.81694,"ETB":54.173056,"EUR":1,"FJD":2.267507,"FKP":0.810504,"GBP":0.838639,"GEL":3.210881,"GGP":0.810504,"GHS":7.961604,"GIP":0.810504,"GMD":57.050487,"GNF":9273.998498,"GTQ":8.07707,"GYD":220.645757,"HKD":8.273915,"HNL":25.850191,"HRK":7.564191,"HTG":114.935011,"HUF":378.357022,"IDR":15316.173979,"ILS":3.523702,"IMP":0.810504,"INR":80.690958,"IQD":1539.515322,"IRR":44551.043091,"ISK":137.822279,"JEP":0.810504,"JMD":163.133338,"JOD":0.747935,"JPY":136.854518,"KES":122.159892,"KGS":86.572856,"KHR":4268.46477,"KMF":491.116337,"KPW":949.01642,"KRW":1332.297656,"KWD":0.323408,"KYD":0.87871,"KZT":469.072547,"LAK":13062.15882,"LBP":1595.894794,"LKR":369.056802,"LRD":159.755056,"LSL":16.745268,"LTL":3.113554,"LVL":0.637834,"LYD":5.045645,"MAD":10.518305,"MDL":19.624966,"MGA":4217.850564,"MKD":61.626253,"MMK":1952.309729,"MNT":3157.971083,"MOP":8.523013,"MRO":376.442949,"MUR":45.651842,"MVR":16.291845,"MWK":857.809226,"MXN":21.510724,"MYR":4.590607,"MZN":67.306743,"NAD":16.745263,"NGN":437.876516,"NIO":37.712894,"NOK":9.836702,"NPR":128.906148,"NZD":1.631217,"OMR":0.405896,"PAB":1.054473,"PEN":4.046504,"PGK":3.682082,"PHP":55.23328,"PKR":195.817601,"PLN":4.67165,"PYG":7214.528385,"QAR":3.839339,"RON":4.945961,"RSD":117.579745,"RUB":75.236012,"RWF":1079.769651,"SAR":3.954897,"SBD":8.473016,"SCR":14.186572,"SDG":471.875869,"SEK":10.366032,"SGD":1.458538,"SHP":1.452421,"SLL":14865.289661,"SOS":610.534173,"SRD":21.955005,"STD":21825.245824,"SVC":9.22626,"SYP":2649.283896,"SZL":16.608175,"THB":36.097456,"TJS":13.133273,"TMT":3.690619,"TND":3.218751,"TOP":2.438449,"TRY":15.660566,"TTD":7.165622,"TWD":31.055508,"TZS":2451.586452,"UAH":31.89707,"UGX":3748.592456,"USD":1.054463,"UYU":43.716944,"UZS":11783.619344,"VEF":225475961419.6898,"VND":24214.150757,"VUV":118.713135,"WST":2.726252,"XAF":654.69819,"XAG":0.046284,"XAU":0.000556,"XCD":2.849738,"XDR":0.786987,"XOF":654.29781,"XPF":119.497008,"YER":263.93577,"ZAR":16.619416,"ZMK":9491.43209,"ZMW":17.951983,"ZWL":339.536511}}

Object.entries(testJson.rates).forEach(([key, value]) => {
    console.log(`${key}: ${value}`)
});