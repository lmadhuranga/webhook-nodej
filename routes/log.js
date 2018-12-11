var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var log_controller = require('../controllers/log');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', log_controller.get_all);


router.get('/set', log_controller.log_create);

router.post('/heroku', log_controller.heroku_create_log);


module.exports = router;