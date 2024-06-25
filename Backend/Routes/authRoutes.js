const express = require('express');
const {registerUser , loginUser , getUserProfile} = require('../Controllers/authController');
const {protect} = require('../middlewares/authMiddleware');
const {googleLogin} = require('../Controllers/authController');
const passport = require('passport')

const router = express.Router();

router.get('/google',passport.authenticate('google',{scope:['profile','email']}));
router.get(
    '/google/callback',
    passport.authenticate('google',{failureRedirect:'/'}),
    googleLogin
)

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',protect,getUserProfile);

module.exports = router;