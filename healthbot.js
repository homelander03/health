'use strict';

const CONFIG = require('./const.js');
const FB = require('./facebook.js');
const BOT_QUESTIONS = require('./bot_questions');
const SESSIONS = require('./sessions.js');

let previous_question_actions ={
	welcomeMessage : function(session_id){
		let user_context = sessions.getContext(session_id);
		let get_start = BOT_QUESTIONS.getStarted();
		let welcome_message = BOT_QUESTIONS.welcomeMessage(user_context);
		user_context["bot_messages"].push(welcome_message);
		let suggestion_message = BOT_QUESTIONS.sendSuggestionMessage(user_context);
		user_context["bot_messages"].push(suggestion_message);
		let caurosel = BOT_QUESTIONS.sendGenericMessage(user_context);
		user_context["bot_messages"].push(caurosel);
	}
	askName : function(session_id){
		let user_context = sessions.getContext(session_id);
		let name = BOT_QUESTIONS.askFullName();
		if(type(name)=="string")
		{
			console.log("coming");
			user_context["name"] = name;
			let ask_gender = BOT_QUESTIONS.askGender();
			user_context["bot_messages"].push(ask_gender);
			user_context["previous_question"] = "gender";
			if(user_context["source"] == "facebook")
			{
				sendBotMessages(session_id);
			}
		}
		else if(type(name)!="string" && type(name) == "number")
		{
			let invalid_name = BOT_QUESTIONS.askFullName("Sorry I can't get your name");
			user_context["bot_messages"].push(invalid_name);
			user_context["previous_question"] = "name";
			if(user_context["source"] == "facebook")
			{
				sendBotMessages(session_id);
			}
		}
	}
	askGenderMessage : function(session_id){
		let user_context = sessions.getContext(session_id);
		let gender = BOT_QUESTIONS.askGender();

	}
	askAgeMessage : function(session_id){
		let user_context = sessions.getContext(session_id);
		let age = BOT_QUESTIONS.askAge();
		if(type(age) == "number" && age>=18 && age<=100)
		{
			console.log("AgeMessage");
			user_context["age"] = age;
			let mobile_number = BOT_QUESTIONS.askMobileNumber();
			user_context["bot_messages"].push(mobile_number);
			user_context["previous_question"] = "mobile";
			if(user_context["source"]=="facebook")
			{
				sendBotMessages(session_id);
			}
		}
		else
		{
			let invalid_age = BOT_QUESTIONS.askAge("You have entered invalid age");
			user_context["bot_messages"].push("invalid_age");
			user_context["previous_question"] = "age";
		}
	}
	askMobileNumberMessage : function(session_id){
		let number;
	}
}
function sendBotMessages(session_id)
{
    let user_context = sessions.getContext(sessionId);
    let bot_messages = user_context["bot_messages"];
    console.log(user_context["previous_question"])
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
