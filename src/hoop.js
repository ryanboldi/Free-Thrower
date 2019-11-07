class Hoop {
    constructor(height) {
        this.pos = createVector(HOOP_X, height);

        this.boxes = [
            [this.pos.x + HOOP_RAD, this.pos.y - BACKBOARD_HEIGHT, BACKBOARD_THICKNESS, BACKBOARD_HEIGHT],
            [this.pos.x - HOOP_RAD - 3, this.pos.y - 3, 6, 6],
            [WIDTH, 0, 50, HEIGHT],
            [0, HEIGHT, WIDTH, 50],
            [0-50, 0, 50, HEIGHT],
            [0, 0-50, WIDTH, 50]
        ];
    }

    show() {
        //fill(255,0,0);
        stroke(255, 0, 0);
        noFill();
        strokeWeight(2);
        ellipse(this.pos.x, this.pos.y, HOOP_RAD * 2, HOOP_RAD / 5);
        strokeWeight(0.5);
        fill(255);
        stroke(255, 0, 0);
        this.boxes.forEach(box => {
            rect(box[0], box[1], box[2], box[3]);
        })

        //rect(this.boxes[1][0], this.boxes[1][1], this.boxes[1][2], this.boxes[1][3]);
    }
}