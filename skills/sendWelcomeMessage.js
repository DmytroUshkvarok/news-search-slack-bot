module.exports = function(controller) {

    controller.hears(['Hi', 'start', 'go', 'begin', 'hello'], 'direct_message,direct_mention', function(bot, message) {
        const textMessage2 = 'I am a bot that can help you to search for news on any topic you want.';
        let userName = 'my friend';
        bot.getMessageUser(message)
            .then((data) => {
                if (data.first_name) {
                    userName = data.first_name;
                } else if (data.full_name) {
                    userName = data.full_name;
                }
                const textMessage = `Hello ${userName}!\n` + textMessage2;
                bot.reply(message, textMessage);
                askForSearch();
            })
            .catch((err) => {
                console.error(err);
                const textMessage = `Hello ${userName}!` + textMessage2;
                bot.reply(message, textMessage);
                askForSearch();
            });

        function askForSearch() {
            bot.startConversation(message, function(err, convo) {
                convo.ask('Do you want to start searching news right now?\nNote: type "yes" or "no"', [
                    {
                        pattern: 'yes',
                        callback: function(response, convo) {
                            // convo.say('Cool! Let\'s start the search for news.');
                            require('./showNews.js')(message, convo);
                            // since no further messages are queued after this,
                            // the conversation will end naturally with status == 'completed'
                            convo.next();
                        }
                    },
                    {
                        pattern: 'no',
                        callback: function(response, convo) {
                            // stop the conversation. this will cause it to end with status == 'stopped'
                            convo.stop();
                        }
                    },
                    {
                        default: true,
                        callback: function(response, convo) {
                            convo.repeat();
                            convo.next();
                        }
                    }
                ]);

                convo.next();
            });
        }
    });
};