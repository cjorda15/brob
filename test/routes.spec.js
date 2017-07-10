process.env.NODE_ENV = 'test';
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server/index.js')
const knex = require('../server/db/knex.js')
const config = require('../server/knexfile.js')

chai.use(chaiHttp)

describe('Client Routes', () => {

  it('should return 200 when it hits homepage', (done) => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      res.should.have.status(200)
      done()
    })
  })

  it('should return 404 for route that doesnt exist', (done) => {
    chai.request(server)
      .get('/sad')
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
    })
  })
