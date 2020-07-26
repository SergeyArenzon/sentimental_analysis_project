// ------------
// TWITTER PAGE 
// ------------



// hides all irrelevant outputs divs after click
hideDivs = () => {
    let freeDiv = document.getElementById('freeDiv');
    let urlDiv = document.getElementById('urlDiv');
    urlDiv.style.display = 'none';
    freeDiv.style.display = 'none';
}




document.getElementById('searchTwitterBtn').addEventListener('click', e => {
    e.preventDefault();

    hideDivs(); // hides irrelevant outputs on click

    var twitterSearch = document.getElementById('twitterInput').value;

    // console.log(twitterSearch)

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

        //document.getElementById('twitterOutput').innerHTML = output.normalized;
        // var moreTweetsInfo = document.getElementById('moreTweetsInfo');
        // var posH1 = document.createElement('h1');
        // var negH1 = document.createElement('h1');
        // posH1.innerHTML = 'pos: ' + output.positive.length;
        // negH1.innerHTML = 'neg: ' + output.negative.length;
        // moreTweetsInfo.appendChild(posH1).appendChild(negH1);
        
       


    });
});
