// function check(num:number){
//     if(num%2 == 0){
//         console.log(`${num} la so chan.`);
//     }else{
//         console.log(`num la so le.`)
//     }
// }
// check(2);

// function bai2(a:number,b:number){
//     for (let i = a; i <= b; i++) {
//         if(i%2 != 0){
//             console.log(i)
//         }
//     }
// }
// bai2(3,9)
// function bai3(a:number, b:number){
//     let sum = 0;
//     for (let i = a; i <= b; i++) {
//         sum = sum + i;
//     }
//     console.log(sum)
// }
// bai3(1,4);
// function bai4(n:number){
//     let sum = 0;
//     // @ts-ignore
//     for (let i=1,j=i+1;i<=n,j<=n+1;i++,j++) {
//         sum = sum + i*j
//     }
//     return sum;
// }
//
// console.log(bai4(3));
// function bai5(n:number){
//     for (let i = 0; i <= n; i++) {
//         if(n%i == 0){
//             console.log(i);
//         }
//     }
// }
// bai5(5)

// function bai5(n:number){
//     let multiple = n;
//     for (let i = 1; multiple<100; i++) {
//         multiple = n*i;
//         console.log(multiple)
//     }
// }
// bai5(4);
// function bai5(n:number){
//     let multiple = n;
//     let i = 1;
// while(multiple<100){
//     multiple = n*i;
//     if(multiple >= 100){
//         return;
//     }
//     console.log(multiple)
//     i++
//     }
// }
// bai5(10)
// function readNumber(n:number) {
//     let arr: string[] = [`khong`, `mot`, `hai`, `ba`, `bon`, `nam`, `sau`, `bay`, `tam`, `chin`,`muoi`];
//     if (n < 10) {
//         for (let i = 0; i < 10; i++) {
//             if (i = n) {
//                 console.log(arr[i]);
//                 return;
//             }
//         }
//     }else{
//         if(n%10 == 0 && n>10){
//             for (let i = 0; i < 10; i++) {
//                 let num = n.toString();
//                 if(num[0] == i.toString()){
//                     console.log(arr[i] +  ` muoi`)
//                 }
//             }
//             console.log(``)
//         }else if(n%5 == 0 && n%10 != 0){
//             for (let i = 0; i < 10; i++) {
//                 let num = n.toString();
//                 if(num[0] == i.toString()){
//                     console.log(arr[i] + ` mươi lăm`)
//                 }
//             }
//         }else{
//             for (let i = 0; i < 10; i++) {
//                 for (let j = 0; j < 10; j++) {
//                     let num = n.toString();
//                     if(num[0] == i.toString() && num[1] == j.toString()){
//                         console.log(arr[i]+ " muoi " + arr[j]);
//                     }
//
//                 }
//             }
//         }
//
//     }
// }
// readNumber(10);
// function sum(arr:number[]){
//     let sum = 0;
//     for (let i = 0; i < arr.length; i++) {
//         if(i %2 != 0){
//             sum = sum + arr[i];
//         }
//     }
//     return sum
// }
// let arr = [33,44,55,22];
// console.log(sum(arr))
// @ts-ignore
// let input = require(`readline-sync`);
// let a;
// let b;
// let c;
// function print(a:number,b:number,c:number){
//     let arr:number[];
//     a = +input.question(`nhap a: `);
//     arr.push(a);
//     let flag = false;
//     do{ for (let i = 0; i < arr.length; i++) {
//         b = +input.question(`nhap b: `)
//         if(arr.indexOf(b) == -1){
//             arr.push(b);
//             flag = true;
//     }
//     }while(flag !== false)
//
//
//     b = +input.question(`nhap b: `)
//     c = +input.question(`nhap c: `)
//
// }
// function ranbanhdanem(n:number){
//     if(n%9 == 0){
//         console.log(n/9)
//     }else if(n%9 !== 0){
//         console.log(Math.floor(n/9) + 1);
//     }
// }
// ranbanhdanem(2)

function tinhTuoi(n:number){
   let nam = Math.floor(n/365);
   let mode = n%365;
   let thang = Math.floor(mode/30);
   let ngay = mode%30


    console.log(`so nam ${nam}`)
    console.log(mode)
    console.log(`so thang ${thang}`)
    console.log(`So ngay ${ngay}`)
}
tinhTuoi(900)





