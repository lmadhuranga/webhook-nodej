var userm = require('../models/user');
var socketMVC = require('socket.mvc');
var moment = require('moment-timezone');


//Simple version, without validation or sanitation
exports.userSubscribe =  function (req, res) {
    const rowData = req.body;
    //db.collection.findOne({}).sort({ "_id":-1})
    userm.findOne({'endpoint': rowData.endpoint}, (err, details)=>{
        // console.user('init_users ',usersData);
        if (err){
            console.user(err);
            return;
        }
        if(!usersData) {
            const user = new userm(rowData);
            user.save(function (err, users) {
                console.user('users',users);
                if (err) {
                    console.user(err);
                }
                res.json({'msg':'User subscribed successfully'});
            });
        }
    }).sort({"_id":-1});
};

function getDate() {
    return moment().tz("Asia/Colombo").format();
}

function socketClEmit(status, msgContent) {
    if(status && msgContent) socketMVC.emit(status, msgContent );
}


exports.sendNotiAll = function (req, res) {
    userm.find({}, function (err, users) {
        if (err) {
            console.warn(err);
            return;
        }
        return res.json(users);
    })
};

exports.user_details = function (req, res) {
    userm.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.user_update = function (req, res) {
    userm.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('user udpated.');
    });
};

exports.user_delete = function (req, res) {
    userm.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};