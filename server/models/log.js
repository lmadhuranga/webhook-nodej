var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    userId: {type: String},
    userName: {type: String},
    token: {type: String},
    data: {
        // created_at: {type: String},
        // title: {type: String },
        // body: {type: String },
        // isRead: {type: String },
    }
});

// Export the model
module.exports = mongoose.model('log', logSchema);