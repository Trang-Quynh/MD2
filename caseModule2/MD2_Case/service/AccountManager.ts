import {Account} from "../model/Account";
export class AccountManage{
    listAccount:Account[] = [];

    constructor() {
        let accAdmin = new Account('Trang1997','Quynh Trang', 'trang1997');
        this.listAccount.push(accAdmin);
    }


    add(account: Account) {
        this.listAccount.push(account);
    }
    deleteById(id: string){
        let flag = false;
        for (let i = 0; i < this.listAccount.length ; i++) {
            if(this.listAccount[i].getId() == id){
                this.listAccount.splice(i,1)
                console.log(`xoa thanh cong`);
                flag = true;
            }
        }
        if(flag == false){
            console.log(`acc not found`)
        }
    }
    findByName(name: string) {
        for (let i = 0; i < this.listAccount.length; i++) {
            if(this.listAccount[i].getUsername().toLowerCase() == name.toLowerCase()){
                return this.listAccount[i]
            }
        }
        return `Acc not found!`
    }

    findAll() {
        return this.listAccount;
    }

    findAllAccount() {
        let strAccount = ``
        for (let i = 0; i < this.listAccount.length; i++) {
            strAccount += `${i + 1}. UserName: ${this.listAccount[i].getUsername()} . Password: ${this.listAccount[i].getPassword()}\n`
        }
        return strAccount;
    }
}