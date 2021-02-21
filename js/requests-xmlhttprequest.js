/* Requisição a API Jogos*/
function getGameByName(name, callback) {
    let request = new XMLHttpRequest(); //fazendo requisição XML
    request.open('GET', `https://api.rawg.io/api/games?search=${name}`, true);//especifica o tipo de requisição
    request.onload = () => {
        let response = JSON.parse(request.response); //convertendo dados para JSON
        if(typeof callback === 'function') {
            callback(response)  //passando os dados do jogo para a função de callbabk
        }
    }
    request.send(); //envia o pedido ao servidor
}

/* Requisição API Jogos Relacionados */
function getRelatedGamesByName(name, callback) {
    let request = new XMLHttpRequest();

    request.open('GET', `https://api.rawg.io/api/games/${name}/suggested`, true);
    request.onload = () => {
        let response = JSON.parse(request.response)
        if(typeof callback == 'function') callback(response)
        
    };
    request.send();
}

//pegando a referência dos elementos HTML
const gamesListPrincipal = document.querySelector('#games-list-principal');
const gamesListRelationed = document.querySelector('#games-relationed');
const btn = document.querySelector('[type=submit]');
const input = document.querySelector('[type=text]');

// adiciona um elemento de “loading” (carregamento) na pagina
function setGameLoad(gameList) {
    gameList.innerHTML = `
    <div class="preloader-wrapper active" style="">
        <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div>
            <div class="gap-patch">
                <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
                <div class="circle"></div>
            </div>
        </div>
    </div> 
    `
}

//cria o template de cada jogo que virá da API
//o template mostrará as seguintes informações: o nome do jogo e a sua foto
function setGameHTML(game) {
    let div = document.createElement('div');

    div.dataset.gamename = game.slug;

    div.className = 'item';

    div.innerHTML = `
        <div class="card">
            <div class="card-image">
                <img src="${game.background_image}" alt="Game Image">
             </div>
            <div class="card-content">
                    <p>${game.name}</p> 
            </div>
         </div>
        `
    return div
}

function initGames(gamename) {
    gamesListRelationed.innerHTML = "";

    setGameLoad(gamesListPrincipal);

    getGameByName(gamename, games => {

        gamesListPrincipal.innerHTML = ""; //limpa o conteúdo que tinha anteriormente

        games.results.forEach(game => { //pecorre os games da resposta da requisição 
            let divGame = setGameHTML(game);//coloca os dados dos games na estrtura HTML
            
            divGame.addEventListener('click', card => {
                setGameLoad(gamesListRelationed);
                
                let gameTag = card.currentTarget;//recuperando a div do card clicado

                let gamename = gameTag.dataset.gamename;//recuperando o nome do game do card
                console.log(gamename)
                getRelatedGamesByName(gamename, gamesRelationed => { 
                    console.log(gamesRelationed)
                    gamesListRelationed.innerHTML = "";  //limpa o conteúdo que tinha anteriormente

                    gamesRelationed.results.forEach(game => {//pecorre os games relacionados ao game atual principal
                        console.log(game)
                        let divGameRelationed = setGameHTML(game);//coloca os dados dos games relacionados na estrtura HTML

                        gamesListRelationed.append(divGameRelationed)//inseri os games relacionados, ja estruturados, na página
                    } )
                })
                //console.log(gameTag, gamename)
            })
             gamesListPrincipal.append(divGame);//inseri os gamesPrincipais, ja estruturados, na página
        })
    })
 }

//chama a função initGame e da inicio a execução do código
btn.addEventListener('click', function() {
    //console.log(input.value)
    initGames(input.value)
})

/* document.querySelector('[type=text]').addEventListener('blur', e => {
    initGames(e.target.value)
}) */


