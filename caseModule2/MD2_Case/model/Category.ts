//Book Manager
import {Book} from "./Book";
import {Account} from "./Account";
export class Category{
    private id:number;
    private name:string;
    private numberOfBook: number
    private creator:Account;
    private listBook:Book[] = [];

    constructor(id:number,name:string,creator:Account) {
        this.id = id;
        this.name = name;
        this.creator = creator;
        this.numberOfBook = this.listBook.length;
    }
    getName():string{
        return this.name
    }
    getId():number {
        return this.id
    }
    getNumberOfBook():number{
        return this.getListBook().length;
    }
    addBook(book:Book){
        this.listBook.push(book);
    }
    getListBook():Book[] {
        return this.listBook;
    }
    getCreator():Account{
        return this.creator;
    }
}