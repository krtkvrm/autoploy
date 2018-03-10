const route = require('express').Router()

const shell = require('shelljs')

var projects = require('../config/projects')

const fs = require('fs')

var getUpdatedJSONData = (JSONFileName) => {
    var file = fs.readFileSync(JSONFileName)
    return JSON.parse(file)
}

var whereExist = (data, reference) => {
    let array = Object.keys(reference)
    for(var i = 0 ; i < array.length ; i++) {
        if( data == array[i]) {
            return i
        }
    }
    return -1
}

// Deployment happens here
var deploy = (gitLink, repoPath, body, repo, res) => {

    // checkout at latiest commit
    shell.exec("git checkout "+body.after, {async:false})

    // run
    var deployer = getUpdatedJSONData(repoPath + "/autoploy.json")
    var run = deployer.run
    var i = 0
    var recursion = () => {
        shell.exec(run[0], {silent: true}, (code, stdout, stderr) => {
            if(code !== 0) {
                return res.send(500)
            }
            else
            if(i<run.length) {
                i++
                recursion()
            }
        })
    }
    recursion()

}

route.post('/', (req, res, next) => {
    // Check if Repo/Branch exist in projects.json
    let ref = req.body.ref.split('/') 
    let branch = ref[ref.length-1]
    let repository = req.body.repository.name + "/" + branch
    var ir  = whereExist(repository+"", projects)
    if(ir !== -1) {
        console.log(ir)
    }
    var gitLink = projects[repository][0]
    var repoPath = projects[repository][1]

    // Updating starts here
    let repo = gitLink.ref.split('/')
    repo = "git@github.com:/"+repo[repo.length-2] + "/" + repo[repo.length-1]
    shell.exec("$ git clone "+repo)
    shell.exec('cd ' +repoPath, {silent: true}, (code, stdout, stderr) => {
        if(code === 0)
        {
            deploy(gitLink, repoPath, req.body, repo, res)
        }
        else
        {
            shell.exec("git clone "+repo)
        }
    })
})


module.exports = route