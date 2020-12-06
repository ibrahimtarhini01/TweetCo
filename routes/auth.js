const express = require('express');
const {
  register,
  login,
  logout,
  updateDetails,
  updatePassword,
  userProfileUpload,
  userBackGroundUpload,
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', protect, logout);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/profileImage', protect, userProfileUpload);
router.post('/backgroundImage', protect, userBackGroundUpload);

module.exports = router;
