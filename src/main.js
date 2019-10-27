const WIDTH = 1000;
const HEIGHT = 800;

//physics 
const GRAVITY = 2;
const BALL_DIAM = 48; //diam in cm




const BACKBOARD_HEIGHT = 220;
const BACKBOARD_THICKNESS = 20;


const HOOP_RAD = 46;
const HOOP_X = WIDTH -  HOOP_RAD - BACKBOARD_THICKNESS;

let b;
let h;

function setup() {
    frameRate(120);
    createCanvas(WIDTH, HEIGHT);
    b = new Ball(WIDTH / 2, 800, 10, -60);
    h = new Hoop(300);
}

function draw() {
    background(223);
    h.show();
    b.move();
    b.show();
};