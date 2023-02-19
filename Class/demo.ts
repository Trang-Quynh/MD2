// let string:string = "elle";
// let arr = string.split( '');
// console.log(arr);

class Stack{
   static container: string[] = [];
    constructor() {
    }
    static push(arr:string[]):void{
        arr.forEach(item=>{this.container.push(item)})
    }
    static pop():string|undefined{
        return this.container.pop()
    }
}
class Queue{
    static container: string[] = [];
    constructor() {
    }
    static push(arr:string[]):void{
        arr.forEach(item=>{this.container.push(item)})
    }
    static shift():string|undefined{
        return this.container.shift();
    }
}
function compare(string:string){
let arr = string.split( '');
Stack.push(arr);
Queue.push(arr)
    for (let i = 0; i < arr.length; i++) {
        if(Stack.pop() != Queue.shift()){;
            return false;
        }
    }
}
function check(string:string){
    if(compare(string) === false){
        console.log(`${string} is not palindrome.`)
    }else{
        console.log(`${string} is a palindrome.`)
    }
}
check("hello")

