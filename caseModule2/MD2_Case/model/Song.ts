export class Song {
    private id: string;
    private name: string;
    private writer: string;
    private releaseDate: string;

    constructor(id: string, name: string, writer: string, releaseDate: string) {
        this.id = id;
        this.name = name;
        this.writer = writer;
        this.releaseDate = releaseDate;
    }
    getId(): string {
        return this.id;
    }
    setId(value: string) {
        this.id = value;
    }
    getName(): string {
        return this.name;
    }
    setName(value: string) {
        this.name = value;
    }
    getWriter(): string {
        return this.writer;
    }
    setWriter(value: string) {
        this.writer = value;
    }
    getReleaseDate(): string {
        return this.releaseDate;
    }
    setReleaseDate(value: string) {
        this.releaseDate = value;
    }
}