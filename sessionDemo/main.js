var express = require('express')
var session = require('express-session')
var app = express()

const { MongoClient } = require('mongodb')
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'my secret !#@#!#!#!#!#@#@#',
    resave: false
}))

app.get('/logout', (req, res) => {
    req.session.userName = null
    req.session.save((err) => {
        req.session.regenerate((err2) => {
            res.redirect('/')
        })
    })
})

function isAuthenticated(req, res, next) {
    let chuaDangNhap = !req.session.userName
    if (chuaDangNhap)
        res.redirect('/')
    else
        next()
}

app.get('/profile',isAuthenticated, async(req,res)=>{
    let server = await MongoClient.connect(url)
    let dbo = server.db("ATNToys")
    let user = await dbo.collection("user").find({'name':req.session.userName}).limit(1).toArray()
    console.log(user[0])
    res.render('profile',{'user': user,'sId':req.session.id},{'user': user})
})

app.post('/register', async (req, res) => {
    let name = req.body.txtName
    req.session.userName = name
    let country = req.body.txtCountry
    req.session.userCountry = country
    //kiem tra trong database
    let server = await MongoClient.connect(url)
    let dbo = server.db("ATNToys")
    let result = await dbo.collection("user").find({ 'name': name }).toArray()
    if (result.length > 0) {
        res.render('profile', { 'name': req.session.userName, 'country': req.session.country })
    } else {
        res.write('Khong hop le')
        res.end()
    }
})

app.get('/profile', (req, res) => {
    let chuaDangnhap = !req.session.userName
    res.render('profile', { 'name': req.session.userName, 'chuaDangnhap': chuaDangnhap, 'country': req.session.country})
})

app.get('/', async (req, res) => {
    let accessCount = req.session.accessCount || 0
    accessCount++
    req.session.accessCount = accessCount
    let chuaDangnhap = !req.session.userName
    res.render('home', { 'accessCount': accessCount, 'chuaDangnhap': chuaDangnhap })
})

app.post('/signup', async (req, res) => {
    let name = req.body.txtName
    let pass = req.body.txtPass
    let country = req.body.txtCountry
    let user = {
        'name': name,
        'pass': pass,
        'country': country,
    }
    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //insert product
    await dbo.collection("user").insertOne(user)
    //quay lai trang home
    res.redirect('/')
})

app.get('/signup', (req, res) => {
    res.render("signup")
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')