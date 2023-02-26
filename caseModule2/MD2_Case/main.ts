import {Category} from "./model/Category";
import {CategoryManager} from "./service/CategoryManager";
import {AccountManage} from "./service/AccountManager";
import {Account} from "./model/Account";
// @ts-ignore
let input = require(`readline-sync`);
let categoryManager = new CategoryManager();
let accountManager = new AccountManage();
let currentAcc:Account;
function loginMenu(){
    let choice;
    do{
        console.log(`
        1. Login
        2. Register
        0. Exit`);
        choice = +input.question("Enter your selection:")
    switch (choice) {
        case 1:
            login();
            break;
        case 2:
            register();
            break;
        }
    }while(choice != 0)
}

function login(){
    console.log(`-----Login-----`);
    let checkLogin = true;
    let inputName = input.question("Enter username: ");
    let inputId = input.question(`Enter id: `);
    for (let i = 0; i < accountManager.listAccount.length; i++) {
        let userName = accountManager.listAccount[i].getUsername();
        let id = accountManager.listAccount[i].getId();
        let password = accountManager.listAccount[i].getPassword();
        if (userName == inputName && inputId == id) {
            checkLogin = false;
            currentAcc = new Account(id,userName,password);
            console.log('login success');
            main();
        }
    }
    if (checkLogin == true) {
        console.log(`tai khoan khong ton tai. vui long nhap lai hoac dang ky moi.
        1. Nhap lai
        2. Dang ky moi
        0. Ve menu chinh`);
        let choice = +input.question(`Nhap lua chon: `);
        if(choice == 1){
            login();
        }else if(choice == 2){
            register()
        }else{
            loginMenu();
        }
    }
}

function register() {
    let flag: boolean = false;
    do {
        let userName = input.question('enter name: ');
        let regex = /^[a-zA-Z\-]+$/;
        let test = regex.test(userName);
        for (let i = 0; i < accountManager.listAccount.length; i++) {
            if (accountManager.listAccount[i].getUsername() == userName) {
                test = false;
                console.log(`acc da ton tai`);
            }
        }
        let userNameAfterCheck: string;
        if (test == false) {
            console.log(`re enter name`)
        } else {
            userNameAfterCheck = userName;
            let flag2: boolean = false;
            do {
                let id = input.question(`nhap id: `);
                regex = /^[a-zA-Z\-]+$/;
                test = regex.test(id);
                for (let i = 0; i < accountManager.listAccount.length; i++) {
                    if (accountManager.listAccount[i].getId() == id) {
                        test = false;
                        console.log(`id da ton tai`);
                    }
                }
                let idAfterCheck:string;
                if(test == false){
                    console.log('nhap lai id');
                }else{
                    idAfterCheck = id;
                    let passwordAfterCheck:string;
                    let flag3:boolean = false;
                    do {
                        let password = input.question(`input pass: `);
                        regex =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{9,}$/;
                        test = regex.test(password);
                        if(test == false){
                            console.log(`re enter pass:`)
                        }else{
                            passwordAfterCheck = password;
                            let account = new Account(idAfterCheck,userNameAfterCheck,passwordAfterCheck);
                            accountManager.add(account);
                            console.log(`dang ky thanh cong`)
                            currentAcc = account;
                            login();
                            flag = true;
                            flag2 = true;
                            flag3 = true;
                        }
                    }while(flag3 == false);
                }
            } while (flag2 == false);
        }
    } while (flag == false);
}
loginMenu()
function main() {
        let choice;
        do {
            console.log(`
        1. Them moi BST
        2. Edit BST 
        3. Delete BST
        4. tim BST
        5. Quan ly tai khoan
        0. Return to login menu`
            )
            choice = +input.question(`nhap lua chon: `)
            switch (choice) {
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    menuAccManager();
                    break;
            }
        } while (choice != 0)
}
function menuAccManager(){
    if(currentAcc.getUsername() == `Quynh Trang` && currentAcc.getId() == `Trang97`){
        console.log(`
         1. Hien thi danh sach tai khoan
         2. Xoa tai khoan
         0. Return to main menu`)
        let choice = +input.question("Nhap lua chon: ")
        if(choice == 1){
            showAccount();
            menuAccManager();
        }else if(choice == 2){
            deleteAccount();
            menuAccManager();
        }if(choice == 0){
            main();
        }
    }else{
        console.log(`Ban phai dang nhap bang tai khoan admin de thuc hien tac vu nay`);
    }
}
function deleteAccount() {
    let id = input.question(`Nhap id cua acc muon xoa: `)
    accountManager.deleteById(id);
}
function showAccount(){
    console.table(accountManager.findAllAccount());
}

