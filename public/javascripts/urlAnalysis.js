// ------------
//   URL PAGE 
// ------------



document.getElementById('confirmUrlBtn').addEventListener('click', e => {
    e.preventDefault();

    // hides all irrelevant outputs divs after click
    let twitterDiv = document.getElementById('twitterDiv');
    twitterDiv.style.display = 'none';
    let freeDiv = document.getElementById('freeDiv');
    freeDiv.style.display = 'none';
  


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