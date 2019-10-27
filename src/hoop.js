class Hoop{
    constructor(height){
        this.pos = createVector(HOOP_X, height);
    }

    show(){
        //fill(255,0,0);
        stroke(255,0,0);
        noFill();
        ellipse(this.pos.x, this.pos.y, HOOP_RAD*2, HOOP_RAD/5);
        fill(255);
        stroke(255,0,0);
        rect(this.pos.x + HOOP_RAD, this.pos.y - BACKBOARD_HEIGHT, BACKBOARD_THICKNESS, BACKBOARD_HEIGHT);
    }
}