var socketMVC = require('socket.mvc');

// Require the controllers WHICH WE DID NOT CREATE YET!!
var log_controller = require('../controllers/log');

module.exports = function (socket) {
    (()=>{
        // console.log('log_controller.getUnreaded',log_controller.getUnreaded());
        console.log('socket.client.id',socket.client.id); 
        log_controller.initRequest();
        socket.on("disconnect", () => {        
            console.info("Client disconnected ")
        });
    })();

    //You can declare all of your socket listeners in this file, but it's not required
    // console.log('init');
    socket.on('hello', function() {
        console.log('logged in')
    });
    
};