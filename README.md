[![CircleCI](https://circleci.com/gh/cjorda15/brob/tree/master.svg?style=svg)](https://circleci.com/gh/cjorda15/brob/tree/master)

This project consists of express/node, knex.js, circle ci, and deployed on heroku. The database found on postgress that this project is utilizing contains information of all civilians killed by U.S police in the year 2016.

API references

--ENDPOINTS--


GET api/v1/states

-retrieve all states data consisting of number of deaths and id's of people killed to be referenced

GET api/v1/states/:state
ex: api/v1/states/CO
--retrieve specific state info with inital of state wanted

GET api/v1/stat

-retrieves whole list of details on the name of the person killed, age, gender, race, date the incident occurred, where it occurred, the cause of death, if and what the civilian was armed with, and what dept. the officer belonged to.

GET api/v1/stats/query?col=filterWithThisColumn&by=thisBasis
ex: api/v1/stats/query?col=armed&by=knife
--filtered list by request's query through column specified and by value associated with specified column  

POST api/v1/auth
request body needs in json format as {user:{username:???,password:???}}
---!needed for authorized endpoint!---

-- Authorization Required --

PUT api/v1/states/:state/increment

PUT api/v1/states/:state/decrement

PUT api/v1/stats

DELETE api/v1/state/:state

DELETE api/v1/stats/:id
