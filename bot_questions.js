module.exports = (function(){
    let makeQuickRepliesOptions = function(values) {
        let options = [];
        values = values.slice(0,11);
        options = values.map(function(val){
            if(!val.key) {
                return {
                    "content_type" : "text",
                    "title": val,
                    "payload": val
                }
            } else {
                return {
                    "content_type" : "text",
                    "title": val.value,
                    "payload": val.key
                }
            }
        });
        return options;
    };
    let titleCase = function(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let bot_questions = {
    	getStarted : function()
    	{	
    		let get_started = 
    		{
    			"get_started":{
    				"payload":"Welcome"
    			}
    		};
    		return get_started;
    	},
    	welcomeMessage : function(user_name)
    	{
    		let message = 
    		{
    			"text" : "Hi" + user_name + "Welcome to Thyrocare Aarogyam Home Checkup";
    		}
    		return message;
    	},
    	sendSuggestionMessage : function()
    	{
    		let message = 
    		{
    			"text" : "Please Select Your Preferred Thyrocare Aarogyam Home Checkup";
    		}
    		return message;
    	},
    	sendGenericMessage : function()
    	{
    		let message = 
    		{
    			"message":{
    				"attachment":{
    					"type":"template",
    					"payload":{
    						"template_type":"generic",
        					"elements":[
        					{
            					"title":"Aarogyam 1.2 (60 Tests)",
            					"subtitle":"A popular body checkup spanning 60 important tests including diabetes risk and complete blood count.", 
            					"default_action": {
            						"type": "web_url",
              						"url": "https://petersfancybrownhats.com/view?item=103",
              						"webview_height_ratio": "tall",
            				},
            				"buttons":[
              				{
                				"type":"web_url",
                				"url":"https://www.airtel.in/4g/",
                				"title":"View Details"
              				},
              				{
              					"type":"postback",
                				"url":"https://www.airtel.in/4g/",
                				"title":"BOOK NOW"
              				}              
            				],
            				{
            					"title":"Aarogyam 1.2 Advanced (70 Tests)",
             					"subtitle":"A recommended full body checkup that also includes Urinogram, in addition to all the essential tests in Aarogyam 1.2.", 
             					"default_action": {
              						"type": "web_url",
              						"url": "https://petersfancybrownhats.com/view?item=103",
             						"webview_height_ratio": "tall",
            				},
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.airtel.in/4g/",
                "title":"View Details"
              },
              {
              	"type":"postback",
                "url":"https://www.airtel.in/4g/",
                "title":"BOOK NOW"
              }              
            ],
            {
             "title":"Aarogyam 1.3 (63 Tests)",
             "subtitle":"Our most popular full body checkup, that includes all tests in Aarogyam 1.2 and also checks for deficiency of highly important Vitamins - B12 and D Total.", 
             "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.airtel.in/4g/",
                "title":"View Details"
              },
              {
              	"type":"postback",
                "url":"https://www.airtel.in/4g/",
                "title":"BOOK NOW"
              }              
            ],
            {
             "title":"Aarogyam 1.3 Advanced (73 Tests)",
             "subtitle":"An advanced full body checkup that also includes Urinogram, in addition to all the essential tests in Aarogyam 1.3. A must test for comprehensive evaluation of health.", 
             "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.airtel.in/4g/",
                "title":"View Details"
              },
              {
              	"type":"postback",
                "url":"https://www.airtel.in/4g/",
                "title":"BOOK NOW"
              }              
            ],
            {
             "title":"Aarogyam 1.7 (88 Tests)",
             "subtitle":"Our most advanced and popular health checkup is a must for those above 40 years. It tests you for Arthritis risk and 9 toxic elements along with all tests in Aarogyam 1.4.", 
             "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.airtel.in/4g/",
                "title":"View Details"
              },
              {
              	"type":"postback",
                "url":"https://www.airtel.in/4g/",
                "title":"BOOK NOW"
              }              
            ],
            {
             "title":"Aarogyam 1.7 Advanced (98 Tests)",
             "subtitle":"A multidisciplinary profile which screens for of all tests in Aarogyam 1.7 + 10 Urine Tests.", 
             "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "webview_height_ratio": "tall",
			},
			"buttons":[
              {
                "type":"web_url",
                "url":"https://www.airtel.in/4g/",
                "title":"View Details"
              },
              {
              	"type":"postback",
                "url":"https://www.airtel.in/4g/",
                "title":"BOOK NOW"
              }              
            ],
		}
    	}	
	},
    	askFullName : function()
    	{
    		let ask_name = {
    			"text" : "What is your full name?"
    		};
    		return ask_name;
    	},
    	askGender : function()
    	{
    		let ask_gender = {
    			"message":{
    				"attachment":{
    					"type":"template",
    					"payload":{
    						"template_type":"button",
        					"text":"Please Select your gender",
        					"buttons":[
          					{
            					"type":"postback",
            					"title":"Male"
            					"payload":"male"
          					},
          					{
          						"type":"postback",
          						"title":"Female",
          						"payload":"female"
          					},
          					{
          						"type":"postback",
          						"title":"Other",
          						"payload":"other"	
          					}
          					]
						}
          			}
          		}
          	}
    		return ask_gender;
    	},
    	askAge : function()
    	{
    		let ask_age = {
    			"text" : "What is your age?"
    		};
    		return ask_age;
    	},
    	askMobileNumber : function()
    	{
    		let ask_mobile = {
    			"text" : "Please provide your Mobile Number"
    		};
    		return ask_mobile;
    	},
    	askEmailAddress : function()
    	{
    		let ask_email = {
    			"text" : "Please provide your Email address"
    		};
    		return ask_email;
    	},
    	askPin : function()
    	{
    		let ask_pin= {
    			"text" : "Please provide area Pincode"
    		}
    		return ask_pin;
    	},
    	askAddress : function()
    	{
    		let ask_address = {
    			"text" : "Please provide your address"
    		};
    		return ask_address;
    	}
    }

    };
        return bot_questions;
};