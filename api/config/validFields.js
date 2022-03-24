const validFields = (req, res, next) => {
  const { username, email, password, confirmPassword, phone } = req.body;

  if (!username || !email || !password || !confirmPassword || !phone) {
    res.status(400).json({ msg: "All fields are required" });
  }

  if (password.length < 6) {
    res
      .status(400)
      .json({ msg: "Password cannot be less than six(6) characters" });
  }

  if (password !== confirmPassword) {
    res.status(400).json({ msg: "Passwords do not match" });
  }
  next();
};

const validLoginFields = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({msg: "All fields are required"});
  }
  next()
};

module.exports = {validFields, validLoginFields};
