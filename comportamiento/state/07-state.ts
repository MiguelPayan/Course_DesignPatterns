class Stegosaurio{
    name:string;
    private _state:StegoState;
    
    constructor(name:string) {
        this.name = name;
        this._state = new EggState(this);
    }


    Atack():void{
        console.log(this._state.Attack());
    }
    
    Defend():void{
        console.log(this._state.Defend());
    }
    
    Eat():void{
        console.log(this._state.Eat());
    }

    ChangeState(newState:StegoState):void{
        this._state = newState;
        console.log(`El estado de ${this.name} esta cambiando a ${newState.stegoStateName}`);
    }
    GetState():string{
        return this._state.stegoStateName;
    }
}

interface StegoState{
    stegoStateName:string;

    Defend():string;
    Attack():string;
    Eat():string;
}

class EggState implements StegoState{
    stegoStateName: string = "Egg state";
    private _stego:Stegosaurio;
    
    constructor(stego:Stegosaurio) {
        this._stego = stego
    }

    Eat():string {
        return `${this._stego.name} no puede comer porque solo es un huevo!`
    }

    Defend(): string {
        this._stego.ChangeState(new BabyState(this._stego))
        return `${this._stego.name} se defiende de bacterias mientras es un huevo! CRECERÁ\n`
    }
    Attack(): string {
        return `${this._stego.name} no puede atacar porque solo es un huevo!`
    }

}

class BabyState implements StegoState{
    stegoStateName: string = "Baby state";
    private _stego:Stegosaurio;

    constructor(stego:Stegosaurio) {
        this._stego = stego;
    }
    Eat(): string {
        this._stego.ChangeState(new JuvenilState(this._stego))
        return `${this._stego.name} esta comiendo de la mano de su madre❤️ CRECERÁ\n`
    }

    Defend(): string {
        return `${this._stego.name} no puede defenderse porque solo es un bebe!`
    }
    Attack(): string {
        return `${this._stego.name} no puede atacar porque solo es un bebe!`
    }
    
}

class JuvenilState implements StegoState{
    stegoStateName: string = "Juvenil state";
    private _stego:Stegosaurio;

    constructor(stego:Stegosaurio) {
        this._stego = stego;
    }

    Eat(): string {
        this._stego.ChangeState(new AdultState(this._stego))
        return `${this._stego.name} esta comiendo por su propia mano CRECERÁ\n`
    }

    Defend(): string {
        return `${this._stego.name} se defiende`
    }
    Attack(): string {
        return `${this._stego.name} ataca`
    }
    
}

class AdultState implements StegoState{
    stegoStateName: string = "Adult state";
    private _stego:Stegosaurio;

    constructor(stego:Stegosaurio) {
        this._stego = stego;
    }

    Eat(): string {
        return `${this._stego.name} caza y come por su cuenta`
    }

    Defend(): string {
        return `${this._stego.name} se defiente muy bien!`
    }
    Attack(): string {
        return `${this._stego.name} ataca salvajemente para proteger a su manada!`
    }
    
}

async function main(){
    let carlos: Stegosaurio = new Stegosaurio("Carlos");
    let signal: boolean = true;
    while (signal) {
      console.log(`Estado de ${carlos.name}: ${carlos.GetState()}`);
      let option = prompt(`
            1. Comer
            2. Atacar
            3. Defenderse
            4. Salir
            Seleccion: `);

      switch (option) {
        case "1":
          carlos.Eat();
          await Sleep(3000);
          break;
        case "2":
          carlos.Atack();
          await Sleep(3000);
          break;
        case "3":
          carlos.Defend();
          await Sleep(3000);
          break;
        case "4":
          signal = false;
          await Sleep(3000);
          break;  

        default:
          console.log("Opcion no valida");
          break;
      }
      console.clear();
    }
}

export function Sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

main();