var logm = require('../models/log');
var socketMVC = require('socket.mvc');
var moment = require('moment-timezone');
const { Notify } = require('../utils')
 
//Simple version, without validation or sanitation
exports.get_all = function (req, res) {
    // socketMVC.emit('hello', 'Sending this to the socket that triggered the event');
    logm.find({'read':false}, (err,logs)=>{
        if (err) return next(err);
        res.json(logs)
    });
};

//Simple version, without validation or sanitation
exports.initRequest = function () {
    //db.collection.findOne({}).sort({ "_id":-1})
    logm.findOne({'isRead':false}, (err,logsData)=>{
        // console.log('init_logs ',logsData);
        if (err){
            console.log(err);
            return;
        }
        if(logsData) {
            socketClEmit('init_logs', [logsData]);
        }
    }).sort({"_id":-1});
};

function getDate() {
    return moment().tz("Asia/Colombo").format();
}

function socketClEmit(status, msgContent) {
    Notify.webnotity(msgContent);
    // if(status && msgContent) {socketMVC.emit(status, msgContent );}
}

exports.heroku_create_log = function (req, res) {
    const host = req.query.name;
    const rowData = req.body; 
    const title = `${host}:${rowData.data.app.name} > ${rowData.data.name} > ${rowData.data.state}`
    let msgContent = `Action : \n ${rowData.action.toUpperCase()} /n @ ${getDate()}`
    const saveData = {
        created_at: getDate(),
        title:title,
        body:msgContent,
        isRead:false
    };
    const log = new logm(saveData);
    Notify.webnotity(saveData);  
    log.save(function (err, logs) {
        if (err) {
            console.log(err);
        }
        res.json({'msg':'log Created successfully'});
    })
}


exports.log_create = function (req, res) {
    const params = req.query; 
    const title = `${params.title}`
    let msgbody = `${params.body}`
    const saveData = {
        created_at: getDate(),
        title:title,
        body:msgbody,
        isRead:false
    }
    const log = new logm(saveData);

    Notify.webnotity(saveData)

    log.save(function (err, log) {
        console.log('logs',log);
        if (err) {
            console.log(err);
        }
        res.json({'msg':'log Created successfully'});
    })
};

exports.log_details = function (req, res) {
    logm.findById(req.params.id, function (err, log) {
        if (err) return next(err);
        res.send(log);
    })
};

exports.log_update = function (req, res) {
    logm.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, log) {
        if (err) return next(err);
        res.send('log udpated.');
    });
};

exports.log_delete = function (req, res) {
    logm.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};