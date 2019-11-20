const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/faeb1b690728948636e67e8e67052af8/${latitude},${longitude}`

    request({ url: url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a(n) ${body.currently.precipProbability * 100}% chance of rain.`)
        }
    })
}

module.exports = forecast