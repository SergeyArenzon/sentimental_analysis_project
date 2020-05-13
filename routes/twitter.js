
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'fgFMaMMgnSfd63VoXxYrHdnGl',
    consumer_secret: '1ctcEkSoT7jLRVba3xKeufTKGPRIJzACS8tLuhPUYzWibI1gtG',
    access_token_key: '1240329397468618768-6o86cM4Zu9DPYvYoRb2z5hb0BUhpHY',
    access_token_secret: 'uerNCgk79p71VYVaU7TJdH2M7oKaeA3OoQqibdbxGUvzy'
});

// exclude repeated tweets function
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

router.get('/', (req, res, next) => {
    // api that searches tweets by q, at most 100 tweets avalible by twitter api     
    client.get('search/tweets', {q: 'netanyahu', count: 100, lang: 'en'}, function(error, tweets, response) {
        if(error){console.log(error);} 
        else{
            var tweets_list = [];
            // loop over tweeted users and push them to tweets_list
            tweets.statuses.forEach(user => {               
                tweets_list.push(user.text);                 
            });

            // exclude all repeated tweets            
            var unique_tweets = tweets_list.filter(onlyUnique);
        }
    });
});

module.exports = router;