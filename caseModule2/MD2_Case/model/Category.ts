//Book Manager
import {Book} from "./Book";
export class Category{
    private id:string;
    private name:string;
    private numberOfBook: number
    private listBook:Book[] = [];

    constructor(id:string,name:string) {
        this.id = id;
        this.name = name;
        this.numberOfBook = 0;
    }

    addBook(book:Book){
        this.listBook.push(book);
        this.numberOfBook++;
    }
    getBook():Book[] {
        return this.listBook;
    }
}