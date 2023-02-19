
interface IArrayList<T>{
    add(data:T):void;
    get(index:number):T;
    size():number;
    remove():void
}

class ArrayList<T> implements IArrayList<T>{
    arrayList:Array<T>;
    constructor() {
        this.arrayList = []
    }
    add(data: T): void {
        this.arrayList.push(data);
    }
    get(index: number): T {
        return this.arrayList[index];
    }
    remove(): void {
        this.arrayList.pop();
    }
    size(): number {
        return this.arrayList.length;
    }
}
interface Post{
    title:string;
}
let arrayList1 = new ArrayList<Post>();
let post1 = {title:"JS"};
let post2 = {title:"JS"};
let post3 = {title:"JS"};
arrayList1.add(post1);
arrayList1.add(post2);
arrayList1.add(post3);
// console.log(arrayList1)
console.log(arrayList1.get(0))
console.log(arrayList1.size())

// interface IArrayList<T> {
//     add(data: T): void;
//     get(index: number): T;
//     size(): number;
//     remove(): void;
// }
// class ArrayList<T> implements IArrayList<T>{
//     container: Array<T>;
//
//     constructor() {
//         this.container = [];
//     }
//
//     add(data: T): void {
//         this.container.push(data);
//     }
//     get(index: number): T {
//         return this.container[index];
//     }
//
//     remove(): void {
//         this.container.pop()
//     }
//     size(): number {
//         return this.container.length;
//     }
// }
// interface Post {
//     title: string
// }
//
// let arrayList = new ArrayList<Post>();
// arrayList.add({title: 'Lập trình JS'});
// arrayList.add({title: 'Lập trình PHP'});
// arrayList.add({title: 'Lập trình Java'});
// // console.log(arrayList.container)
// console.log(arrayList.size());