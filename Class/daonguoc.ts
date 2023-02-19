// function reverse(array:any[]) {
//     let stack = [];
//     for (let i = 0; i < array.length; i++) {
//         stack.push(array[i]);
//     }
//     let reverseArray: any[] = [];
//
//     while (stack.length > 0) {
//         reverseArray += stack.pop();
//     }
//     return reverseArray;
// }
// console.log(reverse([1,2,3,4,5]));
class Stack{
    container: number[] = [];
    constructor() {
    }
    push(arr:number[]):void {
        arr.forEach(item => {
            this.container.push(item)
        })
    }
    reverse():number[]{
        let reverseArray:number[] = [];
       while(this.container.length>0) {
           let value = this.container.pop()
           if (value != undefined) {
               reverseArray.push(value);
           }
       }
        return reverseArray;
    }
}
let stack = new Stack();
stack.push([1,2,3,4,5]);
console.log(stack.reverse());