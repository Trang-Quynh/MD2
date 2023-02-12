class Employee{
    firstname:string;
    lastname:string;
    birthday:string;
    address:string;
    position:string;
    constructor(firstname:string,lastname:string,
                birthday:string,address:string,position:string) {
   this.firstname = firstname;
   this.lastname = lastname;
   this.birthday = birthday;
   this.address = address;
   this.position = position;
    }
}
class EmployeeManager {
    static employeeList: Employee[] = [];
    add(employee:Employee){
        EmployeeManager.employeeList.push(employee);
    }
    displayDetail(index:number){
        console.log(EmployeeManager.employeeList[index])
    }
    del(index:number){
        EmployeeManager.employeeList.splice(index,1)
    }
    display(){
        console.log(EmployeeManager.employeeList)
    }
}
let employee1 = new Employee("sakura",'momoko','1960','Shimizu','student');
let employee2 = new Employee("Hideko",'hanawa','1960','Shimizu','student');

let EmployeeManager1 = new EmployeeManager()
EmployeeManager1.add(employee1);
EmployeeManager1.add(employee2);
// console.log(EmployeeManager.employeeList);
EmployeeManager1.del(1);
console.log(EmployeeManager.employeeList)