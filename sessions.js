'use strict';

const BOT_QUESTIONS = require('./bot_questions.js');
const sessions = {};
const timers = {};

process.on('uncaughtException',function(error){
	console.log(error.stack);
});

module.exports = (function(){
	let context_structure = {
		"username":"",
		"name" : "",
		"gender" : "",
		"age" : "",
		"mobile" : "",
		"email" : "",
		"pincode" : "",
		"address" : "",
		"previous_question" : "",
		"welcome_message" : "",
		"texttype" : "" ,
		"bot_messages" : ""
	}
	//creating user context
	let sessions_info = {
		createSession : function(session_id){
			let user_context = JSON.parse(JSON.stringify(context_structure));
			sessions[session_id] = user_context;
		},
		getContext : function(session_id){
			if(sessions.hasOwnProperty(session_id))
			{
				return sessions[session_id];
			}
			else
				return [];
		},
		clearContext : function(session_id){
			let current_user_context = sessions_info.getContext(session_id);
			let new_user_context = JSON.parse(JSON.stringify(context_structure));
			if(current_user_context.hasOwnProperty("user_profile"))
			{
				if(current_user_context.hasOwnProperty("name"))
					new_user_context["name"] = current_user_context["name"];
				if(current_user_context.hasOwnProperty("gender"))
					new_user_context["gender"] = current_user_context["gender"];
				if(current_user_context.hasOwnProperty("age"))
					new_user_context["age"] = current_user_context["age"];
				if(current_user_context.hasOwnProperty("mobile"))
					new_user_context["mobile"] = current_user_context["mobile"];
				if(current_user_context.hasOwnProperty("email"))
					new_user_context["email"] = current_user_context["email"];
				if(current_user_context.hasOwnProperty("pincode"))
					new_user_context["pincode"] = current_user_context["pincode"];
				if(current_user_context.hasOwnProperty("address"))
					new_user_context["address"] = current_user_context["address"];
			}
			new_user_context["chat_id"] = current_user_context["chat_id"]+1;
	        console.log(new_user_context[]);
	        sessions_info.storeContext(session_id, new_user_context);
		},
		getContext: (session_id)=> {
			if(sessions.hasOwnProperty(session_id))
				return sessions[session_id];
			else
				return {}
		},
	}
	return sessions_info;
});