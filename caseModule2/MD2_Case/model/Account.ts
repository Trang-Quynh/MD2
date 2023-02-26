export class Account {
    private id: string
    private username: string;
    private password: string;


    constructor(id: string, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;

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
}
