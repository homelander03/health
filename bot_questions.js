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
        textMessages : function(txt)
        {
            let message =
                {
                    text: txt
                };
            return message;
        },
        introductionMessage: function(name)
        {
            let message = {
                "text":"Hi "+name+".Welcome to Thyrocare"
            }
            return message;
        },
    };
        return bot_questions;
};