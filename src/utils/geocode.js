const request = require('request');

const geocode = (location, callback) => {
    location = encodeURIComponent(location);
    request({
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
        json: true,
        qs:{
            access_token : 'pk.eyJ1IjoibnJ1cGVucGF0ZWwwMCIsImEiOiJja2NheXUwZW4wcmFzMnlsa3E5bWc1enNnIn0.45NLLLc1w1oO04Ss-8oCUg'
        }
    }, (err, res) => {
        if(err){
            callback('Unable to connect to geocode service', undefined);
        }
        else if(res.body.message){
            callback(res.body.message, undefined);
        }
        else if(res.body.features.length === 0){
            callback('Unable to find a valid search location', undefined);
        }
        else {
            callback(undefined, {
                lat:res.body.features[0].center[1],
                lon:res.body.features[0].center[0],
                loc:res.body.features[0].place_name
            })
    }
    })
}

module.exports = {
    geocode
}