var hookm = require('../models/hook');

exports.hooksOfuser = async (req, res) => { 
    try {
        const hooks = await hookm.find({userId: req.params.userId});
        if(!hooks) {
            return res.status(404).send();
        }
        return res.json(hooks);
    } catch (e) {
        return res.status(400).send();
    }
}

exports.get = async (req, res) => { 
    try {
        const hook = await hookm.findOne({_id: req.params.id});
        if(!hook) {
            return res.status(404).send();
        }
        return res.json(hook);
    } catch (e) {
        return res.status(400).send();
    }
}

exports.update = async function (req, res) {
    // return res.json(req.body);
    try {
        const response = await hookm.findByIdAndUpdate(req.params.id, {$set: req.body});
        console.log('response',response);
        // send the notification
        return res.json(response);
    } catch (e) {
        res.status(400).json({error:e});
    }
};

