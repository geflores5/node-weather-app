const path = require('path')
const expresss = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = expresss()
const port = process.env.PORT || 3000

// Define paths for Express config
app.use(expresss.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: `How's the Weather?`,
        name: 'Giovanni Flores'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Giovanni Flores'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help yourself.',
        name: 'Giovanni Flores'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({ 
            error: 'You must provide and address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error: error })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.send('Help article not found')
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found'
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})