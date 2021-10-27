const { Pool } = require('pg');

var connPostgres = function() {
  const credentials = {
    host: 'localhost',
    user: 'postgres',
    password: 'bela1010',
    database: 'snopses_development',
    port: 5432,
  };
  var client = new Pool(credentials);
  return client;
}
module.exports = function(){
  console.log('Passei autoload');
  return connPostgres;
};
