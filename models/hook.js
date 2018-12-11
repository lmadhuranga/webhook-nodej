var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hookSchema = new Schema({
    token: {
        type: String,
        required: true
    }
});

// Export the model
module.exports = mongoose.model('hook', hookSchema);