var express = require('express');
var app = express()
var fs = require('fs');

app.set('view engine', 'hbs')
app.use(express.urlencoded({extend:true}))// cho phep lay du lieu nguoi dung day len server tu cac input

app.get('/',function(req, res){
    let n = new Date()
    let name = "Captain Jack"
    let studentFood = []
    let data = fs.readFile("data.txt","utf-8",function(err,data){
        let data2=data.trim().split('\n')
        for(i=0;i<data2.length;i++){
            let s = data2[i].split(";")
            let studentElement = {
                name: s[0], 
                food:s[1]
            }
            studentFood.push({name: s[0], food:s[1]})
        }
        res.render('home',{'studentFood': studentFood})
    })
    //res.render('home',{'now':n, 'name':name})
})

app.post('/registerLunch',function(req, res){
    let name = req.body.txtName
    let food = req.body.food
    let userInfo = {
        'name':name,
        'food':food
    }
    res.render('thank',{'userInfo':userInfo})

    var content = 'Nội dung này tôi muốn ghi vào file writer.html';
    //sử dụng phương thức writeFile để ghi nội dung vào file
    fs.appendFile('data.txt', userInfo.name + " " + userInfo.food + "\n", 'utf8', function(err) {
        //Kiểm tra nếu có lỗi thì xuất ra lỗi+ 
        if (err)
            throw err;
        else //nếu không thì hiển thị nội dung ghi file thành công
            console.log('Ghi file thanh cong!');
    });
})


app.get('/students', function(req, res){
    let food = ['com', 'ga','bo','mi tom']
    let food2 = []
    for(i=0;i<food.length;i++){
        food2.push(food[i].toUpperCase())
    }
    res.render('students',{'food':food2})
})

app.listen(5000)
console.log('server is running!')