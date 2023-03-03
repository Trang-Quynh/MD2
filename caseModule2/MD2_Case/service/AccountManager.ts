import {Account} from "../model/Account";
export class AccountManager{
    listAccount:Account[] = [];

    constructor() {
        let accAdmin = new Account('Trang1997','Quynh Trang', 'trang1997', 'ON');
        this.listAccount.push(accAdmin);
    }


    add(account: Account) {
        this.listAccount.push(account);
    }
    deleteById(id: string){
        let flag = false;
        for (let i = 0; i < this.listAccount.length ; i++) {
            if(this.listAccount[i].getId() == id){
                let accountName = this.listAccount[i].getUsername();
                this.listAccount.splice(i,1)
                console.log(`\n${accountName} has been successfully deleted. `);
                flag = true;
            }
        }
        if(flag == false){
            console.log(`Couldn't find account!`)
        }
    }
    findByName(name: string) {
        for (let i = 0; i < this.listAccount.length; i++) {
            if(this.listAccount[i].getUsername().toLowerCase() == name.toLowerCase()){
                return this.listAccount[i]
            }
        }
        return `Couldn't find your Account!`
    }

    findAll() {
        return this.listAccount;
    }

    findAllAccount() {
        let strAccount = ``
        for (let i = 1; i < this.listAccount.length; i++) {
            strAccount += `${i}. ID: ${this.listAccount[i].getId()} - UserName: ${this.listAccount[i].getUsername()} - Password: ${this.listAccount[i].getPassword()} - Status: ${this.listAccount[i].getStatus()}\n`
        }
        return strAccount;
    }
}