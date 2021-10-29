function Publishers () {

}
Publishers.prototype.getPublishers = function(connection, callback){
  const client = connection();
  client.query('select * from publishers', callback);
};

Publishers.prototype.getPublisher = async function(connection, callback){
  const client = await connection();
  await client.query('select * from publishers where id = 1', callback);
};

Publishers.prototype.savePublisher = function(publisher, connection, callback){
  const client = connection();
  const sql = 'INSERT INTO publishers (name) VALUES ($1);';
  client.query(sql, [publisher.name], callback);
};

module.exports = function(){
  return Publishers;
}