const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/faeb1b690728948636e67e8e67052af8/${latitude},${longitude}`

    request({ url: url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} Today will have a low of ${body.daily.data[0].temperatureLow}°F and a high of ${body.daily.data[0].temperatureHigh}°F. It is currently ${body.currently.temperature}°F with a(n) ${body.currently.precipProbability * 100}% chance of rain.`)
        }
    })
}

module.exports = forecast