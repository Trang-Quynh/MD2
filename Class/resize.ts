class Shape {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    show(): string {
        return `I am a shape. My name is ${this.name}`;
    }
}

class Rectangle extends Shape {
    width: number;
    height: number;

    constructor(width: number,
                height: number,
                name: string) {
        super(name);
        this.width = width;
        this.height = height;
    }

    getArea(): number {
        return this.width * this.height;
    }

}

class Square extends Rectangle {
    constructor(name: string,
                width: number) {
        super(width, width, name);
    }

    getArea(): number {
        return Math.pow(this.width, 2)
    }
}

interface Resize {
    resize(percent: number): void;
}

class Circle extends Shape implements Resize {
    radius: number;

    constructor(name: string, radius: number) {
        super(name);
        this.radius = radius;
    }

    getArea(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }

    resize(percent: number): number {
        this.radius = (this.radius + (this.radius * percent) / 100);
        return this.radius;
    }
    getAreaAfterResize(percent: number): number {
        let newRadius: number = this.resize(percent)
        return Math.PI * Math.pow(newRadius, 2)
    }
}

let circle1 = new Circle("circle1", 2);
console.log(circle1.getArea());
circle1.resize(50);
console.log(typeof (circle1.resize(50)));
console.log(circle1.getAreaAfterResize(50));






