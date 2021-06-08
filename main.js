// Sup Zar! how are u ?

//selectors
const randomButton = document.querySelector('.button')
const arenas = document.querySelector('.arenas')

// events
randomButton.addEventListener('click', () => {
    Fight(scorpion, subZero)
})

// my godless class
class Fighter {
    constructor(
        numberPlayer = 0,
        name = '',
        hp = 0,
        img = '',
        weapon = [''],
    )
    { Object.assign(this, {numberPlayer, name, hp, img, weapon}) }
    //methods
    attack() { return console.log(`${this.name} Fight`) }
}

// class instances
const scorpion = new Fighter(
    1,
    'Scorpion',
    100,
    'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    ['fist', 'leg']
)

const subZero = new Fighter(
    2,
    'Sub-Zero',
    100,
    'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    ['fist', 'leg']
)

// functions
function Fight(fighter1, fighter2) {
    changeHp(fighter1)
    changeHp(fighter2)
    if (!fighter1.hp || !fighter2.hp ) {
        fighter1.hp > fighter2.hp ? arenas.appendChild(playerWin(fighter1.name)) : arenas.appendChild(playerWin(fighter2.name)) //ugly but short
        randomButton.disabled = true
    }
}

function changeHp(player) {
    player.hp = randomHit(player.hp)
    const playerLife = document.querySelector(`.player${player.numberPlayer} .life`)
    playerLife.style.width = `${player.hp}%`
}

function randomHit(hp) {
    hp -= Math.floor(Math.random() * 21)
    return hp < 0 ? 0 : hp
}

function playerWin(name) {
    const winTitle = createElement('div', 'loseTitle')
    winTitle.innerHTML = `${name} WIN`
    return winTitle
}

function createElement(tag, className) {
    const element = document.createElement(tag)
    element.className = className
    return element
}

function createPlayer(objFighter) {
    let div = createElement('div', `player${objFighter.numberPlayer}`)
    div.innerHTML = `    
        <div class="progressbar">
            <div class="life" style="width: ${objFighter.hp}%"></div>
            <div class="name">${objFighter.name}</div>
        </div>
        <div class="character">
            <img src="${objFighter.img}" />
        </div>    
    `;
    return div
}

// inject players
arenas.appendChild(createPlayer(scorpion))
arenas.appendChild(createPlayer(subZero))