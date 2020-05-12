
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'fgFMaMMgnSfd63VoXxYrHdnGl',
    consumer_secret: '1ctcEkSoT7jLRVba3xKeufTKGPRIJzACS8tLuhPUYzWibI1gtG',
    access_token_key: '1240329397468618768-6o86cM4Zu9DPYvYoRb2z5hb0BUhpHY',
    access_token_secret: 'uerNCgk79p71VYVaU7TJdH2M7oKaeA3OoQqibdbxGUvzy'
  });

router.get('/', (req, res, next) => {    
    client.get('search/tweets', {q: 'netanyahu'}, function(error, tweets, response) {
        console.log(tweets);
     });

});








module.exports = router;