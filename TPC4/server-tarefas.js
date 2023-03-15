var http = require('http')
var axios = require('axios')
var templates = require('./template')
var fs = require('fs')
const { parse } = require('querystring');
var static = require('./static.js')


// Aux functions
// Esta função serve para retirar a informação dos campos de um formulário e devolver 
// essa informação à callback function
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}




var tasksServer = http.createServer(function (req, res) {

   // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if (static.staticResource(req)){
        static.serveStaticResource(req, res)
    }

    else {

    switch(req.method){
        case "GET": 
             if( req.url == '/') {                                                                                                             
                  axios.get('http://localhost:3000/tasks')
                     .then( resp => {
                     var tasks = resp.data
                     console.log("recuperei " + tasks.length + " tarefas")

                     var formd = { "id" : "", "author": "", "description": "", "date": "", "completed" : ""}
                     res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                     res.end(templates.tarefasPage(tasks,formd,d))
                 })
                 .catch(erro => {
                     console.log("erro= "+ erro)
                     res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                     res.end("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                 })
             }

            else if(/\/edit\/[0-9]+/.test(req.url)){ // Edição de uma tarefa
                var taskID = req.url.substring(6)
                console.log(taskID)
                axios.get('http://localhost:3000/tasks')
                     .then( resp => {
                     var tasks = resp.data
                     console.log("recuperei " + tasks.length + " tarefas")

                     for (let i = 0; i< tasks.length; i++) {
                         if (tasks[i].id == taskID) {
                             var formd = tasks[i]
                         }
                     }

                     res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                     res.end(templates.tarefasPage(tasks,formd,d))
                 })
                 .catch(erro => {
                     console.log("erro= "+ erro)
                     res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                     res.end("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                 })
 

            }
            break

        case "POST": 
            if(req.url == "/"){ // Inserção de uma nova task
                collectRequestBodyData(req, result =>{
                    if(result){                  
                        if(result.completed == ""){
                            result.completed = "checked"
                        }
                        axios.post('http://localhost:3000/tasks', result)
                           .then(resp => {
                            axios.get('http://localhost:3000/tasks')
                              .then( resp2 => {
                                 var tasks = resp2.data
                                 res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                 //var f = JSON.stringify(resp.data)
                                 var formd = { "id" : "", "author": "", "description": "", "date": "", "completed" : '' }
                                 res.end(templates.tarefasPage(tasks, formd ,d))
                                 //res.end('<a href="/">Go back to the home page</a>')

                           }).catch(error => {
                               console.log('Erro: ' + error);
                               res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                               res.end('<p>Unable to insert record...</p>')
                           });     
                        })

                    }
                    else{
                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end("<p>Unable to collect data from body...</p>")
                    }
                })
            }

            

            else if(/\/edit\/[0-9]+/.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            if(result.completed != ""){
                                result.completed = "checked"
                            }
                            console.dir(result)
                            axios.put('http://localhost:3000/tasks/' + result.id, result)
                            .then(resp => {
                                axios.get('http://localhost:3000/tasks')
                                  .then( resp2 => {
                                 var tasks = resp2.data
                                console.log(resp.data);
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                var formd = { "id" : "", "author": "", "description": "", "date": "", "completed" : '' }
                                res.end(templates.tarefasPage(tasks, formd ,d))

                            }).catch(error => {
                                console.log('Erro: ' + error);
                                res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end(templates.errorPage('<p>Unable to change record...</p>', d))
                            });
                        });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }

            break

        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " unsupported in this server.</p>")
            res.end()
            break
    }


}
})


tasksServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})
