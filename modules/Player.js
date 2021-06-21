import {createElement} from "./utils.js";
import {arenas} from "./selectors.js";

class Player {
    constructor(props) {
        Object.assign(this, {...props})
        console.log(this)
    }
    elHP() { return document.querySelector(`.player${this.numberPlayer} .life`)}
    renderHP() { this.elHP().style.width = `${this.hp}%` }
    changeHP(hit) {
        this.hp -= hit
        this.hp = this.hp < 0 ? 0 : this.hp
    }
    createPlayer() {
        let div = createElement('div', `player${this.numberPlayer}`)
        div.innerHTML = `    
        <div class="progressbar">
            <div class="life" style="width: ${this.hp}%"></div>
            <div class="name">${this.name}</div>
        </div>
        <div class="character">
            <img src="${this.img}" />
        </div>`;
        arenas.appendChild(div)
    }
}
export default Player