class GameMemento{
    private level: number;
    private health: number;
    private position: string;

    constructor(level: number, health: number, position: string){
        this.level = level;
        this.health = health;
        this.position = position;
    }

    getLevel(){
        return this.level;
    }

    getHealth(){
        return this.health;
    }

    getPosition(){
        return this.position;
    }
}

class Game{
    private level: number = 1;
    private health: number = 100;
    private position: string = 'Inicio';

    constructor(){
        console.log(`\nCreando juego: nivel ${this.level}
            \nSalud: ${this.health}
            \nPosicion: ${this.position}`);
    }

    save(): GameMemento{
        return new GameMemento(this.level, this.health, this.position)
    }

    play(level:number, health:number, position:string){
        this.level = level;
        this.health = health;
        this.position = position;

        console.log(`\nJugando en el nivel ${this.level}
            \nSalud: ${this.health}
            \nPosicion: ${this.position}`);
    }

    restore(memento:GameMemento):void{
        this.level = memento.getLevel();
        this.health = memento.getHealth();
        this.position = memento.getPosition();
                console.log(`\nRestaurado en el nivel ${this.level}
            \nSalud: ${this.health}
            \nPosicion: ${this.position}`);
    }
}

class GameHistory{
    private mementos: GameMemento[] = [];

    push( memento:GameMemento ){
        this.mementos.push(memento);
    }

    pop(): GameMemento | null{
        return this.mementos.pop() ?? null;
    }
}

function mainMemento(){
    console.log('EMPEZO EL JUEGO');
    const game = new Game()
    const history = new GameHistory()
    
    console.log('JUGANDO');
    game.play(2,90,'Nivel 2')
    history.push(game.save())
    
    game.restore(history.pop()!)
        
    
}

mainMemento()