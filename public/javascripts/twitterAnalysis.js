// ------------
// TWITTER PAGE 
// ------------






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
        
        //document.getElementById('twitterOutput').innerHTML = output.normalized;
        // var moreTweetsInfo = document.getElementById('moreTweetsInfo');
        // var posH1 = document.createElement('h1');
        // var negH1 = document.createElement('h1');
        // posH1.innerHTML = 'pos: ' + output.positive.length;
        // negH1.innerHTML = 'neg: ' + output.negative.length;
        // moreTweetsInfo.appendChild(posH1).appendChild(negH1);
        


    });
});
