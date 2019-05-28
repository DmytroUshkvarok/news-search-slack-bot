const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('a49aa12577ec4214a0c4521d2bbe4160');

module.exports = (message, convo) => {
    convo.ask('What topic are you interested in?', function(response, convo) {

        const searchingPhrase = response.text;
        const date = new Date();
        const searchToDate = date.toISOString().slice(0, 10);
        
        const searchFromDate = () => {
            const currentDateString = searchToDate;
            const currentDateArray = currentDateString.split(`-`);
            const searchFromDateArray = currentDateArray;
            const currentDay = +currentDateArray[2];

            let searchFromDay;

            if (currentDay - 10 > 0) {
                searchFromDay = currentDay - 10;                        
            } else {
                searchFromDay = currentDay + 20;
                if (+searchFromDateArray[1] - 1 <= 0) {
                    searchFromDateArray[1] = +searchFromDateArray[1] + 11;
                    searchFromDateArray[0] = +searchFromDateArray[0] - 1;
                } else {
                    searchFromDateArray[1] = +searchFromDateArray[1] - 1;
                }
            }

            searchFromDateArray[2] = searchFromDay;

            return searchFromDateArray.join('-');
        };

        newsapi.v2.everything({
            q: searchingPhrase,
            from: `${searchFromDate()}`,
            to: searchToDate,
            language: 'en',
            sortBy: 'popularity',
            page: 1
            }).then(results => {

            if (results.articles.length === 0) {
                bot.reply(message, 'Can not find any news for this searching phrase :face_with_rolling_eyes:');
            } else {
                bot.reply(message, `There are most popular news for your searching phrase :point_down:`);
                results.articles.forEach((element, index) => {

                    if (index < 10) {

                        const authorName = element.author;
                        const title = element.title;
                        const titleUrl = element.url;
                        const imageUrl = element.urlToImage;
                        const text = `${element.content}`;
                        const pretext = `:small_red_triangle_down:\n${element.description}`;

                        const content = {
                            "attachments": [
                                {
                                    "fallback": pretext,
                                    "color": "#2eb886",
                                    "pretext": pretext,
                                    "author_name": authorName,
                                    "title": title,
                                    "title_link": titleUrl,
                                    "text": text,
                                    "image_url": imageUrl,
                                }
                            ]
                        };

                        bot.reply(message, content);
                    }
                });
            }            
        });
        convo.next();
    });
};