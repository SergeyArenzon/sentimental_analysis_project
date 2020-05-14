



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
    .then(({normalized}) => {
        document.getElementById('twitterOutput').innerHTML = normalized;
    });
});
