let a:number = 0;
let b:number = 1;
let c:number = 0;
let sum:number = 0;
function fibonacci(num:number):number {
    for (let i = 0; i < num; i++) {
        c = a + b;
        a = b;
        b = c;
        console.log(c);
        sum = sum + c
    }
    return sum + 1;
}

console.log(fibonacci(18))

