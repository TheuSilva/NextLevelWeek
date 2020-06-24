const buttonSearch = document.querySelector("#page-home main a") //ButtonSearch passa a ser o conteúdo encontrado em page home main a
const modal = document.querySelector("#modal") //Modal passa a ser o conteudo encontrado em #modal
const close = document.querySelector("#modal .header a") //Close passa a ser o conteúdo encontrado em modal header a

buttonSearch.addEventListener("click", () =>{ //Quando houver um clique no button search será atribuida uma função
    modal.classList.remove("hide") //Remove a classe hide
})

close.addEventListener("click", () =>{  //Quando houver um clique no X será atribuida uma função que adiciona a classe hide
    modal.classList.add("hide") //Adiciona a classe hide
})