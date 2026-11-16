
/*  
! Patron Adapter 
Permite que objetos con interfaces incompatibles trabajen juntos, tambien
util para utilizar librerias de terceros en nuestra aplicacion sin depender 
directamente de ellas

* Es util cuando se quiere reutilizar una clase que no tiene la interface que necesitamos 
* o cuando queremos crear una capa de abstraccion para una libreria de terceros
*/

// import { LocalLogger } from "./local-logger.ts";
import { DenoLoggerAdapter } from "./logger-adapter.ts";
const logger = new DenoLoggerAdapter('01-adapter.ts')

logger.writeLog('Mensaje de un log normal');
logger.writeWarning('Algo salio verdaderamente MAL');
logger.writeError('Alerta normal, informacion');
