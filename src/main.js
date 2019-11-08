const WIDTH = 1000;
const HEIGHT = 800;

//physics engine
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var ground;
var walls = [];

var ballOptions = {
    restitution: 1,
    density: 0.001,
    friction: 0.1
};

const BALL_DIAM = 48; //diam in cm

const BACKBOARD_HEIGHT = 220;
const BACKBOARD_THICKNESS = 20;

const HOOP_RAD = 46;
const HOOP_X = WIDTH - HOOP_RAD - BACKBOARD_THICKNESS;

let balls = [];
let h;
let hoopBoxes; //array of boxes of the hoop

function setup() {
    engine = Engine.create();
    world = engine.world;


    rectMode(CENTER);

    ground = Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, 50, { isStatic: true });
    walls.push(Bodies.rectangle(0, HEIGHT / 2, 10, HEIGHT, { isStatic: true }));
    walls.push(Bodies.rectangle(WIDTH / 2, 0, WIDTH, 10, { isStatic: true }));
    walls.push(Bodies.rectangle(WIDTH, HEIGHT / 2, 10, HEIGHT, { isStatic: true }));

    World.add(world, ground);
    walls.forEach(wall => {
        World.add(world, wall);
    })
    rect(WIDTH / 2, HEIGHT, WIDTH, 100);
    frameRate(60);
    createCanvas(WIDTH, HEIGHT);
    Engine.run(engine);
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
};

function mousePressed() {
    balls.push(new Ball(mouseX, mouseY));
}
function keyPressed() {
    balls.forEach(ball => {
        //Matter.Body.applyForce(ball.body, { x: 0, y: 0 }, { x: 0.1, y: 0.1 });
        Matter.Body.setVelocity(ball.body, { x: 10, y: -10 });
        Matter.Body.setAngularVelocity(ball.body, 0.1);
    })
}