export class Account {
    private id: string
    private username: string;
    private password: string;
    private status:string = 'ON'

    constructor(id: string, username: string, password: string, status:string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.status = status;
    }

    getUsername(): string {
        return this.username;
    }

    setUsername(value: string) {
        this.username = value;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(value: string) {
        this.password = value;
    }

    getId(): string {
        return this.id;
    }

    setId(value: string) {
        this.id = value;
    }
    getStatus():string{
        return this.status
    }
    setStatus(status:string):void{
        this.status = status;
    }
}
