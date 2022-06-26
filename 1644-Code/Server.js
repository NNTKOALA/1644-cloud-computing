var http = require('http')

var server = http.createServer(function(req,res){
    res.writeHead(200, { 'Content-Type': 'text/html' }); 
    if(req.url == '/'){
        res.write('<html><body><p style ="color:green">This is home Page.</p></body></html>');
    }else if(req.url == '/student'){
        res.write('<html><body><p style ="color:blue">This is student Page.</p></body></html>');
    }else{
        res.write('<html><body><p style ="color:red">Not found!</p></body></html>');
    }
    // set response content    
    res.end();
})

server.listen(5000)
console.log("Server is running!")