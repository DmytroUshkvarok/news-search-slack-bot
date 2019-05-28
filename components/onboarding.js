var debug = require('debug')('botkit:onboarding');

module.exports = function(controller) {

    controller.on('onboard', function(bot) {
        debug('Starting an onboarding experience!');
        bot.startPrivateConversation({user: bot.config.createdBy},function(err,convo) {
            if (err) {
            console.log(err);
            } else {
            convo.say('I am a bot that can help you to search for news on any topic you want.');
            convo.say('Just send a search word or phrase in the message. I will send results of search.');
            }
        });
    });

}
