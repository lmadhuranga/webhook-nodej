var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var hookCtrl = require('../controllers/hookController');


// a simple test url to check that all of our files are communicating correctly.

router.get('/user/:userId', hookCtrl.hooksOfuser); 
router.get('/:id', hookCtrl.get); 
router.put('/:id', hookCtrl.update); 


module.exports = router;