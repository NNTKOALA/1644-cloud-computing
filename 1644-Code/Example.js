var http = require('http')

var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>')
    res.write('<div><p class="mb-3 mt-3" >Name: <input name="firstName" type="text" /></p></div>')
    res.write('<div><p class="mb-3 mt-3" >Gender: <input name="Male" type = "radio">Male  <input name="Female" type = "radio">Female  </p></div>')
    res.write('<div><p class="mb-3 mt-3" >Country: <select><option value>Viet Nam</option><option value>USA</option><option value>Russia</option></select></p></div>')
    res.write('<div><p><button type="submit" class="btn btn-primary">Submit</button></p></div>')
    // set response content    
    res.end();
})

server.listen(5000)
console.log("Server is running!")