const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast'); 

const app = express(); // Invoke express module

// Establising path/Express config to public dir for index.html to load
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views') // #1 Thinking views folder is named 'templates'
const partialsPath = path.join(__dirname, '../templates/partials')

// Setting up hbs(handblebars; templating) and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); // #2 Redirecting views to path
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // customize server to serve ./public dir.

// Loading index.hbs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome to hbs templating',
        name: 'Julio Briones'
    })
});

// About.hbs
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        subtitle: 'In My Journey to Becoming a Node.js Dev!',
        name: 'Julio Briones'
    })
});

// Help.hbs
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Welcome to Help Page',
        subtitle: 'Here you can receive all the help we can provide you with.',
        name: 'Julio Briones'
    })
})

// Route to Weather Page
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    // I set a default object {}, in case the user enters something erroneous 
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    //res.send('<h1>Welcome to Our Weather Page')
    // let address = res.send({
    //     forecast: 'Partly clouded',
    //     location: 'Los Angeles, CA',
    //     address: req.query.address
    // })
    // return address
    
    
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

// 40f4 page; '*' wildcard character means anything else that hasn't been defined.
// It comes last

// 404 help article not found page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Julio Briones',
        errorMessage: "Help article not found. We're sorry!"
    })
})

// 404 Page
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Ooops! This is a 404 page!',
        subtitle: "We're sorry for the inconveniance.",
        name: 'Julio Briones',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
