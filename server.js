const express = require('express')

// let settings = require('./config/settings.json')

// const setSSH = require('./routes/setSSH')

const deploy = require('./routes/deploy')

const BodyParser = require('body-parser')

const app = express()

app.use(BodyParser.json());

app.use('/deploy', deploy)

const HTTPServer = app.listen(8008, (error) => {
    if(error) throw error
})