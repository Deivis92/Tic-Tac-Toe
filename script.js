let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

const gameState = [null, 'circle', 'circle', 'circle', null, null, 'cross', 'cross', null];

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';  // Clear the previous content

    for (let i = 0; i < gameState.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (gameState[i] === 'circle') {
            cell.classList.add('circle');
            cell.textContent = 'O';
        } else if (gameState[i] === 'cross') {
            cell.classList.add('cross');
            cell.textContent = 'X';
        }
        contentDiv.appendChild(cell);
    }
}
render();