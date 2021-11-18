function Synopses (connection) {
  this._client = connection();
}
// Get one Synopsis
Synopses.prototype.getSynopses = async function(callback){
  this._client.query('SELECT * FROM synopses', callback);
  await this._client.end();
};

// Get all Synopses
Synopses.prototype.getSynopsis = async function(callback){
  await this._client.query('SELECT * FROM synopses WHERE id = 1', callback);
  await this._client.end();
};

// Save one Synopsis
Synopses.prototype.saveSynopsis = async function(synopsis, callback){
  const sql = 'INSERT INTO synopses (name) VALUES ($1);';
  this._client.query(sql, [synopses.name], callback);
  await this._client.end();
};

module.exports = function(){
  return Synopses;
}