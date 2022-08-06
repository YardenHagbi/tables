const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName)
    return res
      .sendStatus(400)
      .json({ message: "Email and password and fullName are required." });

  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.sendStatus(409);

  try {
    //Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create and store the new user
    const result = await User.create({
      email: email,
      password: hashedPassword,
      fullName: fullName,
    });

    console.log(result);

    res.status(201).json({ message: `New user ${email} was created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser };
