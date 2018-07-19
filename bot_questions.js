var strings = require('node-strings');
module.exports = (function()
{
    let makeQuickRepliesOptions = function(values) 
    {
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
        "get_started":[{
            "payload":"Welcome"
        }]
      };
        return get_started;
    },
    textMessage : function(txt)
    {
      let message = {
        text : txt
      }
      return message;
    },
    welcomeMessage : function(user_name)
    {
      let message = 
      {
        text : "Hi "+user_name+" Welcome to Thyrocare Aarogyam Home Checkup"
      }
        return message;
    },
    sendSuggestionMessage : function()
    {
      let message = 
      {
        "text" : "Please Select Your Preferred Thyrocare Aarogyam Home Checkup"
      }
      return message;
    },
    otherInputMessage :function()
    {
      let message = 
      {
        text : "Sorry, I can only process with text messages"
      };
      return message;
    },
    thankMessage : function(name)
    {
      let message =
      {
        text : "Thanks a lot for providing these details "+name
      }
    },
    sendGenericMessage : function()
    {
      let obj = [{
        title : "Aarogyam 1.2 (60 Tests) ₹ 999/-",
        subtitle : "A popular body checkup spanning 60 important tests including diabetes risk and complete blood count.",
        url : "https://petersfancybrownhats.com/view?item=103",
        payload : "Aarogyam 1.2 (60 Tests) ₹ 999/-"

      },
      {
        title : "Aarogyam 1.2 Advanced (70 Tests) ₹ 1199/-",
        subtitle : "A recommended full body checkup that also includes Urinogram, in addition to all the essential tests in Aarogyam 1.2.",
        url : "https://petersfancybrownhats.com/view?item=103",
        payload : "Aarogyam 1.2 Advanced (70 Tests) ₹ 1199/-"
      },
      {
        title : "Aarogyam 1.3 (63 Tests) ₹ 1499/-",
        subtitle : "Our most popular full body checkup, that includes all tests in Aarogyam 1.2 and also checks for deficiency of highly important Vitamins - B12 and D Total.",
        url : "https://petersfancybrownhats.com/view?item=103",
        payload : "Aarogyam 1.3 (63 Tests) ₹ 1499/-"
      },
      {
        title : "Aarogyam 1.3 Advanced (73 Tests) ₹ 1699/-",
        subtitle : "An advanced full body checkup that also includes Urinogram, in addition to all the essential tests in Aarogyam 1.3. A must test for comprehensive evaluation of health.",
        url : "https://petersfancybrownhats.com/view?item=103",
        payload : "Aarogyam 1.3 Advanced (73 Tests) ₹ 1699/-"
      },
      {
        title : "Aarogyam 1.7 (88 Tests) ₹ 2499/-",
        subtitle : "Our most advanced and popular health checkup is a must for those above 40 years. It tests you for Arthritis risk and 9 toxic elements along with all tests in Aarogyam 1.4.",
        url : "https://petersfancybrownhats.com/view?item=103",
        payload : "Aarogyam 1.7 (88 Tests) ₹ 2499/-"        
      },
      {
        title : "Aarogyam 1.7 Advanced (98 Tests) ₹ 2699/-",
        subtitle : "A multidisciplinary profile which screens for of all tests in Aarogyam 1.7 + 10 Urine Tests.",
        url : "https://petersfancybrownhats.com/view?item=103",
        payload : "Aarogyam 1.7 Advanced (98 Tests) ₹ 2699/-"
      }
      ]
      let keys = Object.keys(obj);
      let elements = [];
      for(let i in keys)
      {
        let data = {
          title:obj[keys[i]]["title"],
          subtitle:obj[keys[i]]["subtitle"],
          buttons: [
            {
              type : "web_url",
              url : obj[keys[i]]["url"],
              title: "View Details"
            },
            {
              type :"postback",
              payload :obj[keys[i]]["payload"],
              title : "BOOK NOW"
            }
          ]
        };
          elements.push(data);
      }
      //console.log(JSON.stringify(elements,null,2));
      let message = {
          "attachment":{
                        "type":"template",
            "payload":{
              "template_type":"generic",
              "elements":elements,
            }
          }
          }
          return message;
    },

    askFullName : function()
    {
      let ask_name = {
        text : "What is your full name?"
      };
      return ask_name;
    },
    askGender : function()
    {
      let ask_gender = 
      {
            "attachment":{
              "type":"template",
              "payload":{
                "template_type":"button",
                  "text":"Please Select your gender",
                  "buttons":[
                    {
                      "type":"postback",
                      "title":"Male",
                      "payload":"male"
                    },
                    {
                      "type":"postback",
                      "title":"Female",
                      "payload":"female"
                    },
                    ]
                  }
                }
              }
            
        return ask_gender;
      },
    chooseTime : function(session_id)
    {
      let ask_time = 
      {
            "attachment":{
              "type":"template",
              "payload":{
                "template_type":"button",
                  "text":"Please choose the tentative appointment date, slot availability may vary based on technician availability",
                  "buttons":[
                    {
                      "type":"web_url",
                      "title":"Choose date and time",
                      "url":"https://prodx.in/thyro-health/date-picker?session_id="+session_id,
                      "webview_height_ratio": "full",
                      "messenger_extensions": true,
                    },
                    ]
                  }
                }
              }
            
        return ask_time;
      },
      askAge : function()
      {
        let ask_age = {
          text : "What is your age?"
        };
        return ask_age;
      },
      askMobileNumber : function()
      {
        let ask_mobile = {
          text : "Please provide your Mobile Number"
        };
        return ask_mobile;
      },
      askEmailAddress : function()
      {
        let ask_email = {
          text : "Please provide your Email address"
        };
        return ask_email;
      },
      askPin : function()
      {
        let ask_pin= {
          "text" : "Please provide area pincode"
        }
        return ask_pin;
      },
      askAddress : function()
      {
        let ask_address = {
          "text" : "Please provide your complete address (H.No, Street, Locality, Landmark)"
        };
        return ask_address;
      },
    }     
       return bot_questions;
})();