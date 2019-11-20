/** Rename variables */
var Neat = neataptic.Neat;
var Methods = neataptic.Methods;
var Config = neataptic.Config;
var Architect = neataptic.Architect;

Config.warnings = false;

function initNeat() {
    neat = new Neat(
        2, 2, null, {
        mutation: [
            Methods.Mutation.ADD_NODE,
            Methods.Mutation.SUB_NODE,
            Methods.Mutation.ADD_CONN,
            Methods.Mutation.SUB_CONN,
            Methods.Mutation.MOD_WEIGHT,
            Methods.Mutation.MOD_BIAS,
            Methods.Mutation.MOD_ACTIVATION,
            Methods.Mutation.ADD_GATE,
            Methods.Mutation.SUB_GATE,
            Methods.Mutation.ADD_SELF_CONN,
            Methods.Mutation.SUB_SELF_CONN,
            Methods.Mutation.ADD_BACK_CONN,
            Methods.Mutation.SUB_BACK_CONN
        ],
        popsize: SHOOTERS,
        mutationRate: mutationRate,
        elitism: Math.round(0.1 * SHOOTERS),
        network: new Architect.Random(2, 4, 2)
    });
}

function startEvaluation() {
    players = [];
    highestScore = 0;

    for (var genome in neat.population) {
        neat.mutate();
        genome = neat.population[genome];
        new Shooter(genome);
    }

    shooters.forEach(shooter => {
        shooter.shoot();
    });
}

function endEvalutation() {
    console.log("Generation: ", neat.generation, "-average score: ", neat.getAverage());

    neat.sort();
    var newPop = [];

    for (var i = 0; i < neat.elitism; i++) {
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