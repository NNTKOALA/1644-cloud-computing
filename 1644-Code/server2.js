var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req,res){
    fs.readFile('mydata.html', 'utf8', function (err, data) {
        if(!err){
            res.write(data)
            res.end()
        }else{
            res.write('Co gi do sai roi!')
            res.end()
        }
    })
})
server.listen(5000)
console.log('Server is running')