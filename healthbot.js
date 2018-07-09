'use strict';

const CONFIG = require('./const.js');
const FB = require('./facebook.js');
const BOT_QUESTIONS = require('./bot_questions');
const SESSIONS = require('./sessions.js');

let previous_question_actions =
{
	welcomeMessage : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		let get_start = BOT_QUESTIONS.getStarted();
		let welcome_message = BOT_QUESTIONS.welcomeMessage(user_context);
		user_context["bot_messages"].push(welcome_message);
		let suggestion_message = BOT_QUESTIONS.sendSuggestionMessage(user_context);
		user_context["bot_messages"].push(suggestion_message);
		let caurosel = BOT_QUESTIONS.sendGenericMessage(user_context);
		user_context["bot_messages"].push(caurosel);
		SESSIONS.storeContext(session_id,user_context);
	}
	askName : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		if(typeof message =="string")
		{
			console.log("coming");
			user_context["name"] = message;
			let ask_gender = BOT_QUESTIONS.askGender();
			user_context["bot_messages"].push(ask_gender);
			user_context["previous_question"] = "gender";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
			
		}
		else if(message.isNan() == false || typeof message! = "string")
		{
			let invalid_name = BOT_QUESTIONS.askFullName("Sorry I can't get your name");
			user_context["bot_messages"].push(invalid_name);
			user_context["previous_question"] = "name";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
	}
	askGenderMessage : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		if(message == "male" || message == "female" || message == "other")
		{
			user_context["gender"] = message;
			let ask_age = BOT_QUESTIONS.askAge();
			user_context["bot_messages"].push(ask_age);
			user_context["previous_question"] = "age";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
		else
		{
			let invalid_gender = BOT_QUESTIONS.askGender("Sorry I can't get your gender");
			user_context["bot_messages"].push(invalid_gender);
			user_context["previous_question"] = "gender";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
	}

	askAgeMessage : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		if(typeof message == "number" && message>=18 && message<=100)
		{
			console.log("AgeMessage");
			user_context["age"] = message;
			let mobile_number = BOT_QUESTIONS.askMobileNumber();
			user_context["bot_messages"].push(mobile_number);
			user_context["previous_question"] = "mobile";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
		else
		{
			let invalid_age = BOT_QUESTIONS.askAge("You have entered invalid age");
			user_context["bot_messages"].push(invalid_age);
			user_context["previous_question"] = "age";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
	}
	askMobileNumberMessage : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		if(type(message) == "number" && message.length == 10)
		{
			user_context["mobile"] = message;
			let email = BOT_QUESTIONS.askEmailAddress();
			user_context["bot_messages"].push(email);
			user_context["previous_question"]="email";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);			
		}
		else if(message && message.length!=10)
		{
			let invalid_number = BOT_QUESTIONS.askMobileNumber("Please Enter Valid Mobile Number");
			user_context["bot_messages"].push(invalid_number);
			user_context["previous_question"] = "mobile";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
	}
	askEmailMessage : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		var len = message.length();
		if(len>0)
		{
			var atposition = message.indexOf("@");
			var dotposition = message.lastIndexOf(".");
			if(atposition<1 || dotposition<atposition+2 || dotposition+2>len)
			{
				let invalid_mail = BOT_QUESTIONS.askEmailAddress("Please Enter valid email Address");
				user_context["bot_messages"].push(invalid_mail);
				user_context["previous_question"] = "email";
				SESSIONS.storeContext(session_id,user_context);
				sendBotMessages(session_id); 
			}
			else
			{
				user_context["mail"] = message;
				let pin = BOT_QUESTIONS.askPin();
				user_context["bot_messages"].push(pin);
				user_context["previous_question"] = "pin";
				SESSIONS.storeContext(session_id,user_context);
				sendBotMessages(session_id);
			}
		}
		else
		{
				let invalid_mail = BOT_QUESTIONS.askEmailAddress("Please Enter valid email Address");
				user_context["bot_messages"].push(invalid_mail);
				user_context["previous_question"] = "email";
				SESSIONS.storeContext(session_id,user_context);
				sendBotMessages(session_id)
		}
	}
	askPinMessage : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id);
		if(type(message) == "number" && message.length() == 6)
		{
			user_context["pin"] = message;
			let address = BOT_QUESTIONS.askAddress();
			user_context["bot_messages"].push(address);
			user_context["previous_question"] = "address";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
		else
		{
			let invalid_pin = BOT_QUESTIONS.askPin("Please enter valid pincode");
			user_context["bot_messages"].push(invalid_pin);
			user_context["previous_question"] = "pin";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
	}
	askAddressMessage : function(session_id,message){
		let user_context = SESSIONS.getContext(session_id); 
		if(address.length()! =0)
		{
			user_context["address"] = message;
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
		else
		{
			let invalid_address = BOT_QUESTIONS.askAddress("Enter Valid Email address");
			user_context["bot_messages"].push(invalid_address);
			user_context["previous_question"] = "address";
			SESSIONS.storeContext(session_id,user_context);
			sendBotMessages(session_id);
		}
	}
}
function sendBotMessages(session_id)
{
    let user_context = SESSIONS.getContext(sessionId);
    let bot_messages = user_context["bot_messages"];
    console.log(user_context["previous_question"]);
    let getMessage = function(bot_messages, index)
    {
        let message = bot_messages[index];
        //console.log(message);
        FB.sendRequest(session_id, message);
        index++;
        if(index<bot_messages.length)
        {
            setTimeout(function(){
                FB.sendBubble(sessionId);
            },10);
            setTimeout(function(){
                getMessage(bot_messages, index);
            },1000);
        }
        else
            return;
    };
    user_context["bot_messages"] = [];
}
module.exports = 
{
	sendBotMessages : sendBotMessages
}