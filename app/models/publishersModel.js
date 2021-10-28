module.exports = function(){

  this.getPublishers = async function(connection, callback){
    const client = await connection();
    await client.query('select * from publishers', callback);
  };

  this.getPublisher = async function(connection, callback){
    const client = await connection();
    await client.query('select * from publishers where id = 1', callback);
  };

  this.savePublisher = async function(publisher, connection, callback){
    const client = await connection();
    const sql = 'INSERT INTO publishers (name) VALUES ($1);';
    const result = await client.query(sql, [publisher.name]);
    console.log('eu gravei', result.rows[0]);
    await client.end();
  };

  this.savePublisher = async function(publisher, connection, callback){
    const client = connection();
    const sql = 'INSERT INTO publishers (name) VALUES ($1);';
    const {rows} = await client.query(sql, [publisher.name]);
    console.log('eu gravei', rows);
    await client.end();
  };

  return this;
}