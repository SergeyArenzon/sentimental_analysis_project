//------------------------------
//  BOX HOVER/UNHOVER HANDLER    
//------------------------------



// BOX1 HOVER HANDLER
const box1hovered = document.getElementById('box1').addEventListener('mouseover', () => {
    const box1hover = document.getElementById('box1hover');
    box1hover.style["display"]= "block";
});

// BOX1 UNHOVER HANDLER
const box1unHovered = document.getElementById('box1').addEventListener('mouseout', () => {
    const box1hover = document.getElementById('box1hover');
    box1hover.style["display"]= "none";
    
});


// BOX2 HOVER HANDLER
const box2 = document.getElementById('box2').addEventListener('mouseover', () => {
    const box2hover = document.getElementById('box2hover');
    box2hover.style["display"]= "block";
    
});
// BOX2 UNHOVER HANDLER
const box2unHovered = document.getElementById('box2').addEventListener('mouseout', () => {
    const box2hover = document.getElementById('box2hover');
    box2hover.style["display"]= "none";
    
});

// BOX3 HOVER HANDLER
const box3 = document.getElementById('box3').addEventListener('mouseover', () => {
    const box3hover = document.getElementById('box3hover');
    box3hover.style["display"]= "block";
});

// BOX3 UNHOVER HANDLER
const box3unHovered = document.getElementById('box3').addEventListener('mouseout', () => {
    const box3hover = document.getElementById('box3hover');
    box3hover.style["display"]= "none";  
});