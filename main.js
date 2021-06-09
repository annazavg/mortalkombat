// Sup Zar! how are u ?

//selectors
const randomButton = document.querySelector('.control .button')
const arenas = document.querySelector('.arenas')

// events
randomButton.addEventListener('click', () => { fight(scorpion, subZero) })

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
    changeHP(hit) {
        this.hp -= hit
        this.hp = this.hp < 0 ? 0 : this.hp
        // this.renderHP()
    }
    elHP() { return document.querySelector(`.player${this.numberPlayer} .life`) }
    renderHP() { this.elHP().style.width = `${this.hp}%` }
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
function fight(fighter1, fighter2) {
    fighter1.changeHP(getRandom(20))
    fighter1.renderHP()
    fighter2.changeHP(getRandom(20))
    fighter2.renderHP()
    // this.renderHP()
    if (!fighter1.hp || !fighter2.hp ) { //ugly but short
        fighter1.hp > fighter2.hp ? arenas.appendChild(playerWin(fighter1.name)) :
            fighter1.hp < fighter2.hp ? arenas.appendChild(playerWin(fighter2.name)) :
                arenas.appendChild(playerWin())
        randomButton.disabled = true
        createReloadButton();
    }
}

function getRandom(max) { return Math.floor(Math.random() * max + 1) }

function playerWin(name) {
    const Title = createElement('div', 'loseTitle')
    name ? Title.innerHTML = `${name} WIN` : Title.innerHTML = `DRAW`
    return Title
}

function createElement(tag, className) {
    const element = document.createElement(tag)
    element.className = className
    return element
}

function createReloadButton () {
    let div = createElement('div', `reloadWrap`)
    div.innerHTML= `<button class="button">Restart</button>`
    arenas.appendChild(div)
    const resetButton = document.querySelector('.reloadWrap button')
    resetButton.addEventListener('click', () => {
        window.location.reload()
    })
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