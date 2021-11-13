function Publishers (connection) {
  this._client = connection();
}

// Get one Publisher
Publishers.prototype.getPublisher = async function(publisher, callback){
  await this._client.query('select * from publishers where id = ' + publisher.id, callback);
  await this._client.end();
};

// Get all Publishers
Publishers.prototype.getPublishers = async function(callback){
  await this._client.query('select * from publishers', callback);
  await this._client.end();
};

// Save one Publisher
Publishers.prototype.savePublisher = async function(publisher, callback){
  const sql = 'INSERT INTO publishers (name) VALUES ($1);';
  await this._client.query(sql, [publisher.name], callback);
};

// Delete one Publisher
Publishers.prototype.deletePublisher = async function(publisher, callback){
  const sql = 'DELETE FROM publishers where id = ' + publisher.id
  await this._client.query(sql, callback);
};

// Close connection
Publishers.prototype.end =  async function(book, callback){
  await this._client.end();
};



module.exports = function(){
  return Publishers;
}