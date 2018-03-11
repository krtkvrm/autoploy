[![N|Solid](https://github.com/vkartik97/autoploy/blob/master/images/logo.png?raw=true)](https://github.com/vkartik97/autoploy)

A Simple Application to Deploy Project from Github directly to Cloud.

# Installation

  - [Configure SSH for Github on Cloud](https://help.github.com/articles/connecting-to-github-with-ssh/)
  - Connect to Cloud via SSH
  - Install node.js
  - Clone autoploy and Change directory to Application<br>
    `$ git clone https://github.com/vkartik97/autoploy.git`
    `$ cd autoploy`
    `$ git update-index --assume-unchanged config/projects.json` to avoid conflicts
  - Add Repository details to **autoploy/config/projects.json** in format :<br>
      `{
          "REPOSITORY_NAME/BRANCH_NAME": [GITHUB_LINK, LOCATION_OF_DEPLOYMENT]
        }`
  - Add deployment details to **autoploy.js** in the **_Root Directory of Project to deploy_** using autoploy :<br>
      `{
        "run": [
          "BUILD_COMMMAND_1",
          "BUILD_COMMMAND_1"
        ]
       }`
    
  - Change Directory to autoploy<br>
    `$ cd autoploy`
  - Instal Dependencies<br>
    `$ npm install`
  - Run the Application<br>
    `$ node autoploy_main.js`
    
  - Configure Github Webhooks and Project to work with autoploy<br>
    In Project Settings, add a Webhook pointing to **URL:PORT/deploy** of autoploy running on Cloud, the Content Type should be **application/json** and the Event to triger webhook should be `push` event
    [![N|Solid](https://github.com/vkartik97/autoploy/blob/master/images/webhooks.png?raw=true)](https://github.com/vkartik97/autoploy)

#### Made during Mumbai Hackathon 2018
