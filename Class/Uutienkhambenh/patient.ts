class Patient{
    name:string;
    code:number;
    constructor(name:string,code:number) {
        this.name = name;
        this.code = code
    }
}
class Queue {
    static patientList: Patient[] = [];

    static addPatient(patient: Patient) {
        this.patientList.push(patient);
    }

    static showPatientList() {
        console.table(this.patientList);
    }

    static sortPatientByCode() {
        this.patientList.sort((patientA, patientB) => {
            let codeA = patientA.code;
            let codeB = patientB.code;

            let comparison = 0;
            if (codeA < codeB) {
                comparison = -1;
            }
            return comparison;
        });
        return this.patientList;
    }
    static examine(){
        console.log(this.sortPatientByCode().shift());
        console.log(`remaining:`)
        console.table(this.patientList);
    }
}
let smith = new Patient("Smith",5);
let jones = new Patient("Smith",4);
let fehrenbach = new Patient("Fehrenbach",6);
let brown= new Patient("Brown",1);
let ingram = new Patient("Ingram",1);
Queue.addPatient(smith);
Queue.addPatient(jones);
Queue.addPatient(fehrenbach);
Queue.addPatient(brown);
Queue.addPatient(ingram);
// Queue.showPatientList();
// Queue.sortPatientByCode();
Queue.examine();
Queue.examine();

