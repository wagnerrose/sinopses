function Publishers (connection) {
  this._client = connection();
}
Publishers.prototype.getPublishers = function(callback){
  this._client.query('select * from publishers', callback);
};

Publishers.prototype.getPublisher = async function(callback){
  await this._client.query('select * from publishers where id = 1', callback);
};

Publishers.prototype.savePublisher = function(publisher, callback){
  const sql = 'INSERT INTO publishers (name) VALUES ($1);';
  this._client.query(sql, [publisher.name], callback);
};

module.exports = function(){
  return Publishers;
}