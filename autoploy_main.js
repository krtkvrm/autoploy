const express = require('express')

const deploy = require('./routes/deploy')

const BodyParser = require('body-parser')

const path = require('path')

const app = express()

app.use(BodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    var lines = require('fs').readFileSync(path.join(__dirname, 'public/logs.out'), 'utf-8').split('\n')
    var out = ""
    for(var i = 0 ; i < lines.length ; i++) {
        out = out + "<br>" + lines[i]
    }
    res.send(out)
})

app.use('/deploy', deploy)

// for Github Test Ping
app.post('/', (req, res, next) => {
    res.sendStatus(200)
})

const HTTPServer = app.listen(8010, (error) => {
    if(error) throw error
    console.log(`autoploy starting`)
})