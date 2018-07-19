'use strict';

const BOT_QUESTIONS = require('./bot_questions.js');
const MYSQL = require('./mysqlQueries.js');
const sessions = {};

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
		"package" : "",
		"timeslot":"",
		"previous_question" : "",
		"texttype" : "" ,
		"bot_messages" : [],
		"chat_id": 0
	};
	let storeUserInDB = function(session_id){
		let user_context = sessions_info.getContext(session_id);
		let insert_query = "insert into users(session_id,username,name,gender,age,mobile,email,pincode,address,package,chatid,date) values('"+session_id+"','"+user_context["username"]+"','"+user_context["name"]+"','"+user_context["gender"]+"','"+user_context["age"]+"','"+user_context["mobile"]+"','"+user_context["email"]+"','"+user_context["pincode"]+"','"+user_context["address"]+"','"+user_context["package"]+"','"+user_context["chat_id"]+"','"+user_context["date"]+"');";
		console.log(insert_query);
		MYSQL.sqlQuery("thyrocare", insert_query, function(inserted){
			console.log("successfully inserted");
            });
	}
	
	let userDetailsApi = function(session_id){
		let user_context = getContext(session_id);
		  let var_data = {
		  	"ADDRESS": user_context["address"],
    		"BOOKED_BY": user_context["name"],
    		"CUSTOMER_RATE": 100,
   			"EMAIL": user_context["email"],
    		"FASTING": null,
    		"MOBILE": user_context["mobile"],
    		"MODE": "PAY WHILE SAMPLE COLLECTION",
    		"ORDERRESPONSE": {
      			"PostOrderDataResponse" :
        			{ 
            			"AGE" : user_context["age"], 
            			"GENDER" : user_context["gender"],
            			"LEAD_ID" :"",
            			"NAME" : user_context["name"]
        			}
    			},
    		"ORDER_NO":"",
    		"PAY_TYPE": "POSTPAID",
    		"PRODUCT": user_context["package"],
    		"REF_ORDERID": null,
    		"REPORT_HARD_COPY": "NO",
    		"RESPONSE": "",
    		"RES_ID": "",
    		"SERVICE_TYPE": "HOME COLLECTION",
    		"STATUS": "YET TO ASSIGN"
    	}
    	return var_data;
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
				return {};
		},
		storeContext: function(session_id,user_context) {
			sessions[session_id] = user_context;
		},
		clearContext : function(session_id){
			let current_user_context = sessions_info.getContext(session_id);
			let new_user_context = JSON.parse(JSON.stringify(context_structure));
			new_user_context["username"] = current_user_context["username"];
			new_user_context["chat_id"] = current_user_context["chat_id"]+1;
	        console.log(new_user_context);
	        sessions_info.storeContext(session_id, new_user_context);
		},
		getUserSessionState: function(session_id, callback) {
			if(sessions.hasOwnProperty(session_id)) {
				let user_context = sessions_info.getContext(session_id);
				callback("yes");
			}
			else{
				callback("no");
			}
        },
        storeUserInDB :storeUserInDB,
	}
	return sessions_info;
})();