import {EmployeeManager} from "./manager/manager";
import {Worker} from "./employee/worker";

// @ts-ignore
let input = require('readline-sync');
let employeeManager = new EmployeeManager();
function showMainMenu() {
    let choice = -1;
    do {
        console.log(
            `-----Main Menu-----
       1. Add
       2. DisplayAll
       3. Update
       4. Delete
       0. Exit
       `
        )
        choice = +input.question(`Enter your choice: `);
        switch (choice) {
            case 1:
                addWorker()
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
        }
    }while(choice != 0);
}

function addWorker(){
    console.log(`-----Add Menu-----`)
    let id = +input.question('Enter your ID: ');
    let fullName = input.question('Enter your name: ');
    let gender = input.question('Enter your gender: ');
    let age = +input.question('Enter your age: ');
    let level = +input.question('Enter your level: ')
    let worker = new Worker(id,fullName,gender,age,level);
    employeeManager.add(worker);
    console.log(`Worker ${worker.getFullName} was successfully added`)
}
showMainMenu()


