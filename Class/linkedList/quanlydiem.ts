// var str = 'Some very long string';
// if(str.length > 10) str = str.substring(0,10);
class Student<T>{
    name:string;
    score:number;
    next:Student<T>|null = null;
    constructor(name:string,score:number) {
        this.name = name;
        this.score = score;
    }
    readStudent():any|null{
        return `Name: ${this.name} - Score: ${this.score}`;
    }
}
class LinkedList<T>{
    head: Student<T>|null;
    tail: Student<T>|null;
    size: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    insertFirstStudent(name:string,score:number){
        let student = new Student(name,score);
        student.next = this.head;
        this.head = student;
        if(!this.tail){
            this.tail = student;
        }
        this.size++;
    }
    insertLastStudent(name:string,score:number){
        if(!this.tail){
            this.insertFirstStudent(name,score)
        }
        let student = new Student(name,score);
        if(this.tail != null)
        this.tail.next = student;//Next của đuôi cũ là node mới
        this.tail = student;// Đuôi mới sẽ là node
        this.size++;
    }
    getSize():number{
        return this.size;
    }
    showList(){
        let listStudent:any[] = [];
        let currentStudent:Student<T>|null = this.head;
        while(currentStudent != null){
            listStudent.push(currentStudent);
            currentStudent = currentStudent.next;
        }
        console.table(listStudent);
    }
    totalStudentsFail(){
        let count = 0;
        let listStudentFail:any[] = [];
        let currentStudent = this.head;
        while(currentStudent !== null) {
            if (currentStudent.score <= 5) {
                listStudentFail.push(currentStudent.readStudent());
                count++;
            }
            currentStudent = currentStudent.next;
        }
        console.log(count)
        console.log(listStudentFail);
    }
    listStudent(){
        let listStudent:any[] = [];
        let currentStudent = this.head;
        while(currentStudent !== null) {
                listStudent.push(currentStudent);
                currentStudent = currentStudent.next;
            }
            return listStudent;
        }
    sortListStudent(){
    this.listStudent().sort((patientA, patientB) => {
        let codeA = patientA.code;
        let codeB = patientB.code;

        let comparison = 0;
        if (codeA < codeB) {
            comparison = 1;
        }
        return comparison;
    });
    return this.listStudent();
    }
    listStudentMaxScore(num:number){
        for (let i = this.sortListStudent().length - 1 ; i >= num; i--) {
            console.log(this.sortListStudent()[i])
        }
    }
    findByName(inputName:string){
        for (let i = 0; i < (this.listStudent()).length; i++) {
            let findStudent = (this.listStudent())[i];
            if((this.listStudent())[i].name === inputName){
                console.log(1)
                return findStudent;
            }
        }
        // let findStudent = this.listStudent().find(student => student.name == inputName);
        // return findStudent;
    }
}
let linkedList = new LinkedList();
linkedList.insertFirstStudent("Nguyen Van A",6);
linkedList.insertFirstStudent("Nguyen Van B",5);
linkedList.insertFirstStudent("Nguyen Van C",4);
linkedList.insertFirstStudent("Nguyen Van D",2);
linkedList.listStudent()
// linkedList.sortListStudent()
// linkedList.listStudentMaxScore(2);
console.log(linkedList.findByName("Nguyen Van A"));
// linkedList.showList();
// linkedList.totalStudentsFail();



