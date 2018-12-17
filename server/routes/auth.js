

var passport = require('passport');

module.exports = (app) => {    
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.get('/auth/me', function(req, res){
        console.log('req.user',req.user);
        res.send('req.user check console');
    });

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));

    app.get('/auth/logout',function(req, res) {
        req.logout();
        res.send(req.user);
    })
    
    app.get('/auth/google/callback', 
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

    

}

