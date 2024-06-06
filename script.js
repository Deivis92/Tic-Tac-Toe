let fields = [null, null, null, null, null, null, null, null, null,];

let currentPlayer = "circle";

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Reihen
    [0, 4, 8], [2, 4, 6] // Diagonale Reihen
];



function init() {
  render();
}

function render() {
    const contentDiv = document.getElementById("content");
    let htmlContent = ""; // Initialisiere einen leeren String für den HTML-Inhalt

    for (let i = 0; i < fields.length; i++) {
        let cellClass = "cell";
        let cellContent = fields[i] ? fields[i] === "circle" ? generateAnimatedCircle() : generateXSymbol() : "";

        htmlContent += `<div class="${cellClass}" onclick="handleCellClick(${i})">${cellContent}</div>`;
    }

    contentDiv.innerHTML = htmlContent; // Setze das innerHTML des contentDiv
    checkGameStatus(contentDiv);

    
}

function handleCellClick(index) {
    if (!fields[index]) {
        fields[index] = currentPlayer;
        render();
        currentPlayer = currentPlayer === "circle" ? "cross" : "circle"; // Wechselt den aktuellen Spieler
        document.querySelectorAll('.cell')[index].onclick = null; // Entfernt das onClick-Event des angeklickten Zellenfelds
    }
}


function checkGameStatus(contentDiv) {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(combination, contentDiv); // Zeichnet eine Linie, wenn eine Gewinnkombination gefunden wird
            gameEnd();
            return;
        }
    }
}

function gameEnd() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.onclick = null; // Remove click event listener
    });
}
    

function drawWinningLine(combination, contentDiv) {
    const [a, b, c] = combination;

    // Calculate the center coordinates of the cells in the winning combination
    const startX = getCellCenterX(a);
    const startY = getCellCenterY(a);
    const endX = getCellCenterX(c);
    const endY = getCellCenterY(c);

    // Calculate the midpoint coordinates of the line
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    // Calculate line length and rotation angle
    const lineLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

    // Create a div element for the line
    const lineDiv = document.createElement('div');
    lineDiv.className = 'winning-line';
    lineDiv.style.width = `${lineLength}px`;
    lineDiv.style.height = '5px';
    lineDiv.style.backgroundColor = 'white';
    lineDiv.style.position = 'absolute';
    lineDiv.style.left = `${midX - lineLength / 2}px`;
    lineDiv.style.top = `${midY - 2.5}px`; // Adjust for half the line thickness
    lineDiv.style.transform = `rotate(${angle}deg)`;

    contentDiv.appendChild(lineDiv);
}


function getCellCenterX(index) {
    const cell = document.querySelectorAll('.cell')[index];
    return cell.offsetLeft + cell.offsetWidth / 2;
}

function getCellCenterY(index) {
    const cell = document.querySelectorAll('.cell')[index];
    return cell.offsetTop + cell.offsetHeight / 2;
}


function generateAnimatedCircle() {
  return `
    <svg width="70" height="70">
    <circle cx="35" cy="35" r="30" fill="transparent" stroke="#00B0EF" stroke-width="5">
        <animate attributeName="r" from="0" to="30" dur="0.25s" fill="freeze" />
    </circle>
</svg>
    `;
}

function generateXSymbol() {
  return `
    <svg width="70" height="70">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="6">
                <animateTransform attributeName="transform" attributeType="XML"
                    type="rotate" from="0 35 35" to="360 35 35" dur="0.25s" fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#FFC000" stroke-width="6">
                <animateTransform attributeName="transform" attributeType="XML"
                    type="rotate" from="0 35 35" to="360 35 35" dur="0.25s" fill="freeze" />
            </line>
        </svg>
    `;
}
