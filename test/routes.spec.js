process.env.NODE_ENV = 'test';
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server/index.js')
const knex = require('../db/knex.js')
const config = require('../knexfile.js')

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


describe('API Routes', () => {

  before((done) => {
    knex.migrate.latest()
    .then(() => {
      knex.seed.run()
    })
    .then(() => {
      done()
    })
  });

  it('should return all of the categories', (done) => {
    chai.request(server)
      .get('/api/v1/states')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json;
        res.body.length.should.equal(51)
        done()
      })
    })


})
