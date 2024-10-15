import { defineConfig } from '@mikro-orm/postgresql';

let dbConf = {};

if (process.env.NODE_ENV === 'prod') {
  console.log('Running in production mode');
  throw Error('DB not setup for prod');
} else if (process.env.NODE_ENV === 'test') {
  console.log('Running in test mode');
  dbConf = {
    debug: true, // Should log
    entities: ['./dist/entities'],
    entitiesTs: ['./src/entities'],
    dbName: 'myDb_test',
    password: 'mypassword',
    user: 'myuser',
    port: 5432,
    allowGlobalContext: true,
  };
} else {
  console.log('Running in an dev environment');
  dbConf = {
    debug: true, // Should log
    entities: ['./dist/entities'],
    entitiesTs: ['./src/entities'],
    dbName: 'myDb',
    password: 'mypassword',
    user: 'myuser',
    port: 5432,
  };
}

export default defineConfig(dbConf);
