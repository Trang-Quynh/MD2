enum permission{
    admin = 1,
    user = 2
}
class User {
    protected name: string;
    protected email: string;
    public role: permission;

    constructor(name: string, email: string, role: permission) {
        this.name = name;
        this.email = email;
        this.role = role;
    }

    get getInformation() {
        return (`${this.name} + ${this.email} + ${this.role}`)
    }

    isAdmin() {
        if (this.role === 1) {
            console.log("Admin")
        } else if(this.role ===2){
            console.log("Normal user")
        }
    }

    set setName(newName:string) {
        this.name = newName;
    }
    set setEmail(newEmail:string) {
        this.email = newEmail;
    }

    set setRole(newRole:permission) {
        this.role = newRole;
    }
}
let user1 = new User('abc','123',1);
let user2 = new User('def','456',2);
console.log(user2.isAdmin())
user1.setName = 'tets'
user1.setEmail = 'test@gmail.com'
console.log(user1)