const express = require('express') //npm i express
const path = require('path') //require path for path manipulation across OSes
const app = express() //create express app 
const hbs = require('hbs') //Handlebars is an hbs page renderer
const forecast = require('./utils/forecast') // little utils for adding 
const geocode = require('./utils/geocode.js')


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'..','public') //join paths to define base public directory path
const viewsPath = path.join(__dirname,'../templates/views') //set templates as default views folder
const partialsPath = path.join(__dirname,'../templates/partials')
//Setup handlebars engine and views location
app.set('view engine','hbs') 
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use( express.static( publicDirectoryPath ) )


//TO MONITOR HBS CHANGES nodemon src/app.js -e ext,ext,(hbs),(js)

app.get('',(req,res) => {
    res.render('index',{
        title: 'Aplicación de Clima',
        name: 'Joaquín Ayala'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'Sobre mí',
        name: 'Joaquín Ayala'
    })
});

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Ayuda',
        example: 'Aplicación de clima creada usando Node.js y Express, en conjunto con la API Darksky y Mapbox siguiendo el curso de Node.js de Andrew Mead en Udemy',
        name: 'Joaquín Ayala'
    })
});

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Debes proveer de una dirección o ciudad'
        })
    }
    geocode.find_coordinates(req.query.address,(error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error: 'Error: '+error,
            })
        }
        forecast(latitude, longitude,(error,data) => {
            if(error){
                return res.send({
                    error: 'Error: '+error,
                })
            }
            res.send({
                location: location,
                forecast: data
            })
        });

    })
})


app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    res.send({
        products: []   
    })
});

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        message: 'Help article not found',
        name: 'Joaquín Ayala'
    })
});

app.get('*',(req,res) =>{
    res.render('404',{
        title: '404',
        message: 'Page not found',
        name: 'Joaquín Ayala'
    })
});
// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000');    
})