import {Category} from "./model/Category";
import {CategoryManager} from "./service/CategoryManager";
import {AccountManager} from "./service/AccountManager";
import {Account} from "./model/Account";
import {Song} from "./model/Song";
// @ts-ignore
let input = require(`readline-sync`);
let categoryManager = new CategoryManager();
let accountManager = new AccountManager();
let currentAcc:Account;
function loginMenu(){
    let choice;
    do{
        console.log(`\n------Login/Logout/Register menu------\n
        1. Login
        2. Register
        0. Exit`);
        choice = +input.question("\nEnter your selection: ");
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
    console.log(`\n-----Login-----\n`);
    let checkLogin = true;
    let checkLogin1 = true;
    let inputName = input.question("Enter username: ");
    let inputId = input.question(`Enter id: `);
    let inputPassword = input.question(`Enter password: `);
    for (let i = 0; i < accountManager.listAccount.length; i++) {
        let userName = accountManager.listAccount[i].getUsername();
        let id = accountManager.listAccount[i].getId();
        let password = accountManager.listAccount[i].getPassword();
        let status = accountManager.listAccount[i].getStatus();
        if (userName == inputName && inputId == id && password == inputPassword && status == "ON") {
            checkLogin = false;
            currentAcc = new Account(id,userName,password,status);
            console.log('\nLogin successful!\n');
            main();
        }else if(userName == inputName && inputId == id && password == inputPassword && status == "OFF"){
            console.log(`Your account has been locked. To unlock your account, contact your administrator.`);
            checkLogin1 = false;
        }
    }
    if (checkLogin == true && checkLogin1 == true) {
        console.log(`Account does not exist. Please try again or select register to create a new account.\n
        1. Try to login again
        2. Register
        0. Return to login/logout/register menu`);
        let choice = +input.question(`\nEnter your selection: `);
        if(choice == 1){
            login();
        }else if(choice == 2){
            register()
        }else if(choice == 0){
            loginMenu();
        }
    }
}
function register() {
    let flag:boolean = false;
    do {
        let userName = input.question('Enter your name (allow only alphabet input): ');
        let regex = /^[a-z A-Z\-]+$/;
        let test = regex.test(userName);
        for (let i = 0; i < accountManager.listAccount.length; i++) {
            if (accountManager.listAccount[i].getUsername() == userName) {
                // test = false;
                console.log(`This name has already been used.`);
            }
        }
        let userNameAfterCheck:string;
        if (test == false) {
            console.log(`Name is not valid. Please try again: `);
        } else {
            userNameAfterCheck = userName;
            let flag2:boolean = false;
            do {
                let id = input.question(`Input an ID that begins with the letter ACC followed by three digits (like ACC234): `);
                regex = /^ACC[0-9]{3}$/;
                test = regex.test(id);
                for (let i = 0; i < accountManager.listAccount.length; i++) {
                    if (accountManager.listAccount[i].getId() == id) {
                        test = false;
                        console.log(`This ID has already been in used. `);
                    }
                }
                let idAfterCheck:string;
                if(test == false){
                    console.log('ID is not valid. Please try again. ');
                }else{
                    idAfterCheck = id;
                    let passwordAfterCheck:string;
                    let flag3:boolean = false;
                    do {
                        let password = input.question(`Input password (password must has 8 characters, at least one capital letters and one number: `);
                        regex =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{9,}$/;
                        test = regex.test(password);
                        if(test == false){
                            console.log(`Password is not valid. Please try again.`);
                        }else{
                            passwordAfterCheck = password;
                            let status:string = 'ON';
                            let account = new Account(idAfterCheck,userNameAfterCheck,passwordAfterCheck,status);
                            accountManager.add(account);
                            console.log(`\nRegistration was successful. Please login!`);
                            currentAcc = account;
                            loginMenu();
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
            console.log(`\n------Main Menu-------\n
        1. Add new category
        2. Edit your category
        3. Delete your category
        4. Find category from category list
        5. Account manager (for admin only)
        0. Back to previous menu`
            )
            choice = +input.question(`\nEnter your selection: `);
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
        } while (choice != 0);
}
function menuAccManager(){
    if(currentAcc.getUsername() == `Quynh Trang` && currentAcc.getId() == `Trang1997`){
        let choice;
        do{
            console.log(`\n-------Account manager menu--------\n
            1. Show account list 
            2. Delete account
            3. Change account status
            0. Return to main menu`);
            choice = +input.question("\nEnter your selection: ");
            switch (choice){
                case 1:
                    showAccount();
                    break;
                case 2:
                    deleteAccount();
                    break;
                case 3:
                    onOffAccount();
                    break;
            }
        }while(choice != 0);
    }else{
        console.log(`\nYou must be an administrator of library to perform these tasks.`);
    }
}

function onOffAccount(){
    let menu = '';
    for (let i = 1; i < accountManager.listAccount.length; i++) {
        menu += `${i}. ID: ${accountManager.listAccount[i].getId()} - Name: ${accountManager.listAccount[i].getUsername()} - Status: ${accountManager.listAccount[i].getStatus()}\n`
    }
    console.table(menu);
    console.log(`Enter 0 to exit: `);
    let choice = +input.question(`\nSelect the account you want to change status: `);
    if(choice == 0){
        menuAccManager();
    }else{
        let selectedAcc = accountManager.listAccount[choice];
        if(selectedAcc.getStatus() == `ON`){
            console.log(`Do you want to disable ${selectedAcc.getUsername()}: 1.Yes\t2.No`);
            let choiceYesNo1 = +input.question(`Enter your selection: `);
            if(choiceYesNo1 == 1){
                selectedAcc.setStatus(`OFF`);
                console.log(`Account ${selectedAcc.getUsername()} was disabled. `);
                menuAccManager();
            }else if(choiceYesNo1 == 2){
                menuAccManager();
            }
        }else if(selectedAcc.getStatus() == 'OFF'){
            console.log(`Do you want to enable ${selectedAcc.getUsername()}: 1.Yes\t2.No`);
            let choiceYesNo2 = +input.question(`Enter your selection: `);
            if(choiceYesNo2 == 1){
                selectedAcc.setStatus('ON');
                console.log(`Account ${selectedAcc.getUsername()} was enabled. `);
                menuAccManager();
            }else if(choiceYesNo2 == 2){
                menuAccManager();
            }
        }
    }
}

function deleteAccount() {
    let id = input.question(`Input account id you want to delete: `);
    accountManager.deleteById(id);
}
function showAccount(){
    console.log(accountManager.findAllAccount());
    main();
}
function addCategory(){
    let flag:boolean = false;
    do{
        let id = input.question(`Input category ID (digits only, 5 digits like: 12345) : `);
        let regex = /^[0-9]{5}$/;
        let testCategoryId = regex.test(id);
        let categoryIdAfterCheck:number;
        for (let i = 0; i < categoryManager.getCategory().length; i++) {
            if(categoryManager.getCategory()[i].getId() == id){
                // testCategoryId = false;
                console.log(`This ID has already been in used. Input again.`);
                addCategory();
            }
        }
        if(testCategoryId == false){
            console.log(`ID is not valid. Please try again. `);
        }else{
            categoryIdAfterCheck = id;
            let flag2: boolean = false;
            do {
                let categoryName = input.question(`Input category name, allow alphabet, digits and hyphens: `);
                regex = /^[0-9 a-z A-Z\-]+$/;
                let testCategoryName = regex.test(categoryName);
                let categoryNameAfterCheck:string;
                let flagCheckName:boolean = false;
                for (let i = 0; i < categoryManager.getCategory().length; i++) {
                    if (categoryManager.getCategory()[i].getName() == categoryName) {
                        // testCategoryName = false;
                        flagCheckName = true;
                        console.log(`Category name has already been in used. Input again.`);
                    }
                }
                    if(testCategoryName == false && flagCheckName !== true){
                        console.log(`Category name is not valid. Please try again.`);
                    }else if(testCategoryName == true && flagCheckName !== true){
                        categoryNameAfterCheck = categoryName;
                        let creator = currentAcc;
                        let category = new Category(categoryIdAfterCheck,categoryNameAfterCheck,creator);
                        categoryManager.addCategory(category);
                        flag = true;
                        flag2 = true;
                        console.log(`A new category has been successfully added to library.`);
                    }
                }while(flag2 == false);
        }
    }while(flag == false);
}
function editCategory(){
    let choice;
    do{
        console.log(`
        1. Show your category to perform tasks.
        0. Return to main menu`);
        choice = +input.question(`\nEnter your selection: `);
        switch (choice){
            case 1:
                displayCategoryOfCurrenAcc();
                break;
        }
    }while(choice != 0);
}
function displayCategoryOfCurrenAcc(){
    console.log(`-------Category list of your account------`);
    let menu = '';
    let count = 0;
    for (let i = 0; i < categoryManager.getCategory().length; i++) {
        if(categoryManager.getCategory()[i].getCreator() == currentAcc){
            count++;
            menu += `${count}. Category Name: ${categoryManager.getCategory()[i].getName()}
            ID: ${categoryManager.getCategory()[i].getId()}
            Creator: ${categoryManager.getCategory()[i].getCreator().getUsername()}
            Number of Songs: ${categoryManager.getCategory()[i].getNumberOfSong()}\n`;
        }
    }
    console.log(menu);
    console.log(`0. Exit`);
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
                    console.log(selectedCategory);
                    displaySongMenu(selectedCategory);
                }
            }
        }
    }
}
function deleteCategoryOfCurrentAcc(){
    console.log(`-------Select category you want to delete------`);
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
    console.log(`0. Exit`);
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
function displaySongMenu(selectedCategory:Category){
    let choice;
    do{
        console.log(`------Menu edit Song of category ${selectedCategory.getName()}-----
        1. Add Song
        2. Show list Song
        3. Edit Song
        4. Delete Song
        0. Return to display menu
        `)
        choice = +input.question(`Enter your selection: `);
        switch (choice){
            case 1:
                addSongToCategory(selectedCategory);
                break;
            case 2:
                displaySongInformation(selectedCategory);
                break;
            case 3:
                editSongInCategory(selectedCategory);
                break;
            case 4:
                deleteSongInCategory(selectedCategory);
                break;
        }
    }while(choice != 0);
}
function addSongToCategory(selectedCategory:Category) {
    if (selectedCategory.getListSong().length == 0) {
        let id = input.question(`Input ID: `);
        let name = input.question(`Input name: `);
        let writer = input.question(`Input Singer's name: `);
        let releaseDate = input.question(`Input release date:  `);
        let song = new Song(id, name, writer, releaseDate);
        selectedCategory.addSong(song);
        console.log(`A new song was successfully added to category.`);
    }else{
        let flag: boolean = false
        do {
            let id = input.question(`Input ID: `);
            let idAfterCheck;
                for (let i = 0; i < selectedCategory.getListSong().length; i++) {
                    if (id == selectedCategory.getListSong()[i].getId()) {
                        console.log(`This ID has been in used.`);
                    } else {
                        idAfterCheck = id;
                        let flag2: boolean = false;
                        do {
                            let name = input.question(`Input name: `);
                            let nameAfterCheck;
                            for (let i = 0; i < selectedCategory.getListSong().length; i++) {
                                if (name == selectedCategory.getListSong()[i].getName()) {
                                    console.log(`This name has been in used.`);
                                } else {
                                    nameAfterCheck = name;
                                    let writer = input.question(`Input singer's name: `);
                                    let releaseDate = input.question(`Input release date:  `);
                                    let song = new Song(idAfterCheck, nameAfterCheck, writer, releaseDate);
                                    selectedCategory.addSong(song);
                                    console.log(`A new song was successfully added to category.`);
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

function displaySongInformation(selectedCategory:Category){
    console.log(`------List song in ${selectedCategory.getName()}------`);
    let menu = '';
    for (let i = 0; i < selectedCategory.getListSong().length; i++) {
        menu += `${i + 1}. Song ID: ${selectedCategory.getListSong()[i].getId()}
        Song name: ${selectedCategory.getListSong()[i].getName()}
        Singer: ${selectedCategory.getListSong()[i].getWriter()}
        Release Date: ${selectedCategory.getListSong()[i].getReleaseDate()}\n`
    }
    console.log(menu);
    console.log(`0. Exit`);
    let choice = +input.question(`Select 0 to exit. `);
    if(choice == 0){
        displaySongMenu(selectedCategory);
    }
}
function editSongInCategory(selectedCategory:Category) {
    console.log(`-----Select a song to you want to edit-----`);
    let menu = '';
    for (let i = 0; i < selectedCategory.getListSong().length; i++) {
        menu += `${i + 1}. Song ID: ${selectedCategory.getListSong()[i].getId()} Song name: ${selectedCategory.getListSong()[i].getName()}\n`
    }
    console.table(menu);
    console.log(`0. Exit`);
    let choice = +input.question(`Input your selection: `);
    if(choice == 0){
        displaySongMenu(selectedCategory);
    }else{
        let indexOfSong = choice - 1;
        let selectedSong:Song = selectedCategory.getListSong()[indexOfSong];
        editSongDetail(selectedSong);
    }

}
function editSongDetail(selectedSong:Song){
    let choice;
        console.log(`----Edit information of ${selectedSong.getName()}---
        1. Edit song name
        2. Edit song ID
        3. Edit singer
        4. Edit release date
        0. Exit`);
        choice = input.question(`Enter your selection: `);
        if(choice == 1){
            editSongName(selectedSong);
            editSongDetail(selectedSong);
        }else if(choice == 2){
            editSongId(selectedSong);
            editSongDetail(selectedSong);
        }else if(choice == 3){
            editSongSinger(selectedSong);
            editSongDetail(selectedSong);
        }else if(choice == 4){
            editSongReleaseDate(selectedSong);
            editSongDetail(selectedSong);
        }else if(choice == 5){
            editSongDetail(selectedSong);
        }
}
function editSongName(selectedSong:Song){
    let name = input.question(`Enter new name: `);
    selectedSong.setName(name);
    console.log(`Name has been successfully updated. `);
    console.table(selectedSong);
}
function editSongId(selectedSong:Song){
    let id = input.question('Enter new ID: ');
    selectedSong.setId(id);
    console.log("ID has been successfully updated. ");
    console.table(selectedSong);
}
function editSongSinger(selectedSong:Song){
    let Singer = input.question('Input singer name: ');
    selectedSong.setWriter(Singer);
    console.log('Singer name has been successfully updated. ');
    console.table(selectedSong);
}
function editSongReleaseDate(selectedSong:Song){
    let releaseDate = input.question('Input new release date: ');
    selectedSong.setReleaseDate(releaseDate);
    console.log('Release date has been successfully updated. ');
    console.table(selectedSong);
}
function deleteSongInCategory(selectedCategory:Category) {
    let menu = '';
    let choice;
    let indexOfSong;
    let selectedSong;
    for (let i = 0; i < selectedCategory.getListSong().length; i++) {
        menu += `${i + 1}. Name ${selectedCategory.getListSong()[i].getName()}`
    }
    console.log(`${menu} \n 0. Exit`);
    choice = +input.question(`Select song you want to delete: `);
    if (choice == 0) {
        displaySongMenu(selectedCategory);
    }else{
        indexOfSong = choice - 1;
        selectedSong = selectedCategory.getListSong()[indexOfSong];
        console.log(`Are you sure you want to delete ${selectedSong.getName()}:
                                 1. Yes 
                                 2. No `);
        let choice1 = +input.question(`Input your selection: `);
        if (choice1 == 1) {
            selectedCategory.getListSong().splice(indexOfSong, 1);
            console.log(`Song has been deleted from category. `);
        } else if (choice1 == 2) {
            editSongDetail(selectedSong);
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
            4. Number of Songs: ${categoryManager.getCategory()[i].getNumberOfSong()}
            5. ListSong: 
             `);
            let listSong = '';
            for (let j = 0; j < categoryManager.getCategory()[i].getListSong().length; j++) {
                listSong += `   
                5.${j+1}. ID: ${categoryManager.getCategory()[i].getListSong()[j].getId()}
                Name: ${categoryManager.getCategory()[i].getListSong()[j].getName()}
                Singer: ${categoryManager.getCategory()[i].getListSong()[j].getWriter()}
                Release date: ${categoryManager.getCategory()[i].getListSong()[j].getReleaseDate()}\n
                `
            }
            console.log(listSong);
        }
    }
}
loginMenu();