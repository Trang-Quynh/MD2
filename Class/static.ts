class Instructor {
    name:string;
    role:string;
    constructor({name = "",role = ""} = {}) {
        this.name = name;
        this.role = role;
    }
    renderDetails(){
        console.log(`${this.name} - ${this.role}`)
    }
    static helloWorld(){
        console.log('Hi there');
    }
    static canTeach(instructor:Instructor){
return (instructor.role === "Classroom");
    }
}
let juniorInstructor = new Instructor({name: 'Brian',role:'Assistant'});
let seniorInstructor = new Instructor({name:'Alice',role:'Classroom'});
console.log(Instructor.canTeach(juniorInstructor));
console.log(Instructor.canTeach(seniorInstructor));