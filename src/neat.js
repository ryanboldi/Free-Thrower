function initNeat(){
    neat = new Neat(
        2, 2, null, {
            mutation: methods.mutation.ALL,
            popsize: SHOOTERS,
            mutationRate: MUT_RATE,
            elitism: Math.round(0.1 * SHOOTERS),
            network: new architect.Random(2,4,2)
        }
    );
}

function startEvaluation(){
    players = [];
    highestScore = 0;

    for(var genome in neat.population){
        genome = neat.population[genome];
        new Player(genome);
    }
}

function endEvalutation(){
    console.log("Generation: ", neat.generation, "-average score: ", neat.getAverage());

    neat.sort();
    var newPop = [];

    for(var i = 0; i < neat.elitism; i++){
        newPop.push(neat.population[i]);
    }
    for (let i = 0; i < neat.popsize - neat.elitism; i++) {
        newPop.push(neat.getOffspring()); 
    }

    neat.population = newPop;
    neat.mutate();

    neat.generation++;
    startEvaluation();
}