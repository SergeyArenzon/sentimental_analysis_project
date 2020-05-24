// ------------
// TWITTER PAGE 
// ------------



document.getElementById('searchTwitterBtn').addEventListener('click', e => {
    e.preventDefault();

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
        document.getElementById('twitterOutput').innerHTML = output.normalized;
        var moreTweetsInfo = document.getElementById('moreTweetsInfo');
        var posH1 = document.createElement('h1');
        var negH1 = document.createElement('h1');
        posH1.innerHTML = 'pos: ' + output.positive.length;
        negH1.innerHTML = 'neg: ' + output.negative.length;
        moreTweetsInfo.appendChild(posH1).appendChild(negH1);
        
       


    });
});
