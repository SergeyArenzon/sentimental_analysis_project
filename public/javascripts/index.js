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
  


document.getElementById('button-addon1').addEventListener('click', e => {
    e.preventDefault();

    hideDivs(); // hides irrelevant divs on click


    var loader = document.getElementById('loader');
    loader.style.display = "inline-block";
    var input = document.getElementById('userInput').value;

    const options = {
        method: 'POST',
        body: JSON.stringify({ input }),
        headers: new Headers({ 'Content-Type': 'application/json' })
    }
    fetch('/', options)
        .then(response => response.json())
        .then(({analysis}) => {
            loader.style.display = "none"
            document.getElementById('output').innerHTML = analysis;
        })
});




