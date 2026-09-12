const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const express = require('express');
const app = express();
const Router = require('./routes/route');
const authmiddleware = require('./authentication/auth');
const connectDB = require('./db/connect')

const port = process.env.PORT || 3000;

const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'front'))); // serves your HTML/CSS/JS
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'index.html'));
});
app.use('/api/v3/auth', Router);

const start = async function(){
    try{
        await connectDB(process.env.MONGOURL);
        console.log(`server is listening on port ${port}...`)
    }
    catch(error){
        console.log(error);
    }
}

start();