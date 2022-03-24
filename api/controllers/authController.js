const User = require("../models/User");
const { StatusCodes } = require("http-status-code");

// REGISTER
const register = async (req, res) => {
  const { phone, email } = req.body;

  const userEmailExists = await User.findOne({ email });
  const userPhoneExists = await User.findOne({ phone });

  userEmailExists && res.status(401).json({ msg: "Email already in use" });
  userPhoneExists &&
    res.status(401).json({ msg: "Phone Number already in use" });

  const user = await User.create(req.body);

  const token = user.createJWT();
  res.status(200).json({ user, token });
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    !user && res.status(404).json({ msg: "Invalid credentials" });

    const isPasswordCorrect = await user.comparePassword(password);
    !isPasswordCorrect && res.status(400).json("Invalid Login Credentials");

    const token = user.createJWT();
    user.password = undefined;
    
    
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { register, login };
