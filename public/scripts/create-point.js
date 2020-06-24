                                                     // Pegar UFs

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]") //Constante que vai selecionar o select que atende pelo nome uf
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados") //Promessa de ir buscar dados no link
    .then(res => res.json()) // Promessa de trazer os dados e converter em json
    .then(states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //Para cada estado de Estados, traduza para o HTML e crie como option trazendo value e nome
        }
    })
}

populateUFs()


                                                     // Trazer Cidades de Acordo com UF

function getCities(event){
    const citySelect = document.querySelector("[name=city]") //Seleciona um select que responda pelo nome city
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value //Constante que vai armazenar os values 

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`//Este link trás as cidades de acordo com o valor da UF, então foi interpolado para que ele mesmo pegasse de acordo com o UF selecionado no formulário


    citySelect.innerHTML = "<option value> Selecione a Cidade</option>"
    citySelect.disabled  = true


    fetch(url) //Promessa de ir buscar dados no link das cidades
    .then(res => res.json()) // Promessa de trazer os dados e converter em json
    .then(cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` //Para cada cidade de Cidades, traduza para o HTML e crie como option trazendo value e nome
        }

        citySelect.disabled = false
    })
}


document
.querySelector("select[name=uf]") //Selecionar um select que reponda pelo nome uf
.addEventListener("change", getCities)  //Ouvidor de mudanças, ao ser acionado entra na função getCities


                                                     // Itens de Coleta 
const itemsToColect = document.querySelectorAll(".items-grid li") //Pegar todos os li's do Items Grid no formulário

for (const item of itemsToColect){
    item.addEventListener("click", handleSelectedItem) //For que indica que uma ação será feita quando algum dos li's for acionado 
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [] //Array dos itens selecionados

function handleSelectedItem(event){
    const itemLi = event.target //Variável que vai disparar algum evento

    itemLi.classList.toggle("selected") // Adiciona ou remove a classe selected, assim que adicionado dispara no css a classe selecionado e adiciona a borda
    
    const itemId = itemLi.dataset.id //Variável que me passa o ID do li selecionado

    const alreadySelected = selectedItems.findIndex(item =>{ //Verificar se existe item selecionado, se sim pegar para colocar no array selectedItems
        const itemFound = item == itemId //Retorna True ou False com base no (const itemId = itemLi.dataset.id)
        return itemFound // se o itemId retornar True a função retorna itemFound
    })

    if(alreadySelected >=0) { //Se ele pegou algum índice no array
        const filteredItems = selectedItems.filter(item =>{ //Função filter vai tirar o item do array assim que receber um false, ou seja, se o índice 0 do array estiver selecionado e for selecionado de novo ele vê "0 é diferente do que existe no array? não? então tira"
            const itemIsDifferent = item != itemId //False
            return itemIsDifferent
        })

        selectedItems = filteredItems //Filtered tira o item do array
    } else{ // Caso não esteja selecionado
        selectedItems.push(itemId)//Push adiciona itens ao array
    }

    collectedItems.value = selectedItems //Atualiza o campo escondido com os itens selecionados
}