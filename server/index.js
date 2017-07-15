const express = require('express')
const app = express()
const path = require('path')
const cors = require('express-cors');
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development';
const configuration = require(__dirname + '/../knexfile.js')[environment];
const database = require('knex')(configuration);
const router = require('./router')



app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT ||3000)

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../README.md'))
})

app.use('/api/v1', router)
.set('Accept', 'application/json')

app.listen(app.get('port'), () => {
  console.log("app is on port "+ app.get('port'))
})


module.exports = app
