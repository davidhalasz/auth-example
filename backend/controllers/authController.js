const authService = require("../services/authService");
const bcrypt = require("bcryptjs");
const login = (req, res, next) => {
  const { email, password } = req.body;
  res.status(200).json({ email: email, password: password });
};

const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
 
  authService
    .isEmailExists(email)
    .then((data) => {
      if (data) {
        return res
          .status(402)
          .json({ msg: "This email address already exists." });
      }

      authService
        .createUser({ email: email, password: encryptedPassword })
        .then((createdUser) => {
          return res.status(201).json({ createdUser, msg: "User created." });
        });
    })
    .catch((err) => {
      return res.status(500).json({ msg: err });
    });
};

module.exports = {
  login,
  createUser,
};
