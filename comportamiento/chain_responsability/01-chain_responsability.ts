class User{
    public username: string;
    public password: string;
    public role: string;

    constructor(username:string, password:string, role:string) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

}


//* CHAIN OF RESPONSABILITY
interface Handler{
    setNext(handler: Handler): Handler;
    handle(request: User): void;
}

abstract class BaseHandler implements Handler{

    private nextHandler?: Handler;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }
    handle(request: User): void {
        if(this.nextHandler){
            this.nextHandler.handle(request)
        }
    }
}

class UserExistHandler extends BaseHandler{
    private _usersList: User[];

    constructor(usersList: User[]){
        super();
        this._usersList = usersList;
    }
    override handle(request: User): void {
        if(!this._usersList.some(a => a.username == request.username)){
            console.log('Usuario inexistente');
            return;
        }
        
        console.log('Usuario encontrado.');
        super.handle(request);
    }
}

class UserPasswordHandler extends BaseHandler{
    private _usersList: User[];
    
    constructor(password: User[]){
        super();
        this._usersList = password;
    }
    override handle(request: User): void {
        if(!this._usersList.some(user => (user.username == request.username) && (user.password == request.password) )){
            console.log('Contraseña incorrecta');
            return;
        }
        
        console.log('Contraseña correcta!');
        super.handle(request);
    }
}

class UserRoleHandler extends BaseHandler{
    private _usersList: User[];
    
    constructor(password: User[]){
        super();
        this._usersList = password;
    }
    override handle(request: User): void {
        let user: User | undefined = this._usersList.find(user => user.username == request.username);
        if(user != undefined && user.role == "Admin"){
            console.log("Acceso completado!");
            return
        }
        console.log('Usuario sin accesos');
    }
}

function chainMain(){
    let users:User[] = [
        {
            username : "Saul",
            password : "norwich",
            role : "Admin"
        },
        {
            username : "Cabe",
            password : "norwich",
            role : "Cliente"
        },
        {
            username : "Toño",
            password : "norwich",
            role : "Cliente"
        }];
        const userExists = new UserExistHandler(users);
        const correctPassword = new UserPasswordHandler(users);
        const correctRoleUser = new UserRoleHandler(users);
        
        userExists.setNext(correctPassword).setNext(correctRoleUser);
        
        let logged:User = new User("Saul","norwich","")
        
        userExists.handle(logged);
    
}

//chainMain();

//#region CHAIN OF RESPONSABILITY PART 2

function noChainMain(food:string){
    if(food == "berry"){
        console.log(`PARASAURIO come ${food}`);
    }
    if(food == "carne"){
        console.log(`REX come ${food}`);
    }
    if(food == "wyvern milk"){
        console.log(`WYVERN come ${food}`);
    }
    if(food == "carne prime"){
        console.log(`HUMANO come ${food}`);
    }
    if(food == "huevo"){
        console.log(`OVIRAPTOR come ${food}`);
    }
}

interface DinoHandler{
    setNext(handler: DinoHandler): DinoHandler;
    handle(request: string): void;
}

abstract class BaseDinoHandler implements DinoHandler{
    
    private nextHandler?: DinoHandler;
    
    setNext(handler: DinoHandler): DinoHandler {
        this.nextHandler = handler;
        return handler;
    }
    handle(request: string): void {
        if(this.nextHandler){
            this.nextHandler.handle(request)
        }
    }
}
class BerryHandler extends BaseDinoHandler{
    handle(request: string): void {
        if(request == "berry"){
            console.log(`PARASAURIO come ${request}`);
            return;
        }
        console.log(`PARASAURIO NO COME ${request}`);
        super.handle(request);
    }
}

class CarneHandler extends BaseDinoHandler{
    handle(request: string): void {
        if(request == "carne"){
            console.log(`REX come ${request}`);
            return;
        }
        console.log(`REX NO COME ${request}`);
        super.handle(request);
    }
}

class WyvernMilkHandler extends BaseDinoHandler{
    handle(request: string): void {
        if(request == "wyvern milk"){
            console.log(`WYVERN come ${request}`);
            return;
        }
        console.log(`WYVERN NO COME ${request}`);
        super.handle(request);
    }
}

class EggsHandler extends BaseDinoHandler{
    handle(request: string): void {
        if(request == "eggs"){
            console.log(`OVIRAPTOR come ${request}`);
            return;
        }
        console.log(`OVIRAPTOR NO COME ${request}`);
        super.handle(request);
    }
}

class CarnePrimeHandler extends BaseDinoHandler{
    handle(request: string): void {
        if(request == "carne prime"){
            console.log(`HUMANO come ${request}`);
            return;
        }
        console.log(`HUMANO NO COME ${request}`);
        super.handle(request);
    }
}

function dinoChainMain(){
    let carneHandler = new CarneHandler();
    let berryHandler = new BerryHandler();
    let carneprimeHandler = new CarnePrimeHandler();
    let wyvernmilkHandler = new WyvernMilkHandler();
    let eggsHandler = new EggsHandler();

    carneHandler.setNext(berryHandler).setNext(carneprimeHandler).setNext(wyvernmilkHandler).setNext(eggsHandler);

    carneHandler.handle("eggs");
}

dinoChainMain();
//#endregion