import logs from "./dataLogs.js";
import {getNowTime, getRandom} from "./utils.js";
import {chat} from "./selectors.js";

export const generateLogs = (type, player1, player2, hit) => {
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
export default generateLogs