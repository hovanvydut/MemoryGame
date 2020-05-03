const express = require('express');

const router = express.Router();
const authenControl = require('../../../controllers/api/v1/authen.control');

// Authentication
router.post('/signup', authenControl.handleSignUp);
router.post('/signin', authenControl.handleSignIn);

module.exports = router;
