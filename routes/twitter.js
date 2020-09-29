// -------------
// TWITTER ROUTE
// -------------


var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
const aposToLexForm = require('apos-to-lex-form');
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');



const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();
require('dotenv').config();


// TWITTER DEV API KEYS
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
    res.render('twitter')
});


router.post('/', (req, res, next) => {
    var searchQuery = req.body.twitterSearch; // search input from web page
    var tweetsCount = req.body.tweetsCount;
    //api that searches tweets by q, at most 100 tweets avalible by twitter api     
    client.get('search/tweets', {q: searchQuery, count: tweetsCount, lang: 'en'}, function(error, tweets, response) {
        if(error){console.log(error);}  
        else{
            var tweets_list = [];

            // contains pos/neg tweets scores
            var output = {
                positive: [],
                negative: [],
                neutral: []
            }
            // loop over tweeted users and push them to tweets_list
            tweets.statuses.forEach(user => {               
                tweets_list.push(user.text);              
            });
            // console.log(tweets_list)
            // exclude all repeated tweets            
            var unique_tweets = tweets_list.filter(onlyUnique);
            var tweetsValue = []

            mostPos_mostNeg = ['', 0, '', 0]; // CONTAINS MOST POS AND MOST NEG TWEETS


            unique_tweets.forEach(tweet => {              
                const input  = tweet; // get the user input
                const lexedInput = aposToLexForm(input); // fixes examples: i'am to i am 
                const casedInput = lexedInput.toLowerCase(); //to lower case
                const alphaOnlyInput = casedInput.replace(/[^a-zA-Z\s]+/g, ''); //removing non alphabetical
                //console.log(alphaOnlyInput)
                const { WordTokenizer } = natural;
                const tokenizer = new WordTokenizer();
                const tokenizedInput = tokenizer.tokenize(alphaOnlyInput); // tokenize the input string
                tokenizedInput.forEach((word, index) => {
                    tokenizedInput[index] = spellCorrector.correct(word);  // correct spellings
                })

                const filteredInput = SW.removeStopwords(tokenizedInput); // removes unrelevant words

                const { SentimentAnalyzer, PorterStemmer } = natural;

                // AFFIN is vocabulary of words rated by -5 to 5
                // analyzer.getSentimental summing the polarity of each word and normalizing with the length of the sentence
                const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn'); 
                const analysis = analyzer.getSentiment(filteredInput); // gets value from sentence

                tweetsValue.push(analysis);

                // sort tweets scores by pos/neg
                if(analysis === 0){
                    output.neutral.push(analysis);
                }
                else if(analysis > 0){
                    output.positive.push(analysis);
                }
                else {
                    output.negative.push(analysis);
                }
                
                if(analysis > mostPos_mostNeg[1]){
                    mostPos_mostNeg[0] = tweet;
                    mostPos_mostNeg[1] = analysis;
                }
                else if(mostPos_mostNeg[3] > analysis){
                    mostPos_mostNeg[2] = tweet;
                    mostPos_mostNeg[3] = analysis;
                }


            });
            const reducer = (accumulator, currentValue) => accumulator + currentValue; //summing scores func
            
            

            // normalized value = sum of vals / num of vals
            var normalized = (tweetsValue.reduce(reducer) / tweetsValue.length);

            output.normalized =  Math.round(normalized * 100) / 100;
            output.mostPosTweet = mostPos_mostNeg[0];
            output.mostPosNum = mostPos_mostNeg[1];
            output.mostNegTweet = mostPos_mostNeg[2];
            output.mostNegNum = mostPos_mostNeg[3];
            
            console.log(mostPos_mostNeg)
            

            // console.log(output);
            res.status(200).json({output})
        //     console.log(normalized)
        //     console.log("DONE")
        //     res.status(200).json({normalized});
        }
    });
});

module.exports = router;