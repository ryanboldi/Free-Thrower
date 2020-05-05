const WIDTH = 1000;
const HEIGHT = 800;

const HoopCollidors = 10; //invisible collision for the hoops

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
    restitution: 0.9,
    friction: 0.01,
    density: 0.3,
    timeScale: 3
}
const BALL_DIAM = 50; //diam in cm

const TIMEOUT = 4.5 * 60;
let counter = 0;

const BACKBOARD_HEIGHT = 220;
const BACKBOARD_THICKNESS = 20;

const HOOP_RAD = 60;
const NET_LENGTH = HOOP_RAD * (3 / 2);
const HOOP_X = WIDTH - HOOP_RAD - BACKBOARD_THICKNESS - 5;

const SHOOTERS = 30;
const mutationRate = 0.3;

const SHOOTER_MAX_X = 40;
const SHOOTER_MAX_Y = -40;

const SHOOTER_START_X = 50;
const SHOOTER_START_Y = HEIGHT - 50;

let shooters = [];
let h;
let hoopBoxes; //array of boxes of the hoop

function setup() {
    initNeat();
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


    h = new Hoop(WIDTH - HOOP_RAD - HoopCollidors * 2, 500);
    startEvaluation();
}

function draw() {
    counter++;
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
    shooters.forEach(shooter => {
        shooter.show();
    });
    h.show();

    if (checkStatic == true) {
        console.log("idiot")
        resetHoop();
        endEvalutation();
    }


    if (counter == TIMEOUT) {
        counter = 0;
        resetHoop();
        endEvalutation();
    }
};

function resetHoop() {
    h.delete();
    World.clear(world, false);

    ground = Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, 50, wallOptions);
    walls.push(Bodies.rectangle(0, HEIGHT / 2, 10, HEIGHT, wallOptions));
    walls.push(Bodies.rectangle(WIDTH / 2, 0, WIDTH, 10, wallOptions));
    walls.push(Bodies.rectangle(WIDTH, HEIGHT / 2, 10, HEIGHT, wallOptions));

    World.add(world, ground);
    walls.forEach(wall => {
        World.add(world, wall);
    })

    shooters = [];


    //h = new Hoop(WIDTH - HOOP_RAD - HoopCollidors * 2, random(100, HEIGHT - 100));
    h = new Hoop(random(WIDTH / 2, WIDTH - HOOP_RAD - HoopCollidors * 2), random(100, HEIGHT - 100))
        // ^ IF YOU CHANGE THIS MAKE SURE TO CHANGE IT IN THE INPUT NORMALISATION
}

function normalise(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

/**
 * checks if all balls are static
 * @returns bool
 */
function checkStatic() {
    let allStatic = true;
    shooters.forEach(shooter => {
        if (!shooter.ball.body.isSleeping()) {
            allStatic = false;
            console.log("not sleeping");
        }
    })
    return allStatic;
}