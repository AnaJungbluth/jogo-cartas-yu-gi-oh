const state ={
    score:{
        plaayerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points")
    },
    cardSprites:{
        avatar: document.getElementById("card_image"),
        name: document.getElementById("card_name"),
        type: document.getElementById("card_type"),
    },
    fieldCards:{
        player: document.getElementById("player_field_card"),
        computer: document.getElementById("computer_field_card"),
    },
    button: document.getElementById("next_duel")
}

const playerSides ={
    player1: "player_cards",
    computer: "computer_cards"
}

const pathImages = "src/assets/icons/"

const cardData = [
    {
        id:0,
        name:"Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        winOf: [1],
        loseOf: [2]
    },
    {
        id:1,
        name:"Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf: [2],
        loseOf: [0]
    },
    {
        id:2,
        name:"Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winOf: [0],
        loseOf: [1]
    }
]

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length)
    return cardData[randomIndex].id
}

async function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement("img")
    cardImage.setAttribute("height", "100px")
    cardImage.setAttribute("src", "src/assets/icons/card-back.png")
    cardImage.setAttribute("data_id", idCard)
    cardImage.classList.add("card")

    if(fieldSide === playerSides.player1){
        cardImage.addEventListener("click", ()=>{
            setCardsField(cardImage.getAttribute("data_id"))
        })

        cardImage.addEventListener("mouseover", ()=>{
            drawSelectCrad(idCard)
        })
    }

    

    return cardImage
}

async function drawSelectCrad(index) {
    state.cardSprites.avatar.src = cardData[index].img
    state.cardSprites.name.innerText = cardData[index].name
    state.cardSprites.type.innerText = "Attribute: " + cardData[index].type
    
}

async function drawCards(cardNumbers, fieldSide){
    for(let i=0; i < cardNumbers; i++){
        const randomIdCard = await getRandomCardId()
        const cardImage = await createCardImage(randomIdCard, fieldSide)

        console.log(fieldSide)
        document.getElementById(fieldSide).appendChild(cardImage)
    }
}

function main(){
    drawCards(5, playerSides.player1)
    drawCards(5, playerSides.computer)
}

main()