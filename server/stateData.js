const data = require("./data.js")

const stateData =  data.reduce((acc,item) => {
    acc[item.state]? acc[item.state].deaths+=1 : acc[item.state] = {state:item.state,deaths:1}
    return acc
},{})

module.exports = stateData;
