blindfish.p5 = new p5(function (p) {

    var things = [];
    var limit = 20;
    var combinedLimit = limit * 2;
    var dragTracker = blindfish.dragTracker(10);
    
  p.setup = function () {
    p.createCanvas(600, 400);

      for (var i=0; i< limit; i++) {
          things[i] = new blindfish.Mover(
                p.random(p.width),
                p.random(p.height),
                p.random(8)-4,
                p.random(8)-4
          );
          
          things[limit + i] = new blindfish.Ball(
                p.random(p.width),
                p.random(p.height),
                p.random(8)-4,
                p.random(8)-4,
                p.floor(p.random(1)-1),
                p.floor(p.random(10,20))
          );
          
      }
    
  };

  p.draw = function () {
      p.background(0,155,155);
      

      for (var i=0; i< combinedLimit; i++) {  
          var thing0 = things[i];
          
          if(i<combinedLimit-1) {
               for(var j=i+1; j<combinedLimit; j++) {
                   
                    var thing1 = things[j];
                   
                   if(thing0.moving && thing1.moving) {
                       var  dx = thing1.x - thing0.x;
                        var dy = thing1.y - thing0.y;
                        var distSquared = dx*dx + dy * dy;
                                    if(blindfish.g.polarityOn) {
                                        blindfish.applyGravity(thing0, thing1, dx, dy, distSquared);
                                    }
                       if(blindfish.g.collisionsOn) {
                            blindfish.checkCollision(thing0, thing1, dx, dy, distSquared);
                       }
                   }
               }
          }
          
          things[i].update();
      }
      
      
      if(blindfish.selected && p.mouseIsPressed) { 
            // if a ball is selected then it's being dragged and we need to track mouse motion
            dragTracker.track(p.createVector(p.mouseX, p.mouseY));
        }



  };

  p.mousePressed = function() {
   
        if(!blindfish.selected) {
            
            for(var i = combinedLimit-1; i >-1; i--) {
                var thing = things[i];

                if(thing.mouseOver) {
                        thing.moving = false;
                        blindfish.selected = thing;
                }

            }
        }
    };
    
    p.mouseReleased = function() {
       if(blindfish.selected) {
            dragTracker.release();
            blindfish.selected.moving = true;
            blindfish.selected = undefined;
        }
    };
    
    
}, "sketch01");

