'use strict';

let express = require("express");
let router = express.Router();
//Get Bot and Configurations
const BOT_QUESTIONS = require("./bot_questions.js");
const CONFIG = require("./const.js");
const FB = require("./facebook.js");
const BOT = require("./healthbot.js");
const SESSIONS = require("./sessions.js");
const PROCESS = require("./process.js");

router.get('/', function(req,res) {
	console.log("In the function");
	res.send("Hi Im Running");
});
router.get('/webhook/',function(req,res){
	console.log("In get");
	//Verifying the FB token
	if(!CONFIG.FB_VERIFY_TOKEN){
		throw new Error("Missing Facebook token");
	}
	//hub.verify token The verify_token value that you will specify when you enable the Webhook for your app.
    //Respond with the hub.challenge value. This let's us know that your endpoint is configured correctly and that the response is authentic.
  	//Verify the hub.verify_token matches the value you supplied when enabling the Webhook. This is a security check to authenticate the request and identify the Webhook.
  	else if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === "Health")
  	{
  		console.log("not comming")
  		res.send(req.query['hub.challenge']);
  	}
	else
	{
		console.log("else");
		res.sendStatus(400);//sending the HTTP response status 400 for bad request.
	}
});
router.post('/webhook/',function(req,res){
	console.log("IN POST WEBHOOK");
	let messaging = null;
    //getting each message from user
    req.body.entry.forEach((entry) => {
            entry.messaging.forEach((event) => {
                if ((event.message) || (event.postback)) {
                    //getting message and postback events from page.this event contains details of user like sender_id,message_type,message
                    messaging = event;
                }
            });
        });
    if(messaging)
    {
        console.log(JSON.stringify(messaging, null, 2));
        // processing the FB Message
        PROCESS.processFBMessage(messaging);
    }
    res.sendStatus(200);
});

module.exports = router;

