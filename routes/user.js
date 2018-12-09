var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var user_controller = require('../controllers/user');


// a simple test url to check that all of our files are communicating correctly.

router.post('/subscribe', user_controller.userSubscribe);


module.exports = router;