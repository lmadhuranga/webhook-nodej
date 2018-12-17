
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const userm = require('../models/user')

// Todo:: Move to keys config file
passport.use(new GoogleStrategy({
    clientID: '332189319801-chf7liagaflk48fr2ob0q7082teobr5g.apps.googleusercontent.com',
    clientSecret: '37wjLLVVP3ftzEysr0je5S9z',
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('profile',profile.emails);
    userm.findOne({googleId: profile.id}, (err, details)=>{
        if (err){
            console.log('16 cb ');
            cb(err, details)
        }
        if(!details) {
            console.log('Registering new usre');
            const rowData = {
                googleId: profile.id,
                fullName: 'my full name',
                email: profile.emails[0].value
            }
            const user = new userm(rowData);
            user.save(function (err, suser) {
                // console.log('registered new user',user);
                if (err) {
                    console.log(err);
                }
                console.log('32 new your cb ', suser);
                cb(err, suser)
            });
        }
        else {
            console.log(' 37You are a registed your', details);
            cb(null, details)
        }
    });
    
  }
));


passport.serializeUser(function(user, done) {
    console.log('serializeUser', user.id);
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    console.log('deserializeUser --------> Id ', id);
    userm.findById(id, function (err, user) {
        console.log('desrisalied user ===========<', user);
        done(err, user);
    });
});