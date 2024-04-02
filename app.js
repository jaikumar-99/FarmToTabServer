const http = require('http')
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const bodyParser = require('body-parser');
// const cors = require('cors')

// app.use(cors());
app.use(bodyParser.json())
console.log("server is running")
mongoose.connect('mongodb+srv://JaiKumar:Sjaikumar@cluster0.vzeczb5.mongodb.net/users').then(()=> {
    app.listen(3000)
}).catch((err)=> {
    console.log(err)
})