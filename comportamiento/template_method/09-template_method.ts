abstract class BuildShipmentHeader{
    GetShipmentHeader():string{
        let header:string = '';
        header += this.SetTitle()
        header += this.GetDetails()
        header += this.SetCustomer()
        return header;
    }

    protected GetDetails(){
        return `
        Detalle 1.
        Detalle 2.
        Detalle 3.
        `
    }

    protected abstract SetTitle():string;

    protected abstract SetCustomer():string;
}

class SendValidated extends BuildShipmentHeader{
    SetTitle(): string {
        return 'Shipment Completed'
    }
    SetCustomer(): string {
        return 'Amazon'
    }

}

class SendUnshiped extends BuildShipmentHeader{
    SetTitle(): string {
        return 'Unshipment details'
    }
    SetCustomer(): string {
        return 'Amazon'
    }

    
}

function templateMain(){
    const emailSender: BuildShipmentHeader = new SendUnshiped();
    console.log( emailSender.GetShipmentHeader() );
}

templateMain();