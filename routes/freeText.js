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

  // AFFIN is vocabulary of words rated by -5 to 5
  // analyzer.getSentimental summing the polarity of each word and normalizing with the length of the sentence
  const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn'); 
  // const analysis = analyzer.getSentiment(filteredInput);

  let pos_num = 0;
  let neg_num = 0;
  let words_num = 0;
  let count = 0;

  words_num = filteredInput.length;
  
  filteredInput.forEach(element => {
    word_weight = analyzer.getSentiment([element]);
    count += word_weight;

    if(word_weight >= 0) {pos_num += 1;}
    else {neg_num += 1;}
    
  });

  analysis = Math.round((count / words_num) * 100) / 100;
  

  res.status(200).json({analysis, pos_num, neg_num, words_num});
  
})


module.exports = router;
