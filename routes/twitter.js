
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
require('dotenv').config();

var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
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
            console.log(unique_tweets)
        }
    });
});

module.exports = router;