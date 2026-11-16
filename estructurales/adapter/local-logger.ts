export class LocalLogger {
    constructor(
        private file:string
    ){
    }

    writeLog(msg: string): void{
        console.log(`[${this.file} log]: ${msg}`)
    }
    writeError(msg: string): void{
        console.log(`[${this.file} error]: ${msg}`)
    }
    writeWarning(msg: string): void{
        console.log(`[${this.file} warning]: ${msg}`)
    }
}