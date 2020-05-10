

var express = require('express');
var router = express.Router();

var Analyzer = require('natural').SentimentAnalyzer;
var stemmer = require('natural').PorterStemmer;
var analyzer = new Analyzer("English", stemmer, "afinn");

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { input: '' });


});



router.post('/', (req, res) => {  
  res.render('index', {input: analyzer.getSentiment(["I", "banana", "loved"])});

  


})


module.exports = router;
