import nconf from 'nconf';
import path from 'path';

nconf.argv().env()
  .file(path.join(__dirname, '../local.env.json'))
  .defaults({
    NODE_ENV: 'development',
    PORT: 3000,
    HOST: 'localhost'
  });

export default nconf;
