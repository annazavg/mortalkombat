const getNowTime = () => `${new Date().getHours()}:${new Date().getMinutes()}`
const getRandom = max => Math.floor(Math.random() * max + 1)
const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(item => {
                $tag.classList.add(item);
            })
        } else {
            $tag.classList.add(className);
        }

    }

    return $tag;
}

const createEmptyPlayerBlock = ($parent) => {
    const el = createElement('div', ['character', 'div11', 'disabled']);
    const img = createElement('img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}

export { getNowTime, getRandom,createElement, createEmptyPlayerBlock }