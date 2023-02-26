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
        let regex = /^[a-z A-Z\-]+$/;
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
                regex = /^[a-z A-Z\-]+$/;
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

function main() {
        let choice;
        do {
            console.log(`
        1. Them BST
        2. Edit BST 
        3. Delete BST
        4. tim BST
        5. Quan ly tai khoan
        0. Return to login menu`
            )
            choice = +input.question(`nhap lua chon: `)
            switch (choice) {
                case 1:
                    addCategory();
                    break;
                case 2:
                    editCategory();
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
function addCategory(){
    let flag:boolean = false;
    do{
        let id = input.question(`Input id (nhap so, nhap bao nhieu so cung dc) : `)
        let regex = /^[0-9]+$/;
        let testCategoryId = regex.test(id);
        let categoryIdAfterCheck:number;
        for (let i = 0; i < categoryManager.getCategory().length; i++) {
            if(categoryManager.getCategory()[i].getId() == id){
                testCategoryId = false;
                console.log(`Id da ton tai`);
            }
        }
        if(testCategoryId == false){
            console.log(`Nhap lai id: `)
        }else{
            categoryIdAfterCheck = id;
            let flag2: boolean = false;
            do {
                let categoryName = input.question(`Nhap category name nhap chu cai co space: `);
                regex = /^[a-z A-Z]+$/;
                let testCategoryName = regex.test(categoryName);
                let categoryNameAfterCheck:string;
                for (let i = 0; i < categoryManager.getCategory().length; i++) {
                    if (categoryManager.getCategory()[i].getName() == categoryName) {
                        testCategoryName = false;
                        console.log(`Category name da ton tai`);
                    }
                }
                    if(testCategoryName == false){
                        console.log(`nhap lai:`)
                    }else{
                        categoryNameAfterCheck = categoryName;
                        let creator = currentAcc;
                        let category = new Category(categoryIdAfterCheck,categoryNameAfterCheck,creator);
                        categoryManager.addCategory(category);
                        console.log(`Them thanh cong`);
                        flag = true;
                        flag2 = true;
                    }
                } while(flag2 == false)
        }
    }while(flag == false)
}
function editCategory(){
    let choice;
    do{
        console.log(`
        1. Hien thi category cua ban
        2. Them sach vao category
        3. Sua sach
        4. Xoa sach
        0. return to main menu`);
        choice = +input.question(`Nhap lua chon: `)
        switch (choice){
            case 1:
                displayCategoryOfCurrenAcc();
                break;
            case 2:
                break
            case 3:
                break;
            case 4:
                break;
        }
    }while(choice != 0);
}
// hien thi category da tao cua thang current acc
function displayCategoryOfCurrenAcc(){
    console.log(`-------Ds category of your acc------`)
    let menu = '';
    let count = 0;
    for (let i = 0; i < categoryManager.getCategory().length; i++) {
        if(categoryManager.getCategory()[i].getCreator() == currentAcc){
            count++;
            menu += `${count}. Category Name: ${categoryManager.getCategory()[i].getName()}
            Category Id: ${categoryManager.getCategory()[i].getId()}
            Creator: ${categoryManager.getCategory()[i].getCreator().getUsername()}
            Number of book: ${categoryManager.getCategory()[i].getNumberOfBook()}\n`;
        }
    }
    console.log(menu);
    console.log(`0. Exit`)
    let choice = +input.question("Nhap lua chon: ");
    let count2 = 0;
    if(choice == 0){
        main();
    }else{
        for (let i = 0; i < categoryManager.getCategory().length; i++) {
            if(categoryManager.getCategory()[i].getCreator() == currentAcc){
                count2++;
                if(choice == count2){
                    let selectedCategory = categoryManager.getCategory()[i];
                    console.log(selectedCategory)
                    return;
                }
            }
        }
    }
}



loginMenu();



