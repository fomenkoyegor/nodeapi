const express = require('express');
const router = express.Router();
const {auth} = require('../../controllers');

router.post('/login', auth.login);
router.post('/register', auth.register);
router.get('/users', auth.users);

module.exports = router;
