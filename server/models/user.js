var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    cookie: {type: String},
    fullName: { 
        type: String,
        required:true 
    },
    userName: { 
        type: String,
        required:true 
    },
    email: { 
        type: String,
        required:true 
    },
    password: { 
        type: String,
        required:true 
    },
    devices: [
        {
            name: { type: String },
            type: { type: String },
            data: {
                endpoint: { type: String },
                expirationTime: { type: String },
                keys: {
                    p256dh: { type: String },
                    auth: { type: String },
                }
            }
        }
    ],
    data:{
        endpoint: { type: String },
        expirationTime: { type: String },
        keys: {
            p256dh: { type: String },
            auth: { type: String },
        }
    }
});


// Export the model
module.exports = mongoose.model('user', logSchema);