const express = require('express');
const hbs = require('hbs');
const path = require('path');
const { forecast } = require('./utils/forecast');
const { geocode } = require('./utils/geocode');
require('./utils/forecast');
require('./utils/geocode');

const app = express();

// Define Paths for Express config 
const publicDirectoryPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '..', 'templates', 'partials');
// setup handlebars engine and views location
app
.set('view engine', 'hbs') 
.set('views', viewsPath)
hbs.registerPartials(partialsPath);
// setup static directory to serve
app
.use(express.static(publicDirectoryPath)) // if we dont use this then we wont be able to render css and html
.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name : 'Nrupen PATEL'
    });
})

.get('/help', (req, res) => {
    //res.sendFile(path.join(publicDirectoryPath, 'help.html'));
    res.render('help', {
        title:'Please help !',
        name:'Nrupen Patel'
    })
})

.get('/about', (req, res) => {
    res.render('about', {
        title:'About Page', 
        name:'Nrupen Patel'
    })
})

.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })
    }
    geocode(req.query.address, (err, {lat, lon, loc} ={}) => {
        if(err){
            return res.send({
                err
            })
        }
        forecast(lat, lon, (err, forecastData) => {
            if(err){
                return res.send({
                    err
                })
            }
            res.send({
                forecastData,
                loc,
                address:req.query.address
            })
        })
    })
})

.get('/help/*', (req, res) => {
    res.render('404', {
        error_message:'Help Article Not found!',
        name:'Nrupen Patel'
    })
})

.get('*', (req, res) => {
    res.render('404', {
        error_message:'Page not found!',
        name: 'Nrupen Patel'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port');
});

