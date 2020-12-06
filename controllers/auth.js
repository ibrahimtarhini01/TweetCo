const path = require('path');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;

// @route   POST /api/auth/register
// @desc    Register User
// @access  public
exports.register = async (req, res) => {
  const { name, username, email, password, country, birthday, bio } = req.body;
  try {
    //Check if user exists or not
    let user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ message: 'User already exists' }] });
    }
    user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ message: 'User already exists' }] });
    }
    user = await User.create({
      name,
      username,
      email,
      password,
      country,
      birthday,
      bio,
    });
    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   POST /api/auth/login
// @desc    Login User
// @access  public
exports.login = async (req, res) => {
  try {
    const { password, username } = req.body;
    //Check if both inputs are available
    if (!password || !username) {
      return res.status(400).json({
        errors: [{ message: 'Please provide an email and password' }],
      });
    }

    // Check for user
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res
        .status(401)
        .json({ errors: [{ message: 'Invalid credentials' }] });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ errors: [{ message: 'Invalid credentials' }] });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   GET /api/auth/logout
// @desc    Logout User
// @access  public
exports.logout = (req, res) => {
  // deleting the cookie and token
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};

// @desc     Update user details
// @route    PUT /api/auth/updatedetails
// @access   Private
exports.updateDetails = async (req, res) => {
  try {
    const fieldsToUpdate = {
      intrests: req.body.intrests,
      name: req.body.name,
      username: req.body.username,
      country: req.body.country,
      birthday: req.body.birthday,
      bio: req.body.bio,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc     Update Password
// @route    PUT /api/auth/updatepassword
// @access   Private
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    //Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res.status(500).json({ success: false, error: 'Server Error' });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc     Upload profilePic for user
// @route    Post /api/auth/profileImage
// @access   Private
exports.userProfileUpload = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: 'dev_setups',
      public_id: `profile_${req.user.id}`,
    });

    await User.findByIdAndUpdate(req.user.id, {
      profileImage: uploadResponse.url,
    });
    res.status(200).json({
      success: true,
      data: uploadResponse.url,
    });
  } catch (error) {
    console.log(error);
  }
};

// @desc     Upload profilePic for user
// @route    PUT /api/auth/backgroundImage
// @access   Private
exports.userBackGroundUpload = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: 'dev_setups',
      public_id: `background_${req.user.id}`,
    });

    await User.findByIdAndUpdate(req.user.id, {
      backGroundImage: uploadResponse.url,
    });
    res.status(200).json({
      success: true,
      data: uploadResponse.url,
    });
  } catch (error) {}
};

// Generate token from user model, create cookie and send a response
const sendTokenResponse = (user, statusCode, res) => {
  // Create a token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ succes: true, token });
};
