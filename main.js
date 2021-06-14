// import logs from './modules/dataLogs.js'
import {player1, player2} from './modules/players.js'
import generateLogs from './modules/generateLogs.js'
import {showResult, createElement} from "./modules/interface.js";
import {formFight, arenas} from "./modules/selectors.js";
import {playerAttack, enemyAttack} from "./modules/gamePlay.js";


formFight.addEventListener('submit', function (e) {
    e.preventDefault()
    const enemy = enemyAttack()
    const attack = playerAttack()

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

const createPlayer = objFighter => {
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