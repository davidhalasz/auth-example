const authService = require("../services/authService");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

const createUser = async (req, res, next) => {
  authService
    .isEmailExists(req.body.email)
    .then((data) => {
      if (data) {
        return res
          .status(402)
          .json({ msg: "This email address already exists." });
      }

      authService.createUser(req.body).then((createdUser) => {
        return res.status(201).json({ user: createdUser, msg: "User created." });
      });
    })
    .catch((err) => {
      return res.status(500).json({ msg: err });
    });
};

const login = (req, res, next) => {
  authService
    .isEmailExists(req.body.email)
    .then((data) => {
      if (!data) {
        return res.status(402).json({ msg: "This email is not exist." });
      }

      authService
        .checkPassword({
          password: data.password,
          plainPassword: req.body.password,
        })
        .then((boolValue) => {
          if (boolValue) {
            let foundUser = {email: data.email, username: data.username};
            req.session.jwt = authService.createToken(data._id);
            return res
              .status(200)
              .json({ user: foundUser, msg: "User logged in." });
          }

          return res.status(403).json({ msg: "Invalid password." });
        })
        .catch((err) => {
          return res.status(500).json({ msg: err });
        });
    })
    .catch((err) => {
      return res.status(500).json({ msg: err });
    });
};

const getCurrentUser = async (req, res, next) => {
  req.session.username = "helloo";
  if (!req.session.jwt) {
    return res.status(401).json({ msg: "Token is expired!" });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(req.session.jwt, "tokenSecretKey");
  } catch (err) {
    return res
      .status(402)
      .send({ msg: "You are not authorized!" });
  }

  const user = await User.findOne({ _id: decodedToken.user_id }, ["-password"]);

  if (!user)
    return res.status(404).json({ msg: "User not found!" });
  res.status(200).json({ user });
};

module.exports = {
  login,
  createUser,
  getCurrentUser,
};
