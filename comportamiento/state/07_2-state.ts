

class AutomaticDoor{
    private state:DoorState;

    constructor() {
        this.state = new CloseState(this);         
    }
    Open(){
        this.state.open();
    }

    Close(){
        this.state.close();
    }

    SetState(newState: DoorState){
        console.log("Cambiando estado a " + newState.stateName);
        this.state = newState;
    }

    GetState():string{
        return this.state.stateName;
    }
}

interface DoorState{
    stateName: string;

    open(): void;
    close(): void;
}

class CloseState implements DoorState{
    stateName: string = "Cerrado";
    private _door: AutomaticDoor;
    constructor(newdoor:AutomaticDoor){
        this._door = newdoor;
    }

    open(): void {
        this._door.SetState(new OpeningState(this._door));
    }
    close(): void {
        console.log("La puerta esta cerrada");
    }
}

class OpeningState implements DoorState{
    stateName: string = "Abriendo";
    private _door: AutomaticDoor;

    constructor(newDoor: AutomaticDoor) {
        this._door = newDoor;
        this.AfterOpen();
    }

    private async AfterOpen(){
        this._door.SetState(new OpenState(this._door))
    }

    open(): void {
        console.log("La puerta se esta abriendo");
    }
    close(): void {
        this._door.SetState(new CloseState(this._door))
    }
}

class OpenState implements DoorState{
    stateName: string = "Abierto";
    private _door: AutomaticDoor;

    constructor(newDoor: AutomaticDoor) {
        this._door = newDoor;
    }

    open(): void {
        console.log("La puerta ya se abrio");
    }
    close(): void {
        this._door.SetState(new ClosingState(this._door))
    }
}

class ClosingState implements DoorState{
    stateName: string = "Cerrando puerta";
    private _door: AutomaticDoor;

    constructor(newDoor: AutomaticDoor) {
        this._door = newDoor;
        this.AfterClose();
    }

    async AfterClose(){
        this._door.SetState(new CloseState(this._door));
        await Sleep(3000);
    }
    open(): void {
        this._door.SetState(new OpenState(this._door))
    }
    close(): void {
        console.log("La puerta se esta cerrando");
    }
}
function Sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function mains(){
    const door:AutomaticDoor = new AutomaticDoor();
    let option:string = "0";
    while (option != "3") {
        option = prompt(`Estado de la puerta: ${door.GetState()}
        1. Abrir
        2. Cerrar
        3. Salir
        Seleccion: `)!;

        switch (option) {
            case "1":
                door.Open();
                break;
        
            case "2":
                door.Close();
                break;
        
            case "3":
                console.log("Saliendo del sistema")
                break;
        
            default:
                console.log("Opcion invalida");
                break;
        }
        await Sleep(2000);
        console.clear();
    }
}

mains();