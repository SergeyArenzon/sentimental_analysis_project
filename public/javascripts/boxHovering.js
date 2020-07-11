


const box1hovered = document.getElementById('box1').addEventListener('mouseover', () => {
    let box1Div = document.getElementById('box1Div');
    let box1hover = document.getElementById('box1hover');
    box1hover.style["display"]= "block";
    
});
const box1unHovered = document.getElementById('box1').addEventListener('mouseout', () => {
    let box1Div = document.getElementById('box1Div');
    let box1hover = document.getElementById('box1hover');
    box1hover.style["display"]= "none";
    
});

const box2 = document.getElementById('box2').addEventListener('mouseover', () => {
    
});

const box3 = document.getElementById('box3').addEventListener('mouseover', () => {
    
});