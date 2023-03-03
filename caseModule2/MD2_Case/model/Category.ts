//Book Manager
import {Song} from "./Song";
import {Account} from "./Account";
export class Category{
    private id:number;
    private name:string;
    private numberOfSong: number
    private creator:Account;
    private listSong:Song[] = [];

    constructor(id:number,name:string,creator:Account) {
        this.id = id;
        this.name = name;
        this.creator = creator;
        this.numberOfSong= this.listSong.length;
    }
    getName():string{
        return this.name
    }
    getId():number {
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