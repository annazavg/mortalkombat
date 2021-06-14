// bad and sad

//selectors
const arenas = document.querySelector('.arenas')
const formFight = document.querySelector('.control')
const fightButton = document.querySelector('.control .button')
const chat = document.querySelector('.chat')

//Constancia
const HIT = { head: 30, body: 25, foot: 20 }

const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};


//listeners
formFight.addEventListener('submit', function (e) {
    e.preventDefault()
    const enemy = enemyAttack()
    const attack = playerAttack()

    // console.log('####: attack', attack)
    // console.log('####: enemy', enemy)

    if (enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value)
        player1.renderHP()
        generateLogs('hit', player2, player1, enemy.value)
    } else {
        generateLogs('defence', player2, player1)
    }
    if (attack.hit !== enemy.defence) {
        player2.changeHP(attack.value)
        player2.renderHP()
        generateLogs('hit', player1, player2, attack.value)
    } else {
        generateLogs('defence', player1, player2)
    }
    showResult()
})

//bored obj players
const player1 = {
    numberPlayer: 1,
    name: 'Scorpion',
    hp: 100,
    // img: 'assets/amelia.gif',
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
    // img: 'assets/albert.gif',
    weapon: ['ice','leg'],
    elHP,
    changeHP,
    renderHP
}

// functions
function generateLogs(type, player1, player2, hit) {
    let text = ''
    let maxEl = logs[type].length - 1
    switch (type) {
        case 'start':
            text = logs[type].replace('[time]', getNowTime()).replace('[player2]', player2.name).replace('[player1]', player1.name);
            break
        case 'hit':
            text = logs[type][getRandom(maxEl)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)
            text = `${getNowTime()} - ${text} -${hit} [${player2.hp}/100]`
            break
        case 'defence':
            text = logs[type][getRandom(maxEl)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)
            text = `${getNowTime()} - ${text}`
            break
        case 'end':
            text = logs[type][getRandom(maxEl)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name)
            break
        case 'draw':
            text = logs[type]
            break
    }
    const el = `<p>${text}</p>`
    chat.insertAdjacentHTML('beforeend', el)
}

function getNowTime() {
    return `${new Date().getHours()}:${new Date().getMinutes()}`
}

function showResult() {
    if (!player1.hp || !player2.hp ) {
        if (player1.hp > player2.hp) {
            arenas.appendChild(playerWin(player1.name))
            generateLogs('end', player1, player2)
        }
        else if (player1.hp < player2.hp) {
            arenas.appendChild(playerWin(player2.name))
            generateLogs('end', player2, player1)
        }
        else {
            generateLogs('draw')
            arenas.appendChild(playerWin())
        }
        // player1.hp > player2.hp ? arenas.appendChild(playerWin(player1.name)) :
        //     player1.hp < player2.hp ? arenas.appendChild(playerWin(player2.name)) :
        //         arenas.appendChild(playerWin())
        fightButton.disabled = true

        createReloadButton();
    }
}

function playerAttack() {
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

    return attack
}

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

generateLogs('start', player1, player2)