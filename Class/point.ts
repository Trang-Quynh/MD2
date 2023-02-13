class Point2D{
    x:number;
    y:number;
    xy = {};
    constructor(x:number,y:number) {
        this.x = x;
        this.y = y;
    }
    getX():number{
        return this.x;
    }
    getY():number{
        return this.y;
    }
    setX(x:number){
        this.x = x;
    }
    setY(y:number){
        this.y = y;
    }
    getXY():object{
        return this.xy = {x: this.x, y: this.y}
    }
    setXY(x:number,y:number):void{
       this.x = x;
       this.y = y;
    }
}

let point2D = new Point2D(5,5);

point2D.setXY(10,10);
console.log(point2D.getXY())
