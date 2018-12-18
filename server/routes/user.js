var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var userCtrl = require('../controllers/user');


// a simple test url to check that all of our files are communicating correctly.

router.post('/', userCtrl.register);
router.get('/me', userCtrl.me);
router.get('/:id', userCtrl.get);
router.put('/:id', userCtrl.update);
router.get('/all', userCtrl.notityAll);
router.post('/subscribe', userCtrl.userSubscribe);


module.exports = router;