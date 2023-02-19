// Các thí sinh dự thi đại học bao gồm các thí sinh thi khối A, B, và khối C. C
// Các thí sinh cần quản lý các thông tin sau: Số báo danh, họ tên, địa chỉ, mức ưu tiên.
//     Thí sinh thi khối A thi các môn: Toán, Lý, Hoá.
//     Thí sinh thi khối B thi các môn: Toán, Hoá, Sinh.
//     Thí sinh thi khối C thi các môn: Văn, Sử, Địa.
//     Yêu cầu 1: Xây dựng các lớp để quản lý các thi sinh dự thi đại học.
//     Yêu cầu 2: Xây dựng lớp TuyenSinh có các chức năng:
//     	Thêm mới thí sinh.
// 	Hiện thị thông tin của thí sinh và khối thi của thí sinh.
// 	Tìm kiếm theo số báo danh.
// 	Thoát khỏi chương trình.
enum Priority{
    level1 = " Priority level 1",
    level2 = "Priority level 2",
    level3 = "Priority level 3",

}
enum Block{
    blockA = "Maths, Physics, Chemistry",
    blockB = "Maths, Chemistry, Biology",
    blockC = "Literature, History, Geography",

}
class Candidate{
    candidateNumber:string;
    fullName:string;
    address:string;
    priority:Priority;
    block:Block;

    constructor(candidateNumber:string, fullName:string, address:string, priority:Priority, block:Block) {
        this.candidateNumber = candidateNumber;
        this.fullName = fullName;
        this.address = address;
        this.priority = priority;
        this.block = block;
    }
}
let candidate1 = new Candidate("A123", "Nguyen Van A", "Ha Noi", Priority.level1, Block.blockA);
let candidate2 = new Candidate("B123", "Nguyen Van B", "Ha Noi", Priority.level2, Block.blockB);
let candidate3 = new Candidate("C123", "Nguyen Van C", "Ha Noi", Priority.level3, Block.blockC);

class Enrollment {
    static candidateList: Candidate[] = [];

    static add(candidate: Candidate) {
        this.candidateList.push(candidate);
    }

    static findCandidateNumberByName(candidateName: string) {
        let index = -1;
        for (let i = 0; i < this.candidateList.length; i++) {
            if (this.candidateList[i].fullName == candidateName) {
                index = i;
                console.log(this.candidateList[index].candidateNumber);
            }
        }
    }
    static displayInfor(candidateName:string){
        let findCandidate = this.candidateList.find((candidate:Candidate)=>candidate.fullName == candidateName);
        if(findCandidate != undefined){
            let index = this.candidateList.indexOf(findCandidate);
            return this.candidateList[index];
        }
    }
}
Enrollment.add(candidate1);
Enrollment.add(candidate2);
Enrollment.add(candidate3);
// console.log(Enrollment.candidateList);
// Enrollment.findCandidateNumberByName("Nguyen Van A");
console.log(Enrollment.displayInfor("Nguyen Van A"));

