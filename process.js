'use strict';
const BOT = require('./healthbot.js');
const BOT_QUESTIONS = require('./bot_questions.js');
const FB = require('./facebook.js');
module.exports = function(){
    let isUserInputValid = (messaging)=>{
        // if fb message is having attachment send false
        if(messaging && messaging.hasOwnProperty("message") && messaging.message.hasOwnProperty("attachments")) {
            return false;
        }
        return true;
    };
    let messages_function = {
        processFBMessage : function(messaging) {
            const session_id = messaging.sender.id;
            FB.sendBubble(session_id);
            // getting user session state from sessions
            SESSIONS.getUserSessionState(session_id,function (sessionResult) {
                console.log("Status State : ", sessionResult);
                let user_context = SESSIONS.getContext(session_id);
                // getting fb user name
                FB.getName(session_id, (name)=> {
                if (sessionResult == "no") { // checking whether user sessions is previously existed or not
                    console.log("name:", name);
                    user_context["username"] = name;
                    SESSIONS.storeContext(session_id, user_context);
                    } 
                else if (sessionResult == "expired") { // checking whether session is expired or not
                    console.log("name:", name);
                    user_context["username"] = name;
                    SESSIONS.storeContext(session_id, user_context);
                    }
                    // checking whether user message is valid or not
                    if (isUserInputValid(messaging)) {
                        BOT.welcomeMessage(session_id, messaging);
                    }
                    else {
                        // getting invalid user message from bot
                        let other_inputs_message = BOT_QUESTIONS.otherInputMessage();
                        user_context["bot_messages"].push(other_inputs_message);
                        SESSIONS.storeContext(session_id, user_context);
                    }
                });
            });
        },
    }
}