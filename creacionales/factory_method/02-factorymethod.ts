 interface Hamburger{
    prepare():void;
}

class ChickenHamburger implements Hamburger{
    prepare(): void {
        console.log('Preparando hamburguesa de pollo')
    }
}

class BeefHamburger implements Hamburger{
    prepare(): void {
        console.log('Preparando hamburguesa de res')
    }
}

class BeanHamburger implements Hamburger{
    prepare(): void {
        console.log('Preparando hamburguesa de frijolitos')
    }
}

//Una clase abstracta ayuda a crear otras clases
//No se pueden crear instancias de clases abstractas
abstract class Restaurant{
    abstract createHamburger(): Hamburger;
    orderHamburger():void{
        const hamburger = this.createHamburger();
        hamburger.prepare();
    }
}

class ChickenRestaurant extends Restaurant{
    createHamburger(): Hamburger {
        return new ChickenHamburger();
    }
}

class BeefRestaurant extends Restaurant{
    createHamburger(): Hamburger {
        return new BeefHamburger();
    }
}

class BeanRestaurant extends Restaurant{
    createHamburger(): Hamburger {
        return new BeanHamburger();
    }
}

function main(){
    let restaurant: Restaurant;
    const burgerType = prompt('Que tipo de hamburguesa quieres? ( chicken/beef/bean )')
    switch (burgerType) {
        case 'chicken':
            restaurant = new ChickenRestaurant();
            break;
        case 'beef':    
            restaurant = new BeefRestaurant();
            break;
        case 'bean':    
            restaurant = new BeanRestaurant();
            break;
    
        default:
            throw new Error('Opcion invalida');
    }

    restaurant.orderHamburger();
}

main();