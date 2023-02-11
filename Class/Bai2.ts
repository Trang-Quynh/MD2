class Circle{
    color:string;
    radius: number;
    constructor(color:string,radius:number) {
        this.color = color;
        this.radius = radius;
    }
}

let circleList: Circle[] = [];
circleList.push(new Circle("green",10));
circleList.push(new Circle("pink",15));
circleList.push(new Circle("yellow",20));
function showCircle(circle:Circle):void{
    console.log(`${circle.color} ${circle.radius}`);
}

console.log(circleList.forEach(showCircle))
