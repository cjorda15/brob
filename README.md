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
-request body needs in json format as {user:{username:???,password:???}}
---!needed for authorized endpoint!---

-- Authorization Required --

PUT api/v1/states/:state/increment
ex: api/v1/states/CO/increment
-necessary if you post a new stat on the stat table to reflect the deaths properly


PUT api/v1/states/:state/decrement
ex: api/v1/states/CO/decrement
--necessary if you delete a stat on the stat table to reflect the deaths properly

PUT api/v1/stats
ex: api/v1/stats (in the request body-- {"id":"596228d1bc4435bc7eb86805",
  "column":"race","update":"White")
--requires in the request body in json format (id) of the stat you wish to update, a (column), and a (update) of the change you like to make it to for the column you specified

DELETE api/v1/state/:state
ex: api/v1/state/TX
--deletes all of the states info

DELETE api/v1/stats/:id
ex: api/v1/stats/596228d1bc4435bc7eb86805
--deletes stat with the given id
