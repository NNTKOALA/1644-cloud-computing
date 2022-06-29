var express = require('express')
var app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://nguyentrung:nntrung382k2@cluster0.ahp8d.mongodb.net/test'

app.post('/search', async (req, res) => {
    let name = req.body.txtSearch
    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //get data
    let result = await dbo.collection('student').find({ 'name': name }).limit(1).toArray()
    if(result == 0){
        res.write('Not found')
        res.end()
    }else{
        let firstStudent = result[0]
        let a = firstStudent.name
        res.write('Found it')
        console.log(firstStudent._id)
        let result2 = await dbo.collection("grade").find({'std_id': firstStudent._id}).toArray()
        let b = result2[0].mark
        console.log(result2[0].mark)
        res.end()
    }
    res.render('search', { 'student': result ,'name': a, 'grade':b})
})

app.get('/',(req, res) => {
    res.render('search')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')