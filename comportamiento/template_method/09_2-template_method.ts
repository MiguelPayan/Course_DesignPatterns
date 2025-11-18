abstract class ServicioLimpieza{
    public RealizarLimpieza():void{
        this.EntrarHabitacion();
        this.RecogerBasura();
        this.LimpiezaEspecifica();
        this.DesinfectarSuperficie();
        this.SalirHabitacion();
        console.log('');
        
    }
    
    private EntrarHabitacion(): void{
        console.log('Entrando en la habitacion.');
    }
    
    private RecogerBasura(): void{
        console.log('Recogiendo la basura.');
    }
    
    private DesinfectarSuperficie(): void{
        console.log('Desinfectando superficies.');
    }
    
    private SalirHabitacion(): void{
        console.log('Saliendo de la habitacion');
    }

    protected abstract LimpiezaEspecifica():void;
}

class LimpiezaHotel extends ServicioLimpieza{
    protected LimpiezaEspecifica(): void {
        console.log('Haciendo las camas del hotel');
    }
}

class LimpiezaSalaConferencias extends ServicioLimpieza{
    protected LimpiezaEspecifica(): void {
        console.log('Limpiando mesas y organizando sillas');
    }
}

class LimpiezaOficina extends ServicioLimpieza{
    protected LimpiezaEspecifica(): void {
        console.log('Limpiando escritorios y organizando documentos');
    }
}

function mainTemplate2(){

    const limpiezaHotel = new LimpiezaHotel();
    const limpiezaSalaConferencia = new LimpiezaSalaConferencias();
    const limpiezaOficina = new LimpiezaOficina();

    limpiezaHotel.RealizarLimpieza()
    limpiezaSalaConferencia.RealizarLimpieza()
    limpiezaOficina.RealizarLimpieza()
}

mainTemplate2();