 enum Gender {
    Male,
    Female,
     Other
}
class Employee{
    fullName:string;
    gender:Gender;
    birthday: string;
    email:string;
    phoneNumber?:string;
    constructor(fullName:string,gender:Gender,birthday:string,
                email:string,phoneNumber:string) {
        this.fullName = fullName;
        this.gender = gender;
        this.birthday = birthday;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
function display(employee:Employee){
    console.log(employee.fullName + employee.gender + employee.birthday + employee.email + employee.phoneNumber)
}
function del(arr:Employee[],index:number){
    arr.splice(index,1)
    return arr;
}
function add(arr:Employee[],employee:Employee){
    arr.push(employee)
    return arr;
}
let employee2 = new Employee("Nguyen Van B",Gender.Male,"20-02-2000","nguyenvanb@gmail.com","0123456788");
let employee1 = new Employee("Nguyen Van A",Gender.Male,"20-01-2000","nguyenvana@gmail.com","0123456789");
let employeeList:Employee[] = [];
add(employeeList,employee1)
add(employeeList,employee2)
 del(employeeList,1);
console.log(employeeList)
