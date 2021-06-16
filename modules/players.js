import Player from "./Player.js";

export const player1 = new Player({
    numberPlayer: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['fist', 'leg']
})

export const player2 = new Player({
    numberPlayer: 2,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['ice','leg']
})