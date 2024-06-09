let selectedPlayers = []

const loadAllPlayers = (query) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${query}`)
            .then(res=>res.json())
            .then(data=> {
                displayPlayers(data);

            });


const displayPlayers = (data) => {
    const players = data.player;
    const playercard = document.getElementById("playercard");

      playercard.innerHTML = ""
        if(data.player){
            console.log('found');
        }
        else{
            console.log('not found');
            playercard.innerHTML += `<h1 >Not found...!</span></h1>`
        }

        players.forEach(player => {

            console.log(player);

            const divCard = document.createElement("divCard");
            // divCard.classList.add("card")
            divCard.innerHTML = `
            <div class="card">
            <img src=${player.strThumb ? player.strThumb : "https://www.thesportsdb.com/images/media/player/thumb/82uics1544986067.jpg"} alt="" />
            
                <div class="content">
                    <h2 class="name">${player.strPlayer}</h2>
                    <div class="moreinfo">
                        <p><span class="tag">Nationality:</span> <span class="taginfo">${player.strNationality}</span></p>
                        <p><span class="tag">Team:</span> <span class="taginfo">${player.strTeam}</span></p>
                        <p><span class="tag">Sport:</span> <span class="taginfo">${player.strSport}</span></p>
                        <p><span class="tag">Height:</span> <span class="taginfo">${player.strHeight}</span></p>
                        </div>
                </div>
            
                <div class="buttongroup">
                    <button id=${player.idPlayer} onClick={selectPlayer(${player.idPlayer})}>Add To Group</button>
                   
                  
                    
                    <button onClick={openModal(${player.idPlayer})}>Details</button>
                    
                </div>
            </div>
            `;

            playercard.appendChild(divCard)
        });
}

};
loadAllPlayers("")
const searchBtn = document.getElementById("searchBtn")
const inputValue = document.getElementById("inputValue")

searchBtn.addEventListener("click", () => {
    loadAllPlayers(inputValue.value)
})


const selectPlayer = (id) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then(res=>res.json())
    .then(data=> {

        if(selectedPlayers.length < 11){
            selectedPlayers.push(data.players[0])

            const btn = document.getElementById(`${id}`)
            btn.innerText = "Added"
            btn.style.backgroundColor = "gray"
            btn.removeAttribute(id)
            const counting = document.getElementById("counting")
            const count = parseInt(counting.innerText)+1
            counting.innerText = count.toString()
            displaySelectPlayer()
            
        }
        else{
            alert("Can't add more 11")
        }

    });
    
}

const displaySelectPlayer = () => {
    const playersList = document.getElementById("playersList")

    playersList.innerHTML = ""
    const reversPlayers = [...selectedPlayers].reverse();
    reversPlayers.map(({idPlayer, strPlayer, strThumb, strNationality, strSport}) => 
        playersList.innerHTML += `
        <div class="singlePlayer">
            <img src=${strThumb ? strThumb : "https://www.thesportsdb.com/images/media/player/thumb/82uics1544986067.jpg"} alt="">
            <div class="details">
                <h2>${strPlayer}</h2>
                <p>${strSport}</p>
                <p>${strNationality}</p>
            </div>
        </div>
    `)
}

const modalcard = document.getElementById("modalcard")
const modal = document.getElementById("modal")

const openModal = async(id) =>{

    const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    const data = await res.json()
    const player = data.players[0]

    modalcard.innerHTML = `
        <div class="modalcontent">
        <div class="close">
                <i onclick="closeModal()" class="fa-solid fa-circle-xmark"></i>
            </div>
        <img src="${player.strThumb}"/>
        <div class="modaldetail">
                <h1>${player.strPlayer}</h1>
                <p>${player.strDescriptionEN.slice(0,500)}</p>

            <div class="modalinfo">
                    <p><span>Natinality: </span> ${player.strNationality}</p>
                    <p><span>Team: </span> ${player.strTeam}</p>
                    <p><span>Sport: </span> ${player.strSport}</p>
                    <p><span>Birthdate: </span> ${player.dateBorn}</p>
                    <p><span>Location: </span> ${player.strBirthLocation}</p>
                    <p><span>Gender: </span> ${player.strGender}</p>
       
            </div>
            <div class="icons">
                ${
                     player.strTwitter &&
                    `<a target="_blank" href="https://${player.strTwitter}"><i class="fa-brands fa-twitter"></i></a>`
                }
                ${
                    player.strInstagram &&
                    `<a target="_blank" href="https://${player.strInstagram}"><i class="fa-brands fa-instagram"></i></i></a>`
                }
            </div>
           
        </div>
        </div>
    `
    modal.style.display = 'flex'

    modalcard.style.display = 'flex'

}

const closeModal = () => {
    modal.style.display = 'none'
    modalcard.style.display = 'none'
}
