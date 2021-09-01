const request = require('request');


const url = `http://api.weatherstack.com/current`;
const json = true;
const access_key = '124de90ab65ff3436a0d0dd11941b901';

const forecast = (lat, lon, callback) => {

    request({
        url,
        json,
        qs: {
            access_key,
            query : `${lat},${lon}`
        }
    }, (err, res) => {
        if(err){
            callback('Network error', undefined);
        }
        else if(res.body.error){
            callback(res.body.error.type, undefined);
        }
        else {
            callback(undefined, {
                temp:res.body.current.temperature,
                feels_like:res.body.current.feelslike
            });
        }
    });
}

module.exports = {
    forecast
}