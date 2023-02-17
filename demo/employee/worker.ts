import {Employee, Gender} from "./employee";

export class Worker extends Employee{
    private level:number;
    constructor(id: number, fullName: string, gender: Gender, age: number,level:number) {
        super(id,fullName,gender,age);
        this.level = level;
    }
    get getLevel():number{
        return this.level;
    }
    set setLevel(level:number){
        this.level = level;
    }
}