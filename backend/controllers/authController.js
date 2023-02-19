const User = require("../models/user");
const bcrypt = require("bcryptjs");

const login = (req, res, next) => {
  const { email, password } = req.body;
  res.status(200).json({ email: email, password: password });
};

const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  let isEmailExists;

  try {
    isEmailExists = await User.findOne({ email: email });
  } catch (err) {
    return res
      .status(409)
      .json({ msg: "Valami hiba történt. Próbáld újra később." });
  }

  if (isEmailExists) {
    return res.status(402).json({ msg: "Ez az email cím már foglalt!" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  try {
    const response = await newUser.save();
    return res.status(200).json({
      msg: "Sikeres regisztráció! Az aktiváló linket elküldtük az email címedre!",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Valami hiba történt! Próbáld meg később!" });
  }
};

module.exports = {
  login,
  createUser
};
