'use strict';

let express = require("express");
let router = express.Router();
//Get Bot and Configurations
const Bot_Questions = require("./bot_questions.js");
const Config = require("./const.js");
const Fb = require("./facebook.js");

router.get('/', function(req,res) {
	console.log("In the function");
	res.send("Hi Im Running");
});

router.get('/webhook',function(req,res){
	console.log("In get");
	//Verifying the FB token
	if(!Config.FB_VERIFY_TOKEN){
		throw new Error("Missing Facebook token");
	}
	//hub.verify token The verify_token value that you will specify when you enable the Webhook for your app.
    //Respond with the hub.challenge value. This let's us know that your endpoint is configured correctly and that the response is authentic.
  	//Verify the hub.verify_token matches the value you supplied when enabling the Webhook. This is a security check to authenticate the request and identify the Webhook.
  	if (req.query['hub.mode'] === 'subscribe' && req.query['hub_verify_token'] === CONFIG.FB_VERIFY_TOKEN){
  		res.send(req.query('hub.challenge'));
  	}
	else{
		res.sendStatus(400);//sending the HTTP response status 400 for bad request.
	}
});

router.post('/health/webhook',function(req,res){
	if(Fb.facebook_function){
		let name = Fb.facebook_function;
		res.send("Hi"+ name +"Welcome" );
	}
});
module.exports = router;

