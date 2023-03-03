export class Song {
    private id: string;
    private title: string;
    private singer: string;
    private releaseDate: string;

    constructor(id: string, title: string, singer: string, releaseDate: string) {
        this.id = id;
        this.title = title;
        this.singer = singer;
        this.releaseDate = releaseDate;
    }
    getId(): string {
        return this.id;
    }
    setId(value: string) {
        this.id = value;
    }
    getTitle(): string {
        return this.title;
    }
    setTitle(value: string) {
        this.title = value;
    }
    getSinger(): string {
        return this.singer;
    }
    setSinger(value: string) {
        this.singer = value;
    }
    getReleaseDate(): string {
        return this.releaseDate;
    }
    setReleaseDate(value: string) {
        this.releaseDate = value;
    }
}