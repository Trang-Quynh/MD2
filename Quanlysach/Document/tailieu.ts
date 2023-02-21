export class Document{
    publisherName:string;
    numberOfCopies:number;
    static id:number = 0;
    constructor(publisherName:string,numberOfCopies:number) {
        this.publisherName = publisherName;
        this.numberOfCopies = numberOfCopies;
        Document.id = Document.id++;
    }
}
export class Book extends Document{
    writerName:string;
    numberOfPage:number;
    static id:number = 0;
    constructor(publisherName:string,numberOfCopies:number,writerName:string,numberOfPage:number) {
        super(publisherName,numberOfCopies);
        this.writerName = writerName;
        this.numberOfPage = numberOfPage;
        Document.id = Document.id++;
    }
}
export class Magazine extends Document{
    releaseNumber:number;
    releaseMonth:number;//dung enum or type union
    static id:number = 0;
constructor(publisherName:string,numberOfCopies:number,releaseNumber:number,releaseMonth:number) {
    super(publisherName,numberOfCopies);
    this.releaseMonth = releaseMonth;
    this.releaseNumber = releaseNumber;
    Document.id = Document.id++;
}bao
}
export class Newspaper extends Document{
    releaseDate:number// enum 30 ngay
    constructor(publisherName:string,numberOfCopies:number, releaseDate:number) {
        super(publisherName,numberOfCopies);
        this.releaseDate = releaseDate;
    }
}