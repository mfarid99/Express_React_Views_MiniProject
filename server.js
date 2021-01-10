const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const DBURL = process.env.DB_URL
const PORT = process.env.PORT
const dbObject = {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex: true}
const db = mongoose.connection 

//MW
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx');

//Mongoose (to connect to database)

mongoose.connect(DBURL, dbObject)
db.on('error', (err)=> console.log(err.message + ' is Mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on( 'open', ()=> {
    console.log('Connection made!')
})

//Schema

const {Schema, model} = mongoose

//Routes

//Main Page
app.get('/', (req, res)=> {
    res.render('Index')
})

app.post('/', (req, res)=> {
    res.redirect('/')
})
//Listener

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
