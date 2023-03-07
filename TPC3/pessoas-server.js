var http    = require('http')
var axios   = require('axios')
var fs      = require('fs')
var mypages = require('./mypages')

http.createServer( function(req, res) {
    var d = new Date().toISOString().substring(0,16)
    console.log(req.methed +" " + req.url +" " + d)

    if( req.url == '/') {
        fs.readFile('index.html', function(err,data) {
            res.writeHead(200, {'Content-Type':'text/html'})
            if (err) {
                res.write("erro na leitura do ficheiro: "+err)
            }
            else {
                res.write(data)
            }
            res.end()
        })
    }

    else if( req.url == '/sexomas') {
        axios.get('http://localhost:3000/pessoas?sexo=masculino',{
        }).then( function(resp) {
            var pessoas = resp.data
            console.log("recuperei " + pessoas.length + " registos")
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.end(mypages.genMainPage(pessoas,d))
        })
        .catch(erro => {
            console.log("erro= "+ erro)
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO" + erro + "</p>")
        })
    }
    else if( req.url == '/sexofem') {
        axios.get('http://localhost:3000/pessoas?sexo=feminino',{
        }).then( function(resp) {
            var pessoas = resp.data
            console.log("recuperei " + pessoas.length + " registos")
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.end(mypages.genMainPage(pessoas,d))
        })
        .catch(erro => {
            console.log("erro= "+ erro)
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO" + erro + "</p>")
        })
    }


    else if( req.url == '/pessoas') {
        axios.get('http://localhost:3000/pessoas') 
        .then(function(resp) {
            var pessoas = resp.data

            console.log("recuperei " + pessoas.length + " registos")

            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.end(mypages.genMainPage(pessoas,d))

        })
        .catch(erro => {
            console.log("erro= "+ erro)
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO" + erro + "</p>")

        })
    }
    else if (req.url =="/pesord") {
        axios.get('http://localhost:3000/pessoas?_sort=nome') 
        .then(function(resp) {
            var pessoas = resp.data

            console.log("recuperei " + pessoas.length + " registos")

            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.end(mypages.genMainPage(pessoas,d))

        })
        .catch(erro => {
            console.log("erro= "+ erro)
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO" + erro + "</p>")

        })

    }
    else if (req.url.match(/\/w3.css$/)) {
        fs.readFile('w3.css', function(err,data) {
            res.writeHead(200, {'Content-Type':'text/css'})
            if (err) {
                res.write("erro na leitura do ficheiro: "+err)
            }
            else {
                res.write(data)
            }
            res.end()
        })
    }
    else {
        res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'})
        res.end("<p>ERRO: Operação não suportdad...</p>")
    }

}).listen(7777)
//axios
// 






