function Publishers (connection) {
  this._client = connection();
}

// Get one Publisher
Publishers.prototype.getPublisher = async function(publisher, callback){
  const sql = `SELECT * FROM publishers WHERE id = ${publisher.id}`
  try {
    await this._client.query(sql, callback);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await this._client.end();  // closes connection
  }
};

// Get all Publishers
Publishers.prototype.getPublishers = async function(callback){
  const sql = 'SELECT * FROM publishers ORDER BY name;';
  try {
    await this._client.query(sql, callback);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await this._client.end();  // closes connection
  }
};

// create one Publisher
Publishers.prototype.create = async function(publisher, callback){
  const sql = 'INSERT INTO publishers (name) VALUES ($1);';
  try {
    await this._client.query(sql,[publisher.name], callback);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await this._client.end();  // closes connection
  }
};

// Update one publisher
Publishers.prototype.update = async function(publisher, callback){
  let sql = `UPDATE publishers SET name = $1 WHERE id= $2;`;
  try {
    await this._client.query(sql, [publisher.name, publisher.id], callback);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await this._client.end();  // closes connection
  }
};

// Delete one Publisher
Publishers.prototype.delete = async function(publisher, callback){
  const sql = `DELETE FROM publishers WHERE id = ${publisher.id}`
  try {
    await this._client.query(sql, callback);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await this._client.end();  // closes connection
  }
};

module.exports = function(){
  return Publishers;
}