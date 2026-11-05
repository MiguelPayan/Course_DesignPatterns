/* 
! Patron Visitor
* Es util cuando necesitas añadir nuevas operaciones a 
* clases estables sin cambiar su codigo
*/

interface Visitor{
    visitRollerCoaster(rollerCoaster: RollerCoaster): void;
    visitHauntedHouse(hauntedHouse: HauntedHouse): void;
    visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction{
    accept(visitor: Visitor): void;
    getPrice(): number;
}

class RollerCoaster implements Attraction{
    private price: number = 50;

    getPrice(): number {
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitRollerCoaster(this);
    }

}
class HauntedHouse implements Attraction{
    private price: number = 40;

    getPrice(): number {
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitHauntedHouse(this);
    }

}
class FerrisWheel implements Attraction{
    private price: number = 30;

    getPrice(): number {
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitFerrisWheel(this);
    }

}

// Visitors
class ChildVisitor implements Visitor{
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        console.log(`Niño en montaña rusa: Precio con descuento de $${rollerCoaster.getPrice() * 0.5}`);
    }

    visitHauntedHouse(hauntedHouse: HauntedHouse): void {
        console.log(`Niño en casa del terror: Precio con descuento de $${hauntedHouse.getPrice() * 0.7}`);
    }

    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(`Niño en rueda de la fortuna: Precio con descuento de $${ferrisWheel.getPrice() * 0.6}`);
    }
}

class AdultVisitor implements Visitor{
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        console.log(`Adulto en montaña rusa: Precio de $${rollerCoaster.getPrice()}`);
    }

    visitHauntedHouse(hauntedHouse: HauntedHouse): void {
        console.log(`Adulto en casa del terror: Precio de $${hauntedHouse.getPrice()}`);
    }

    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(`Adulto en rueda de la fortuna: Precio de $${ferrisWheel.getPrice()}`);
    }
}
class SeniorVisitor implements Visitor{
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        console.log(`Adulto en montaña rusa: Precio con descuento de $${rollerCoaster.getPrice() * 0.85}`);
    }

    visitHauntedHouse(hauntedHouse: HauntedHouse): void {
        console.log(`Adulto en casa del terror: Precio con descuento de $${hauntedHouse.getPrice() * 0.85}`);
    }

    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(`Adulto en rueda de la fortuna: Precio con descuento de $${ferrisWheel.getPrice() * 0.85}`);
    }
}

function main(){
 const attractions: Attraction[] = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWheel(),
 ]

 console.log(`Precios`);
 console.log(`Montaña rusa: ${attractions[0].getPrice()} `);
 console.log(`Casa del terror: ${attractions[1].getPrice()} `);
 console.log(`Rueda de la fortuna: ${attractions[2].getPrice()} `);


 console.log('\nVisitante niño ');
 const childVisitor = new ChildVisitor();
 attractions.forEach( attraction => attraction.accept(childVisitor))

 console.log('\nVisitante adulto ');
 const adultVisitor = new AdultVisitor();
 attractions.forEach( attraction => attraction.accept(adultVisitor))
 
 console.log('\nVisitante adulto mayor ');
 const seniorVisitor = new SeniorVisitor();
 attractions.forEach( attraction => attraction.accept(seniorVisitor))
}

main();