interface TaxStrategy{
    calculateTax(amount: number): number;
}

class USATaxStrategy implements TaxStrategy{
    calculateTax(amount: number): number {
        return amount * 0.1
    }
}

class CanadaTaxStrategy implements TaxStrategy{
    calculateTax(amount: number): number {
        return amount * 0.13;
    }
}

class GermanyTaxStrategy implements TaxStrategy {
    calculateTax(amount: number): number {
        return amount * 0.19;
    }
}

class TaxCalculator{
    private taxCalculatorMethod: TaxStrategy;

    constructor(taxCalculatorMethod: TaxStrategy) {
        this.taxCalculatorMethod = taxCalculatorMethod;
    }

    CalculateTax(amount:number):number{
        return this.taxCalculatorMethod.calculateTax(amount);
    }

    SetTaxCalculatorMethod(newTaxCalculatorMethod: TaxStrategy){
        this.taxCalculatorMethod = newTaxCalculatorMethod;
    }
}

function main(){
    const taxCalculator = new TaxCalculator(new GermanyTaxStrategy);
    const amount = 1200;
    console.log('Usando estrategia de Germany:' + taxCalculator.CalculateTax(amount));  
    taxCalculator.SetTaxCalculatorMethod(new USATaxStrategy)
    console.log('Usando estrategia de USA:' + taxCalculator.CalculateTax(amount));  
    taxCalculator.SetTaxCalculatorMethod(new CanadaTaxStrategy)
    console.log('Usando estrategia de Canada:' + taxCalculator.CalculateTax(amount));  
}

main();