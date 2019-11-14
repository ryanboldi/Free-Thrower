class Hoop {
    constructor(x , y) {
        this.pos = createVector(x, y);

        this.boxes = [
            [HOOP_RAD + this.pos.x, 0 + this.pos.y, HoopCollidors, HoopCollidors],
            [-HOOP_RAD + this.pos.x, 0 + this.pos.y, HoopCollidors, HoopCollidors]
        ];
        
        this.net = [
            [HOOP_RAD + this.pos.x, this.pos.y + NET_LENGTH/ 2, HoopCollidors, NET_LENGTH],
            [this.pos.x - HOOP_RAD, this.pos.y + NET_LENGTH/2, HoopCollidors, NET_LENGTH]
        ]

        this.comp = Matter.Composite.create(hoopOptions);


        this.boxes.forEach(box => {
            this.comp = Matter.Composite.add(this.comp, Bodies.rectangle(box[0], box[1], box[2], box[3], {isStatic: true}));
        });
        ///this.nets.forEach(net => {
           // this.comp = Matter.Composite.add(this.comp, Bodies.rectangle(net[0], net[1], net[2], net[3], {id: 10}));
        //});
        

        //World.add(world, this.rightNet);
        //console.log(Matter.Composite.allBodies(this.comp));
        //World.add(world, this.bodies[0]);
        //World.add(world, this.bodies[1]);
        World.add(world, this.comp);
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

        let position = this.comp.position;
        let angle = this.rightNet.angle;

  

        push();
        translate(position.x, position.y);
        rotate(angle);
        fill(0);
        rect(0,0, HoopCollidors, NET_LENGTH);
        pop();
        //rect(this.boxes[1][0], this.boxes[1][1], this.boxes[1][2], this.boxes[1][3]);
    }


    delete(){
        Matter.Composite.remove(world, this.comp);
    }
}