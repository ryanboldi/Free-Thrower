class Shooter{
    constructor(x, y, genome){
        this.pos = createVector(x,y);
        this.brain = genome;
        this.score = 0;
    }
}