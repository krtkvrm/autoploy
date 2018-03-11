[![N|Solid](https://github.com/vkartik97/TestRepoGo/blob/master/Screenshot%20from%202018-03-11%2010-54-16.png?raw=true)](https://nodesource.com/products/nsolid)

A Simple Application to Deploy Project from Github directly to Cloud.

# Installation

  - [Configure SSH for Github on Cloud](https://help.github.com/articles/connecting-to-github-with-ssh/)
  - Connect to Cloud via SSH
  - Install node.js
  - Clone autoploy and Change directory to Application<br>
    `$ git clone https://github.com/vkartik97/autoploy.git`
    `$ cd autoploy`
  - Configure Github Webhooks and Project to work with autoploy<br>
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