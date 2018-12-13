var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hookSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    userId: { type: String},
    userName: { type: String},
    name: { type: String},
    token: { type: String},
    createAt: { type: String},
    active: { type: String},
    displayFormat: {},
    params: []
});

// Export the model
module.exports = mongoose.model('hook', hookSchema);