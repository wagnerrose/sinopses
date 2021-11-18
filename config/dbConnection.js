const { Pool } = require('pg');

let connPostgres = function() {
  const credentials = {
    host: 'localhost',
    user: 'postgres',
    password: 'bela1010',
    database: 'snopses_development',
    port: 5432,
  };
  let client = new Pool(credentials);
  return client;
}
module.exports = function(){
  console.log('Passei autoload');
  return connPostgres;
};
