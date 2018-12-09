const webpush = require("web-push");
var socketMVC = require('socket.mvc');
var userm = require('../models/user');

const publicVapidKey =
"BN61u00gtsjaxofW26DAE14h1kjQPRqTnsMJl75x3viJBRC-jxzlfj45MHGyQ2ffCUSWgyDkU0f6tHnI1jWlwPE";
const privateVapidKey = "wGTAHWQSEqoOqeQy2WzNYfxaSbBdSU3p5W3PvUNF-lI";

webpush.setVapidDetails(
"mailto:madmad@madlkjljlkjs.com",
publicVapidKey,
privateVapidKey
);

const icon = 'images/icon.png';
const badge = 'images/badge.png';

module.exports = {
    webnotity(msgContent, filter = {}) {
        userm.find(filter, (err, subscribers) => {
            if (err) {
                console.warn(err);
                return;
            }
            subscribers.forEach(subscriber => {            
                // Create payload
                const payload = JSON.stringify({ 
                    title: `${msgContent.title}`,
                    icon : icon,
                    badge: badge,
                    body: msgContent.body 
                }); 
                // Pass object into sendNotification
                webpush
                .sendNotification(subscriber.data, payload)
                .catch(err => console.error(err));
            });
        })   
    },

    socket(status, msgContent){
        // satus : 'liveUpdate' | 'init'
        if(status && msgContent) socketMVC.emit(status, msgContent );
    }
    
}