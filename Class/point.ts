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

class Point3D extends Point2D{
    z: number;
    constructor(x:number, y:number,z:number ){
        super(x,y)
        this.z = z;
    }
    getZ():number{
        return this.z;
    }
    setZ(z:number):void{
        this.z = z;
    }
    getXYZ():object{
       let xyz = {x:this.x, y:this.y, z:this.z}
        return xyz;
    }
    setXYZ(x:number,y:number,z:number){
        this.x = x;
        this.y = y;
        this.z = z
    }

}
let point3D = new Point3D(5,5,5);
console.log(point3D.getXYZ());
