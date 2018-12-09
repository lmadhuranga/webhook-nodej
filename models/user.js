var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    endpoint: {type: String},
    expirationTime: {type: String },
    keys: {
        p256dh: {type: String },
        auth: {type: String },
    }
});

// Export the model
module.exports = mongoose.model('user', logSchema);