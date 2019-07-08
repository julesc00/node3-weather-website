const request = require('request')

const forecast = (latitude, longitude, callback) => {
    // Note: Cannot use `` in urls, it wouldn't render.
    const url = 'https://api.darksky.net/forecast/57a875ec67c843f3072670ccb1a54063/' + latitude + ',' + longitude + '?&lang=en&units=auto'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            
            callback(undefined, body.daily.data[0].summary + ' Currently it is: ' + body.currently.temperature + '°. The high today is ' + body.daily.data[0].temperatureHigh + '. The lowest is '+ body.daily.data[0].temperatureLow + '.' + ' There is a ' + body.currently.precipProbability + '% of rain.')
        }
    })
}

module.exports = forecast