const User = require("../models/user");

const createUser = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const newUser = new User({
      email: email,
      password: password,
    });

    User.create(newUser)
      .then((doc) => {
        resolve(doc);
      })
      .catch((err) => {
        reject(new Error('Ooops! Something happened. Try later.'));
      });
  });
};

const isEmailExists = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email })
      .then((doc) => {
        resolve(doc);
      })
      .catch((err) => {
        reject(new Error('Ooops! Something happened. Try later.'));
      });
  });
};

module.exports = {
  createUser, isEmailExists
};
