const User = require('../models/User');

// @route   GET api/users/me
// @desc    Get CurrentUser
// @access  public
exports.getUser = async (req, res) => {
  // user is already available in req due to the protect middleware
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET /api/users/:username
// @desc    GET User by username
// @access  public
exports.getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username }).select('-email');
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: "User doesn't exist" }] });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   GET /api/users/seacrh/:username
// @desc    GET User by username
// @access  public
exports.searchUsersByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const users = await User.find({
      username: { $regex: '^' + username, $options: 'i' },
    }).select('-email');

    if (!users) {
      return res
        .status(400)
        .json({ errors: [{ message: "User doesn't exist" }] });
    }
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   PUT /api/users/follow
// @desc    Add following
// @access  public
exports.follow = async (req, res) => {
  try {
    if (req.user.following.includes(req.body.follow)) {
      return res
        .status(400)
        .json({ errors: [{ message: 'you already follow that user' }] });
    }
    const fieldsToUpdate = {
      following: [req.body.follow, ...req.user.following],
    };
    const u = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });
    const username = req.body.follow;
    const user = await User.findOne({ username });

    const fieldsToUpdate2 = {
      followers: [req.user.username, ...user.followers],
    };

    await User.findByIdAndUpdate(user._id, fieldsToUpdate2, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: u,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   PUT /api/users/follow
// @desc    remove following
// @access  public
exports.unfollow = async (req, res) => {
  try {
    if (!req.user.following.includes(req.body.unfollow)) {
      return res.status(400).json({
        errors: [{ message: "you don't follow this user in the first place" }],
      });
    }

    const fieldsToUpdate = {
      following: req.user.following.filter((follow) => {
        return follow !== req.body.unfollow;
      }),
    };
    if (fieldsToUpdate.following[0] === null) {
      fieldsToUpdate.following = [];
    }
    const u = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    const username = req.body.unfollow;
    const user = await User.findOne({ username });

    const fieldsToUpdate2 = {
      followers: user.followers.filter((follow) => {
        return follow !== req.user.username;
      }),
    };
    if (fieldsToUpdate2.followers[0] === null) {
      fieldsToUpdate2.followers = [];
    }

    await User.findByIdAndUpdate(user._id, fieldsToUpdate2, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: u,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
