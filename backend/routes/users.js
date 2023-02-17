const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

const { validateUserUpdate, validateUserID, validateAvatar } = require('../middlewares/validators');

router.get('/users/', getUsers);
router.get('/users/me', getUserInfo);
router.patch('/users/me', validateUserUpdate, updateUser);
router.patch('/users/me/avatar', validateAvatar, updateAvatar);
router.get('/users/:userId', validateUserID, getUserById);

module.exports = router;
