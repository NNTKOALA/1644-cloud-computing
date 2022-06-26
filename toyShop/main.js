var express = require('express')
var app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://nguyentrung:nntrung382k2@cluster0.ahp8d.mongodb.net/test'

app.post('/search',async (req,res)=>{
    let name = req.body.txtName

    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //get data
    let products = await dbo.collection('product').find({'name': new RegExp(name,'i')}).toArray()
    res.render('allToys',{'products':products})
})

app.get('/',async (req,res)=>{
    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //get data
    let products = await dbo.collection('product').find().toArray()
    res.render('allToys',{'products':products})
})

app.post('/newProduct', async (req,res)=>{
    let name = req.body.txtName
    let price = req.body.txtPrice
    let picture = req.body.txtPicture
    if (name.length <= 2) {
        res.render('newToy', {
            'nameError': 'Name must be at least 2 characters'
        })
        return
    }
    for(i=0;i<price.length; i++){
        if(isNaN(price[i])){
            res.render('newToy', {
                'priceError': 'Price must be number'
            })
            return
        }
    }
    let product = {
        'name': name,
        'price': price,
        'picture': picture
    }
    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //insert product
    await dbo.collection("product").insertOne(product)
    //quay lai trang home
    res.redirect('/')
})

app.get('/insert',(req,res)=>{
    res.render("newToy")
})


const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')

