const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/geocode')


const app = express()

// Define paths for Express config...
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partial')

// Setup handlebars engine and views location....
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'satyam nayak'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'satyam nayak'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is awsome',
        title: 'Help',
        name: 'satyam nayak'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        res.send({
           error:'404 PAGE NOT FOUND'  
        })
    }
    else{
        geocode(req.query.address, (error, { latitude, longitude, location }) => {
            if (error) {
                return res.send({error})
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
    
               res.send({
                   forecast:forecastData,location,
                   address:req.query.address 
               })
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search)
    {
        res.send({
           error:'404 PAGE NOT FOUND'  
        })
    }
    else{
        res.send({
            product: []
        })
    }
   
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'satyam nayak',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})