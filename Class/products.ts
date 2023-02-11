class Products{
    name:string;
    price:number;
    constructor(name:string,price:number) {
        this.name = name;
        this.price = price;
    }
    get getName():string{
        return this.name;
    }
    get getPrice():number{
        return this.price;
    }
    set setName(newName:string){
        this.name = newName;
    }
    set setPrice(newPrice:number){
        this.price = newPrice;
    }
}
class ProductManager{
    productList : Products[] = [];
    constructor() {
    }
    get getAll(){
        return this.productList;
    }
    set add(product:Products){
        this.productList.push(product);
    }
}
let laptop = new Products("laptop",2000);
let iphone = new Products("iphone",1000);
let productManager = new ProductManager();
productManager.add = laptop;
productManager.add = iphone;
console.log(productManager.getAll)
