// ---------
// /freeText
// ---------


var express = require('express');
var router = express.Router();

const aposToLexForm = require('apos-to-lex-form');
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');


const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();


// post req for  sentiment analyzing from fetch
router.post('/', (req, res) => { 

  const { input } = req.body; // get the user input
  const lexedInput = aposToLexForm(input); // fixes examples: i'am to i am 
  const casedInput = lexedInput.toLowerCase(); //to lower case
  const alphaOnlyInput = casedInput.replace(/[^a-zA-Z\s]+/g, ''); //removing non alphabetical
  
  const { WordTokenizer } = natural;
  const tokenizer = new WordTokenizer();
  const tokenizedInput = tokenizer.tokenize(alphaOnlyInput); // tokenize the input string

  tokenizedInput.forEach((word, index) => {
    tokenizedInput[index] = spellCorrector.correct(word);  // correct spellings
  })
  const filteredInput = SW.removeStopwords(tokenizedInput); // removes unrelevant words

  const { SentimentAnalyzer, PorterStemmer } = natural;

  // AFFIN is vocabulary of words rated by -3 to 3
  // analyzer.getSentimental summing the polarity of each word and normalizing with the length of the sentence
  const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn'); 
  const analysis = analyzer.getSentiment(filteredInput); 

  res.status(200).json({analysis});
  
})


module.exports = router;
