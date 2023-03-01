var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer( function(req, res) {
    var pedido = url.parse(req.url,true).pathname
    
    var d = new Date().toISOString().substring(0,16)
    console.log(req.methed +" " + req.url +" " + d)

    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})

    console.log(pedido)

    if (pedido == "/") {
        fs.readFile("index.html", function(err,data) {
            res.write(data)
        })
    }
    else {
        fs.readFile("cidades/"+pedido.substring(1)+".html", function(err,data) {
            res.write(data)
        })
    }
    res.end()


}).listen(7777)                                                                                                                                   
console.log("servidor à escuta na porta 7777")
