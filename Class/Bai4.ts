
class Book{
    title:string = '';
    author:string = '';
    alreadyRead:boolean;
constructor(title:string,author:string,alreadyRead:boolean) {
    this.title = title;
    this.author = author;
    this.alreadyRead = alreadyRead
}
}
let bookList: Book[]= [];
bookList.push(new Book("The design of every day things", "Don Norman",false));
bookList.push(new Book("The most human human", "Brian Christian",true));
function showBook(book:Book){
    console.log(book)
}
bookList.forEach(showBook);
