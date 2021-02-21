function getGamesByname(name) {
   return new Promise((resolve, reject) => {
      fetch(`https://api.rawg.io/api/games?search=${name}`)
         .then(response => response.json())
         .then(data => {
            resolve(data);
         })
         .catch(err => {
            reject(err);
         })
   })
}

function getRelatedGamesByName(name) {
   return new Promise((resolve, reject) => {
      fetch(`https://api.rawg.io/api/games?search=${name}/suggested`)
         .then(response => response.json())
         .then(data => {
            resolve(data);
         })
         .catch(err => {
            reject(err)
         })
   })
}

// pegando a referência dos elementos HTML
const gamesListPrincipal = document.querySelector('#games-list-principal')
const gamesListRelationed = document.querySelector('#games-relationed')
const btn = document.querySelector('[type=submit]')
const input = document.querySelector('[type=text]')

// adiciona um elemento de loading antes de carregar os dados
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

// cria o template HTML de cada jogo que virá dq API
// o template mostrará as seguintes informações: nome do jogo e a sua foto
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

// iniciar a execução do código
function initGames(gamename) {
   gamesListRelationed.innerHTML = "";

   setGameLoad(gamesListPrincipal);
   
   getGamesByname(gamename)
      .then(games => {
         gamesListPrincipal.innerHTML = "";

         games.results.forEach(game => {
            let divGame = setGameHTML(game);

            divGame.addEventListener('click', card => {
               setGameLoad(gamesListRelationed);

               getRelatedGamesByName(gamename)
                  .then(games => {
                     gamesListRelationed.innerHTML = "";

                     games.results.forEach(game => {
                        let divGameRelationed = setGameHTML(game);

                        gamesListRelationed.append(divGameRelationed);
                     })
                  } )
            })
            gamesListPrincipal.append(divGame);
         })
      })
}

// quando clicar no butão inicia a função init
btn.addEventListener('click', () => {
   console.log(input.value)
   initGames(input.value)
})