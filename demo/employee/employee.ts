export type Gender = "Nam"|"Female"|"Other"
export class Employee {
    private id: number;
    private fullName: string;
    private gender: Gender;
    private age: number;

    constructor(id: number, fullName: string, gender: Gender, age: number) {
        this.id = id;
        this.fullName = fullName;
        this.gender = gender;
        this.age = age;
    }

    get getId(): number {
        return this.id;
    }

    set setId(id: number) {
        this.id = id
    }

    get getFullName(): string {
        return this.fullName;
    }

    set setFullName(fullName: string) {
        this.fullName = fullName;
    }
    get getGender(): string {
        return this.gender;
    }

    set setGender(gender: Gender) {
        this.gender = gender;
    }
    get getAge(): number {
        return this.age;
    }

    set setAge(age:number) {
        this.age = age;
    }

}

