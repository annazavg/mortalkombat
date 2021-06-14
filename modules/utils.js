const getNowTime = () => `${new Date().getHours()}:${new Date().getMinutes()}`
const getRandom = max => Math.floor(Math.random() * max + 1)

export { getNowTime, getRandom }