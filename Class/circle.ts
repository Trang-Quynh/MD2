class Circle{
    radius:number;
    color:string;
    constructor(radius:number,color:string) {
        this.radius = radius;
        this.color = color;
    }
    getColor():string{
        return this.color;
    }
    getRadius():number{
        return this.radius;
    }
    setColor(color:string){
        this.color = color;
    }
    setRadius(radius:number){
        this.radius = radius;
    }
    getArea():number{
        return Math.PI*Math.pow(this.radius,2)
    }
}
class Cylinder extends Circle{
    height:number;
    constructor(height:number,radius:number,color:string) {
        super(radius,color);
        this.height = height;
    }
    getVolume(){
        return this.height*super.getArea()
    }
}
let cylinder = new Cylinder(5,2,"green");
console.log(cylinder.getVolume())