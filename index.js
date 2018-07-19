'use strict';

let express = require("express");
let http = require("http");
let https = require("https");
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

router.get("/date-picker", function(req, res)
{
    let data = req.query;
    let session_id = data["session_id"];
    console.log(session_id);
    res.render("./dist/datetime/index.html", {"session_id":session_id});
});

router.post("/date-picker",(req,res)=>{

  let data = req.body;
  console.log(data);
  let session_id = data["session_id"];
  let date = data["date"];
  SESSIONS.getUserSessionState(session_id,(result)=>{
    if(result=="yes")
    {
      let user_context = SESSIONS.getContext(session_id);
      user_context["date"] = date;
      user_context["date_status"] = true;
      SESSIONS.storeContext(session_id,user_context);
      BOT.chatFlow(session_id,date);
    }
  });
  console.log(session_id,date);
  res.sendStatus(200).end();
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

exports.getJSON = function(onResult)
{
  var options = {
    host: 'https://www.thyrocare.com/API_BETA/common.svc',
    port:  80,
    username: 'dummy',
    password: 'dummypwd',
    path: '/portalorders/DSA/login',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  };
    console.log("rest::getJSON");

    var port = options.port == 80 ? https : http;
    var req = port.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        console.log("error in login get");
    });

    req.end();
};
/*getJSON(onResult);
let postApiDetails = function(session_id,onResult){
  var options = {
    host : 'https://www.thyrocare.com/API_BETA/ORDER.svc',
    port : 80,
    path : '/Postorderdata',
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json'
    }
  };
  let userdata = SESSIONS.userDetailsApi(session_id);
  var port = options.port == 80 ? https : http;
  var req = port.request(options, function(res)
  {
    res.send(userdata);
  }
};*/

module.exports = router;

