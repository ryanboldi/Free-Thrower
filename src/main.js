const WIDTH = 1000;
const HEIGHT = 800;

const HoopCollidors = 4; //invisible collision for the hoops

//physics engine
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var ground;
var walls = [];

var ballOptions = {
    restitution: 0.9,
    density: 0.1,
    friction: 0.5,
    airFriction: 1,
    timeScale: 1,
    frictionStatic: 1
};

var wallOptions = {
    restitution: 0.9,
    friction: 0.01,
    isStatic: true
}

var hoopOptions = {
    restitution: 0.9,
    friction: 0.01,
    isStatic: true
}

var netOptions = {
    stiffness: 0.7,
}
const BALL_DIAM = 60; //diam in cm



const BACKBOARD_HEIGHT = 220;
const BACKBOARD_THICKNESS = 20;

const HOOP_RAD = 60;
const NET_LENGTH = HOOP_RAD;
const HOOP_X = WIDTH - HOOP_RAD - BACKBOARD_THICKNESS - 5;

let balls = [];
let h;
let hoopBoxes; //array of boxes of the hoop

function setup() {
    engine = Engine.create();
    world = engine.world;

    rectMode(CENTER);

    ground = Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, 50, wallOptions);
    walls.push(Bodies.rectangle(0, HEIGHT / 2, 10, HEIGHT, wallOptions));
    walls.push(Bodies.rectangle(WIDTH / 2, 0, WIDTH, 10, wallOptions));
    walls.push(Bodies.rectangle(WIDTH, HEIGHT / 2, 10, HEIGHT, wallOptions));

    World.add(world, ground);
    walls.forEach(wall => {
        World.add(world, wall);
    })
    rect(WIDTH / 2, HEIGHT, WIDTH, 100);
    frameRate(60);
    createCanvas(WIDTH, HEIGHT);
    Engine.run(engine);


    h = new Hoop(400, 400);
}

function draw() {
    background(223);
    push();

    fill(166, 150, 108);
    noStroke();
    rect(0, HEIGHT / 2, 10, HEIGHT);
    rect(WIDTH / 2, 0, WIDTH, 10);
    rect(WIDTH, HEIGHT / 2, 10, HEIGHT);

    fill(3, 98, 252);
    strokeWeight(1);
    stroke(255);
    rect(WIDTH / 2, HEIGHT, WIDTH, 50);

    pop();
    balls.forEach(ball => {
        ball.show();
    });

    if (mouseIsPressed) {
        // balls.push(new Ball(mouseX, mouseY));
    }
    h.show();
};

function mousePressed() {
    balls.push(new Ball(mouseX, mouseY));
}

function keyPressed() {
    balls.forEach(ball => {
        //Matter.Body.applyForce(ball.body, { x: 0, y: 0 }, { x: 0.1, y: 0.1 });
        Matter.Body.setVelocity(ball.body, { x: 10, y: -10 });
        Matter.Body.setAngularVelocity(ball.body, 0.1);
        h.delete();
        h = new Hoop(random(100, WIDTH - 100), random(100, HEIGHT - 100));
    })
}