// const User = require("../models/user.model");
// const bcrypt = require("bcryptjs");

// const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../config/env");

// const registerUser = async (data) => {
//   const { username, email, password } = data;
//   console.log(data, "data");

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ username, email, password: hashedPassword });
//   return await user.save();
// };

// const loginUser = async (data) => {
//   const { email, password } = data;
//   const user = await User.findOne({ email });
//   if (!user) throw new Error("User not found");

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) throw new Error("Invalid credentials");

//   return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
// };

// module.exports = { registerUser, loginUser };
