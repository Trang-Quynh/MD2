class Employee{
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
    del(emId:number){
        // let em = EmployeeManager.employeeList.find((employee:Employee) => employee.id  === emId);
        // let index = EmployeeManager.employeeList.indexOf(em);'
        let index=-1;
        for (let i = 0; i < EmployeeManager.employeeList.length; i++) {
            if(EmployeeManager.employeeList[i].id == emId) {
                index = i;
            }
        }
        EmployeeManager.employeeList.splice(index,1);
    }
    // del(emId:number) {
    //     let emp = EmployeeManager.employeeList.find((employee: Employee) => employee.id == emId);
    //     if (emp != undefined) {
    //         let index = EmployeeManager.employeeList.indexOf(emp)
    //         console.log(index)
    //         EmployeeManager.employeeList.splice(index,1);
    //     }
    // }
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
EmployeeManager1.del(123);
console.log(EmployeeManager.employeeList)
