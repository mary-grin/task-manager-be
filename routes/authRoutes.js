const express = require('express');
const { login, register, getAuth, logout } = require('../controllers/authController');
const router = express.Router();

router.get('/', getAuth);
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

module.exports = router;