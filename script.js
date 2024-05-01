document.addEventListener("DOMContentLoaded", setupTiles); // Setup tiles on document load

function setupTiles() {
    shuffleTiles(); // Shuffle tiles initially to ensure a random, solvable start
}

function shuffleTiles() {
    const container = document.getElementById('puzzle-container');
    container.innerHTML = ''; // Clear the container before setting up tiles
    let tiles = [];
    for (let i = 1; i <= 8; i++) {
        tiles.push(i);
    }
    tiles.push(''); // The empty slot

    do {
        // Shuffle array using Durstenfeld shuffle algorithm
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
    } while (!isSolvable(tiles));

    tiles.forEach((number, index) => {
        const tile = document.createElement('div');
        tile.style.backgroundImage = number ? `url('./${number}.jpg')` : 'none';
        tile.classList.add(number ? 'tile' : 'empty');
        tile.onclick = () => moveTile(index);
        container.appendChild(tile);
    });
}

function isSolvable(tiles) {
    let inversionCount = 0;
    const tileNumbers = tiles.filter(tile => tile !== '').map(tile => parseInt(tile, 10));

    for (let i = 0; i < tileNumbers.length; i++) {
        for (let j = i + 1; j < tileNumbers.length; j++) {
            if (tileNumbers[i] > tileNumbers[j]) {
                inversionCount++;
            }
        }
    }

    // Solvable if inversion count is even
    return inversionCount % 2 === 0;
}

function moveTile(index) {
    const container = document.getElementById('puzzle-container');
    const tiles = Array.from(container.children);
    const emptyIndex = tiles.findIndex(tile => tile.classList.contains('empty'));

    if (isValidMove(index, emptyIndex)) {
        [tiles[emptyIndex].style.backgroundImage, tiles[index].style.backgroundImage] =
            [tiles[index].style.backgroundImage, tiles[emptyIndex].style.backgroundImage];
        tiles[index].classList.add('empty');
        tiles[emptyIndex].classList.remove('empty');
    }
}

function isValidMove(clickedIndex, emptyIndex) {
    const distance = Math.abs(clickedIndex - emptyIndex);
    return distance === 1 || distance === 3;
}
