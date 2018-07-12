'use strict';

const CONFIG = require('./const.js');
const FB = require('./facebook.js');
const BOT_QUESTIONS = require('./bot_questions');
const SESSIONS = require('./sessions.js');


function welcomeMessage(session_id,message)
{
		let user_context = SESSIONS.getContext(session_id);
		//console.log(user_context);
		FB.sendBubble(session_id);
		let welcome_message = BOT_QUESTIONS.welcomeMessage(user_context["username"]);
		//console.log(welcome_message);
		user_context["bot_messages"].push(welcome_message);
		let suggestion_message = BOT_QUESTIONS.sendSuggestionMessage(user_context);
		user_context["bot_messages"].push(suggestion_message);
		let caurosel = BOT_QUESTIONS.sendGenericMessage(user_context);
		user_context["bot_messages"].push(caurosel);
		user_context["previous_question"] = "suggestionMessage";
		SESSIONS.storeContext(session_id,user_context);	
		sendBotMessages(session_id);
}
function extractUserMessage(session_id,messaging)
{
	let user_context = SESSIONS.getContext(session_id);
	let user_message;
    if(messaging.postback) {
    // Yay! We got a new message payload!
    //taking reply as user message
    user_message = messaging.postback.payload;
    console.log("Got Payload message "+ user_message);
    user_context["texttype"] = "payload";
	}
    else if(messaging.message) {
    // Yay! We got a new message!
    //taking message as user message
    user_message = messaging.message.text;
    user_context["texttype"] = "text";
    if (messaging.message.hasOwnProperty("quick_reply")) {
    	    
    	user_context["texttype"] = "payload";
    }
    console.log("Got typed message :", user_message);
    }
    return user_message;
}
 function sendBotMessages(session_id)
{
    let user_context = SESSIONS.getContext(session_id);
    let bot_messages = user_context["bot_messages"];
    console.log(user_context["previous_question"]);
    let getMessage = function(bot_messages, index)
    {
        let message = bot_messages[index];
        console.log(message);
        FB.sendRequest(session_id, message);
        index++;
        if(index<bot_messages.length)
        {
            setTimeout(function(){
                FB.sendBubble(session_id);
            },10);
            setTimeout(function(){
                getMessage(bot_messages, index);
            },1000);
        }
        else{
        	user_context["bot_messages"] = [];
        }
    };
	getMessage(bot_messages,0);  
    
}
function chatFlow(session_id,message){
	let user_context = SESSIONS.getContext(session_id);
	let previous_question = user_context["previous_question"];
	console.log("previous",previous_question);
	if(previous_question_actions.hasOwnProperty(previous_question))
	{
		previous_question_actions[previous_question](session_id,message);
	}
}
let previous_question_actions =
{
	suggestionMessage : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		console.log("in sugg previous_question_actions",user_context["texttype"]);
		if(user_context["texttype"] == "payload"){
			let start = BOT_QUESTIONS.textMessage("Please answer the following questions...");
			user_context["bot_messages"].push(start);
			let name = BOT_QUESTIONS.askFullName();
			user_context["bot_messages"].push(name);
			user_context["previous_question"] = "askName";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);

		}
		else
		{
			let text_message = BOT_QUESTIONS.textMessage("To continue please choose any of the options below");
			user_context["bot_messages"].push(text_message);
			let caurosel = BOT_QUESTIONS.sendGenericMessage(user_context);
			user_context["bot_messages"].push(caurosel);
			SESSIONS.storeContext(session_id,user_context);	
			sendBotMessages(session_id); 	
		}
	},
	askName : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		let reg = /^[a-zA-Z ]{2,30}$/;
		if(reg.test(message))
		{
			console.log("coming");
			user_context["name"] = message;
			let ask_gender = BOT_QUESTIONS.askGender();
			user_context["bot_messages"].push(ask_gender);
			user_context["previous_question"] = "askGenderMessage";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
			
		}
		else
		{
			let invalid_name = BOT_QUESTIONS.textMessage("Sorry I can't get your name");
			user_context["bot_messages"].push(invalid_name);
			let name = BOT_QUESTIONS.askFullName();
			user_context["bot_messages"].push(name);
			user_context["previous_question"] = "askName";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
	},
	askGenderMessage : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		if(message == "male" || message == "female" || message == "other")
		{
			user_context["gender"] = message;
			let ask_age = BOT_QUESTIONS.askAge();
			user_context["bot_messages"].push(ask_age);
			user_context["previous_question"] = "askAgeMessage";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
		else
		{
			let invalid_gender = BOT_QUESTIONS.textMessage("Sorry I can't get your gender");
			user_context["bot_messages"].push(invalid_gender);
			let ask_gender = BOT_QUESTIONS.askGender();
			user_context["bot_messages"].push(ask_gender);
			user_context["previous_question"] = "askGenderMessage";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
	},

	askAgeMessage : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		console.log("agemessage",typeof message);
		if(parseInt(message)>=18 && parseInt(message)<=100)
		{
			console.log("AgeMessage");
			user_context["age"] = message;
			let mobile_number = BOT_QUESTIONS.askMobileNumber();
			user_context["bot_messages"].push(mobile_number);
			user_context["previous_question"] = "askMobileNumberMessage";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
		else
		{
			let invalid_age = BOT_QUESTIONS.textMessage("Sorry I can't get your age");
			user_context["bot_messages"].push(invalid_age);
			let ask_age = BOT_QUESTIONS.askAge();
			user_context["bot_messages"].push(ask_age);
			user_context["previous_question"] = "askAgeMessage";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
	},
	askMobileNumberMessage : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		let reg = /^[0-9]{10}$/;
		if(reg.test(message) && parseInt(message[0])>=6)
		{
			user_context["mobile"] = message;
			let email = BOT_QUESTIONS.askEmailAddress();
			user_context["bot_messages"].push(email);
			user_context["previous_question"]="askEmailMessage";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);			
		}
		else
		{
			let invalid_number = BOT_QUESTIONS.textMessage("Please enter valid mobile number");
			user_context["bot_messages"].push(invalid_number);
			user_context["previous_question"] = "askMobileNumberMessage";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
	},
	askEmailMessage : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		let reg =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(reg.test(message))
		{
			user_context["email"] = message;
			let pin = BOT_QUESTIONS.askPin();
			user_context["bot_messages"].push(pin);
			user_context["previous_question"] = "askPinMessage";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
		else
		{
			let invalid_mail = BOT_QUESTIONS.textMessage("Please enter valid email address");
			user_context["bot_messages"].push(invalid_mail);
			user_context["previous_question"] = "askEmailMessage";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
	},
	askPinMessage : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		let reg = /^[0-9]{6}$/;
		if(reg.test(message))
		{
			user_context["pincode"] = message;
			let address = BOT_QUESTIONS.askAddress();
			user_context["bot_messages"].push(address);
			user_context["previous_question"] = "askAddressMessage";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
		else
		{
			let invalid_pin = BOT_QUESTIONS.textMessage("Please enter valid pincode");
			user_context["bot_messages"].push(invalid_pin);
			user_context["previous_question"] = "askPinMessage";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
	},
	askAddressMessage : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id); 
		if(message.trim().length!=0)
		{
			user_context["address"] = message;
			SESSIONS.storeContext(session_id,user_context);
			let end_message = BOT_QUESTIONS.textMessage("Thanks for providing your details, Our representative will call you and inform the time for service");
			user_context["bot_messages"].push(end_message);
			user_context["previous_question"] = "resetSession";
			sendBotMessages(session_id);
			console.log("usercontext",user_context);
		}
		else
		{
			let invalid_address = BOT_QUESTIONS.textMessage("Please enter valid address");
			user_context["bot_messages"].push(invalid_address);
			user_context["previous_question"] = "askAddressMessage";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
	},
	resetSession : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		if(user_context["previous_question"] == "resetSession")
		{
			let restart_message = welcomeMessage(session_id,message);
			user_context["bot_messages"].push(restart_message);
			user_context["chat_id"] = user_context["chat_id"]+1;
		}
		else
		{
			user_context["previous_question"] = "askAddressMessage";			
		}
	}
}

module.exports = 
{
	sendBotMessages : sendBotMessages,
	welcomeMessage : welcomeMessage,
	chatFlow : chatFlow,
	extractUserMessage : extractUserMessage
}