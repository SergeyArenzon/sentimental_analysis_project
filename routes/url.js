// -------------
//   URL ROUTE
// -------------

var express = require('express');
var router = express.Router();
var request = require("request");
const cheerio = require('cheerio');
var textVersion = require("textversionjs");

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
        
        console.log(input) 
    });
});



module.exports = router;
