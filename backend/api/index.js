const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");

const app = express();
dotenv.config();

console.log(process.env.ACCESS_TOKEN_SECRET);


const PORT = process.env.PORT;
const CORSURL = "http://127.0.0.1:5501";




// Habilita CORS para todas las rutas
const corsOptions = {
    origin: CORSURL,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('../config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('../routes/auth.routes')(app);


app.listen(PORT, () => {
    console.log(`Servidor Express en el puerto ${PORT}`);
});