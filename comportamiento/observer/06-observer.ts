            // * INTERFACES //
interface Observer{
    name:string;
    update(weatherData: string) : void;
}

interface Subject {

    // Attach an observer to the subject.
    Subscribe(observer: Observer): void;

    // Detach an observer from the subject.
    Unsubscribe(observer: Observer): void;

    // Notify all observers about an event.
    Notify(): void;
}


        //TODO     Clases principales (Subject y Observers)            //
class WeatherStationSubject implements Subject{
    observers: Observer[] = [];
    weatherData: string = "";

    Subscribe(observer: Observer): void {
        this.observers.push(observer);
        console.log(`Nuevo suscriptor pendiente! (${observer.name})\n`);
    }
    Unsubscribe(observer: Observer): void {
        this.observers = this.observers.filter( currentObservers => currentObservers !== observer );
        console.log(`${observer.name} cancelo la suscripcion\n`);
    }

    Notify(): void {
        for (const observer of this.observers) {
            observer.update(this.weatherData);
        }
    }

    SetWeather(weather: string){
        this.weatherData = weather;
        this.Notify()
    }
}

class WeatherApp implements Observer{

    name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    update(weatherData: string): void {
        console.log(`${this.name} detecto un estado meteorologico: ${weatherData}\n`);
    }
}

class WhatsappWeather implements Observer {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    update(weatherData: string): void {
        console.log(`Clima actualizado: ${weatherData}, enviandolo a ${this.name}\n`);
    }

}


        // !       IMPLEMENTACION          //
function observerMain(){
    const weatherStation = new WeatherStationSubject();
    const mikeApp = new WeatherApp("MikeApp")
    const wppApp = new WhatsappWeather('6142413895');

    weatherStation.Subscribe( mikeApp );
    weatherStation.Subscribe( wppApp );
    weatherStation.SetWeather("Lluvioso");

    weatherStation.Unsubscribe( mikeApp );
    weatherStation.SetWeather("Nieve🥶");
    console.log(`\n\n\n\n\n\n\n`);
    
}

observerMain();