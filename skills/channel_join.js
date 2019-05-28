var debug = require('debug')('botkit:channel_join');

module.exports = function(controller) {

    controller.on('bot_channel_join', function(bot, message) {
        bot.reply(message,'I have arrived! I am a bot that can help you search for news on any topic you want.');
    });

}
