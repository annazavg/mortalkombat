import {player1, player2} from "./players.js";
import generateLogs from "./generateLogs.js";
import {arenas, fightButton} from "./selectors.js";

export const showResult = () => {
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
        fightButton.disabled = true
        createReloadButton();
    }
}

const playerWin = name => {
    const Title = createElement('div', 'loseTitle')
    name ? Title.innerHTML = `${name} WIN` : Title.innerHTML = `DRAW`
    return Title
}

export const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

const createReloadButton = () => {
    let div = createElement('div', `reloadWrap`)
    div.innerHTML= `<button class="button">Restart</button>`
    div.addEventListener('click', () => window.location.reload())
    arenas.appendChild(div)
}