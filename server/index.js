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

app.set('port',process.env.PORT ||3000)

app.use('/api/v1', router)

app.listen(app.get('port') , () => {
  console.log("app is on port "+ app.get('port'))
})
