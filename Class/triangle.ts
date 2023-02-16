class Shape{
    name:string;
    color:string
    constructor(name:string,color:string) {
    this.name = name;
    this.color = color;
    }
}
class Triangle extends Shape{
    side1:number;
    side2:number;
    side3:number;
    constructor(name:string,color:string,side1: number, side2:number,side3:number) {
        super(name,color);
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }
    getSide1():number{
        return this.side1
    }
    getSide2():number{
        return this.side2
    }
    getSide3():number{
        return this.side3
    }
    getArea(){
        let p = (this.side1 + this.side2 + this.side3)/2;
        return Math.sqrt(p*(p-this.side1)*(p-this.side2)*(p-this.side3))
    }
    getPerimeter(){
        return this.side1 + this.side2 + this.side3;
    }
}
let triangle = new Triangle("triangle","green",3,4,5)
console.log(triangle);
console.log(triangle.getArea())
