class Hoop {
    constructor(x , y) {
        this.pos = createVector(x, y);

        this.boxes = [
            [HOOP_RAD + this.pos.x, 0 + this.pos.y, HoopCollidors, HoopCollidors],
            [-HOOP_RAD + this.pos.x, 0 + this.pos.y, HoopCollidors, HoopCollidors]
        ];

        this.bodies = []
        this.boxes.forEach(box => {
            this.bodies.push(Bodies.rectangle(box[0], box[1], box[2], box[3], hoopOptions));
        });

        console.log(this.bodies.length);
        World.add(world, this.bodies[0]);
        World.add(world, this.bodies[1]);

    }

    show() {
        //fill(255,0,0);
        push();
        translate(this.pos.x, this.pos.y);
        stroke(255, 0, 0);
        noFill();
        strokeWeight(2);
        ellipse(0, 0, HOOP_RAD * 2, HOOP_RAD / 5);
        strokeWeight(0.5);
        fill(255);
        stroke(255, 0, 0);
        //TODO, MAYBE DRAW
        pop();
        //rect(this.boxes[1][0], this.boxes[1][1], this.boxes[1][2], this.boxes[1][3]);
    }
}