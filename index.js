const express = require('express');
const app = express();
const port = process.env.PORT = 5000;
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Running Watch Dazzle Server.....');
})

app.listen(port, () => {
    console.log('Listening port:', port);
})