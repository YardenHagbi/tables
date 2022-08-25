const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserRole, UserSubscription, Status } = require("../../model/enums");

const getUserFromToken = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).send("User not found");

  return res.status(200).send(user);
};

const loginUser = async (req, res) => {
  //Check if user exists by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("Email not found");
  //Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");
  //Create token
  const token = createToken(user);

  return res.status(200).send({ user, token });
};

const registerUser = async (req, res) => {
  //Check if email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(409).send("Email already exists");

  //Create and save user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: await hashPassword(req.body.password),
    createdDate: Date.now(),
    role: UserRole.USER,
    subscription: UserSubscription.TRIAL,
    status: Status.ACTIVE,
  });
  //Create token
  const token = createToken(user);

  return res.status(201).send({ user, token });
};

const updateUser = async (req, res) => {
  //Check if user exist
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).send("User not found");
  //Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");
  //Update user and save
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = await hashPassword(req.body.newPassword);
  await user.save();
  //Create token
  const token = createToken(user);

  return res.status(200).send({ user, token });
};

const createToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.TOKEN_SECRET);

const hashPassword = (password) => bcrypt.hash(password, 10);

module.exports = { loginUser, getUserFromToken, registerUser, updateUser };
