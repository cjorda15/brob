const data = require("./data.js")

const stateData =  data.reduce((acc, item) => {
  if (acc[item.state]) {
    acc[item.state].deaths+=1
    acc[item.state].people.push(item.id)
  } else {
    acc[item.state] = {state: item.state, deaths: 1, people: [item.id]}
  }
  return acc
}, {})

module.exports = stateData;
