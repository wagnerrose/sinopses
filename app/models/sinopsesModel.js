function Synopses (connection) {
  this._client = connection();
}
Synopses.prototype.getSynopses = function(callback){
  this._client.query('select * from synopses', callback);
};

Synopses.prototype.getSynopsis = async function(callback){
  await this._client.query('select * from synopses where id = 1', callback);
};

Synopses.prototype.saveSynopsis = function(synopsis, callback){
  const sql = 'INSERT INTO synopses (name) VALUES ($1);';
  this._client.query(sql, [synopses.name], callback);
};

module.exports = function(){
  return Synopses;
}