'use strict';

const CONFIG = require('./const.js');
const FB = require('./facebook.js');
const BOT_QUESTIONS = require('./bot_questions');

module.exports = (function(){
	    let extractUserMessage = function(messaging){
        let user_message;
        if(messaging.postback) {
            //We got a new message payload!
            //Taking reply as user message
            user_message = messaging.postback.payload;
            console.log("Got Payload message "+ user_message);
        }
        else if(messaging.message) {
            //We got a new message!
            //Taking message as user message
            user_message = messaging.message.text;
            if (messaging.message.hasOwnProperty("quick_reply")) {
                user_message = messaging.message.quick_reply.payload;
            }
            console.log("Got typed message :", user_message);
        }
        return user_message;
    };
 });

