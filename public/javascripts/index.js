// ------------------------
// FREE TEXT ANALYZIER PAGE
// ------------------------


// hides all irrelevant outputs divs after click
hideDivs = () => {
    //let urlDiv = document.getElementById('urlDiv');
    let twitterDiv = document.getElementById('twitterDiv');
    twitterDiv.style.display = 'none';
    //urlDiv.style.display = 'none';
    console.log("11111111111111111")
  }
  


document.getElementById('button-addon1').addEventListener('click', e => {
    e.preventDefault();

    hideDivs(); // hides irrelevant divs on click

    var input = document.getElementById('userInput').value;

    const options = {
        method: 'POST',
        body: JSON.stringify({ input }),
        headers: new Headers({ 'Content-Type': 'application/json' })
    }
    fetch('/', options)
        .then(response => response.json())
        .then(({analysis}) => {
            
            
            // show freeDiv 
            document.getElementById('freeDiv').style.display = 'inline';
            

            document.getElementById('output').innerHTML = analysis;
        })
});




