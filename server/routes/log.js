var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var logController = require('../controllers/log');


// a simple test url to check that all of our files are communicating correctly.
router.get('/token/:token', logController.getByToken);


router.get('/set', logController.log_create);

router.post('/set', logController.heroku_create_log);


// console.log('logController',logController);


module.exports = router;