interface MovementStrategy{
    moveBy(): void;
}

class Volar implements MovementStrategy{
    moveBy(): void {
        console.log("Volando rapidisimo");
    }
}

class Correr implements MovementStrategy{
    moveBy(): void {
        console.log("Corriendo rapido");
    }
}

class Caminar implements MovementStrategy{
    moveBy(): void {
        console.log("Caminando");
    }
}

class Grifo{
    name: string;
    movementMethod:MovementStrategy;

    constructor(name:string, movementMethod:MovementStrategy) {
        this.name = name;
        this.movementMethod = movementMethod;
    }

    Move(){
        this.movementMethod.moveBy();
    }

    ChangeMoveMethod(newMovementMethod: MovementStrategy){
        console.log(`${this.name} cambio su forma de moverse!`);
        this.movementMethod = newMovementMethod;
    }
}

function MainStrategy(){
    const camelio = new Grifo("Camelio", new Volar());
    camelio.Move()
    camelio.ChangeMoveMethod(new Correr())
    camelio.Move()
    camelio.ChangeMoveMethod(new Caminar())
    camelio.Move()
    camelio.Move()
}

MainStrategy();