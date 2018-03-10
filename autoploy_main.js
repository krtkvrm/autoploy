const express = require('express')

const deploy = require('./routes/deploy')

const BodyParser = require('body-parser')

const app = express()

app.use(BodyParser.json());

app.use('/deploy', deploy)

const HTTPServer = app.listen(8010, (error) => {
    if(error) throw error
})