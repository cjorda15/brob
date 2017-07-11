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

  beforeEach((done) => {
    knex.migrate.latest()
    .then(() => {
      knex.seed.run()
    })
    .then(() => {
      done()
    })
  });

  it('should return all of the states data', (done) => {
    chai.request(server)
      .get('/api/v1/states')
      .end((err, res) => {

        const testData = res.body.sort((a, b) => {
          return a.people.length-b.people.length})

        res.should.have.status(200)
        res.should.be.json;
        res.body.length.should.equal(51)
        testData[0].state.should.equal("ND")
        testData[0].people.length.should.equal(2)
        testData[0].deaths.should.equal(2)
        done()
      })
  })

  it('should return all of the data concerning civilions killed by police', (done) => {
    chai.request(server)
      .get('/api/v1/stats')
      .end((err, res) => {

        const testData = res.body.filter(data => {
          return data.name === 'Louis Becker'
        })

        res.should.have.status(200)
        res.should.be.json;
        res.body.length.should.equal(2239)
        testData[0].id.should.equal('596228d0bc4435bc7eb85faf')
        testData[0].name.should.equal("Louis Becker")
        testData[0].age.should.equal('87')
        testData[0].sex.should.equal("Male")
        testData[0].race.should.equal("White")
        testData[0].month.should.equal("January")
        testData[0].day.should.equal("14")
        testData[0].year.should.equal("2015")
        testData[0].address.should.equal('New York State Rte 23 and Cairo Junction Rd')
        testData[0].city.should.equal('Catskill')
        testData[0].state.should.equal('NY')
        testData[0].cause.should.equal('Struck by vehicle')
        testData[0].dept.should.equal('New York State Police')
        testData[0].armed.should.equal('No')
        done()
      })
  })

  it('should return a specific state', (done) => {
    chai.request(server)
     .get('/api/v1/states/CO')
     .end((err, res) => {
       res.should.have.status(200)
       res.should.be.json;
       res.body[0].state.should.equal("CO")
       res.body[0].deaths.should.equal(64)
       res.body[0].people.length.should.equal(64)
       done()
     })
  })
  
  it('should return a filtered cateogry by given query for the stats table', (done) => {
    chai.request(server)
    .get('/api/v1/stats/query/?column=age&type=84')
    .end((err, res) => {

      res.should.have.status(200)
      res.should.be.json;
      res.body[0].id.should.equal('596228d1bc4435bc7eb86744')
      res.body[0].name.should.equal('Sadine Dixon')
      res.body[0].age.should.equal('84')
      res.body[0].sex.should.equal('Female')
      res.body[0].race.should.equal('White')
      res.body[0].month.should.equal('October')
      res.body[0].day.should.equal('2')
      res.body[0].year.should.equal('2016')
      res.body[0].address.should.equal('US-49')
      res.body[0].city.should.equal('Rector')
      res.body[0].state.should.equal('AR')
      res.body[0].cause.should.equal('Struck by vehicle')
      res.body[0].dept.should.equal('Clay County Sheriff\'s Office')
      res.body[0].armed.should.equal('No')


      done()
    })

  })

})
