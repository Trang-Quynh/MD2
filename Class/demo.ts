class Vehicle{
    public name:string;
    public seat:number;
    constructor(name,seat) {
        this.name = name;
        this.seat = seat
    }
    get getName(){
        return this.name
    }
    get getSeat(){
        return this.seat;
    }
}
class Taxi extends Vehicle{
    public lisencePlate:string;
    constructor(name,seat,lisencePlate){
        super(name,seat);
        this.lisencePlate = lisencePlate;
    }
    get getlisencePlate(){
        return this.lisencePlate;
    }
}