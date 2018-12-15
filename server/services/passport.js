
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const userm = require('../models/user')

// Todo:: Move to keys config file
passport.use(new GoogleStrategy({
    clientID: '332189319801-chf7liagaflk48fr2ob0q7082teobr5g.apps.googleusercontent.com',
    clientSecret: '37wjLLVVP3ftzEysr0je5S9z',
    callbackURL: "http://localhost:3001/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('profile',profile.emails);
    userm.findOne({googleId: profile.id}, (err, details)=>{
        if (err){
            cb(err, deatils)
        }
        if(!details) {
            console.log('Registering new usre');
            const rowData = {
                googleId: profile.id,
                fullName: profile.familyName,
                email: profile.emails[0].value
            }
            const user = new userm(rowData);
            user.save(function (err, user) {
                // console.log('registered new user',user);
                if (err) {
                    console.log(err);
                }
                cb(err, user)
            });
        }
        else {
            cb(null, details)
        }
    });
    
  }
));



passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    userm.findById(id, function (err, user) {
      done(err, user);
    });
  });
  