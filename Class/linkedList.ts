// @ts-ignore
class Node<T>{
    data:T;
    next:Node<T>|null= null;
    constructor(data:T) {
        this.data = data;
    }
    readData():T{
        return this.data;
    }
}
class LinkedList<T>{
    head:Node<T>|null;
    tail:Node<T>|null;
    size:number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    insertFirstNode(data:T):void{
        let node = new Node(data);
        node.next = this.head;
        this.head = node;


    }
}
