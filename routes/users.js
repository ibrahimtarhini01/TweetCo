const express = require('express');
const {
  getUserByUsername,
  getUser,
  follow,
  searchUsersByUsername,
  unfollow,
} = require('../controllers/users');
const { protect } = require('../middleware/auth');

// Init Router
const router = express.Router();

router.get('/me', protect, getUser);
router.get('/:username', getUserByUsername);
router.get('/search/:username', searchUsersByUsername);
router.put('/follow', protect, follow);
router.put('/unfollow', protect, unfollow);
module.exports = router;
