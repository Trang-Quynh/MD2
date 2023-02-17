import {Employee, Gender} from "./employee";

export class Staff extends Employee{
    private work:string;
    constructor(id: number, fullName: string, gender: Gender, age: number,work:string) {
        super(id,fullName,gender,age);
        this.work = work;
    }
    get getWork():string{
        return this.work;
    }
    set setWork(work:string){
        this.work = work;
    }
}