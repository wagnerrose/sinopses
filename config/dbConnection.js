var postgres = require('pg');

var connPostgres = function(){
    return connection = postgres.createConnection({
        host: 'localhost',
        user: 'postgres',
        password: 'bela1010',
        database: 'snopses_development',
        port: 5432
    });
}

module.exports = function(){
    return connPostgres;
}
