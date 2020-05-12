


document.getElementById('button-addon1').addEventListener('click', e => {
    e.preventDefault();
    var input = document.getElementById('userInput').value;

    const options = {
        method: 'POST',
        body: JSON.stringify({ input }),
        headers: new Headers({ 'Content-Type': 'application/json' })
    }

    
    fetch('/', options)
        .then(response => response.json())
        .then(({analysis}) => {
            
            document.getElementById('output').innerHTML = analysis
        })
});




