console.log("Hello World")

function xinChao(ten){
    console.log("Hello " + ten)
}
//khai bao bien 
var ten1 = "Cuong"
xinChao("Phuong")
for(i=1;i<4;i++){ 
    xinChao(ten1)
}

// for(i=0;i<ten1.length;i++){
//     console.log(ten1[i] + '\n')
// }
// console.log(isNaN("123"))

let ten2 = "cuong$123"
for(i=0;i<ten2.length;i++){
    if(isNaN(ten2[i])){
        console.log(ten2[i] + ' khong phai la so')
    }else {
        console.log(ten2[i] + ' la so')
    }
}
let color = "Xanh;Do;Hong;Tim"
let mang = color.split(";")
for(i=0;i<mang.length;i++){
    console.log(mang[i].toUpperCase())
}