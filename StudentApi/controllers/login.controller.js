const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user.model");
const {
  isValid,
  isValidEmail,
  isValidObject,
  isValidString,
  
} = require("../utils/validators");
const {JWT_SECRET}=require("../utils/constants");

const login = async (req, res) => {
  const data = req.body;
  if (!isValid(data) || (isValid(data) && !isValidObject(data))) {
    return res.status(400).json({
      success: false,
      code: 400,
      data: null,
      error: null,
      message: "Invalid request body",
      resource: req.originalUrl,
    });
  }
  if (
    !isValid(data.email) ||
    (isValid(data.email) && !isValidEmail(data.email))
  ) {
    return res.status(400).json({
      success: false,
      code: 400,
      data: null,
      error: null,
      message: "Invalid email id",
      resource: req.originalUrl,
    });
  }
  if (
    !isValid(data.password) ||
    (isValid(data.password) && !isValidString(data.password))
  ) {
    return res.status(400).json({
      success: false,
      code: 400,
      data: null,
      error: null,
      message: "Invalid password",
      resource: req.originalUrl,
    });
  }
  try {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        code: 404,
        data: null,
        error: null,
        message: "Invalid email id, no user found with this emailID.",
        resource: req.originalUrl,
      });
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        code: 404,
        data: null,
        error: null,
        message: "Invalid password.password mismach try to provide correct password.",
        resource: req.originalUrl,
      });
    }

    const token = await jwt.sign({ userId: user._id },JWT_SECRET);

    return res.status(200).json({
      success: true,
      code: 200,
      data: { user, token },
      error: null,
      message: "Login successful",
      resource: req.originalUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      data: null,
      error: error,
      message: error.message,
      resource: req.originalUrl,
    });
  }
};

module.exports = {
  login: login,
};