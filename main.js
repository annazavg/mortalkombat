// bad and sad

//selectors
const arenas = document.querySelector('.arenas')
const formFight = document.querySelector('.control')
const fightButton = document.querySelector('.control .button')

//Constancia
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

//listeners
formFight.addEventListener('submit', function (e) {
    e.preventDefault()
    const enemy = enemyAttack()
    const attack = {};

    for (let item of formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value])
            attack.hit = item.value
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value
        }

        item.checked = false;
    }
    console.log('####: attack', attack)
    console.log('####: enemy', enemy)
    if (enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value)
        player1.renderHP()
    }
    if (attack.hit !== enemy.defence) {
        player2.changeHP(attack.value)
        player2.renderHP()
    }

    if (!player1.hp || !player2.hp ) { //ugly but short
        player1.hp > player2.hp ? arenas.appendChild(playerWin(player1.name)) :
            player1.hp < player2.hp ? arenas.appendChild(playerWin(player2.name)) :
                arenas.appendChild(playerWin())
        fightButton.disabled = true
        createReloadButton();
    }
})

//bored obj players
const player1 = {
    numberPlayer: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['fist', 'leg'],
    elHP,
    changeHP,
    renderHP
}

const player2 = {
    numberPlayer: 2,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['ice','leg'],
    elHP,
    changeHP,
    renderHP
}

// functions
function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1]
    const defence = ATTACK[getRandom(3) - 1]
    // console.log('####: hit', hit)
    // console.log('####: defence', defence)
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

function elHP() { return document.querySelector(`.player${this.numberPlayer} .life`) }

function renderHP() { this.elHP().style.width = `${this.hp}%` }

function changeHP(hit) {
    this.hp -= hit
    this.hp = this.hp < 0 ? 0 : this.hp
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
    div.addEventListener('click', () => {
        window.location.reload()
    })
    arenas.appendChild(div)
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
arenas.appendChild(createPlayer(player1))
arenas.appendChild(createPlayer(player2))