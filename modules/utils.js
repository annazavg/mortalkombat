const getNowTime = () => `${new Date().getHours()}:${new Date().getMinutes()}`
const getRandom = max => Math.floor(Math.random() * max + 1)
const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}
export { getNowTime, getRandom,createElement }