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

exports.heroku_create_log = (req, res) => {
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



function getParamsData(reqParams, hook) {
    const saveData = {
        createdAt: getDate(),
    }
    hook.params.forEach(uParam => {
        saveData[uParam] = reqParams[uParam];
    });
    return saveData;
}

exports.log_create = async (req, res) => {
    const reqParams = req.query;    
    try {
        const hook = await hookm.findOne({
            token: reqParams.token, 
            active:true 
        });
        if (!hook) {
            return res.status(404).send();
        }
        const jsonHook = JSON.parse(JSON.stringify(hook));
        const selectedData = await getParamsData(reqParams, jsonHook);
        const saveData = { 
            userId:    jsonHook.userId,
            userName:  jsonHook.userName,
            token:     jsonHook.token,
            data:      selectedData, 
        }
        
        const log = new logm(saveData);
        
        const response = await log.save()
        
        return res.json({ msg:'Sucess fully saved', res: response });
    } catch (e) {
        console.log('e',e);
        res.status(400).send();
    }
};

exports.log_details = function (req, res) {
    logm.findById(req.params.id, function (err, log) {
        if (err) return next(err);
        res.send(log);
    })
};
