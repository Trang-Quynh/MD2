export interface IManager <T>{
    add(data:T):void;
    edit(id:number,data:T):void;
    showAll():T[];
    findByID(id:number):number;
    remove(id:number):void;
}