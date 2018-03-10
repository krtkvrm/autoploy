const route = require('express').Router()

const shell = require('shelljs')

const projects = require('../config/projects')

const fs = require('fs')

const JSONHelper = require('../JSONHelper')

// To Stop current running project
var stopRunCmds = (repoPath, req) => {
    var data = JSONHelper.getUpdatedJSONData(repoPath +  "/autoploy.json")
    var runCmds = data['run']
    for(var i = 0 ; i < runCmds.length ; i++) {
        shell.exec(`pkill -f "`+runCmds[i]+`"`)
    }
}

var run = (gitLink, repoPath, req, data) => {
    var runCmds = data['run']
    var i = 0
    shell.cd(repoPath + "/" + req.body.repository.name)
    let recursion = () => {
        shell.exec(runCmds[i], {silent: false}, (code, stdout, stderr) => {
            if(code !== 0) {
                console.log(stderr)
                console.log(stdout)
            }
            else if(i<runCmds.length) {
                i++
                recursion()
            }
        })
    }
    recursion()
}

var init = (gitLink, repoPath, req) => {
    shell.cd(repoPath + "/" + req.body.repository.name)
    if(fs.existsSync(repoPath + "/" + req.body.repository.name + "/autoploy.json")) {
        var data = JSONHelper.getUpdatedJSONData(repoPath + "/" + req.body.repository.name + "/autoploy.json")
        if(JSONHelper.whereExist("run", data) !== -1) {
            run(gitLink, repoPath, req, data)
        }
    }
}

route.post('/', (req, res, next) => {
    // Check if Repo/Branch exist in projects.json
    let ref = req.body.ref.split('/') 
    let branch = ref[ref.length-1]
    var repository = req.body.repository.name + "/" + branch
    var ir  = JSONHelper.whereExist(repository, projects)
    if(ir === -1) {
        next()
    }
    else if (req.body.repository.html_url === projects[repository][0]){
        var gitLink = projects[repository][0]
        var repoPath = projects[repository][1]

        // To avoid Github's Timeout
        res.sendStatus(200)

        // Git starts here
        let repo = gitLink.split('/')
        repo = "git@github.com:/"+repo[repo.length-2] + "/" + repo[repo.length-1]
        if(req.body.repository.name === "autoploy") {
            shell.exec("git pull")
        }
        else if(fs.existsSync(repoPath + "/" + req.body.repository.name)) {
            shell.cd(repoPath + "/" + req.body.repository.name)
            shell.exec("git pull")
            stopRunCmds(repoPath + "/" + req.body.repository.name, req)
            init(gitLink, repoPath, req)
        }
        else {
            shell.cd(repoPath)
            shell.exec("git clone " + repo)
            init(gitLink, repoPath, req)
            
        }
    }
})

route.use((req, res, next) => {
    // Waiting for timeout :)
})

module.exports = route