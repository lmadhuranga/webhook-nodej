var logm = require('../models/log');
var hookm = require('../models/hook');
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

async function createALog (reqParams, res) {
    try {
        // Find the hook and user detail
        const hook = await hookm.findOne({ token: reqParams.token, active:true });
        if (!hook) {
            return res.status(404).send();
        }
        // console.log('hook :', hook.token);
        const jsonHook = JSON.parse(JSON.stringify(hook));
        const selectedData = await getParamsData(reqParams, jsonHook);
        const saveData = { 
            userId:    jsonHook.userId,
            userName:  jsonHook.userName,
            token:     jsonHook.token,
            data:      selectedData, 
        }
        
        const log = new logm(saveData);
        // saved the log in mongo
        const response = await log.save();
        // send the notification
        return res.json({ msg:'Sucess fully saved', res: response });
    } catch (e) {
        console.log('e',e);
        res.status(400).send();
    }
}

exports.heroku_create_log = async (req, res) => {
    const reqParams = req.body;
    createALog(reqParams, res);
}

function getParamsData(reqParams, hook) {
    const saveData = {
        createdAt: getDate(),
    }
    hook.params.forEach(uParam => {
        saveData[uParam] = reqParams[uParam];
    });
    return saveData;
}

exports.log_create = (req, res) => {
    const reqParams = req.query;    
    createALog(reqParams, res);
};

exports.log_details = (req, res) => {
    logm.findById(req.params.id, (err, log) => {
        if (err) return next(err);
        res.send(log);
    })
};
