let numbers:number[] = [0,2,3,5,7,8,9,10];
for (let i = 0; i < numbers.length; i++) {
    if(i<=10 && numbers.indexOf(i) === -1){
        console.log(i)
    }
}