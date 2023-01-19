const { getUserInfo, editUserInfo, changePhoto, deleteUser, deletePhoto } = require('../controllers/userController');

const upload = require('../middlewares/upload');
const isAuth = require('../middlewares/isAuth');

const express = require('express');
const router = express.Router();

router.get('/', isAuth, getUserInfo);
router.patch('/', isAuth, editUserInfo);
router.patch('/photo', isAuth, upload.single('image'), changePhoto);
router.delete('/photo', isAuth, deletePhoto);
router.delete('/', isAuth, deleteUser);

module.exports = router;