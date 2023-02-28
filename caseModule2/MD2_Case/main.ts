import {Category} from "./model/Category";
import {CategoryManager} from "./service/CategoryManager";
import {AccountManage} from "./service/AccountManager";
import {Account} from "./model/Account";
import {Book} from "./model/Book";
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
        4. tim BST (tim trong tat ca cac bst tim bang ten)
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
                    deleteCategoryOfCurrentAcc();
                    break;
                case 4:
                    findCategoryByName();
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
        0. return to main menu`);
        choice = +input.question(`Nhap lua chon: `)
        switch (choice){
            case 1:
                displayCategoryOfCurrenAcc();
                break;
        }
    }while(choice != 0);
}
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
                    displayBookMenu(selectedCategory);
                }
            }
        }
    }
}
function deleteCategoryOfCurrentAcc(){
    console.log(`-------Chon category muon xoa------`)
    let menu = '';
    let count = 0;
    for (let i = 0; i < categoryManager.getCategory().length; i++) {
        if(categoryManager.getCategory()[i].getCreator() == currentAcc){
            count++;
            menu += `${count}. Category Name: ${categoryManager.getCategory()[i].getName()}
            Category Id: ${categoryManager.getCategory()[i].getId()} \n`;
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
                    let choiceYesNo = +input.question(`Ban co chac chan muon xoa ${selectedCategory.getName()}
                     1. Yes
                     2. No 
                     `);
                    if(choiceYesNo == 0) {
                        main();
                    }else if(choiceYesNo == 1){
                        categoryManager.deleteCategory(i);
                        console.log(`Xoa thanh cong`);
                        main();
                    }
                }
            }
        }
    }
}
function displayBookMenu(selectedCategory:Category){
    let choice;
    do{
        console.log(`------edit book cua category ${selectedCategory.getName()}-----
        1. Add book
        2. Display list book
        3. Edit book
        4. Delete book
        0. Return to display menu
        `)
        choice = +input.question(`Nhap lua chon: `);
        switch (choice){
            case 1:
                addBookToCategory(selectedCategory)
                break;
            case 2:
                displayBookInformation(selectedCategory)
                break;
            case 3:
                editBookInCategory(selectedCategory)
                break;
            case 4:
                deleteBookInCategory(selectedCategory);
                break;
        }
    }while(choice != 0)
}
function addBookToCategory(selectedCategory:Category) {
    if (selectedCategory.getListBook().length == 0) {
        let id = input.question(`Nhap id: `);
        let name = input.question(`Nhap name: `);
        let writer = input.question(`Nhap ten tac gia: `);
        let releaseDate = input.question(`Nhap releaseDate:  `);
        let book = new Book(id, name, writer, releaseDate);
        selectedCategory.addBook(book);
        console.log(`Them thanh cong`)
    }else{
        let flag: boolean = false
        do {
            let id = input.question(`Nhap id cho sach: `);
            let idAfterCheck;
                for (let i = 0; i < selectedCategory.getListBook().length; i++) {
                    if (id == selectedCategory.getListBook()[i].getId()) {
                        console.log(`Id da ton tai.`);
                    } else {
                        idAfterCheck = id;
                        let flag2: boolean = false;
                        do {
                            let name = input.question(`Nhap name: `);
                            let nameAfterCheck;
                            for (let i = 0; i < selectedCategory.getListBook().length; i++) {
                                if (name == selectedCategory.getListBook()[i].getName()) {
                                    console.log(`name da ton tai.`);
                                } else {
                                    nameAfterCheck = name;
                                    let writer = input.question(`Nhap ten tac gia: `);
                                    let releaseDate = input.question(`Nhap releaseDate:  `);
                                    let book = new Book(idAfterCheck, nameAfterCheck, writer, releaseDate);
                                    selectedCategory.addBook(book);
                                    console.log(`Them sach thanh cong. `)
                                    flag = true;
                                    flag2 = true;
                                    return;
                                }
                            }
                        } while (flag2 == false)
                    }
            }
        } while (flag == false)
    }
}

function displayBookInformation(selectedCategory:Category){
    console.log(`------list book in ${selectedCategory.getName()}------`);
    let menu = '';
    for (let i = 0; i < selectedCategory.getListBook().length; i++) {
        menu += `${i + 1}. Book id: ${selectedCategory.getListBook()[i].getId()}
        Book name: ${selectedCategory.getListBook()[i].getName()}
        Author: ${selectedCategory.getListBook()[i].getWriter()}
        ReleaseDate: ${selectedCategory.getListBook()[i].getReleaseDate()}\n`
    }
    console.log(menu);
    console.log(`0. Exit`);
    let choice = +input.question(`Chon 0 de thoat `);
    if(choice == 0){
        displayBookMenu(selectedCategory);
    }
}
function editBookInCategory(selectedCategory:Category) {
    console.log(`-----Select a book to you want to edit-----`);
    let menu = '';
    for (let i = 0; i < selectedCategory.getListBook().length; i++) {
        menu += `${i + 1}. Book id: ${selectedCategory.getListBook()[i].getId()} Book name: ${selectedCategory.getListBook()[i].getName()}\n`
    }
    console.table(menu);
    console.log(`0. Exit`);
    let choice = +input.question(`Nhap lua chon : `);
    if(choice == 0){
        displayBookMenu(selectedCategory);
    }else{
        let indexOfBook = choice - 1;
        let selectedBook:Book = selectedCategory.getListBook()[indexOfBook]
        editBookDetail(selectedBook);
    }

}
function editBookDetail(selectedBook:Book){
    let choice;
        console.log(`----Sua thong tin ${selectedBook.getName()}---
        1. Sua ten sach
        2. Sua id sach 
        3. Sua tac gia 
        4. Sua ngay phat hanh
        0. Thoat`);
        choice = input.question(`Nhap lua chon: `);
        if(choice == 1){
            editBookName(selectedBook);
            editBookDetail(selectedBook);
        }else if(choice == 2){
            editBookId(selectedBook);
            editBookDetail(selectedBook);
        }else if(choice == 3){
            editBookAuthor(selectedBook);
            editBookDetail(selectedBook);
        }else if(choice == 4){
            editBookReleaseDate(selectedBook);
            editBookDetail(selectedBook);
        }else if(choice == 5){
            editBookDetail(selectedBook);
        }
}
function editBookName(selectedBook:Book){
    let name = input.question(`Nhap ten moi: `);
    selectedBook.setName(name);
    console.log(`Sua ten thanh cong. `)
    console.table(selectedBook);
}
function editBookId(selectedBook:Book){
    let id = input.question('Nhap id moi: ');
    selectedBook.setId(id);
    console.log("Sua id thanh cong. ");
    console.table(selectedBook);
}
function editBookAuthor(selectedBook:Book){
    let author = input.question('Nhap ten tac gia: ');
    selectedBook.setWriter(author);
    console.log('Sua ten tac gia thanh cong. ');
    console.table(selectedBook);
}
function editBookReleaseDate(selectedBook:Book){
    let releaseDate = input.question('Nhap ten tac gia: ');
    selectedBook.setReleaseDate(releaseDate);
    console.log('Sua ngay phat hanh thanh cong. ');
    console.table(selectedBook);
}
function deleteBookInCategory(selectedCategory:Category) {
    let menu = '';
    let choice;
    let indexOfBook;
    let selectedBook;
    for (let i = 0; i < selectedCategory.getListBook().length; i++) {
        menu += `${i + 1}. Name ${selectedCategory.getListBook()[i].getName()}`
    }
    console.log(`${menu} \n 0. Exit`)
    choice = +input.question(`Chon sach muon xoa: `);
    if (choice == 0) {
        displayBookMenu(selectedCategory)
    }else{
        indexOfBook = choice - 1;
        selectedBook = selectedCategory.getListBook()[indexOfBook];
        console.log(`ban co chac chan muon xoa sach ${selectedBook.getName()} khoi category khong:
                                 1. Yes 
                                 2. No `);
        let choice1 = +input.question(`Nhap lua chon: `)
        if (choice1 == 1) {
            selectedCategory.getListBook().splice(indexOfBook, 1);
            console.log(`Xoa thanh cong. `)
        } else if (choice1 == 2) {
            editBookDetail(selectedBook);
        }
    }
}

function findCategoryByName(){
let nameCategory = input.question(`Nhap ten cua category ban muon tim kiem: `);
    for (let i = 0; i < categoryManager.getCategory().length; i++) {
        if(categoryManager.getCategory()[i].getName() == nameCategory){
            console.log(`1. ID: ${categoryManager.getCategory()[i].getId()}
            2. Name: ${categoryManager.getCategory()[i].getName()}
            3. Creator: ${categoryManager.getCategory()[i].getCreator().getUsername()}
            4. Numbers of book: ${categoryManager.getCategory()[i].getNumberOfBook()}
            5. ListBook: 
             `);
            let listBook = '';
            for (let j = 0; j < categoryManager.getCategory()[i].getListBook().length; j++) {
                listBook += `   5.${j+1}. ID: ${categoryManager.getCategory()[i].getListBook()[j].getId()}
                Name: ${categoryManager.getCategory()[i].getListBook()[j].getName()}
                Author: ${categoryManager.getCategory()[i].getListBook()[j].getWriter()}
                ReleaseDate: ${categoryManager.getCategory()[i].getListBook()[j].getReleaseDate()}\n
                `
            }
            console.log(listBook);
        }
    }
}
loginMenu();



