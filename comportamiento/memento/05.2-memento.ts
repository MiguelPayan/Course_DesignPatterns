class DrawingMemento{//Memento
    private shapes: string[];

    constructor(shapes: string[]){
        this.shapes = [...shapes];//Romper las referencias a los objetos
    }

    getShape(){
        return this.shapes;
    }

}

class Drawing{//Originadora
    
    private shapes: string[] = [];

    constructor(){
        console.log('Nueva pizarra');
    }

    save(): DrawingMemento{
        console.log(`Guardando figuras: ${this.shapes}`);
        
        return new DrawingMemento(this.shapes)
    }

    showBoard():void{
        console.log(this.shapes);
    }

    draw(shape:string){
        this.shapes.push(shape);
        console.log(`Agregando ${shape} a la pizarra`);
    }

    restore(memento:DrawingMemento):void{
        this.shapes = memento.getShape();
        console.log(`Restaurando figuras ${this.shapes}`);
    }
}

class DrawHistory{//Cuidadora
    private mementos: DrawingMemento[] = [];

    push( memento:DrawingMemento ){
        this.mementos.push(memento);
    }

    pop(): DrawingMemento | null{
        return this.mementos.pop() ?? null;
    }
}

function mainMemento2(){
    const drawing: Drawing = new Drawing();
    const drawHistory: DrawHistory = new DrawHistory();
    
    drawing.draw('Circulo');
    drawing.draw('Cuadrado');
    drawHistory.push(drawing.save())
    
    
    drawing.draw('Triangulo');
    drawing.restore(drawHistory.pop()!)

}

mainMemento2()