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
            console.log('Login successful');
            main();
        }
    }
    if (checkLogin == true) {
        console.log(`Account does not exist. Please try again or select register to create a new account.
        1. Input again
        2. Register
        0. Return to main menu`);
        let choice = +input.question(`Enter your selection: `);
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
        let userName = input.question('Enter your name (allow only alphabet input): ');
        let regex = /^[a-z A-Z\-]+$/;
        let test = regex.test(userName);
        for (let i = 0; i < accountManager.listAccount.length; i++) {
            if (accountManager.listAccount[i].getUsername() == userName) {
                test = false;
                console.log(`This name has already been used.`);
            }
        }
        let userNameAfterCheck: string;
        if (test == false) {
            console.log(`Name is not valid. Please try again: `)
        } else {
            userNameAfterCheck = userName;
            let flag2: boolean = false;
            do {
                let id = input.question(`Input an ID that begins with the letter AC followed by three digits: ( like AC234`);
                regex = /^AC[0-9]{3}$/;
                test = regex.test(id);
                for (let i = 0; i < accountManager.listAccount.length; i++) {
                    if (accountManager.listAccount[i].getId() == id) {
                        test = false;
                        console.log(`This ID has already been in used. `);
                    }
                }
                let idAfterCheck:string;
                if(test == false){
                    console.log('ID is not valid. Please try again! ');
                }else{
                    idAfterCheck = id;
                    let passwordAfterCheck:string;
                    let flag3:boolean = false;
                    do {
                        let password = input.question(`Input password (password must has 8 characters, 
              at least one capital letters and one number: `);
                        regex =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{9,}$/;
                        test = regex.test(password);
                        if(test == false){
                            console.log(`Password is not valid. Please try again:`)
                        }else{
                            passwordAfterCheck = password;
                            let account = new Account(idAfterCheck,userNameAfterCheck,passwordAfterCheck);
                            accountManager.add(account);
                            console.log(`Registration was successful. Please login!`)
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
        1. Add new category
        2. Edit your category
        3. Delete your category
        4. Find category from category list
        5. Account manager (for admin only)
        0. Return to login menu`
            )
            choice = +input.question(`Enter your selection: `)
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
         1. Display account list 
         2. Delete account
         0. Return to main menu`)
        let choice = +input.question("Enter your selection: ")
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
        console.log(`You must be an administrator of library to perform these tasks.`);
    }
}
function deleteAccount() {
    let id = input.question(`Input account id you want to delete: `)
    accountManager.deleteById(id);
}
function showAccount(){
    console.table(accountManager.findAllAccount());
}
function addCategory(){
    let flag:boolean = false;
    do{
        let id = input.question(`Input category ID (digits only, 5 digits like: 12345) : `)
        let regex = /^[0-9]{5}$/;
        let testCategoryId = regex.test(id);
        let categoryIdAfterCheck:number;
        for (let i = 0; i < categoryManager.getCategory().length; i++) {
            if(categoryManager.getCategory()[i].getId() == id){
                testCategoryId = false;
                console.log(`This ID has already been in used.`);
            }
        }
        if(testCategoryId == false){
            console.log(`ID is not valid. Please try again: `)
        }else{
            categoryIdAfterCheck = id;
            let flag2: boolean = false;
            do {
                let categoryName = input.question(`Input category name, allow only alphabet input: `);
                regex = /^[a-z A-Z\-]+$/;
                let testCategoryName = regex.test(categoryName);
                let categoryNameAfterCheck:string;
                for (let i = 0; i < categoryManager.getCategory().length; i++) {
                    if (categoryManager.getCategory()[i].getName() == categoryName) {
                        testCategoryName = false;
                        console.log(`Category name has already been in used.`);
                    }
                }
                    if(testCategoryName == false){
                        console.log(`Category name has already been in used.`)
                    }else{
                        categoryNameAfterCheck = categoryName;
                        let creator = currentAcc;
                        let category = new Category(categoryIdAfterCheck,categoryNameAfterCheck,creator);
                        categoryManager.addCategory(category);
                        console.log(`A new category has been successfully added to library.`);
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
        1. Show your category to perform tasks.
        0. Return to main menu`);
        choice = +input.question(`Enter your selection: `)
        switch (choice){
            case 1:
                displayCategoryOfCurrenAcc();
                break;
        }
    }while(choice != 0);
}
function displayCategoryOfCurrenAcc(){
    console.log(`-------Category list of your account------`)
    let menu = '';
    let count = 0;
    for (let i = 0; i < categoryManager.getCategory().length; i++) {
        if(categoryManager.getCategory()[i].getCreator() == currentAcc){
            count++;
            menu += `${count}. Category Name: ${categoryManager.getCategory()[i].getName()}
            Category Id: ${categoryManager.getCategory()[i].getId()}
            Creator: ${categoryManager.getCategory()[i].getCreator().getUsername()}
            Number of books: ${categoryManager.getCategory()[i].getNumberOfBook()}\n`;
        }
    }
    console.log(menu);
    console.log(`0. Exit`)
    let choice = +input.question("Enter your selection: ");
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
    console.log(`-------Select category you want to delete------`)
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
    let choice = +input.question("Enter your selection: ");
    let count2 = 0;
    if(choice == 0){
        main();
    }else{
        for (let i = 0; i < categoryManager.getCategory().length; i++) {
            if(categoryManager.getCategory()[i].getCreator() == currentAcc){
                count2++;
                if(choice == count2){
                    let selectedCategory = categoryManager.getCategory()[i];
                    let choiceYesNo = +input.question(`Are you sure you want to delete ${selectedCategory.getName()}
                     1. Yes
                     2. No 
                     `);
                    if(choiceYesNo == 0) {
                        main();
                    }else if(choiceYesNo == 1){
                        categoryManager.deleteCategory(i);
                        console.log(`Successfully deleted`);
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
        console.log(`------Menu edit book of category ${selectedCategory.getName()}-----
        1. Add book
        2. Show list book
        3. Edit book
        4. Delete book
        0. Return to display menu
        `)
        choice = +input.question(`Enter your selection: `);
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
        let id = input.question(`Input ID: `);
        let name = input.question(`Input name: `);
        let writer = input.question(`Input author's name: `);
        let releaseDate = input.question(`Input release date:  `);
        let book = new Book(id, name, writer, releaseDate);
        selectedCategory.addBook(book);
        console.log(`A new book was successfully added to category.`)
    }else{
        let flag: boolean = false
        do {
            let id = input.question(`Input ID: `);
            let idAfterCheck;
                for (let i = 0; i < selectedCategory.getListBook().length; i++) {
                    if (id == selectedCategory.getListBook()[i].getId()) {
                        console.log(`This ID has been in used.`);
                    } else {
                        idAfterCheck = id;
                        let flag2: boolean = false;
                        do {
                            let name = input.question(`Input name: `);
                            let nameAfterCheck;
                            for (let i = 0; i < selectedCategory.getListBook().length; i++) {
                                if (name == selectedCategory.getListBook()[i].getName()) {
                                    console.log(`This name has been in used.`);
                                } else {
                                    nameAfterCheck = name;
                                    let writer = input.question(`Input author's name: `);
                                    let releaseDate = input.question(`Input release date:  `);
                                    let book = new Book(idAfterCheck, nameAfterCheck, writer, releaseDate);
                                    selectedCategory.addBook(book);
                                    console.log(`A new book was successfully added to category.`)
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
    console.log(`------List book in ${selectedCategory.getName()}------`);
    let menu = '';
    for (let i = 0; i < selectedCategory.getListBook().length; i++) {
        menu += `${i + 1}. Book ID: ${selectedCategory.getListBook()[i].getId()}
        Book name: ${selectedCategory.getListBook()[i].getName()}
        Author: ${selectedCategory.getListBook()[i].getWriter()}
        Release Date: ${selectedCategory.getListBook()[i].getReleaseDate()}\n`
    }
    console.log(menu);
    console.log(`0. Exit`);
    let choice = +input.question(`Select 0 to exit. `);
    if(choice == 0){
        displayBookMenu(selectedCategory);
    }
}
function editBookInCategory(selectedCategory:Category) {
    console.log(`-----Select a book to you want to edit-----`);
    let menu = '';
    for (let i = 0; i < selectedCategory.getListBook().length; i++) {
        menu += `${i + 1}. Book ID: ${selectedCategory.getListBook()[i].getId()} Book name: ${selectedCategory.getListBook()[i].getName()}\n`
    }
    console.table(menu);
    console.log(`0. Exit`);
    let choice = +input.question(`Input your selection: `);
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
        console.log(`----Edit information of ${selectedBook.getName()}---
        1. Edit book name
        2. Edit book ID
        3. Edit author
        4. Edit release date
        0. Exit`);
        choice = input.question(`Enter your selection: `);
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
    let name = input.question(`Enter new name: `);
    selectedBook.setName(name);
    console.log(`Name has been successfully updated. `)
    console.table(selectedBook);
}
function editBookId(selectedBook:Book){
    let id = input.question('Enter new ID: ');
    selectedBook.setId(id);
    console.log("ID has been successfully updated. ");
    console.table(selectedBook);
}
function editBookAuthor(selectedBook:Book){
    let author = input.question('Input author name: ');
    selectedBook.setWriter(author);
    console.log('Author has been successfully updated. ');
    console.table(selectedBook);
}
function editBookReleaseDate(selectedBook:Book){
    let releaseDate = input.question('Input new release date: ');
    selectedBook.setReleaseDate(releaseDate);
    console.log('Release date has been successfully updated. ');
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
    choice = +input.question(`Select book you want to delete: `);
    if (choice == 0) {
        displayBookMenu(selectedCategory)
    }else{
        indexOfBook = choice - 1;
        selectedBook = selectedCategory.getListBook()[indexOfBook];
        console.log(`Are you sure you want to delete ${selectedBook.getName()}:
                                 1. Yes 
                                 2. No `);
        let choice1 = +input.question(`Input your selection: `)
        if (choice1 == 1) {
            selectedCategory.getListBook().splice(indexOfBook, 1);
            console.log(`Book has been deleted from category. `)
        } else if (choice1 == 2) {
            editBookDetail(selectedBook);
        }
    }
}

function findCategoryByName(){
let nameCategory = input.question(`Input name of category you want to find: `);
    for (let i = 0; i < categoryManager.getCategory().length; i++) {
        if(categoryManager.getCategory()[i].getName() == nameCategory){
            console.log(`1. ID: ${categoryManager.getCategory()[i].getId()}
            2. Name: ${categoryManager.getCategory()[i].getName()}
            3. Creator: ${categoryManager.getCategory()[i].getCreator().getUsername()}
            4. Number of books: ${categoryManager.getCategory()[i].getNumberOfBook()}
            5. ListBook: 
             `);
            let listBook = '';
            for (let j = 0; j < categoryManager.getCategory()[i].getListBook().length; j++) {
                listBook += `   5.${j+1}. ID: ${categoryManager.getCategory()[i].getListBook()[j].getId()}
                Name: ${categoryManager.getCategory()[i].getListBook()[j].getName()}
                Author: ${categoryManager.getCategory()[i].getListBook()[j].getWriter()}
                Release date: ${categoryManager.getCategory()[i].getListBook()[j].getReleaseDate()}\n
                `
            }
            console.log(listBook);
        }
    }
}
loginMenu();



