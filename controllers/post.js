const Post = require('../models/Post');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const { v4 } = require('uuid');

// @route   POST api/post
// @desc    Create a post
// @access  Private
// Use multimedia in the front end
exports.addPost = async (req, res) => {
  const { text, title, tags, image } = req.body;
  try {
    photo = '';
    if (text === '') {
      return res
        .status(500)
        .json({ errors: [{ message: "Can't Post without text " }] });
    }
    if (image !== '') {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: 'dev_setups',
        public_id: `post_${v4()}_${req.user.id}`,
      });
      photo = uploadResponse.url;
    }

    const user = await User.findById(req.user.id).select('-email');
    const post = await Post.create({
      user,
      text,
      photo,
      title,
      tags: tags,
      avatar: user.profileImage,
      username: user.username,
      name: user.name,
    });
    res.status(200).json({ success: true, post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   GET api/post/timeline
// @desc    get the Timeline
// @access  Private
exports.getTimeLine = async (req, res) => {
  let users = [{ username: req.user.username }];
  req.user.following.forEach((follow) => users.push({ username: follow }));
  try {
    const post = await Post.find({ $or: users }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET api/post/:username
// @desc    Get all Posts for a user
// @access  Private
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ username: req.params.username }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET api/post/search/:id
// @desc    get Post
// @access  Public
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post Not Found' });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   GET api/post/:username/like
// @desc    Get all Posts for a user
// @access  Private
exports.getLikedPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      likes: req.params.username,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   DELETE api/post/:id
// @desc    DELETE Post
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(400)
        .json({ errors: [{ message: "Post doesn't exist" }] });
    }

    // Check User
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User Not Authurozied' });
    }

    await post.remove();

    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PUT api/post/:id
// @desc    UPDATE Post
// @access  Private
exports.editPost = async (req, res) => {
  try {
    const fieldsToUpdate = {
      text: req.body.text,
      title: req.body.title,
      tags: req.body.tags,
    };
    const post = await Post.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res
        .status(400)
        .json({ errors: [{ message: "Post doesn't exist" }] });
    }

    // Check User
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User Not Authurozied' });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   PUT /api/post/:postId/like
// @desc    Like a post
// @access  public
exports.like = async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);

    if (!post) {
      return res
        .status(400)
        .json({ errors: [{ message: "Post doesn't exist" }] });
    } else if (post.likes.includes(req.user.username)) {
      return res
        .status(400)
        .json({ errors: [{ message: 'You already like this post' }] });
    }

    const fieldsToUpdate = {
      likes: [req.user.username, ...post.likes],
    };
    post = await Post.findByIdAndUpdate(post._id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: post.likes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route PUT /api/post/avatar
// @desc  update all the avatars for one user
// @access private
exports.updateUserAvatar = async (req, res) => {
  console.log(4);
  try {
    let posts = await Post.find({ username: req.user.username });
    for (i = 0; i < posts.length; i++) {
      await Post.findByIdAndUpdate(
        posts[i]._id,
        { avatar: req.body.avatar },
        {
          new: true,
          runValidators: true,
        },
      );
    }
    console.log(posts);
    res.status(200).json({ success: true, data: 'updated' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   PUT /api/post/:postId/unlike
// @desc    unLike a post
// @access  public
exports.unLike = async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);

    if (!post) {
      return res
        .status(400)
        .json({ errors: [{ message: "Post doesn't exist" }] });
    } else if (!post.likes.includes(req.user.username)) {
      return res
        .status(400)
        .json({ errors: [{ message: "You already don't like this post" }] });
    }

    const fieldsToUpdate = {
      likes: post.likes.filter((like) => {
        return like !== req.user.username;
      }),
    };
    if (fieldsToUpdate.likes[0] === null) {
      fieldsToUpdate.likes = [];
    }
    post = await Post.findByIdAndUpdate(post._id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: post.likes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   POST api/posts/comment/:postId
// @desc    Comment on a post
// @access  Private
exports.comment = async (req, res) => {
  try {
    if (req.body.text === '') {
      return res
        .status(500)
        .json({ errors: [{ message: 'Please add a comment' }] });
    }
    const post = await Post.findById(req.params.postId);

    const newComment = new Post({
      username: req.user.username,
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.profileImage,
      user: req.user.id,
    });

    post.comments.unshift(newComment);

    await post.save();

    res.status(200).json({ success: true, data: post.comments });
  } catch (err) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
// @route   DELETE api/posts/comment/:postId/:commentId
// @desc    delete Comment
// @access  Private
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment._id == req.params.commentId,
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ message: 'Comment Not Found' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User Not Authurozied' });
    }

    // Remove comment
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.status(200).json({ success: true, data: post.comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
