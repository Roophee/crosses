'use strict';

const cross = "✕";
const circle = "◯";
let choiceCounter = 1;
var combo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const getComboResult = arr => {
    let [one, two, three] = arr;
    return (checkChoiceSymbolInCell(one, cross)
    && checkChoiceSymbolInCell(two, cross)
    && checkChoiceSymbolInCell(three, cross))
    ||
    (checkChoiceSymbolInCell(one, circle)
    && checkChoiceSymbolInCell(two, circle)
    && checkChoiceSymbolInCell(three, circle))
}

const getNodeById = id => document.querySelector(`#\\3${id}`);

const getAllNodesByClass = className => document.querySelectorAll(`.${className}`)

const getNodeByClass = className => document.querySelector(`.${className}`)

const checkChoiceSymbolInCell = (id, choiceSymbol) => {
    return getNodeById(id).innerHTML === choiceSymbol;
}

const checkWinCombo = () => {
    const usersCombos = combo.map(getComboResult);
    const idxWinCombo = usersCombos.findIndex(elem => elem);
    return idxWinCombo;
}

const showWinCombo = idx => {
    combo[idx].map(id => {
        getNodeById(id).closest('.crosses__place').classList.add('win-combo');
    })
    getAllNodesByClass('crosses__cross').forEach(node => node.classList.add('hide'));
}

function gameOver() {
    getAllNodesByClass("crosses__place").forEach(node => node.removeEventListener('click', contextCatcherForHandler))
}

const crossOrCircle = () => {
    if (choiceCounter % 2 === 1) {
        return 'cross';
    }
    return 'circle';
}

const analyzeTheGameState= () => {
    if (checkWinCombo() >= 0) {
        showWinCombo(checkWinCombo())
        gameOver();
        console.log("GAME IS  OVER")
    }
}

const addColorStyle = (node) => {
    if (crossOrCircle() === 'cross') {
        node.classList.add('cross');
    } else {
        node.classList.add('circle')
    }
}

const getChoiceSymbol = () => {
    if (crossOrCircle() === 'cross') {
        return cross;
    }
    return circle;
}

const removeClass = (node, className) => {
    node.classList.remove(`${className}`);
}

const buttonHandler = event => {
    choiceCounter = 1;

    getAllNodesByClass("crosses__cross").forEach(node => {
        node.innerHTML = '';
        removeClass(node, 'hide');
        removeClass(node, 'cross');
        removeClass(node, 'circle');
    });

    getAllNodesByClass("crosses__place").forEach(node => {
        node.removeEventListener('click', contextCatcherForHandler);
        removeClass(node, 'win-combo')
    });

    getAllNodesByClass("crosses__place").forEach(addCellEventListener);
}

const setUserChoice = node => {
    const crossCell = node.querySelector(".crosses__cross");
    crossCell.innerHTML = getChoiceSymbol();
    addColorStyle(crossCell);
    choiceCounter++;
    node.removeEventListener('click', contextCatcherForHandler);
    analyzeTheGameState();
    return
}

function contextCatcherForHandler() {
    setUserChoice(this);
}

const addCellEventListener = node => {
    node.addEventListener('click', contextCatcherForHandler);
}

const calculateContainerSize = (item) => {
    let size;
    const bodyElem = getNodeByClass('body')

    if (bodyElem.offsetWidth >= bodyElem.offsetHeight) {
        size = Math.floor(bodyElem.offsetHeight*0.8);
    } else {
        size = Math.floor(bodyElem.offsetWidth*0.8);
    }

    item.style.width = size + 'px';
    item.style.height = size + 'px';
    getAllNodesByClass('crosses__cross').forEach(node => { node.style.fontSize = (size / 4) + 'px' })
    getNodeByClass('crosses__button').style.fontSize = (size / 20) + 'px';
}

calculateContainerSize(getNodeByClass('crosses__container'));
getAllNodesByClass("crosses__place").forEach(addCellEventListener);
getNodeByClass('crosses__button').addEventListener('click', buttonHandler);
