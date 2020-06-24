const express = require("express")
const server = express()

//Pegar o banco de Dados
const db = require("./database/db")


                                //Configurar Pasta Pública
server.use(express.static("public")) //Já prepara a pasta public e deixa disponível antes de requisitar o index                         
server.use(express.urlencoded({extended: true})) //Habilita o req.body

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

                                //Pagina Inicial

server.get("/", (req, res) =>{ //server.get faz adicionar o caminho depois da "/" req é Requisição e Res é Resposta
   return res.render("index.html") //Responda renderizando o html com o nunjucks da pagina desejada 
})

server.get("/create-point", (req, res) =>{ //server.get faz adicionar o caminho depois da "/" req é Requisição e Res é Resposta
   return res.render("create-point.html") //Responda renderizando o html com nunjucks da pagina selecionada 
})

server.post("/savepoint", (req , res) =>{
   //console.log(req.body) O corpo do formulário
   
   //console.log(req.query) //req.query é a liguagem dos dados em https
     const query = `
    INSERT INTO places (
        image, 
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);`

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
          console.log(err)
          return res.send("Erro no Formulario")
        }
   
        console.log("Cadastrado com suscesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

  db.run(query, values, afterInsertData)
   
})

server.get("/search", (req, res) =>{ //server.get faz adicionar o caminho depois da "/" req é Requisição e Res é Resposta

      const search = req.query.search

      if(search == ""){
         return res.render("search-results.html", { total: 0})
      }

       db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length
        //Mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total}) //Responda renderizando o html com nunjucks da pagina selecionada
    })
})

server.listen(3000) //Ligar o servidor