const WIDTH = 1000;
const HEIGHT = 800;

//physics 
const GRAVITY = 0.2;
const BALL_DIAM = 48; //diam in cm

const BACKBOARD_HEIGHT = 220;
const BACKBOARD_THICKNESS = 20;

const HOOP_RAD = 46;
const HOOP_X = WIDTH - HOOP_RAD - BACKBOARD_THICKNESS;

let b;
let h;
let hoopBoxes; //array of boxes of the hoop

function setup() {
    frameRate(120);
    createCanvas(WIDTH, HEIGHT);
    b = new Ball(50, HEIGHT - 50, 6, -30);
    h = new Hoop(300);
    hoopBoxes = h.boxes;
}

function draw() {
    background(223);
    h.show();
    b.move();
    b.show();
};