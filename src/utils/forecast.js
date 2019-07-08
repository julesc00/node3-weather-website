const request = require('request')

const forecast = (latitude, longitude, callback) => {
    // Note: Cannot use `` in urls, it wouldn't render.
    const url = 'https://api.darksky.net/forecast/57a875ec67c843f3072670ccb1a54063/' + latitude + ',' + longitude + '?&lang=es&units=auto'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' Actualmente está en ' + body.currently.temperature + ' grados. Hay un ' + body.currently.precipProbability + '% de lluvia.')
        }
    })
}

module.exports = forecast