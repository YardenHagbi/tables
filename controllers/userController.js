const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../config/validation");

const registerUser = async (req, res) => {
  //Validate body
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(409).send("Email already exists");

  //Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  //Create and save user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    return res.status(201).send(savedUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const loginUser = async (req, res) => {
  //Validate body
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user exists by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("Email not found");

  //Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  //Create token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
  return res.header("auth-token", token);
};

module.exports = { registerUser, loginUser };
