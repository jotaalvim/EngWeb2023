with open("dataset.csv") as f:
    content = f.read().splitlines()[1:]

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Iogurtes</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Lista de entradas dos iogurtes</h1>
        <p>Este data set foi retirado<a https://r-data.pmagunia.com/dataset/r-dataset-package-ecdat-yogurt>deste link </a>. O objetivo
        é descobrir <strong>qual será o melhor iogurte?</strong></p>
        <table>
            <tr>
            <!-- Coluna do índice -->
                <td width="30%" valign="top">

                <a href="indice"><h3>Índice dos iogurtes</h3> </a>
                <ol>
                    <li> <a href="#cod">id9</a> </li>
                    <li> <a href="#cod">id10</a> </li>
                    <li> <a href="#cod">id11</a> </li>
                    <li> <a href="#cod">id12</a> </li>
                    <li> <a href="#cod">id13</a> </li>
                    <li> <a href="#cod">id14</a> </li>
                    <li> <a href="#cod">id15</a> </li>
                    <li> <a href="#cod">id16</a> </li>
                    <li> <a href="#cod">id17</a> </li>
                    <li> <a href="#cod">id18</a> </li>
                    <li> <a href="#cod">id19</a> </li>
                </ol>

                </td>
            <!--  </tr> -->
"""


for linha in content:
    _,_,_,_,_,_,_,_,preco,nome = linha.split(',')

    nome = nome[1:-1]

    imagens = { 
      "dannon" :" images/dannon.jpeg" ,
      "yoplait":" images/yoplait.jpeg",
      "weight" :" images/",
      "hiland" :" images/hiland.jpeg" }

    imagem = imagens[nome]

    html += f"""
        <ol>
        <td width="70%">
        <a name="cod"/>
        <h3>Escolha {nome}</h3>
        </br>
        <img src ="{imagem}" />
        </br>
        <p><b>Preço por peso:</b> {preco} $</p>
        <adress>[<a href="#indice">Voltar ao índice</a>]</address>

        <center>
            <hr width="80%"/>
        </center>
    </td>
        </ol>
    """


html += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""


print(html)
