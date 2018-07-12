'use strict';
const BOT = require('./healthbot.js');
const BOT_QUESTIONS = require('./bot_questions.js');
const FB = require('./facebook.js');
const SESSIONS = require('./sessions.js');
module.exports = (function(){
    
    let messages_function = {
        
        processFBMessage : function(messaging) {
            const session_id = messaging.sender.id;
            console.log(session_id, "session id");
            FB.sendBubble(session_id);
            // getting user session state from sessions
            SESSIONS.getUserSessionState(session_id, function(sessionResult) {
                console.log("in user");
                // getting fb user name
                FB.getName(session_id, (name)=> {
                    console.log("fbgetname",name);
                if (sessionResult == "no") { // checking whether user sessions is previously existed or not
                    console.log("name:", name);
                    SESSIONS.createSession(session_id);
                    let user_context = SESSIONS.getContext(session_id);
                    user_context["username"] = name;
                    SESSIONS.storeContext(session_id, user_context);
                    BOT.welcomeMessage(session_id, messaging);
                    } 
                else if (sessionResult == "expired") { // checking whether session is expired or not
                    console.log("name:", name);
                    SESSIONS.createSession(session_id);
                    let user_context = SESSIONS.getContext(session_id);
                    user_context["username"] = name;
                    SESSIONS.storeContext(session_id, user_context);
                    BOT.welcomeMessage(session_id, messaging);
                   }
                   else{
                       let msg = BOT.extractUserMessage(session_id,messaging);
                       BOT.chatFlow(session_id,msg);
                   }
                });
            });
        }
    }
    return messages_function;
})();