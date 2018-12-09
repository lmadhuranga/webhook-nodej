var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    created_at: {type: String},
    title: {type: String },
    body: {type: String },
    isRead: {type: String },
});

// Export the model
module.exports = mongoose.model('log', logSchema);