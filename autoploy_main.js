const express = require('express')

const deploy = require('./routes/deploy')

const BodyParser = require('body-parser')

const path = require('path')

const app = express()

app.use(BodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/deploy', deploy)

// for Github Test Ping
app.post('/', (req, res, next) => {
    res.sendStatus(200)
})

const HTTPServer = app.listen(8010, (error) => {
    if(error) throw error
    console.log(`autoploy starting`)
})