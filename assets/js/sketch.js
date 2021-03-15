// save this file as sketch.js
// Sketch 
var w = window.innerWidth/1.5;
var h = window.innerHeight/1.5;
var s = function( p ) { // p could be any variable
    let rand = p.random();
    let n = 3;
    let prob = 1/n;
    if(rand < prob) {
        let angle = 0;
        let click_state = 0;
        p.setup = function () {
            p.createCanvas(h, w);
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
            if (click_state>2) {
                p.noLoop();
            }
            else {
                click_state++;
            };
        }; //inspiration from examples page on p5 website
    }
    else if(p.random() < 2*prob) {
        let click_state = 0;
        // based on https://p5js.org/examples/math-parametric-equations.html
        p.setup = function(){
            p.createCanvas(h, w);
            width = w;
            height = h;
            p.background(5, 50, 100);
            mult_val = 115;
        }

        // the parameter at which x and y depends is usually taken as either t or symbol of theta
        let t = 0;
        p.draw = function(){
            p.translate(width/2,height/2);
            p.stroke(50+(t%100)*2, 200-(t%80)*2, 255-(t%44), 40);
            p.strokeWeight(1.5);
            //loop for adding 100 lines
            for(let i = 0;i<100;i+=2){
                p.line(p.x1(t+i),p.y1(t+i),p.x2(t+i)+20,p.y2(t+i)+20);
            }
            t+=p.map(p.mouseX, 0, width, 0.01, 0.4);
        }
        // function to change initial x co-ordinate of the line
        p.x1 = function(t){
            return p.sin(t/10)*mult_val+p.sin(t/20)*mult_val+p.sin(t/30)*mult_val;
        }

        // function to change initial y co-ordinate of the line
        p.y1 = function(t){
            return p.cos(t/10)*mult_val+p.cos(t/20)*mult_val+p.cos(t/30)*mult_val;
        }

        // function to change final x co-ordinate of the line
        p.x2 = function (t){
            return p.sin(t/15)*mult_val+p.cos(t/10)*mult_val+p.sin(t/20)*p.sin(t/35)*mult_val;
        }

        // function to change final y co-ordinate of the line
        p.y2 = function(t){
            return p.cos(t/15)*mult_val+p.cos(t/25)*mult_val/t+p.cos(t/35)*+mult_val-p.cos(t/20)*p.cos(t/20)*mult_val;
        }

        p.mousePressed = function() {
            if (click_state>2) {
                p.noLoop();
            }
            else {
                p.setup();
                click_state++;
                mult_val+=5;
            }
        
        };
    }
    else if(rand < 3*prob) {
        p.setup = function() {
            p.createCanvas(h, w);
            width = w;
            height = h;
            p.background(100, 0, 150, 200);
            p.randFill();
            last_mouse_x = 0;
            last_mouse_y = 0;
            click_state = 0;
            x_inc = width/2;
            y_inc = height/2;
            p.noStroke();
        }
          
        p.draw = function() {
            if(click_state < 1){
                p.panel(0, 0);
            }
            else if(click_state < 2){
                p.panel(0, 0);
                p.panel(width/2, height/2);
            }
            else {
                for (i=0; i<click_state; i++) {
                for (j=0; j<click_state; j++){
                    p.panel((j*x_inc) +(i*x_inc)+0, (j*y_inc) +(i*y_inc)+0);
                    p.panel((j*x_inc) +(i*x_inc)+x_inc,(j*y_inc) + (i*y_inc)+y_inc);
                    p.panel((j*x_inc) +(i*x_inc)+x_inc,(j*y_inc) + (i*y_inc)+0);
                    p.panel((j*x_inc) +(i*x_inc)+0, (j*y_inc) + (i*y_inc)+y_inc);
                }
                }
            }
            last_mouse_x = p.mouseX;
            last_mouse_y = p.mouseY;
            
        }
          
          
        p.panel =function(offset_x, offset_y) {
            y_boundary = offset_y + y_inc;
            x_boundary = offset_x + x_inc;
                
            change_x = p.check_x_change(x_boundary);
            change_y = p.check_y_change(y_boundary);
                
            if(change_x == 1) {
                p.randFill();
                p.rect(0, 0, x_boundary, y_boundary*2);
            }
            if(change_x == -1) {
                p.randFill();
                p.rect(x_boundary, 0, x_boundary, y_boundary*2);
            }
            if(change_y == 1) {
                p.randFill();
                p.rect(0, 0, x_boundary*2, y_boundary);
            }
            if(change_y == -1) {
                p.randFill();
                p.rect(0, y_boundary, x_boundary*2, y_boundary);
            }
        }
          
        p.check_y_change = function(boundary) {
            if (p.mouseY>=boundary && last_mouse_y<boundary) {
                return -1; //crossed down
            } else if (p.mouseY<=boundary && last_mouse_y>boundary) {
                return 1; //crossed up
            } else {
                return 0;
            }
        }
          
        p.check_x_change = function (boundary) {
            if (p.mouseX>=boundary && last_mouse_x<boundary) {
                return -1; //crossed right
            } else if (p.mouseX<=boundary && last_mouse_x>boundary) {
                return 1; //crossed left
            } else {
                return 0;
            }
        }
          
          
        p.randFill = function() {
            r = p.random(100, 200); 
            g = 0;
            b = p.random(50, 200);
            a = p.random(150,225); 
            p.fill(r,g,b,a);
            return
        }
            
        p.mousePressed = function () {
            if (click_state<2) {
                click_state++;
                x_inc = width/(2**(click_state+1));
                y_inc = height/(2**(click_state+1));
            }
            else {
                p.noLoop();
            }

        };
    };
    
};


var myp5 = new p5(s, 'c1');