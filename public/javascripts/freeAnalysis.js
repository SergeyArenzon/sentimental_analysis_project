// ------------------------
// FREE TEXT ANALYZIER PAGE
// ------------------------


// hides all irrelevant outputs divs after click
hideDivs = () => {
    let urlDiv = document.getElementById('urlDiv');
    let twitterDiv = document.getElementById('twitterDiv');
    twitterDiv.style.display = 'none';
    urlDiv.style.display = 'none';
}

const happySmiley = '<div class="smiley"><div class="smiley-face smiley-face--happy"><div class="smiley-eyes smiley-eyes--happy"><div class="smiley-eye"></div><div class="smiley-eye"></div></div><div class="smiley-mouth smiley-mouth--happy"><div class="smiley-tongue"></div></div></div></div>';
const sadSmiley = '<div class="smiley smiley--sad"><div class="smiley-face smiley-face--sad"><div class="smiley-eyes smiley-eyes--sad"><div class="smiley-eye"></div><div class="smiley-eye"></div></div><div class="smiley-mouth smiley-mouth--sad"></div></div></div>';
const neutralSmiley = '<div class="smiley"><div class="smiley-face"><div class="smiley-eyes smiley-eyes--neutral"><div class="smiley-eye"></div><div class="smiley-eye"></div></div><div class="smiley-mouth smiley-mouth--neutral"><div class="smiley-mouth-sad--neutral"><div class="row"><div class="column"></div><div class="column"></div></div></div></div></div></div>';
document.getElementById("freeTextConfirm").addEventListener('click', e => {
    e.preventDefault();

    hideDivs(); // hides irrelevant divs on click

    var input = document.getElementById('userInput').value;

    const options = {
        method: 'POST',
        body: JSON.stringify({ input }),
        headers: new Headers({ 'Content-Type': 'application/json' })
    }
    fetch('/freeText', options)
        .then(response => response.json())
        .then(({analysis, pos_num, neg_num, words_num}) => {
            // show freeDiv 
            document.getElementById('freeDiv').style.display = 'inline';
            if(analysis > 0 ) {document.getElementById('feedbackSmiley').innerHTML = happySmiley;}
            else if(analysis < 0) {document.getElementById('feedbackSmiley').innerHTML = sadSmiley;}
            else {document.getElementById('feedbackSmiley').innerHTML = neutralSmiley;}
            document.getElementById('freeText_avg').innerHTML = analysis;
            document.getElementById('freeText_pos_num').innerHTML = pos_num;
            document.getElementById('freeText_neg_num').innerHTML = neg_num;
            document.getElementById('freeText_words_num').innerHTML = words_num;
        })
});




