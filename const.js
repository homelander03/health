'use strict';

// Messenger API parameters
const FB_PAGE_TOKEN = "EAADUwQRj73gBAL8xro1yTBylowzsq1HOE9M52gkntqwdPgwKMCt2YWRVHB7T2IxR80UKvXylpFDB3ygzU3Dc9apRbvZC0TyjZCOuKMenzCESKgPnJKCdsDbjKnxixgojawgFdfJZBKxlxzTEoZBqnkqawZCyfEAIxHIl3QvR1yQZDZD";
var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
if (!FB_VERIFY_TOKEN) {
    FB_VERIFY_TOKEN = "just_do_it";
}

module.exports = {
    FB_PAGE_TOKEN: FB_PAGE_TOKEN,
    FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
};