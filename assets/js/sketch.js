// save this file as sketch.js
// Sketch 
var w = window.innerWidth;
var h = window.innerHeight;
var s = function( p ) { // p could be any variable 
        
    let angle = 0;
    let click_state = 0;
    p.setup = function () {
        p.createCanvas(h/2, w/2);
        p.background(50+p.int(200*p.random()), 20, 50+p.int(200*p.random()));
        p.noStroke();
        p.fill(0, 102);
        x_prev = p.mouseX;
        y_prev = p.mouseY;
    };

    p.draw = function () {
        distance = p.sqrt((x_prev-p.mouseX)^2 + (y_prev-p.mouseY)^2);
        x_prev = p.mouseX;
        y_prev = p.mouseY;
        // Draw only when mouse is pressed
        if (p.mouseIsPressed === true) {
            angle += 5;
            let val = p.cos(p.radians(angle)) * 12.0;
            for (let a = 0; a < 360; a += 75) {
            let xoff = p.cos(p.radians(a)) * val;
            let yoff = p.sin(p.radians(a)) * val;
            p.fill(0, 5, p.int(50*p.random()), 200);
            p.ellipse(p.mouseX + xoff, p.mouseY + yoff, val, val);
            }
            p.fill(255);
            p.ellipse(p.mouseX, p.mouseY, distance, distance);
        };
    };


    p.mouseReleased = function() {
        if (click_state>3) {
            p.noLoop();
        }
        else {
            click_state++;
        };
    
    }; //inspiration from examples page on p5 website
};


var myp5 = new p5(s, 'c1');

// Sketch Two
var t = function( p ) { 
};
var myp5 = new p5(t, 'c2');