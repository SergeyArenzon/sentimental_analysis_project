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


document.getElementById("freeTextConfirm").addEventListener('click', e => {
    e.preventDefault();

    hideDivs(); // hides irrelevant divs on click

    var input = document.getElementById('userInput').value;

    const options = {
        method: 'POST',
        body: JSON.stringify({ input }),
        headers: new Headers({ 'Content-Type': 'application/json' })
    }
    fetch('/freeText', options)
        .then(response => response.json())
        .then(({analysis, pos_num, neg_num, words_num}) => {
            // show freeDiv 
            document.getElementById('freeDiv').style.display = 'inline';
            
            document.getElementById('freeText_avg').innerHTML = analysis;
            document.getElementById('freeText_pos_num').innerHTML = pos_num;
            document.getElementById('freeText_neg_num').innerHTML = neg_num;
            document.getElementById('freeText_words_num').innerHTML = words_num;
        })
});




