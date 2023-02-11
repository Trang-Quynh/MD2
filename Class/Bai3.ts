enum Gender{
    Male,
    Female,
    Other
}
class Employee{
    fullName: string = "";
    gender:Gender=Gender.Other;
    dateOfBirth?:Date;
    email:string='';
    phoneNumber:string='';
    constructor(fullName:string,gender:Gender,dateOfBirth:Date,email:string,phoneNumber:string) {
    this.fullName = fullName;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.phoneNumber = phoneNumber;
    }
}
let employeeList:Employee[]=[];
employeeList.push(new Employee("Nguyen Van A",Gender.Male,new Date("1900-09-19"),"anguyen@gmail.com","0123456789"));
employeeList.push(new Employee("Tran Thi A",Gender.Female,new Date(1991-10-12),"btran@gmail.com","0123456789"));
function showEmployee(employee:Employee){
    console.log(employee)
}
employeeList.forEach(showEmployee);
