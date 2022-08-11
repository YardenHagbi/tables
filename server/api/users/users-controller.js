const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserRole } = require("../../model/enums");

async function registerUser(req, res) {
  //Check if email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(409).send("Email already exists");

  //Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  //Create and save user
  const savedUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: UserRole.TRIAL,
  });

  //Create token
  const token = createToken(savedUser);

  return res.status(201).header("auth-token", token).send(savedUser);
}

async function loginUser(req, res) {
  //Check if user exists by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("Email not found");

  //Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  //Create token
  const token = createToken(user);

  return res.header("auth-token", token).sendStatus(204);
}

function createToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.TOKEN_SECRET);
}

module.exports = { registerUser, loginUser };
