/* 
!Tarea: implementar el patron visitor.
Contexto: tienes tres tipos de carga: Caja, Pallet y Contenedor. Cada uno tiene datos distintos, 
y necesitas hacer varias operaciones sobre ellos sin meter esa lógica dentro de las clases de carga.

Elementos (no los modifiques después de crearlos):

Caja: peso (kg), largo, ancho y alto (cm), y si es frágil.
Pallet: número de cajas y peso total.
Contenedor: tipo ("20ft" o "40ft"), peso y si es refrigerado.

Visitantes que debes implementar:

CostoEnvioVisitor: calcula el costo de cada carga.
Caja: $50 por kg, más 20% si es frágil.
Pallet: $500 base más $30 por caja.
Contenedor: $15,000 si es de 20ft o $25,000 si es de 40ft, más $5,000 si es refrigerado.
ReporteVisitor: genera una línea de texto por carga, por ejemplo: "Pallet | 12 cajas | 340 kg".
ValidacionVisitor: regresa errores si algo no cumple las reglas. 
Por ejemplo, una caja de más de 30 kg, un pallet de más de 1,000 kg o un contenedor de 20ft de más de 28,000 kg.

*/

interface Carga {
  accept<R>(visitor: CargaVisitor<R>): R;
}

interface CargaVisitor<R> {
  visitCaja(caja: Caja): R;
  visitPallet(pallet: Pallet): R;
  visitContenedor(contenedor: Contenedor): R;
  visitSobre(sobre: Sobre): R;
}


class Caja implements Carga{
    private _peso: number;
    private _largo: number;
    private _ancho: number;
    private _alto: number;
    private _esFragil: boolean;

    getPeso(){
        return this._peso;
    }
    getEsFragil(){
        return this._esFragil;
    }

    constructor(peso: number, largo: number, ancho: number, alto: number, esFragil: boolean) {
        this._peso = peso;
        this._largo = largo;
        this._ancho = ancho;
        this._alto = alto;
        this._esFragil = esFragil;
    }
    
    accept<R>(visitor: CargaVisitor<R>): R {
        return visitor.visitCaja(this);
    }

}
class Pallet implements Carga{
    private _totalCajas: number;
    private _totalPeso: number;
    getTotalCajas(){
        return this._totalCajas;
    }

    getTotalPeso(){
        return this._totalPeso;
    }

    constructor(totalCajas: number, totalPeso: number) {
        this._totalCajas = totalCajas;
        this._totalPeso = totalPeso;
    }
    
    accept<R>(visitor: CargaVisitor<R>): R {
        return visitor.visitPallet(this);
    }

}

class Contenedor implements Carga{
    private _tipo: TiposContenedor;
    private _peso: number;
    private _esRefrigerado: boolean;

    getTipo(): TiposContenedor{
        return this._tipo;
    }

    getEsRefrigerado(): boolean{
        return this._esRefrigerado;
    }

    getPeso(): number{
        return this._peso;
    }

    constructor(tipo: TiposContenedor, peso: number, esRefrigerado: boolean) {
        this._tipo = tipo;
        this._peso = peso;
        this._esRefrigerado = esRefrigerado;
    }
    
    accept<R>(visitor: CargaVisitor<R>): R {
        return visitor.visitContenedor(this);
    }
}

enum TiposContenedor{
    ft20 = "20ft",
    ft40 = "40ft"
}

class Sobre implements Carga{
    private _tipoSobre: TipoSobre;
    private _peso: number;
    private _esCertificado: boolean;

    constructor(tipoSobre: TipoSobre, peso: number, esCertificado: boolean) {
        this._tipoSobre = tipoSobre;
        this._peso = peso;
        this._esCertificado = esCertificado;
    }

    getTipo(): TipoSobre{
        return this._tipoSobre;
    }
    getPeso(): number{
        return this._peso;
    }
    getEsCertificado(): boolean{
        return this._esCertificado;
    }
    accept<R>(visitor: CargaVisitor<R>): R {
       return visitor.visitSobre(this);
    }

}

class ValidacionVisitor implements CargaVisitor<string[]>{
    visitSobre(sobre: Sobre): string[] {
        const errores: string[] = [];
        if(sobre.getTipo() === TipoSobre.Carta && sobre.getPeso() > 100) errores.push("Peso maximo para tamaño carta: 100g");
        if(sobre.getPeso() > 500) errores.push("Peso maximo: 500g por sobre, si sobre pasa el limite envie una caja.");
        return errores;
    }
    visitCaja(caja: Caja): string[] {
        if(caja.getPeso() > 30){
            return ["Peso maximo por caja: 30kg."];
        }
        return [];

    }
    visitPallet(pallet: Pallet): string[] {
        if(pallet.getTotalPeso() > 1_000){
            return ["Peso maximo por pallet: 1,000kg."];
        }
        return [];

    }
    visitContenedor(contenedor: Contenedor): string[] {
        if(contenedor.getTipo() == TiposContenedor.ft20 && contenedor.getPeso() > 28_000){
            return ["Peso maximo de contenedor 20ft: 28,000kg."];
        }
        return [];
    }

}

enum TipoSobre{
    Carta = "Carta",
    Oficio = "Oficio",
}

class ReporteVisitor implements CargaVisitor<string>{
    visitSobre(sobre: Sobre): string {
        return `Sobre\t\t | ${sobre.getTipo().toString()}\t | ${sobre.getPeso()}g\t\t | ${sobre.getEsCertificado() ? 'Certificado' : '-'}`
    }
    visitCaja(caja: Caja): string {
        return `Caja\t\t | ${caja.getPeso()}kg `;
    }
    visitPallet(pallet: Pallet): string {
        return `Pallet\t\t | ${pallet.getTotalCajas()} cajas\t | ${pallet.getTotalPeso()}kg`
    }
    visitContenedor(contenedor: Contenedor): string {
        return `Contenedor\t | ${contenedor.getTipo().toString()}\t\t | ${contenedor.getPeso()}kg`
    }
}

class CostoEnvioVisitor implements CargaVisitor<number>{
    visitSobre(sobre: Sobre): number {
        if( sobre.getTipo() === TipoSobre.Carta ) return sobre.getEsCertificado() ? 80 + 60 : 80; 

        return sobre.getEsCertificado() ? 120 + 60 : 120;
    }

    visitCaja(caja: Caja): number {
        if(caja.getEsFragil()){
            return (caja.getPeso() * 50) * 1.20;
        }
        return caja.getPeso() * 50;
    }
    
    visitPallet(pallet: Pallet): number {
        return 500 + (pallet.getTotalCajas() * 30);
    }

    visitContenedor(contenedor: Contenedor): number {
        if(contenedor.getTipo() == TiposContenedor.ft20 && contenedor.getEsRefrigerado()){
            return 15_000 + 5_000
        }
        if(contenedor.getTipo() == TiposContenedor.ft20 && !contenedor.getEsRefrigerado()){
            return 15_000
        }
        if(contenedor.getTipo() == TiposContenedor.ft40 && contenedor.getEsRefrigerado()){
            return 25_000 + 5_000
        }
        return 25_000
    }

}

function main2(){
    const cargas: Carga[] = [
        new Caja(10, 2,2,2,true),
        new Pallet(192,1800),
        new Contenedor(TiposContenedor.ft20, 20_000,true),
        new Sobre(TipoSobre.Carta,120,true)
    ]


    console.log('\nErrores');
    const validacionVisitor: ValidacionVisitor = new ValidacionVisitor()
    const errores = cargas.flatMap(c => c.accept(validacionVisitor));
    console.log(errores.length ? errores : "Sin errores")    
    
    console.log('\nCostos');
    const costoEnvioVisitor: CostoEnvioVisitor = new CostoEnvioVisitor()
    cargas.forEach(carga => console.log(carga.accept(costoEnvioVisitor)));
    
    console.log('\nCosto Total');
    const total = cargas.reduce((suma,c)=> suma + c.accept(costoEnvioVisitor),0)
    console.log(total);

    console.log('\nReporte');
    const reporteVisitor: ReporteVisitor = new ReporteVisitor()
    cargas.forEach(carga => console.log(carga.accept(reporteVisitor)));
     

}

main2();