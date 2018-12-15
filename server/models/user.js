var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    cookie: {type: String},
    googleId: {
        type: String
    },
    fullName: { 
        type: String
    },
    userName: { 
        type: String
    },
    email: { 
        type: String
    },
    password: { 
        type: String
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