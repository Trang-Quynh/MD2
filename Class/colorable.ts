export class Shape {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    show(): string {
        return `I am a shape. My name is ${this.name}`;
    }
    getArea(){

    }
}
interface Colorable{
    howToColor(color:string):string
}

class Circle extends Shape {
    radius: number;

    constructor(name: string, radius: number) {
        super(name);
        this.radius = radius;
    }

    getArea(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }
}

class Square extends Shape implements Colorable{
    width:number;
    color:string;
    constructor(name: string,
                width: number,color:string) {
        super(name);
        this.width = width;
        this.color = color;
    }

    getArea(): number {
        return Math.pow(this.width, 2);
    }
    setColor(newColor:string){
        this.color = newColor;
    }
    howToColor(): string {
        return "Color of all four sides is " + this.color;
    }
}
let shapeList :Shape[] = [];
let circle1 = new Circle("circle1", 2);
let square1 = new Square("square1",2, "green")
shapeList.push(circle1);
shapeList.push(square1);
square1.setColor("red")
shapeList.forEach((shape)=>{console.log(shape.getArea())
    if(shape instanceof Square){
        console.log(shape.howToColor())
      }
    }
);

