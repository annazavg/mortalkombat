export const player1 = {
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

export const player2 = {
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

function elHP() { return document.querySelector(`.player${this.numberPlayer} .life`) }

function renderHP() { this.elHP().style.width = `${this.hp}%` }

function changeHP(hit) {
    this.hp -= hit
    this.hp = this.hp < 0 ? 0 : this.hp
}