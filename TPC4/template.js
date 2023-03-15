exports.tarefasPage = function(tarefas, form,data){
    var completed = []
    var notcompleted = []
    for ( let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].completed) {
            completed.push(tarefas[i]);
        }
        else {
            notcompleted.push(tarefas[i]);
        }

    }

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="tasks.png"/>
            <link rel="stylesheet" href="w3.css"/>

            <title>tarefas sempre em ordem!</title>
        </head>


        <body>
            <div>
                <h1> inserção de tarefas </h1>
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>legenda das tarefas!</legend>

                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" value="${form.id}"/>
                        <label>Author</label>
                        <input class="w3-input w3-round" type="text" name="author" value="${form.author}"/>
                        <label>Due Date</label>
                        <input class="w3-input w3-round" type="text" name="date" value="${form.date}" />
                        <label>Desc</label>
                        <input class="w3-input w3-round" type="text" name="description"  value="${form.description}" />
                        <label>Completed</label>
                        <input class="w3-check" type="checkbox" name="completed" value="${form.description}"/>
                    </fieldset>
                    <br/>
                    <button class="w3-btn w3-yellow w3-mb-2" type="submit">Register</button>
                </form>
            </div>

            <div class="tasks">
                <div class="child">
                    <h1>To do Tasks</h1>
                    <table class="w3-table w3-striped">
                        <tr>
                            <th>Id</th>
                            <th>Author</th>
                            <th>Due Date</th>
                            <th>Description</th>
                            <th>Operations<th>
                        </tr>
        `
    for (let i = 0; i< notcompleted.length; i++) {

        pagHTML += `
                <tr>
                  <td>${notcompleted[i].id}</td>
                  <td>${notcompleted[i].author}</td>
                  <td>${notcompleted[i].date}</td>
                  <td>${notcompleted[i].description}</td>
                  <td> 
                    [ <a href="/edit/${notcompleted[i].id}" >edit</a>]
                    [ <a href="/delete/${notcompleted[i].id}" >delete</a>]
                  </td>
                </tr>
        `
    }

    
    pagHTML += `
                        </table>
                    </div>
                    <div class="child">
                        <h1>Done Tasks</h1>
                        <table class="w3-table w3-striped me">
                            <tr>
                                <th>Id</th>
                                <th>Author</th>
                                <th>Due Date</th>
                                <th>Desc</th>
                                <th>Operations<th>
                            </tr>
    `
    for (let i = 0; i< completed.length; i++) {

        pagHTML += `
                <tr>
                  <td>${completed[i].id}</td>
                  <td>${completed[i].author}</td>
                  <td>${completed[i].date}</td>
                  <td>${completed[i].description}</td>
                  <td> 
                    [   <a href="/edit/${completed[i].id}" >edit</a>]
                    [ <a href="/delete/${completed[i].id}" >delete</a>]
                  </td>
                </tr>
        `
    }

    pagHTML += `
                        </table>
                    </div>
                </div>
                <footer>
                    <h5>Generated by EngWeb2023 in ${data} - [<a href="/">Return</a>]</h5>
                </footer>
            </body>
        </html>
    `
    return pagHTML
}
