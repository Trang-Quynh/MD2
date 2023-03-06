import {Album} from "./model/Album";
import {AlbumManager} from "./service/AlbumManager";
import {AccountManager} from "./service/AccountManager";
import {Account} from "./model/Account";
import {Song} from "./model/Song";
// @ts-ignore
let input = require(`readline-sync`);
let albumManager = new AlbumManager();
let accountManager = new AccountManager();
let currentAcc: Account;

function loginMenu() {
    let choice;
    console.log(`\n------Login/Logout/Register menu------\n
         1. Login
         2. Register
         0. Exit`);
        choice = +input.question("\nEnter your selection: ");
        if(choice == 1){
            login();
        }else if(choice == 2){
            register();
        }else if(choice == 0){
            // return;
            // @ts-ignore
            process.exit();
        }else{
            loginMenu();
        }
}

function login() {
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
            currentAcc = new Account(id, userName, password, status);
            console.log('\nLogin successful!\n');
            main();
        } else if (userName == inputName && inputId == id && password == inputPassword && status == "OFF") {
            console.log(`Your account has been locked. To unlock your account, contact your administrator.`);
            checkLogin1 = false;
            loginMenu();
        }
    }
    if (checkLogin == true && checkLogin1 == true) {
        console.log(`Account does not exist. Please try again or select register to create a new account.\n
        1. Try to login again
        2. Register
        0. Return to login/logout/register menu`);
        let choice = +input.question(`\nEnter your selection: `);
        if (choice == 1) {
            login();
        } else if (choice == 2) {
            register()
        } else if (choice == 0) {
            loginMenu();
        }
    }
}

function register() {
    let flag: boolean = false;
    do {
        let userName = input.question('Enter your name (allow only alphabet input): ');
        let regex = /^[a-z A-Z\-]+$/;
        let testName = regex.test(userName);
        let userNameAfterCheck: string;
        for (let i = 0; i < accountManager.listAccount.length; i++) {
            if (accountManager.listAccount[i].getUsername() == userName) {
                console.log(`This name has already been used. Input again. `);
                register();
            }
        }
        if (testName == false) {
            console.log(`Name is not valid. Please try again: `);
        } else {
            userNameAfterCheck = userName;
            let flag2: boolean = false;
            do {
                let id = input.question(`Input an ID begins with ACC followed by three digits (like ACC001): `);
                regex = /^ACC[0-9]{3}$/;
                let testId = regex.test(id);
                let flagCheckId: boolean = false;
                for (let i = 0; i < accountManager.listAccount.length; i++) {
                    if (accountManager.listAccount[i].getId() == id) {
                        flagCheckId = true;
                        console.log(`This ID has already been in used. Input again. `);
                    }
                }
                let idAfterCheck: string;
                if (testId == false && flagCheckId !== true) {
                    console.log('ID is not valid. Please try again. ');
                } else if (testId == true && flagCheckId !== true) {
                    idAfterCheck = id;
                    let passwordAfterCheck: string;
                    let flag3: boolean = false;
                    do {
                        let password = input.question(`Input password (password must has 8 characters, at least one capital letters and one number: `);
                        regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{9,}$/;
                        let testPasWord = regex.test(password);
                        if (testPasWord == false) {
                            console.log(`Password is not valid. Please try again.`);
                        } else {
                            passwordAfterCheck = password;
                            let status: string = 'ON';
                            let account = new Account(idAfterCheck, userNameAfterCheck, passwordAfterCheck, status);
                            accountManager.add(account);
                            console.log(`\nRegistration was successful. Please login!`);
                            currentAcc = account;
                            loginMenu();
                            flag = true;
                            flag2 = true;
                            flag3 = true;
                        }
                    } while (flag3 == false);
                }
            } while (flag2 == false);
        }
    } while (flag == false);
}

function main() {
    let choice;
    do {
        console.log(`\n------Main Menu-------\n
        1. Add new Album
        2. Edit your Album
        3. Delete your Album
        4. Find Album from Album list
        5. Show all Album
        6. Account manager (for admin only)
        0. Back to previous menu`
        )
        choice = +input.question(`\nEnter your selection: `);
        switch (choice) {
            case 1:
                addAlbum();
                break;
            case 2:
                editAlbum();
                break;
            case 3:
                deleteAlbumOfCurrentAcc();
                break;
            case 4:
                findAlbumByName();
                break;
            case 5:
                showAllAlbum();
                break;
            case 6:
                menuAccManager();
                break;
            case 0:
                loginMenu();
        }
    } while (choice != 0);
}

function showAllAlbum() {
    albumManager.showAll()
    main();
}

function menuAccManager() {
    if (currentAcc.getUsername() == `Quynh Trang` && currentAcc.getId() == `000001`) {
        let choice;
        do {
            console.log(`\n-------Account manager menu--------\n
            1. Show account list 
            2. Delete account
            3. Change account status
            0. Return to main menu`);
            choice = +input.question("\nEnter your selection: ");
            switch (choice) {
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
        } while (choice != 0);
    } else {
        console.log(`\nYou must be an administrator of library to perform these tasks.`);
    }
}

function onOffAccount() {
    let menu = '';
    for (let i = 1; i < accountManager.listAccount.length; i++) {
        menu += `${i}. ID: ${accountManager.listAccount[i].getId()} - Name: ${accountManager.listAccount[i].getUsername()} - Status: ${accountManager.listAccount[i].getStatus()}\n`
    }
    console.table(menu);
    console.log(`Enter 0 to exit: `);
    let choice = +input.question(`\nSelect the account you want to change status: `);
    if (choice == 0) {
        menuAccManager();
    } else {
        let selectedAcc = accountManager.listAccount[choice];
        if (selectedAcc.getStatus() == `ON`) {
            console.log(`Do you want to disable ${selectedAcc.getUsername()}: 1.Yes\t2.No`);
            let choiceYesNo1 = +input.question(`Enter your selection: `);
            if (choiceYesNo1 == 1) {
                selectedAcc.setStatus(`OFF`);
                console.log(`Account ${selectedAcc.getUsername()} was disabled. `);
                menuAccManager();
            } else if (choiceYesNo1 == 2) {
                menuAccManager();
            }
        } else if (selectedAcc.getStatus() == 'OFF') {
            console.log(`Do you want to enable ${selectedAcc.getUsername()}: 1.Yes\t2.No`);
            let choiceYesNo2 = +input.question(`Enter your selection: `);
            if (choiceYesNo2 == 1) {
                selectedAcc.setStatus('ON');
                console.log(`Account ${selectedAcc.getUsername()} was enabled. `);
                menuAccManager();
            } else if (choiceYesNo2 == 2) {
                menuAccManager();
            }
        }
    }
}

function deleteAccount() {
    let id = input.question(`Input account id you want to delete: `);
    accountManager.deleteById(id);
}

function showAccount() {
    console.log(accountManager.findAllAccount());
    main();
}

function addAlbum() {
    let flag: boolean = false;
    let flag2: boolean = false;
    do {
        let id = input.question(`Input an ID that begins with AB followed by three digits (like 001): `);
        let regex = /^AB[0-9]{3}$/;
        let testAlbumId = regex.test(id);
        let AlbumIdAfterCheck: string;
        for (let i = 0; i < albumManager.getAlbum().length; i++) {
            if (albumManager.getAlbum()[i].getId() == id) {
                // testAlbumId = false;
                console.log(`This ID has already been in used. Input again.`);
                addAlbum();
            }
        }
        if (testAlbumId == false) {
            console.log(`ID is not valid. Please try again. `);
        } else {
            AlbumIdAfterCheck = id;
            do {
                let AlbumName = input.question(`Input Album name, allow alphabet, digits and hyphens: `);
                regex = /^[0-9 a-zA-Z\-]+$/;
                let testAlbumName = regex.test(AlbumName);
                let AlbumNameAfterCheck: string;
                let flagCheckName: boolean = false;
                for (let i = 0; i < albumManager.getAlbum().length; i++) {
                    if (albumManager.getAlbum()[i].getName() == AlbumName) {
                        flagCheckName = true;
                    }
                }
                if (!testAlbumName) {
                    console.log(`Album name is not valid. Please try again.`);
                    flag2 = true;
                } else if (flagCheckName) {
                    console.log(`Album name has already been in used. Input again.`);
                    flag2 = true;
                } else if (testAlbumName && !flagCheckName) {
                    AlbumNameAfterCheck = AlbumName;
                    let creator = currentAcc;
                    let album = new Album(AlbumIdAfterCheck, AlbumNameAfterCheck, creator);
                    albumManager.addAlbum(album);
                    console.log(`A new Album has been successfully added to library.`);
                    flag = true;
                    flag2 = false;
                    main();
                }
            } while (flag2)
        }
    } while (!flag);
}

function editAlbum() {
    let choice;
    do {
        console.log(`
        1. Show your Album to perform tasks.
        0. Return to main menu`);
        choice = +input.question(`\nEnter your selection: `);
        switch (choice) {
            case 1:
                displayAlbumOfCurrenAcc();
                break;
        }
    } while (choice != 0);
}

function displayAlbumOfCurrenAcc() {
    console.log(`-------Album list of your account------`);
    let menu = '';
    let count = 0;
    for (let i = 0; i < albumManager.getAlbum().length; i++) {
        if (albumManager.getAlbum()[i].getCreator() == currentAcc) {
            count++;
            menu += `${count}. Album Name: ${albumManager.getAlbum()[i].getName()}
            ID: ${albumManager.getAlbum()[i].getId()}
            Creator: ${albumManager.getAlbum()[i].getCreator().getUsername()}
            Number of Songs: ${albumManager.getAlbum()[i].getNumberOfSong()}\n`;
        }
    }
    console.log(menu);
    console.log(`0. Exit`);
    let choice = +input.question("Enter your selection: ");
    let count2 = 0;
    if (choice == 0) {
        main();
    } else {
        for (let i = 0; i < albumManager.getAlbum().length; i++) {
            if (albumManager.getAlbum()[i].getCreator() == currentAcc) {
                count2++;
                if (choice == count2) {
                    let selectedAlbum = albumManager.getAlbum()[i];
                    console.log(selectedAlbum);
                    displaySongMenu(selectedAlbum);
                }
            }
        }
    }
}

function deleteAlbumOfCurrentAcc() {
    console.log(`-------Select Album you want to delete------`);
    let menu = '';
    let count = 0;
    for (let i = 0; i < albumManager.getAlbum().length; i++) {
        if (albumManager.getAlbum()[i].getCreator() == currentAcc) {
            count++;
            menu += `${count}. Album Name: ${albumManager.getAlbum()[i].getName()}
            Album Id: ${albumManager.getAlbum()[i].getId()} \n`;
        }
    }
    console.log(menu);
    console.log(`0. Exit`);
    let choice = +input.question("Enter your selection: ");
    let count2 = 0;
    if (choice == 0) {
        main();
    } else {
        for (let i = 0; i < albumManager.getAlbum().length; i++) {
            if (albumManager.getAlbum()[i].getCreator() == currentAcc) {
                count2++;
                if (choice == count2) {
                    let selectedAlbum = albumManager.getAlbum()[i];
                    let choiceYesNo = +input.question(`Are you sure you want to delete ${selectedAlbum.getName()}
                     1. Yes
                     2. No 
                     `);
                    if (choiceYesNo == 0) {
                        main();
                    } else if (choiceYesNo == 1) {
                        albumManager.deleteAlbum(i);
                        console.log(`Successfully deleted`);
                        main();
                    }
                }
            }
        }
    }
}

function displaySongMenu(selectedAlbum: Album) {
    let choice;
    do {
        console.log(`------Menu edit Song of Album ${selectedAlbum.getName()}-----
        1. Add Song
        2. Show list Song
        3. Edit Song
        4. Delete Song
        0. Return to display menu
        `)
        choice = +input.question(`Enter your selection: `);
        switch (choice) {
            case 1:
                addSongToAlbum(selectedAlbum);
                break;
            case 2:
                displaySongInformation(selectedAlbum);
                break;
            case 3:
                editSongInAlbum(selectedAlbum);
                break;
            case 4:
                deleteSongInAlbum(selectedAlbum);
                break;
        }
    } while (choice != 0);
}

function addSongToAlbum(selectedAlbum: Album) {
    if (selectedAlbum.getListSong().length == 0) {
        let id = input.question(`Input ID: `);
        let name = input.question(`Input name: `);
        let writer = input.question(`Input artist name: `);
        let releaseDate = input.question(`Input release date:  `);
        let regex = /^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/;
        let checkDate;
        do {
            let releaseDate = input.question(`Input release date (MM/DD/YYYY)/(MM-DD-YYYY)/(MM.DD.YYYY)/(MM DD YYYY): `);
            checkDate = regex.test(releaseDate);
            if (checkDate == false) {
                console.log(`Incorrect date format. please try again.`);
            }
        } while (checkDate == false);
        let song = new Song(id, name, writer, releaseDate);
        selectedAlbum.addSong(song);
        console.log(`A new song was successfully added to Album.`);
    } else {
        let flag: boolean = false
        do {
            let id = input.question(`Input ID: `);
            let idAfterCheck;
            for (let i = 0; i < selectedAlbum.getListSong().length; i++) {
                if (id == selectedAlbum.getListSong()[i].getId()) {
                    console.log(`This ID has been in used.`);
                } else {
                    idAfterCheck = id;
                    let flag2: boolean = false;
                    do {
                        let name = input.question(`Input name: `);
                        let nameAfterCheck;
                        for (let i = 0; i < selectedAlbum.getListSong().length; i++) {
                            if (name == selectedAlbum.getListSong()[i].getTitle()) {
                                console.log(`This name has been in used.`);
                            } else {
                                nameAfterCheck = name;
                                let writer = input.question(`Input artist name: `);
                                let releaseDate = input.question(`Input release date (MM/DD/YYYY)/(MM-DD-YYYY)/(MM.DD.YYYY)/(MM DD YYYY):  `);
                                let regex = /^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/;
                                let checkDate;
                                do {
                                    let releaseDate = input.question(`Input release date: `);
                                    checkDate = regex.test(releaseDate);
                                    if (checkDate == false) {
                                        console.log(`Incorrect date format. please try again.`);
                                    }
                                } while (checkDate == false);
                                let song = new Song(idAfterCheck, nameAfterCheck, writer, releaseDate);
                                selectedAlbum.addSong(song);
                                console.log(`A new song was successfully added to Album.`);
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

function displaySongInformation(selectedAlbum: Album) {
    console.log(`------List song in ${selectedAlbum.getName()}------`);
    let menu = '';
    for (let i = 0; i < selectedAlbum.getListSong().length; i++) {
        menu += `${i + 1}. Song ID: ${selectedAlbum.getListSong()[i].getId()}
        Title: ${selectedAlbum.getListSong()[i].getTitle()}
        Artist Name: ${selectedAlbum.getListSong()[i].getSinger()}
        Release Date: ${selectedAlbum.getListSong()[i].getReleaseDate()}\n`
    }
    console.log(menu);
    console.log(`0. Exit`);
    let choice = +input.question(`Select 0 to exit. `);
    if (choice == 0) {
        displaySongMenu(selectedAlbum);
    }
}

function editSongInAlbum(selectedAlbum: Album) {
    console.log(`-----Select a song to you want to edit-----`);
    let menu = '';
    for (let i = 0; i < selectedAlbum.getListSong().length; i++) {
        menu += `${i + 1}. Song ID: ${selectedAlbum.getListSong()[i].getId()} Song name: ${selectedAlbum.getListSong()[i].getTitle()}\n`
    }
    console.table(menu);
    console.log(`0. Exit`);
    let choice = +input.question(`Input your selection: `);
    if (choice == 0) {
        displaySongMenu(selectedAlbum);
    } else {
        let indexOfSong = choice - 1;
        let selectedSong: Song = selectedAlbum.getListSong()[indexOfSong];
        editSongDetail(selectedSong);
    }

}

function editSongDetail(selectedSong: Song) {
    let choice;
    console.log(`----Edit information of ${selectedSong.getTitle()}---
        1. Edit song name
        2. Edit song ID
        3. Edit singer
        4. Edit release date
        0. Exit`);
    choice = input.question(`Enter your selection: `);
    if (choice == 1) {
        editSongName(selectedSong);
        editSongDetail(selectedSong);
    } else if (choice == 2) {
        editSongId(selectedSong);
        editSongDetail(selectedSong);
    } else if (choice == 3) {
        editSongSinger(selectedSong);
        editSongDetail(selectedSong);
    } else if (choice == 4) {
        editSongReleaseDate(selectedSong);
        editSongDetail(selectedSong);
    } else if (choice == 5) {
        editSongDetail(selectedSong);
    }
}

function editSongName(selectedSong: Song) {
    let oldName = selectedSong.getTitle();
    let name = input.question(`Enter new name: `);
    if (name == oldName) {
        do {
            name = input.question(`Input another name: `);
        } while (name == oldName)
    }
    selectedSong.setTitle(name);
    console.log(`Name has been successfully updated. `);
    console.table(selectedSong);
}

function editSongId(selectedSong: Song) {
    let id = input.question('Enter new ID: ');
    selectedSong.setId(id);
    console.log("ID has been successfully updated. ");
    console.table(selectedSong);
}

function editSongSinger(selectedSong: Song) {
    let singer = input.question('Input singer name: ');
    selectedSong.setSinger(singer);
    console.log('Singer name has been successfully updated. ');
    console.table(selectedSong);
}

function editSongReleaseDate(selectedSong: Song) {
    let releaseDate = input.question('Input new release date: ');
    selectedSong.setReleaseDate(releaseDate);
    console.log('Release date has been successfully updated. ');
    console.table(selectedSong);
}

function deleteSongInAlbum(selectedAlbum: Album) {
    let menu = '';
    let choice;
    let indexOfSong;
    let selectedSong;
    for (let i = 0; i < selectedAlbum.getListSong().length; i++) {
        menu += `${i + 1}. Name ${selectedAlbum.getListSong()[i].getTitle()}`
    }
    console.log(`${menu} \n 0. Exit`);
    choice = +input.question(`Select song you want to delete: `);
    if (choice == 0) {
        displaySongMenu(selectedAlbum);
    } else {
        indexOfSong = choice - 1;
        selectedSong = selectedAlbum.getListSong()[indexOfSong];
        console.log(`Are you sure you want to delete ${selectedSong.getTitle()}:
                                 1. Yes 
                                 2. No `);
        let choice1 = +input.question(`Input your selection: `);
        if (choice1 == 1) {
            selectedAlbum.getListSong().splice(indexOfSong, 1);
            console.log(`Song has been deleted from Album. `);
        } else if (choice1 == 2) {
            editSongDetail(selectedSong);
        }
    }
}

function findAlbumByName() {
    let nameAlbum = input.question(`Input name of Album you want to find: `);
    for (let i = 0; i < albumManager.getAlbum().length; i++) {
        if (albumManager.getAlbum()[i].getName() == nameAlbum) {
            console.log(`1. ID: ${albumManager.getAlbum()[i].getId()}
            2. Name: ${albumManager.getAlbum()[i].getName()}
            3. Creator: ${albumManager.getAlbum()[i].getCreator().getUsername()}
            4. Number of Songs: ${albumManager.getAlbum()[i].getNumberOfSong()}
            5. ListSong: 
             `);
            let listSong = '';
            for (let j = 0; j < albumManager.getAlbum()[i].getListSong().length; j++) {
                listSong += `   
                5.${j + 1}. ID: ${albumManager.getAlbum()[i].getListSong()[j].getId()}
                Title: ${albumManager.getAlbum()[i].getListSong()[j].getTitle()}
                Artist Name: ${albumManager.getAlbum()[i].getListSong()[j].getSinger()}
                Release date: ${albumManager.getAlbum()[i].getListSong()[j].getReleaseDate()}\n
                `
            }
            console.log(listSong);
        }
    }
}

loginMenu();