interface Reports{
    generate():void;
}

class SalesReport implements Reports{
    generate(): void {
        console.log('Generando reporte de ventas.');
    }
}

class InventoryReport implements Reports{
    generate(): void {
        console.log('Generando reporte de inventarios.');
    }
}

class LogisticsReport implements Reports{
    generate(): void {
        console.log('Generando reporte de logistica.');
    }
}

abstract class ReportFactory{
    protected abstract reportBuilder(): Reports;
    generateReport(): void{
        const builder = this.reportBuilder();
        builder.generate();
    }
}

class Sales extends ReportFactory{
    reportBuilder(): Reports {
        return new SalesReport();
    }
}

class IC extends ReportFactory{
    reportBuilder(): Reports {
        return new InventoryReport();
    }
}

class Logistics extends ReportFactory{
    reportBuilder(): Reports {
        return new LogisticsReport();
    }
}

async function mains(){
    
    let signal: boolean = true;
    while(signal){
        let reports: ReportFactory;
        const report = prompt('Que reporte quieres generar? ( ventas/inventario/logistica o salir ):');
        switch (report) {
        case 'ventas':
            reports = new Sales();
            break;
        case 'inventario':
            reports = new IC();
            break;
        case 'logistica':
            reports = new Logistics();
            break;
        case 'salir':
            signal = false;    
            return;
        default:
            throw new Error('Opcion no valida')
            break;
        }
        reports.generateReport();
        await Sleep(3000);
        console.clear()   
    }
}


mains();
function Sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function reportDo(type:ReportFactory){
    type.generateReport();
}