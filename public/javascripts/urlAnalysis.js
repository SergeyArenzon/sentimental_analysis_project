// ------------
//   URL PAGE 
// ------------






// document.getElementById('confirmUrlBtn').addEventListener('click', e => {
//     e.preventDefault();

//     // User input URL
//     const URL_TO_PARSE = document.getElementById('urlInput').value;

//     //Make a request to get the HTML of the page
//     request(URL_TO_PARSE, (err, response, html) => {
//         if (err) throw new Error(err);

//         //Load the HTML into cheerio's DOM
//         const $ = cheerio.load(html);
//         // Return body of html
//         var text = ($("body").text());
//         // Remove tags and keep only textContent
//         var noTags = textVersion(text);
//         console.log(noTags)


//     })
// });