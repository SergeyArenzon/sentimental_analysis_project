//------------------------------
//  BOX HOVER/UNHOVER HANDLER    
//------------------------------



// BOX1 HOVER HANDLER
const box1hovered = document.getElementById('box1').addEventListener('mouseover', () => {
    let box1Div = document.getElementById('box1Div');
    let box1hover = document.getElementById('box1hover');
    box1hover.style["display"]= "block";    
});

// BOX1 UNHOVER HANDLER
const box1unHovered = document.getElementById('box1').addEventListener('mouseout', () => {
    let box1Div = document.getElementById('box1Div');
    let box1hover = document.getElementById('box1hover');
    box1hover.style["display"]= "none";
    
});


// BOX2 HOVER HANDLER
const box2 = document.getElementById('box2').addEventListener('mouseover', () => {
    
});
// BOX3 HOVER HANDLER
const box3 = document.getElementById('box3').addEventListener('mouseover', () => {
    
});