const db = require('./index');

const addUser = function(user) {

  return db.query(`
  INSERT INTO users
  (username, email)
  VALUES($1, $2)
  RETURNING *;`, [user.username, user.email])
    .then(res => res.rows[0])
    .catch(err => console.error('There has query error'));

};

exports.addUser = addUser;

const getUserById = function(id) {

  return db.query(`
  SELECT * FROM users
  WHERE id = $1`, 
  [id])
    .then(res => res.rows[0])
    .catch(err => console.error('There has query error', err.stack));

};

exports.getUserById = getUserById;

const updateUserInfo = function(id, options) {
  
  let queryParams = [];

  let queryString = `UPDATE users `;

  if (options.username) {
    queryParams.push(`${options.username}`);
    queryString += `SET username = $${queryParams.length} `
  }

  if (options.email) {
    queryParams.push(`${options.email}`);
    queryString += `SET email = $${queryParams.length} ` 
  }

  //add user id to queryParms list 
  queryParams.push(`${id}`);

  queryString += `
  WHERE id = $${queryParams.length}
  RETURNING username, email;
  `
  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => console.error('There has query error', err.stack))
};

exports.updateUserInfo = updateUserInfo;