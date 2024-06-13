const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/User');
require('dotenv').config();


passport.use(
    new GoogleStrategy(
        {
            clientID : process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:'/api/auth/google/callback'
        },
        async (accessToken , refreshToken , profile , done) => {
            try{
                let user = await User.findOne({googleId:profile.id});
                if(!user){
                    user  = new User({
                        username : profile.displayName,
                        email : profile.emails[0].value,
                        googleId:profile.id,
                        avatar:profile.photos[0].value
                    });
                    await user.save();
                }
                done(null,user);
            }catch(error){
                console.error('Error during Google authentication' , error);
                done(error,false);
            }
        }
    )
);

passport.serializeUser((user,done)=> {
    done(null,user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id,(err,user) => done(err,user));
})