require('dotenv').config()
const express = require('express')
const router = express.Router()
const environment = process.env.NODE_ENV || 'development';
const configuration = require(__dirname + '/../knexfile.js')[environment];
const database = require('knex')(configuration);
const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
  const token = req.body.token ||
                req.query.token ||
                req.headers['authorization']

  if (token) {
    jwt.verify(token, process.env.CLIENT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(402).json({
          success: false,
          message: 'Invalid authorization token',
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(402).json({
      success: false,
      message: 'You must be authorized to hit this endpoint',
    })
  }
}

router.get('/states', (req, res) => {
  database('state').select()
  .then(states => {
    res.status(200).json(states);
  })
   .catch(error => {
     response.status(500).json({error})
   });
})

router.get('/states/:state', (req, res) => {
  database('state').where({
    'state': req.params.state
  })
  .then(state => {
    if(!state[0].id){
      res.status(404).send("No info on this state, make sure it is in the form of the intitals of the state (ex:  api/v1/states/CO)")
    }
    res.status(200).json(state);
  })
   .catch(error => {
     res.sendStatus(500).json({error})
   });
})


router.post('/states', checkAuth, (req, res) => {
  const check = req.body.data

  // if (!check.state||!check.people||check.deaths!==0||check.people!==[]||check.state.length!==2) {
  //   console.log(check.people!==[])
  //   res.status(200).send("unsuccesful insertion, make sure you included in your request body a data object containing (state) with only two characters, (people) set to a empty array and (deaths) set to 0")
  // }
  database('state')
  .insert(req.body.data)
  .then((data) => res.status(201).send("successful insertion"))
})

router.put('/states/:state/increment', checkAuth, (req, res) => {
  database('state')
  .where('state', req.params.state)
  .select()
  .update("deaths", database.raw(`deaths + 1`))
  .then(update => {
    res.sendStatus(200)
  })
  .catch(error => {
    res.status(200).json({error}, "incorrect input")
  });
})

router.put('/states/:state/decrement', checkAuth, (req, res) => {
  database('state')
  .where('state', req.params.state)
  .select()
  .update("deaths", database.raw(`deaths - 1`))
  .then(update => {
    res.sendStatus(200)
  })
  .catch(error => {
    res.status(402).json({error}, "incorrect input")
  });
})

router.delete('/state:state', checkAuth, (req, res) => {
  database('state')
  .where('state', req.params.state)
  .del()
  .then(update => {
    res.sendStatus(200)
  })
  .catch(error => {
    res.status(501).json({error})
  });
})


router.get('/stats', (req, res) => {
  database('stats').select()
  .then(state => {
    res.status(200).json(state);
  })
   .catch(error => {
     res.status(501).json({error})
   });
})

router.get('/stats/query', (req, res) => {
  const col = req.query.column
  const by = req.query.type

  database('stats').where(
    col, by
  ).select()
  .then(stat => {
    res.status(200).json(stat);
  })
   .catch(error => {
     res.status(501).json({error})
   });
})

router.post('/stats', checkAuth, (req, res) => {
  let randomId = ""

  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let {data} = req.body
  for (let i =0; i<25; i++ ) {
    let random = (Math.floor(Math.random()*36))
    randomId+=  possible[random]
  }
  data.id=randomId
  database('stats').select().insert(data).then(data => {
    res.status(201).send(data)
  })
  .catch(err => res.status(501).send(err))
})


router.put('/stats', checkAuth, (req, res) => {
  const {id, column, update} = req.body

  database('stats')
  .where("id", id).select()
  .update(column, update)
   .then(update => {
     res.status(200).json(update)
   })
   .catch(error => {
     res.status(501).json({error}, "incorrect input")
   });
})

router.delete('/stats/:id', checkAuth, (req, res) => {
  database('stats')
  .where('id', req.params.id)
  .del()
  .then(update => {
    res.sendStatus(200)
  })
  .catch(error => {
    res.status(501).json({error})
  });
})

router.post('/auth', (req, res) => {
  const {user} = req.body

  if (user.username !== process.env.USERNAME || user.password !== process.env.PASSWORD) {
    res.status(402).send({
      success: false,
      message: 'Invalid Credentials',
    })
  } else {
    const token = jwt.sign(user, process.env.CLIENT_SECRET, {
      expiresIn: 172800
    })

    res.json({
      success: true,
      username: user.username,
      token,
    })
  }
})

module.exports = router
