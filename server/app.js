// app.js

var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var app = express();

var log = require('./routes/log'); // Imports routes for the logs
var user = require('./routes/user'); // Imports routes for the logs
var hook = require('./routes/hook'); // Imports routes for the logs
require('./routes/auth')(app); // Imports routes for the logs

app.use(cors());
// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://nodeuser:node123@ds227654.mlab.com:27654/webhooks-log';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
var port =  process.env.PORT || 3001;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/logs', log);
app.use('/users', user);
app.use('/hooks', hook);

const server = app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

var io = require('socket.io').listen(server);
var socketMVC = require('socket.mvc');

io.sockets.on('connection', function (socket) {
    socketMVC.init(io, socket, {
        debug: false,
        filePath: ['./routes/socket.js']
    });
});


require('./services/passport');
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));