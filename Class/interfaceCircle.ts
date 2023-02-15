class Circle{
    private radius:number;
    constructor(radius:number) {
        this.radius = radius;
    }
    getRadius():number{
        return this.radius;
    }
    setRadius(radius:number):void{
        this.radius = radius;
    }
    toString():string{
        return `A Circle with radius ${this.getRadius()}`
    }
}
interface Comparable{
compareTo(o:object):number;
}
class ComparableCircle extends Circle implements Comparable{
    constructor(radius:number) {
        super(radius);
    }
    compareTo(o: ComparableCircle): number {
        if(this.getRadius()>o.getRadius()) return 1;
        else if(this.getRadius()<o.getRadius()) return -1;
        else return 0;
    }
}
let comparableCircle1 = new ComparableCircle(4);
let comparableCircle2 = new ComparableCircle(5);
let a = comparableCircle1.compareTo(comparableCircle2);
console.log(a)