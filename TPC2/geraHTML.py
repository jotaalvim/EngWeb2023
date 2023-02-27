import json

def ordCidade(cidade):
    return cidade['nome']

def ordDistrito(cidade):
    return cidade['distrito']

f = open("mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']
cidades.sort(key=ordDistrito)
ligacoes = mapa['ligações']


pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <!-- Coluna do índice -->
                <td width="30%" valign="top">
                    <a name="indice"/>
                    <h3>Índice</h3>
                    <ol>
"""

dic = {}

for c in cidades:
    distrito = c['distrito']
    if distrito not in dic:
        dic[distrito] = [ c['nome'] ]
    else:
        dic[distrito].append(c['nome'])

for distrito in dic:
    cod = hash(distrito)
    pagHTML += f"<li><a href='#{cod}'>{distrito}</a></li>"

pagHTML += """
</ol>
                </td>
                <!-- Coluna do conteúdo -->
                <td width="70%">
"""

for distrito in dic:
    pagHTML += f"""
        <a name="{hash(distrito)}"/>
        <h3>{distrito}</h3>
        <ul>
    """

    listaC = sorted(dic[distrito])

    for cidade in listaC:
        pagHTML += f"""
                    <li> <p>{cidade}</p> </li> 
        """


    pagHTML += f"""
                </ul>
                    <adress>[<a href="#indice">Voltar ao índice</a>]</address>
                    <center>
                        <hr width="80%"/>
                    </center>
    """

pagHTML += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""

with open('index.html', 'w') as f:
    f.write(pagHTML)

for c in cidades:
    pagHTML = f"""
            <h2>{c['nome']}</h2>
                <p><b>Distrito:</b>{c['distrito']}</p>
                <p><b>População:</b> {c['população']}</p>
                <p><b>Descrição:</b> {c['descrição']}</p>
            <ul>
        """
    for lig in ligacoes:
        if lig['origem'] == c['id']:
            pagHTML += f"""
                <li> {lig['destino']}</li>
            """

    pagHTML +="""
        </ul>
        <center>
            <hr width="80%"/>
        </center>
    """

    id = c['id']
    with open(f'cidades/{id}.html','w') as f:
        f.write(pagHTML)


