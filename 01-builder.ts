class Computer{
    public cpu:string = 'CPU - Not defined';
    public ram:string = 'RAM - Not defined';
    public storage:string = 'STORAGE - Not defined';
    public gpu?:string;

    displayConfiguration(){
        console.log(`Configuracion de la PC:
            CPU: ${this.cpu},
            RAM: ${this.ram},
            STORAGE: ${this.storage},
            GPU: ${this.gpu ?? "El PC no cuenta con GPU"},
            `);
        
    }
}

class ComputerBuilder{
    private computer: Computer;
    
    constructor(){
        this.computer = new Computer();
    }

    setCPU(cpu: string):ComputerBuilder{
        this.computer.cpu = cpu;
        return this; 
    }

    setRAM(ram:string):ComputerBuilder{
        this.computer.ram = ram;
        return this;
    }

    setStorage(storage:string):ComputerBuilder{
        this.computer.storage = storage;
        return this;
    }

    setGPU(gpu:string):ComputerBuilder{
        this.computer.gpu = gpu;
        return this;
    }

    build(){
        return this.computer
    }
}

function main(){
    const mikePC: Computer = new ComputerBuilder()
    .setCPU("Intel i5")
    .build();
    mikePC.displayConfiguration()
    mikePC.cpu = 'AMD'
    mikePC.displayConfiguration()
    console.log(mikePC.cpu.toString());

}

main();