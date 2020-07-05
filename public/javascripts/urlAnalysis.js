// ------------
//   URL PAGE 
// ------------


document.getElementById('confirmUrlBtn').addEventListener('click', e => {
    e.preventDefault();

    const url = document.getElementById('urlInput').value;  
    console.log(url) 
    fetch('/url', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url}),
    })
    .then(response => response.json())
    .then(({analysis} )=> {
      console.log('<%= analysis %>');
      document.getElementById('urlOutput').innerHTML = analysis
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    

});