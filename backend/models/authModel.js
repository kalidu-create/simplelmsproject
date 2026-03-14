const db = require("../config/db");


const User = {

  // Create user
  createUser: (user) => {
    return new Promise((resolve, reject) => {
      const { name, email, password } = user;

      const query = "INSERT INTO users (name,email,password) VALUES (?,?,?)";

      db.query(query, [name, email, password], (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      });

    });
  },

  // Find user by email
  findUserByEmail: (email) => {
    return new Promise((resolve, reject) => {

      const query = "SELECT * FROM users WHERE email = ?";

      db.query(query, [email], (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
      });

    });
  }

};

module.exports = User;
