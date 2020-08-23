

// ------------
// TWITTER PAGE 
// ------------


const happySmile = '<div class="smiley"><div class="smiley-face smiley-face--happy"><div class="smiley-eyes smiley-eyes--happy"><div class="smiley-eye"></div><div class="smiley-eye"></div></div><div class="smiley-mouth smiley-mouth--happy"><div class="smiley-tongue"></div></div></div></div>';
const sadSmile = '<div class="smiley smiley--sad"><div class="smiley-face smiley-face--sad"><div class="smiley-eyes smiley-eyes--sad"><div class="smiley-eye"></div><div class="smiley-eye"></div></div><div class="smiley-mouth smiley-mouth--sad"></div></div></div>';
const neutralSmile = '<div class="smiley"><div class="smiley-face"><div class="smiley-eyes smiley-eyes--neutral"><div class="smiley-eye"></div><div class="smiley-eye"></div></div><div class="smiley-mouth smiley-mouth--neutral"><div class="smiley-mouth-sad--neutral"><div class="row"><div class="column"></div><div class="column"></div></div></div></div></div></div>';


document.getElementById('searchTwitterBtn').addEventListener('click', e => {
    e.preventDefault();


    // hides all irrelevant outputs divs after click
    let urlDiv = document.getElementById('urlDiv');
    let freeDiv = document.getElementById('freeDiv');
    urlDiv.style.display = 'none';
    freeDiv.style.display = 'none';

    
    var twitterSearch = document.getElementById('twitterInput').value;

    fetch("/twitter", {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({twitterSearch})
    })
    .then(response => response.json())
    .then(({output}) => {

        let showTwitterOutput = document.getElementById('twitterDiv');

        showTwitterOutput.style.display = 'inline';

        var feedbackSmiley = document.getElementById('feedbackSmiley');
        if(output.normalized > 0){
            feedbackSmiley.innerHTML = happySmile;
        }
        else if(output.normalized < 0) {
            feedbackSmiley.innerHTML = sadSmile;
        }
        else {
            feedbackSmiley.innerHTML = neutralSmile;
        }


        var twitterOutput = document.getElementById('avg');
        twitterOutput.innerHTML = "Avg: " + output.normalized;
        
        var twitterOutput = document.getElementById('positive');
        twitterOutput.innerHTML = "Positive: " + output.positive.length;
        
        var twitterOutput = document.getElementById('negative');
        twitterOutput.innerHTML = "Negative: " + output.negative.length;

        var twitterOutput = document.getElementById('neutral');
        twitterOutput.innerHTML = "Neutral: " + output.neutral.length;

        var mostPosTweet = document.getElementById('mostPosTweet');
        mostPosTweet.innerHTML = "Most positive tweet: " + output.mostPosTweet;

        var mostPosNum = document.getElementById('mostPosNum');
        mostPosNum.innerHTML = "Grade: " + output.mostPosNum;

        var mostNegTweet = document.getElementById('mostNegTweet');
        mostNegTweet.innerHTML = "Most negative tweet: " + output.mostNegTweet;

        var mostNegNum = document.getElementById('mostNegNum');
        mostNegNum.innerHTML = "Grade: " + output.mostNegNum;

    });
});

