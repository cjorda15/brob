const stateData = require('../../../server/stateData.js')
const stats = require('../../../server/data')

const knexStateData = (knex) => {
  return Object.keys(stateData).map((state) => {
    return knex('state').insert(
     stateData[state]
    );
  });
};

const knexStats = (knex) => {
  return Object.keys(stats).map((row) => {
    return knex('stats').insert(
     stats[row]
    );
  })
}

exports.seed = function(knex, Promise) {
  return knex('stats').del()
  .then(() => knex('state').del())
    .then(() => {
      const state = knexStateData(knex)
      const stat = knexStats(knex)
      
      return Promise.all([
        ...state, ...stat
      ])}
  );
};
