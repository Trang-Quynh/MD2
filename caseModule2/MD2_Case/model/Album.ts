//Book Manager
import {Song} from "./Song";
import {Account} from "./Account";
export class Album {
    private id:string;
    private name:string;
    private numberOfSong: number
    private creator:Account;
    private listSong:Song[] = [];

    constructor(id:string,name:string,creator:Account) {
        this.id = id;
        this.name = name;
        this.numberOfSong = this.listSong.length;
        this.creator = creator;
    }
    getName():string{
        return this.name
    }
    getId():string {
        return this.id
    }
    getNumberOfSong():number{
        return this.getListSong().length;
    }
    addSong(song:Song){
        this.listSong.push(song);
    }
    getListSong():Song[] {
        return this.listSong;
    }
    getCreator():Account{
        return this.creator;
    }
}