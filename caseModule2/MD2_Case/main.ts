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
        1. Edit account
        2. Add new Album
        3. Edit Album
        4. Delete Album
        5. Find Album
        6. Show all Album
        7. Account manager (for admin only)
        0. Back to previous menu`
        )
        choice = +input.question(`\nEnter your selection: `);
        switch (choice) {
            case 1:
                editAccountMenu();
                break
            case 2:
                addAlbum();
                break;
            case 3:
                editAlbum();
                break;
            case 4:
                deleteAlbumOfCurrentAcc();
                break;
            case 5:
                findAlbumByName();
                break;
            case 6:
                showAllAlbum();
                break;
            case 7:
                menuAccManager();
                break;
            case 0:
                loginMenu();
        }
    } while (choice != 0);
}
function editAccountMenu(){
    let choice;
    do {
        console.log(`
        1. Edit Name
        2. Edit ID
        0. Exit\n`)
        choice = +input.question(`Enter your selection: `);
        switch (choice){
            case 1:
                editAccountName();
                break;
            case 2:
                editAccountId();
                break;
            case 0:
                main();
        }
    }while(choice != 0)
}
function editAccountName() {
    let name = input.question(`Input new name: `)
    let oldName = currentAcc.getUsername();
    let regex = /^[a-z A-Z\-]+$/;
    let test = regex.test(name);
    let flagCheckName = false;
    if (name == oldName) {
        console.log(`Input a new name that is not the same as the old one.`);
        editAccountName();
    }
        for (let i = 0; i < accountManager.listAccount.length; i++) {
            if (name == accountManager.listAccount[i].getUsername()) {
                console.log(`This name has already been in used. Input again.`);
                editAccountName();
                flagCheckName = true;
            }
        }
        if (test == true && flagCheckName == false) {
            let index:number = -1;
            for (let i = 0; i < accountManager.listAccount.length; i++) {
                if(accountManager.listAccount[i].getUsername() == currentAcc.getUsername()){
                    index = i;
                }
            }
            accountManager.listAccount[index].setUsername(name);
            currentAcc.setUsername(name);
            console.log('Username has been successfully updated.');
            console.log(currentAcc);
            editAccountMenu();
        } else if (!test) {
            console.log('Name is invalid. Input again.')
            editAccountName();
        }
}
function editAccountId(){
    let id = input.question(`Input new Id: `)
    let oldId = currentAcc.getId();
    let regex = /^ACC[0-9]{3}$/;
    let test = regex.test(id);
    let flagCheckId = false;
    if (id == oldId) {
        console.log(`Input a new id that is not the same as the old one.`);
        editAccountId();
    }
    for (let i = 0; i < accountManager.listAccount.length; i++) {
        if (id == accountManager.listAccount[i].getId()) {
            console.log(`This id has already been in used. Input again.`);
            editAccountId();
            flagCheckId = true;
        }
    }
    if (test == true && flagCheckId == false) {
        let index:number = -1;
        for (let i = 0; i < accountManager.listAccount.length; i++) {
            if(accountManager.listAccount[i].getId() == currentAcc.getId()){
                index = i;
            }
        }
        accountManager.listAccount[index].setId(id);
        currentAcc.setId(id);
        console.log('Id has been successfully updated.');
        console.log(currentAcc);
        editAccountMenu();
    } else if (!test) {
        console.log('Id is invalid. Input again.')
        editAccountId();
    }
}

function showAllAlbum() {
    albumManager.showAll()
    main();
}

function menuAccManager() {
    if (currentAcc.getUsername() == `Quynh Trang` && currentAcc.getId() == `ACC000`) {
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
                case 0:
                    main();
                    break;
            }
        } while (choice != 0);
    }else{
        console.log(`\nYou must be an administrator of library to perform these tasks.`);
        loginMenu();
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
    let choice;
    do {
        console.log(`
        1. Delete by ID
        2. Forgot ID
        0. Back to previous menu
        `)
        choice = +input.question(`Enter your selection: `);
        if(choice == 1){
            let id = input.question(`Input account id you want to delete: `);
            accountManager.deleteById(id);
        }else if(choice == 2) {
            let menu = '';
            for (let i = 1; i < accountManager.listAccount.length; i++) {
                menu += `${i}. ID: ${accountManager.listAccount[i].getId()} - Name: ${accountManager.listAccount[i].getUsername()} - Status: ${accountManager.listAccount[i].getStatus()}\n`
            }
            console.table(menu);
            console.log(`Enter 0 to exit: `);
            let choice1 = +input.question(`\nSelect the account you want to delete: `);
            if (choice1 == 0) {
                menuAccManager();
            } else {
                let id = accountManager.listAccount[choice1].getId();
                accountManager.deleteById(id);
            }
        }
    }while(choice != 0)
}

function showAccount() {
    console.log(accountManager.findAllAccount());
    main();
}

function addAlbum() {
    let flag: boolean = false;
    do {
        let id = input.question(`Input an album code that begins with AB followed by three digits (like AB001): `);
        let regex = /^AB[0-9]{3}$/;
        let testAlbumId = regex.test(id);
        let AlbumIdAfterCheck: string;
        for (let i = 0; i < albumManager.getAlbum().length; i++) {
            if (albumManager.getAlbum()[i].getId() == id) {
                // testAlbumId = false;
                console.log(`This album code has already been in used. Input again.`);
                addAlbum();
            }
        }
        if (testAlbumId == false) {
            console.log(`code is not valid. Please try again. `);
        } else {
            let flag2: boolean = false;
            AlbumIdAfterCheck = id;
            do {
                let AlbumName = input.question(`Input Album name, allow alphabet, digits and hyphens: `);
                regex = /^[0-9 a-zA-Z\-]+$/;
                let testAlbumName = regex.test(AlbumName);
                let AlbumNameAfterCheck: string;
                let flagCheckName: boolean = false;
                for (let i = 0; i < albumManager.getAlbum().length; i++) {
                    if (albumManager.getAlbum()[i].getName() == AlbumName && testAlbumName == true) {
                        flagCheckName = true;
                        console.log(`Album name has already been in used. Input again.`);
                        flag2 = true;
                    }
                }
                if (flagCheckName == false && testAlbumName == false) {
                    console.log(`Album name is not valid. Please try again.`);
                    flag2 = true;
                }else if (flagCheckName == false && testAlbumName == true) {
                    AlbumNameAfterCheck = AlbumName;
                    let album = new Album(AlbumIdAfterCheck, AlbumNameAfterCheck, currentAcc);
                    albumManager.addAlbum(album);
                    console.log(`A new Album has been successfully added to library.`);
                    flag = true;
                    flag2 = false;
                    main();
                }
            } while (flag2 == true)
        }
    } while (flag == false);
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
        console.log(`\n------Menu edit Song of Album ${selectedAlbum.getName()}-----
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
    let id, name;
    let writer;
    if (selectedAlbum.getListSong().length == 0) {
        do{
            id = input.question(`Input ID: `);
        }while(id == '');
        do{
            name = input.question(`Input name: `);
        }while(name == '')
        do{
            writer = input.question(`Input artist name: `);
        }while(writer == '')
        let regex = /^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/;
        let releaseDate = input.question(`Input release date (MM/DD/YYYY)/(MM-DD-YYYY)/(MM.DD.YYYY)/(MM DD YYYY): `);
        let checkDate = regex.test(releaseDate);
        if (checkDate == false) {
            do {
                console.log(`Incorrect date format. please try again.`);
                releaseDate = input.question(`Input release date (MM/DD/YYYY)/(MM-DD-YYYY)/(MM.DD.YYYY)/(MM DD YYYY): `);
                checkDate = regex.test(releaseDate);
            } while (checkDate == false);
        }
        let song = new Song(id, name, writer, releaseDate);
        selectedAlbum.addSong(song);
        console.log(`A new song was successfully added to Album.\n`);
    }else{
        let flag: boolean = false
        do {
            do{
                id = input.question(`Input ID: `);
            }while(id == '');
            let check: boolean = true;
            for (let i = 0; i < selectedAlbum.getListSong().length; i++) {
                if (id === selectedAlbum.getListSong()[i].getId()) {
                    check = false;
                    console.log(`This ID already exits.`);
                    break;
                }
            }
            if (check){
                    let flag2: boolean = false;
                    do {
                        do{
                            name = input.question(`Input name: `);
                        }while(name == '');
                        let checkName: boolean = true;
                        for (let i = 0; i < selectedAlbum.getListSong().length; i++) {
                            if (name == selectedAlbum.getListSong()[i].getTitle()) {
                                console.log(`This title already exits.`);
                                checkName = false;
                            }
                        }
                        if (checkName == true) {
                            do{
                                writer = input.question(`Input artist name: `);
                            }while(writer == '')
                            let releaseDate = input.question(`Input release date (MM/DD/YYYY)/(MM-DD-YYYY)/(MM.DD.YYYY)/(MM DD YYYY):  `);
                            let regex = /^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/;
                            let checkDate = regex.test(releaseDate);
                            if (checkDate == false) {
                                do {
                                    console.log(`Incorrect date format. please try again.`);
                                    releaseDate = input.question(`Input release date (MM/DD/YYYY)/(MM-DD-YYYY)/(MM.DD.YYYY)/(MM DD YYYY): `);
                                    checkDate = regex.test(releaseDate);
                                } while (checkDate == false);
                            }
                            let song = new Song(id, name, writer, releaseDate);
                            selectedAlbum.addSong(song);
                            console.log(`A new song was successfully added to Album.`);
                            flag = true;
                            flag2 = true;
                            return;
                        }
                    } while (flag2 == false)
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
        editSongDetail(selectedSong,selectedAlbum);
    }

}

function editSongDetail(selectedSong: Song,selectedAlbum:Album) {
    let choice;
    console.log(`----Edit information of ${selectedSong.getTitle()}---
        1. Edit song name
        2. Edit song ID
        3. Edit singer
        4. Edit release date
        0. Exit`);
    choice = input.question(`Enter your selection: `);
    if (choice == 1) {
        editSongName(selectedSong,selectedAlbum);
        editSongDetail(selectedSong,selectedAlbum);
    } else if (choice == 2) {
        editSongId(selectedSong,selectedAlbum);
        editSongDetail(selectedSong,selectedAlbum);
    } else if (choice == 3) {
        editSongSinger(selectedSong);
        editSongDetail(selectedSong,selectedAlbum);
    } else if (choice == 4) {
        editSongReleaseDate(selectedSong);
        editSongDetail(selectedSong,selectedAlbum);
    } else if (choice == 5) {
        editSongDetail(selectedSong,selectedAlbum);
    }
}

function editSongName(selectedSong:Song,selectedAlbum:Album) {
    let flagCheck:boolean = false;
    let oldTitle = selectedSong.getTitle();
    do {
        let title = input.question('Enter new title: ');
        if(title == ''){
            console.log(`Title cannot be left blank.`);
            flagCheck = true;
        }
        if (title == oldTitle) {
            console.log(`Input a title that is different from the previous one.`);
            flagCheck = true;
        }
        if(title != oldTitle && title != ''){
            let flag2:boolean = false;
            for (let i = 0; i < selectedAlbum.getListSong().length; i++) {
                if (title == selectedAlbum.getListSong()[i].getTitle()) {
                    console.log(`This title already exists.`);
                    flagCheck = true;
                    flag2 = true;
                }
            }
            if(flag2 == false){
                selectedSong.setTitle(title);
                console.log(`Title has been successfully updated. `);
                console.table(selectedSong);
                flagCheck = false;
            }
        }
    }while(flagCheck == true);
}

function editSongId(selectedSong:Song,selectedAlbum:Album) {
    let flagCheck:boolean = false;
    let oldId = selectedSong.getId();
    do {
        let id = input.question('Enter new ID: ');
        console.log(id);
        console.log(typeof(id))
        if(id == ''){
            console.log(`ID cannot be left blank.`);
            flagCheck = true;
        }
        if (id == oldId) {
            console.log(`Input an ID that is different from the previous one.`);
            flagCheck = true;
        }
        if(id != oldId && id != ''){
            let flag2:boolean = false;
            for (let i = 0; i < selectedAlbum.getListSong().length; i++) {
                if (id == selectedAlbum.getListSong()[i].getId()) {
                    console.log(`This id already exists.`);
                    flagCheck = true;
                    flag2 = true;
                }
            }
            if(flag2 == false){
                selectedSong.setId(id);
                console.log(`Id has been successfully updated. `);
                console.table(selectedSong);
                flagCheck = false;
            }
        }
    }while(flagCheck == true);
}

function editSongSinger(selectedSong: Song) {
    let singer;
    do {
        singer = input.question('Input singer name: ');
    }while(singer == '')
    selectedSong.setSinger(singer);
    console.log('Singer name has been successfully updated. ');
    console.table(selectedSong);
}

function editSongReleaseDate(selectedSong: Song) {
    let releaseDate = input.question('Input new release date: ');
    let regex = /^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/;
    let checkDate = regex.test(releaseDate);
    if (checkDate == false) {
        do {
            console.log(`Incorrect date format. Please try again.`);
            releaseDate = input.question(`Input release date (MM/DD/YYYY)/(MM-DD-YYYY)/(MM.DD.YYYY)/(MM DD YYYY): `);
            checkDate = regex.test(releaseDate);
        } while (checkDate == false);
    } else {
        selectedSong.setReleaseDate(releaseDate);
        console.log('Release date has been successfully updated. ');
        console.table(selectedSong);
    }
}


function deleteSongInAlbum(selectedAlbum: Album) {
    let menu = '';
    let choice;
    let indexOfSong;
    let selectedSong;
    for (let i = 0; i < selectedAlbum.getListSong().length; i++) {
        menu += `${i + 1}. Name ${selectedAlbum.getListSong()[i].getTitle()}\n`
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
            editSongDetail(selectedSong,selectedAlbum);
        }
    }
}

function findAlbumByName() {
    let nameAlbum;
    let flagCheck:boolean = false;
    do{
        nameAlbum = input.question(`Input name of Album you want to find: `);
    }while(nameAlbum == '')
    for (let i = 0; i < albumManager.getAlbum().length; i++) {
        if (albumManager.getAlbum()[i].getName() == nameAlbum) {
            flagCheck = true;
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
    if(flagCheck == false){
        console.log(`Album not found.`)
    }
}

loginMenu();