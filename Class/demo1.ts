class Employee {
    id:number;
    firstname:string;
    lastname:string;
    birthday:string;
    address:string;
    position:string;
    constructor(id:number,firstname:string,lastname:string,
                birthday:string,address:string,position:string) {
        this.id = id;
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
    find(emId:any) {

        let emp = EmployeeManager.employeeList.find((employee: Employee) => employee.id == emId);
        if (emp != undefined) {
            let index = EmployeeManager.employeeList.indexOf(emp)
            console.log(index)
            EmployeeManager.employeeList.splice(index,1);
        }
    }
    displayDetail(index:number){
        console.log(EmployeeManager.employeeList[index])
    }
    display(){
        console.log(EmployeeManager.employeeList)
    }
}
let employee1 = new Employee(123,"sakura",'momoko','1960','Shimizu','student');
let employee2 = new Employee(124,"Hideko",'hanawa','1960','Shimizu','student');

let EmployeeManager1 = new EmployeeManager()
EmployeeManager1.add(employee1);
EmployeeManager1.add(employee2);
// console.log(EmployeeManager.employeeList);
EmployeeManager1.find(123);
console.log(EmployeeManager.employeeList)
