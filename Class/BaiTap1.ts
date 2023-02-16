
enum Gender{
    male = "male",
    female = "female",
    other = "other"
}
class Officer {
    fullName: string;
    age: number;
    gender: Gender;
    address: string;

    constructor(fullName: string, age: number, gender: Gender, address: string) {
        this.fullName = fullName;
        this.age = age;
        this.gender = gender;
        this.address = address;
    }
}
enum Grade{
    grade1 = "Grade1",
    grade2 = "Grade2",
    grade3 = "Grade3",
    grade4 = "Grade4",
    grade5 = "Grade5",
    grade6 = "Grade6",
    grade7 = "Grade7",
    grade8 = "Grade8",
    grade9 = "Grade9",
    grade10 = "Grade10"

}
class Workers extends Officer{
grade:Grade;
constructor(fullName:string,age:number,gender:Gender,address:string, grade:Grade) {
    super(fullName,age,gender,address);
    this.grade = grade;
}
}
class Engineer extends Officer{
    major:string
    constructor(fullName:string,age:number,gender:Gender,address:string,major:string) {
        super(fullName,age,gender,address);
        this.major = major;
    }
}
class Staff extends Officer{
    jobStuff:string
    constructor(fullName:string,age:number,gender:Gender,address:string,jobStuff:string) {
        super(fullName,age,gender,address);
        this.jobStuff = jobStuff;
    }
}
// 	Thêm mới cán bộ.
// 	Tìm kiếm theo họ tên.
// 	Hiện thị thông tin về danh sách các cán bộ.
// 	Thoát khỏi chương trình.
class OfficerManager {
    static officerList: Officer[] = [];
   static add(officer:Officer) {

           OfficerManager.officerList.push(officer);
   }
   static del(name:string){
       let findOfficer = OfficerManager.officerList.find((officer:Officer)=>officer.fullName == name);
       if(findOfficer != undefined){
           let index = OfficerManager.officerList.indexOf(findOfficer);
           OfficerManager.officerList.splice(index,1)
       }
   }
   static setFullName(name:string,newFullName:string){
       let findOfficer = OfficerManager.officerList.find((officer:Officer) => officer.fullName == name);
       if (findOfficer != undefined) {
           findOfficer.fullName = newFullName;
       }
   }
}
let worker1 = new Workers("Nguyen Van A", 20, Gender.male,"Ha Noi", Grade.grade1);
let staff1 = new Staff("Nguyen Thi B", 21, Gender.female, "Ha Noi", "HR");
let engineer1 = new Engineer("Nguyen Van C", 30, Gender.male, "Ha Noi", "Mechanical")
OfficerManager.add(worker1);
OfficerManager.add(staff1);
OfficerManager.add(engineer1);
// console.log(OfficerManager.officerList);
OfficerManager.del("Nguyen Van C");
// console.log(OfficerManager.officerList);
OfficerManager.setFullName("Nguyen Van A", "Nguyen Van A++");
console.log(OfficerManager.officerList);



