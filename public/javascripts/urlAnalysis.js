// ------------
//   URL PAGE 
// ------------


// hides all irrelevant outputs divs after click
hideDivs = () => {
  let freeDiv = document.getElementById('freeDiv')
  let twitterDiv = document.getElementById('twitterDiv');
  twitterDiv.style.display = 'none';
  freeDiv.style.display = 'none';
  console.log(twitterDiv);
}

document.getElementById('confirmUrlBtn').addEventListener('click', e => {
    e.preventDefault();

    hideDivs(); // hides irrelevant output divs on click

    const url = document.getElementById('urlInput').value;  
    //console.log(url) 
    fetch('/url', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url}),
    })
    .then(response => response.json())
    .then(({analysis} )=> {

      // show urlDiv 
      document.getElementById('urlDiv').style.display = 'inline';
    
      document.getElementById('urlOutput').innerHTML = analysis
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});