function Person(_age, _name){


  this.age = _age;


  this.name = _name;


}


// Thêm thuộc tính vào thuộc tính prototype của hàm khởi tạo


Person.prototype.height = 0;


//Tạo ra 1 đối tượng của Person, có cả 3 thuộc tính của mẫu khởi tạo Person


var codegym = new Person(10, "CodeGym");


for (var prop in codegym){


  console.log(prop);


}


//Xem đối tượng prototype của instance vừa tạo





