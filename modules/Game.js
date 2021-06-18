import logs from "./dataLogs.js";
import {getNowTime, getRandom, createElement} from "./utils.js";
import {arenas} from "./selectors.js";

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.HIT = { head: 30, body: 25, foot: 20 }
        this.ATTACK = ['head', 'body', 'foot'];
        this.formFight = document.querySelector('.control')
        this.fightButton = document.querySelector('.control .button')
        this.chat = document.querySelector('.chat')
    }
    start() {
        this.player1.createPlayer()
        this.player2.createPlayer()
        this.formFight.addEventListener('submit', (e) => {
            e.preventDefault()
            const enemy = this.enemyAttack()
            const attack = this.playerAttack()
            // console.log(player1)
            if (enemy.hit !== attack.defence) {
                this.player1.changeHP(enemy.value)
                this.player1.renderHP()
                this.generateLogs('hit', this.player2, this.player1, enemy.value)
            } else {
                this.generateLogs('defence', this.player2, this.player1)
            }
            if (attack.hit !== enemy.defence) {
                this.player2.changeHP(attack.value)
                this.player2.renderHP()
                this.generateLogs('hit', this.player1, this.player2, attack.value)
            } else {
                this.generateLogs('defence', this.player1, this.player2)
            }
            this.showResult()
        })
    }
    generateLogs(type, player1, player2, hit) {
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
        this.chat.insertAdjacentHTML('beforeend', el)
    }
    showResult() {
        if (!this.player1.hp || !this.player2.hp ) {
            if (this.player1.hp > this.player2.hp) {
                arenas.appendChild(this.playerWin(this.player1.name))
                this.generateLogs('end', this.player1, this.player2)
            }
            else if (this.player1.hp < this.player2.hp) {
                arenas.appendChild(this.playerWin(this.player2.name))
                this.generateLogs('end', this.player2, this.player1)
            }
            else {
                this.generateLogs('draw')
                arenas.appendChild(this.playerWin())
            }
            this.fightButton.disabled = true
            this.createReloadButton();
        }
    }
    createReloadButton() {
        let div = createElement('div', `reloadWrap`)
        div.innerHTML= `<button class="button">Restart</button>`
        div.addEventListener('click', () => window.location.reload())
        arenas.appendChild(div)
    }
    playerWin(name) {
        const Title = createElement('div', 'loseTitle')
        name ? Title.innerHTML = `${name} WIN` : Title.innerHTML = `DRAW`
        return Title
    }
    enemyAttack () {
        const hit = this.ATTACK[getRandom(3) - 1]
        const defence = this.ATTACK[getRandom(3) - 1]
        return {
            value: getRandom(this.HIT[hit]),
            hit,
            defence
        }
    }
    playerAttack () {
        const attack = {};
        for (let item of this.formFight) {
            if (item.checked && item.name === 'hit') {
                attack.value = getRandom(this.HIT[item.value])
                attack.hit = item.value
            }
            if (item.checked && item.name === 'defence') {
                attack.defence = item.value
            }
            item.checked = false;
        }
        return attack
    }
}
export default Game