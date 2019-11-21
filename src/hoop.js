class Hoop {
    constructor(x, y) {
        this.pos = createVector(x, y);

        this.boxes = [
            [HOOP_RAD + this.pos.x, 0 + this.pos.y, HoopCollidors, HoopCollidors],
            [-HOOP_RAD + this.pos.x, 0 + this.pos.y, HoopCollidors, HoopCollidors]
        ];

        this.net = [
            [HOOP_RAD + this.pos.x + HoopCollidors / 2, this.pos.y + NET_LENGTH / 4, HoopCollidors, NET_LENGTH],
            [this.pos.x - HOOP_RAD - HoopCollidors / 2, this.pos.y + NET_LENGTH / 4, HoopCollidors, NET_LENGTH],
            [HOOP_RAD + this.pos.x + HoopCollidors / 2, this.pos.y + NET_LENGTH * (3 / 4), HoopCollidors, NET_LENGTH],
            [this.pos.x - HOOP_RAD - HoopCollidors / 2, this.pos.y + NET_LENGTH * (3 / 4), HoopCollidors, NET_LENGTH]
        ]

        this.comp = Matter.Composite.create(hoopOptions);


        let box = this.boxes[0];
        this.comp = Matter.Composite.add(this.comp, Bodies.rectangle(box[0], box[1], box[2], box[3], { id: 8, isStatic: true }));
        box = this.boxes[1];
        this.comp = Matter.Composite.add(this.comp, Bodies.rectangle(box[0], box[1], box[2], box[3], { id: 9, isStatic: true }));

        let net = this.net[0];
        netOptions.id = 10;
        this.comp = Matter.Composite.add(this.comp, Bodies.rectangle(net[0], net[1], net[2], net[3], netOptions));
        net = this.net[1];
        netOptions.id = 11;
        this.comp = Matter.Composite.add(this.comp, Bodies.rectangle(net[0], net[1], net[2], net[3], netOptions));

        this.comp = Matter.Composite.add(this.comp, Bodies.rectangle(this.pos.x, this.pos.y + 10, HOOP_RAD * 1, 5, { isSensor: true, isStatic: true, id: 99 }));


        Matter.Composite.get(this.comp, 10, 'body').collisionFilter.group = -2;
        Matter.Composite.get(this.comp, 11, 'body').collisionFilter.group = -2;
        Matter.Composite.get(this.comp, 8, 'body').collisionFilter.group = -2;
        Matter.Composite.get(this.comp, 9, 'body').collisionFilter.group = -2;

        //add netholders (constraint) to composite

        let leftConstraint = {
            bodyA: Matter.Composite.get(this.comp, 8, 'body'),
            bodyB: Matter.Composite.get(this.comp, 10, 'body'),
            damping: 0.5,
            stiffness: 1,
            pointB: { x: 0, y: -NET_LENGTH / 2 }, //TODO POINTB SHOULD ROTATE WITH TEH NET
            length: 0
        }

        let rightConstraint = {
            bodyA: Matter.Composite.get(this.comp, 9, 'body'),
            bodyB: Matter.Composite.get(this.comp, 11, 'body'),
            damping: 0.5,
            stiffness: 1,
            pointB: { x: 0, y: -NET_LENGTH / 2 },
            length: 0
        }

        let middleConstraint = {
            bodyA: Matter.Composite.get(this.comp, 10, "body"),
            bodyB: Matter.Composite.get(this.comp, 11, "body"),
            damping: 0,
            stiffness: 1,
            pointA: { x: 0, y: NET_LENGTH / 2 },
            pointB: { x: 0, y: NET_LENGTH / 2 },
            length: HOOP_RAD
        }

        this.comp = Matter.Composite.add(this.comp, Matter.Constraint.create(leftConstraint));
        this.comp = Matter.Composite.add(this.comp, Matter.Constraint.create(rightConstraint));
        this.comp = Matter.Composite.add(this.comp, Matter.Constraint.create(middleConstraint));
        //World.add(world, this.rightNet);
        //console.log(Matter.Composite.allBodies(this.comp));
        //World.add(world, this.bodies[0]);
        //World.add(world, this.bodies[1]);
        World.add(world, this.comp);
    }

    show() {
        //check for collisions

        //fill(255,0,0);
        push();
        translate(this.pos.x, this.pos.y);
        stroke(255, 0, 0);
        strokeWeight(2);
        noFill();
        strokeWeight(2);
        ellipse(0, 0, HOOP_RAD * 2, HOOP_RAD / 5);
        strokeWeight(0.5);
        fill(255, 0, 0, 10);
        stroke(255, 0, 0);
        rect(0, 10, HOOP_RAD * 1, 5)

        //TODO, MAYBE DRAW
        pop();

        for (let i = 0; i < 2; i++) {
            let currentNet = Matter.Composite.get(this.comp, 10 + i, "body");
            //console.log(currentNet);
            let position = currentNet.position;
            let angle = currentNet.angle;

            push();
            translate(position.x, position.y);
            rotate(angle);
            fill(255);
            rect(0, 0, HoopCollidors, NET_LENGTH);
            pop();

        }
        //rect(this.boxes[1][0], this.boxes[1][1], this.boxes[1][2], this.boxes[1][3]);
    }


    delete() {
        Matter.Composite.remove(world, this.comp);
    }
}