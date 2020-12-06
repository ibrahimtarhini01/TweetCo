const express = require('express');
const {
  addPost,
  getTimeLine,
  getPosts,
  deletePost,
  editPost,
  like,
  unLike,
  getLikedPosts,
  comment,
  deleteComment,
  getPost,
  updateUserAvatar,
} = require('../controllers/post');
const { protect } = require('../middleware/auth');

//Init router
const router = express.Router();

router.post('/', protect, addPost);
router.get('/timeline', protect, getTimeLine);
router.get('/:username', getPosts);
router.get('/search/:id', getPost);
router.delete('/:id', protect, deletePost);

router.put('/avatar', protect, updateUserAvatar);
router.put('/:id', protect, editPost);
router.put('/:postId/like', protect, like);
router.get('/:username/like', getLikedPosts);
router.put('/:postId/unlike', protect, unLike);
router.post('/comment/:postId', protect, comment);
router.delete('/comment/:postId/:commentId', protect, deleteComment);
module.exports = router;
