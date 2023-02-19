const User = require("../models/user");
const bcrypt = require("bcryptjs");

const createUser = ({ email, password }) => {
  return new Promise( async (resolve, reject) => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: email,
      password: encryptedPassword,
    });

    User.create(newUser)
      .then((doc) => {
        resolve(doc);
      })
      .catch((err) => {
        reject(new Error("Ooops! Something happened. Try later."));
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
        reject(new Error("Ooops! Something happened. Try later."));
      });
  });
};

const checkPassword = ({ password, plainPassword }) => {
  return new Promise( async (resolve, reject) => {
    if (await bcrypt.compare(plainPassword, password)) {
      resolve(true);
    } else {
      resolve(false);
    }
  }).catch((err) => {
    return new Error("Ooops! Something happened. Try later.");
  });
};

module.exports = {
  createUser,
  isEmailExists,
  checkPassword,
};
