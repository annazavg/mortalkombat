// Sup Zar! how are u ?

class Fighter {
    constructor(name = '', hp = 0, img = '', weapon = [''],  ) {
        // return this = {name, hp, img, weapon}
        this.name = name;
        this.hp = hp;
        this.img = img;
        this.weapon = weapon;
    }
    attack() {
        return console.log(`${this.name} Fight`)
    }
}

const scorpion = new Fighter('Scorpio', 50, 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif', ['fist', 'leg'])
const subZero = new Fighter('Sub-Zero', 100, 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif', ['fist', 'leg'])

// console.log(scorpion.attack())
// console.log(subZero.attack())

function createPlayer(className, objFigher) {
    let div = document.createElement('div')
    div.className = className
    div.innerHTML = `    
        <div class="progressbar">
            <div class="life" style="width: ${objFigher.hp}%"></div>
            <div class="name">${objFigher.name}</div>
        </div>
        <div class="character">
            <img src="${objFigher.img}" />
        </div>    
    `;
    document.querySelector('.arenas').appendChild(div)
}

createPlayer('player1', scorpion)
createPlayer('player2', subZero)
