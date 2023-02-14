abstract class Animal{
    abstract makeSound():string;
}
class Tiger extends Animal{
    makeSound():string{
        return "Tiger:roar!";
    }
}
interface Edible{
    howToEat():string;
}
class Chicken extends Animal implements Edible{
    makeSound():string{
        return "Chicken: cluck-cluck!"
    }
    howToEat():string{
        return "Could be boiled"
    }
}
//
abstract class Animalsfruit implements Edible{
    abstract howToEat(): string;
}

class Orange extends Animalsfruit{
    howToEat(): string {
        return "Orange could be juiced";
    }
}
class Apple extends Animalsfruit{
    howToEat(): string {
        return "Apple could be sliced";
    }
}
let fruit = [];
fruit[1] = new Apple();
fruit[2] = new Orange();
fruit.forEach(item =>{
    console.log(item.howToEat())});

