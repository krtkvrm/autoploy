// To help with JSON Processing

const fs = require('fs')

module.exports = {
    getUpdatedJSONData : (JSONFileName) => {
        var file = fs.readFileSync(JSONFileName)
        return JSON.parse(file)
    },
    whereExist : (data, reference) => {
        let array = Object.keys(reference)
        for(var i = 0 ; i < array.length ; i++) {
            if( data == array[i]) {
                return i
            }
        }
        return -1
    }
}