import nconf from 'nconf';

module.exports = nconf
  .argv().env()
  .file("../local.env.json")
  .defaults({NODE_ENV: 'development'});
