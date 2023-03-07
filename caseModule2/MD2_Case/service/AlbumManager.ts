import {Album} from "../model/Album";
export class AlbumManager {
    private AlbumList: Album[] = [];
    addAlbum(Album: Album) {
        this.AlbumList.push(Album);
    }

    getAlbum(): Album[] {
        return this.AlbumList;
    }
    deleteAlbum(index:number):void{
        this.AlbumList.splice(index)
    }
    getListAlbum(){
        console.log(this.AlbumList);
    }
    showAll():void{
        console.log(`-------Album list------`);
        let menu = '';
        for (let i = 0; i < this.getAlbum().length; i++) {
                menu += `
            ${i+1}. Album Name: ${this.getAlbum()[i].getName()}
            1. ID: ${this.getAlbum()[i].getId()}
            2. Creator: ${this.getAlbum()[i].getCreator().getUsername()}
            3. Number of Songs: ${this.getAlbum()[i].getNumberOfSong()}
            4. ListSong\n`;
            for (let j = 0; j < this.getAlbum()[i].getListSong().length; j++) {
                menu += `   
                4.${j+1}. ID: ${this.getAlbum()[i].getListSong()[j].getId()}
                Title: ${this.getAlbum()[i].getListSong()[j].getTitle()}
                Artist Name: ${this.getAlbum()[i].getListSong()[j].getSinger()}
                Release date: ${this.getAlbum()[i].getListSong()[j].getReleaseDate()}\n
                `}
            }
        console.log(menu);
        }
}

