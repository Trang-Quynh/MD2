import {Account} from "../model/account";
import {AccountManagement} from "../servike/accountManagement";
import {Computer} from "../model/computer";
import {ComputerManagement} from "../servike/computerManagement";
import {ServiceManagement} from "../servike/serviceManagement";
import {DailyIncome} from "../model/dailyIncome";

let listAccountManagement: AccountManagement = new AccountManagement();
let listComputerManagement: ComputerManagement = new ComputerManagement();
let listServiceManagement: ServiceManagement = new ServiceManagement();
let input = require('readline-sync');
let price = 250;
let priceService = 0;
let currentDate = new Date();
let dailyIncome = new DailyIncome();
dailyIncome.date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
dailyIncome.income = 0;

function account() {
    let menu = `
    ====Billing Software====
    1. Register
    2. Login
    0. Log out
    `
    let choice: string;
    do {
        console.log(menu)
        choice = input.question("Enter selection: ");
        switch (choice) {
            case "1":
                let id1 = +input.question("Enter new user id:   ");
                let name1 = input.question("Enter new user name:   ");
                let pass1 = input.question("Enter new user pass:   ");
                let user = new Account(id1, name1, pass1);
                listAccountManagement.add(user);
                console.log("added account! ")
                break;
            case "2":
                let userName = input.question("Enter user name:   ");
                let userPass = input.question("Enter user pass:   ");
                if (userName == "ha" && userPass == "ha12345") {
                    adminMenu();
                }
                if (userName == name1 && userPass == pass1) {
                    adminMenu();
                } else {
                    console.log("Wrong username or pass, re-enter!!");
                }
                break;
            case "0":
                break;
            default:
                console.log("Wrong, please re-enter");
                break;
        }
    } while (choice != "0");
}

function adminMenu() {
    let menu1 = `
    ------Net shop management menu------
    1. Show list of computers
    2. Add a new machine
    3. Turn on the machine and Add a service
    4. Close the machine and Pay
    5. Edit machine information
    6. Remove a machine from the list
    7. Edit price 
    8. Account Management
    9. Turnover
    0. Exit
    `
    let choice: string;
    do {
        console.log(menu1);
        choice = input.question("Enter selection:   ");
        switch (choice) {
            case "1":
                showComputer();
                break;
            case "2":
                addComputer();
                break;
            case "3":
                openComputer();
                break;
            case "4":
                dailyIncome.income += offComputer();
                break;
            case "5":
                editComputer();
                break;
            case "6":
                deleteComputer();
                break;
            case '7':
                priceEdit();
                break;
            case '8':
                addAccount();
                break;
            case "9":
                turnover();
                break;
            case "0":
                break;
            default:
                console.log("Wrong then re-enter");
                break;
        }
    } while (choice != "0")
}

function showComputer() {
    console.log(listComputerManagement.show());
}

function addComputer() {
    let idAdd = +input.question("Enter new device id:   ");
    if (listComputerManagement.findById(idAdd) == -1 && idAdd >= 0) {
        let nameAdd = input.question("Enter new device name:   ");
        let statusAdd = input.question("Enter machine status:   ");
        if (statusAdd == "off") {
            listComputerManagement.add(new Computer(idAdd, nameAdd, statusAdd));
            let index1 = listComputerManagement.findById(idAdd);
            if (listComputerManagement.listComputer[index1].status == "on") {
                listComputerManagement.listComputer[index1].time.startTime = Date.now();
                showComputer();
            }
        } else if (statusAdd == "on") {
            listComputerManagement.add(new Computer(idAdd, nameAdd, statusAdd));
            let index2 = listComputerManagement.findById(idAdd);
            listComputerManagement.listComputer[index2].time.startTime = Date.now();
            showComputer();
        } else {
            console.log("Machine state can only be \"on\" or \"off\", re-enter")
        }

    } else if (idAdd >= 0) {
        console.log("Id already exists, please re-enter!");
    } else {
        console.log("Id is not satisfied, please re-enter!");
    }
}

function deleteComputer() {
    let idDelete = +input.question("Enter the id you want to delete:  ");
    if (listComputerManagement.findById(idDelete) == -1 && idDelete >= 0) {
        console.log("Id does not exist");
    } else {
        let menuDelete = `
    You may want to delete ?
    1. Delete
    0. Exit
    `
        let choice: string;
        do {
            console.log(menuDelete);
            choice = input.question("Enter selection:   ");
            switch (choice) {
                case "1":
                    listComputerManagement.delete(idDelete);
                    showComputer();
                    console.log("Deleted successfully!");
                    break;
                case "0":
                    break;
            }
        } while (choice != "0");
    }
}

function editComputer() {
    let idEdit = +input.question("Enter the id you want to edit:   ");
    if (listComputerManagement.findById(idEdit) == -1 && idEdit > 0) {
        console.log("The id you want to fix does not exist!");
    } else {
        let nameEdit = input.question(" Enter a new name:   ");
        let statusEdit = input.question("Enter a new status:   ");
        let index3 = listComputerManagement.findById(idEdit);
        if (statusEdit == "on") {
            if (listComputerManagement.listComputer[index3].status == "on") {
                console.log("machine is online!!")
            } else if (listComputerManagement.listComputer[index3].status == "off") {
                listComputerManagement.listComputer[index3].status = "on"
                listComputerManagement.edit(idEdit,new Computer(idEdit,nameEdit,statusEdit));
                listComputerManagement.listComputer[index3].time.startTime = Date.now();
                // showComputer();
                return Date.now();
                return showComputer();
            }
        } else if (statusEdit == "off") {
            if (listComputerManagement.listComputer[index3].status == "on"){
                listComputerManagement.listComputer[index3].status = "off";
                listComputerManagement.edit(idEdit,new Computer(idEdit,nameEdit,statusEdit));
                listComputerManagement.listComputer[index3].time.endTime = Date.now();
                showComputer();
                console.log("Closed the second machine:   " + (index3 + 1));
                let totalTime = (listComputerManagement.listComputer[index3].time.endTime - listComputerManagement.listComputer[index3].time.startTime) / 60000;
                let totalMoney = totalTime * price + priceService;
                console.log("Used Time:   " + totalTime + " minute ");
                console.log("Total amount:   " + totalMoney + "USD");
                return totalMoney;
            }
        } else {
            console.log("Machine state can only be \"on\" or \"off\", re-enter");
        }
    }
}