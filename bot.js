var env = require('node-env-file');
env(__dirname + '/.env');

var Botkit = require('botkit');

var bot_options = {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    clientSigningSecret: process.env.clientSigningSecret,
    debug: true,
    scopes: ['bot'],
};

bot_options.json_file_store = __dirname + '/.data/db/';

var controller = Botkit.slackbot(bot_options);
controller.startTicking();

// Set up an Express-powered webserver to expose oauth and webhook endpoints
require(__dirname + '/components/express_webserver.js')(controller);

require(__dirname + '/components/user_registration.js')(controller);
require(__dirname + '/components/onboarding.js')(controller);
require(__dirname + '/skills/sendWelcomeMessage.js')(controller);

// var normalizedPath = require("path").join(__dirname, "skills");
// require("fs").readdirSync(normalizedPath).forEach(function(file) {
//   require("./skills/" + file)(controller);
// });