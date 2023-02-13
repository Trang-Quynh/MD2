class Shape{
    private color:string;
    private filled:boolean = true;
    constructor(color:string,filled:boolean) {
        this.color = color;
        this.filled = filled;
    }
    public getColor():string{
        return this.color;
    }
    public getFilled():boolean{
        return this.filled;
    }
    public setColor(newColor:string):void{
        this.color = newColor;
    }
    public setFilled(newFilled:boolean):void{
        this.filled = newFilled;
    }
    public toString():string{
        return `A Shape width color of ${this.color} and ${this.getFilled()?"filled":"not filled"} `;
    }
}
class Circle extends Shape {
    radius: number;

    constructor(color: string, filled: boolean, radius: number) {
        super(color, filled);
        this.radius = radius
    }

    get getRadius(): number {
        return this.radius;
    }
    set setRadius(newRadius: number) {
        this.radius = newRadius;
    }
    //c = 2r*pi
    // s = pi*r^2
    getPerimeter(): number {
        return Math.PI * this.radius * 2;
    }
    getArea() {
        return Math.PI * Math.pow(this.radius, 2)
    }
    public toString():string{
        return `A circle with radius ${this.radius}, which is a subclass of ${super.toString()}`
    }
}
class Rectangle extends Shape{
    width:number;
    length:number;
    constructor(color: string, filled: boolean,width:number,length:number){
        super(color, filled);
        this.width = width;
        this.length = length;
    }
    getWidth():number{
        return this.width;
    }
    getLength():number{
       return this.length;
    }
    setWidth(width:number){
        this.width = width;
    }
    setLength(length:number){
        this.length = length;
    }
    getArea():number{
        return this.width*this.length;
    }
    getPerimeter():number{
        return (this.width + this.length)*2;
    }
    toString(){
        return `A rectangle with width ${this.width} and ${this.length}, which is a subclass of ${super.toString()} `
    }
}
class Square extends Rectangle{
    side:number;
    constructor(color: string, filled: boolean,side:number) {
        super(color,filled,side,side);
    }
    getSide():number{
        return this.getWidth();
    }
    setSide(side:number){
        this.setWidth(side);
        this.setLength(side)
    }
    toString(){
        return `A square with side ${this.side}, which is a subclass of ${super.toString()}`
    }
}
let square: Square = new Square("yellow", true, 5.8);
console.log(square.getSide())