var userm = require('../models/user');
var socketMVC = require('socket.mvc');
var moment = require('moment-timezone');
const { Notify } = require('../utils')



exports.register =  async (req, res) => { 
    try {
        const user = new userm(req.body);
        // saved the user in mongo
        const response = await user.save();
        console.log('response',response);
        // send the notification
        return res.json(response);
    } catch (e) {
        res.status(400).json({error:e});
    }
}
 
exports.get = async (req, res) => { 
    try {
        const user = await userm.findOne({_id : req.params.id});
        if(!user) {
            return res.status(404).send();
        }
        return res.json(user);
    } catch (e) {
        return res.status(400).send();
    }
}


exports.update = async function (req, res) {
    try {
        const response = await userm.findByIdAndUpdate(req.params.id, {$set: req.body}); 
    
        console.log('response',response);
        // send the notification
        return res.json(response);
    } catch (e) {
        res.status(400).json({error:e});
    }
};



//Simple version, without validation or sanitation
exports.userSubscribe =  function (req, res) { 
    const rowData = req.body;
    // return console.log('rowData',rowData); 

    userm.findOne({'cookie': rowData.cookie}, (err, details)=>{
        // console.user('init_users ',usersData);
        if (err){
            console.log(err);
            return;
        }
        if(!details) {
            console.log('Registering new usre');
            const user = new userm(rowData);
            user.save(function (err, user) {
                // console.log('registered new user',user);
                if (err) {
                    console.log(err);
                }
                res.json({'msg':'User subscribed successfully'});
            });
        }
        else {
            userm.findOneAndUpdate(details._id, {$set: rowData}, function (err, user) {
                if (err) {
                    console.log(err);
                }
                res.send('user udpated.');
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



exports.notityAll = function (req, res) {
    console.log('sendNotiAll'); 

    Notify.webnotity({
        title: 'Test msg',
        body: 'test content'
    });
    return res.json({});
};

exports.user_details = function (req, res) {
    userm.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.user_delete = function (req, res) {
    userm.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};