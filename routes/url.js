// -------------
//   URL ROUTE
// -------------

var express = require('express');
var router = express.Router();
var request = require("request");
const cheerio = require('cheerio');
var textVersion = require("textversionjs");
const aposToLexForm = require('apos-to-lex-form');
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');


const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();



router.get('/', function(req, res, next){
    res.render('url');
});

router.post('/', function(req, res, next) {
    

    const { url } = req.body;

    // User input URL
    const URL_TO_PARSE = url;
    
    //Make a request to get the HTML of the page
    request(URL_TO_PARSE, (err, response, html) => {
        if (err) throw new Error(err);

        //Load the HTML into cheerio's DOM
        const $ = cheerio.load(html);
        // Return body of html
        var text = ($("body").text());
        // Remove tags and keep only textContent
        // Done text for analysing
        var input = textVersion(text);
        
        const lexedInput = aposToLexForm(input); // fixes examples: i'am to i am 
        const casedInput = lexedInput.toLowerCase(); //to lower case
        const alphaOnlyInput = casedInput.replace(/[^a-zA-Z\s]+/g, ''); //removing non alphabetical
        
        const { WordTokenizer } = natural; 
        const tokenizer = new WordTokenizer();
        const tokenizedInput = tokenizer.tokenize(alphaOnlyInput); // tokenize the input string
        
        // tokenizedInput.forEach((word, index) => {
        //     console.log("-----------------------------")
        //   tokenizedInput[index] = spellCorrector.correct(word);  // correct spellings
        // })
        
        const filteredInput = SW.removeStopwords(tokenizedInput); // removes unrelevant words
        
        const { SentimentAnalyzer, PorterStemmer } = natural;
        // AFFIN is vocabulary of words rated by -3 to 3
        // analyzer.getSentimental summing the polarity of each word and normalizing with the length of the sentence
        const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn'); 
        const analysis = analyzer.getSentiment(filteredInput); 
        
        res.status(200).json({analysis});
    });
});

module.exports = router;
