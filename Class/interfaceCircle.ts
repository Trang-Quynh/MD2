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

}