window.addEventListener('load', () => {
  const map = L.map('map').setView([53.4285, 14.5528], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  const downloadBtnOverlay = document.getElementById('download-btn-overlay');
  const puzzleMapContainer = document.getElementById('puzzle-map-container');

  downloadBtnOverlay.addEventListener('click', () => {
    console.log("Przycisk „Pobierz mapę” jest wciśnięty");

    leafletImage(map, function(err, canvas) {
      if (err) {
        console.error("Error:", err);
        return;
      }
      puzzleMapContainer.innerHTML = '';
      const size = 400;
      const snapshotCanvas = document.createElement('canvas');
      snapshotCanvas.width = size;
      snapshotCanvas.height = size;

      const ctx = snapshotCanvas.getContext('2d');
      ctx.drawImage(canvas, 0, 0, size, size, 0, 0, size, size);

      const puzzleMapImage = new Image();
      puzzleMapImage.src = snapshotCanvas.toDataURL();
      puzzleMapImage.onload = function() {
        puzzleMapContainer.appendChild(puzzleMapImage);
        createPuzzlePieces(snapshotCanvas);
      };
    });
  });

  const locationBtn = document.getElementById('location-btn');
  locationBtn.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        map.setView([lat, lng], 13);
        L.marker([lat, lng]).addTo(map)
          .bindPopup(`Szerokość: ${lat}, Długość: ${lng}`)
          .openPopup();

        if (Notification.permission === "granted") {
          new Notification("Twoja lokalizacja została zaktualizowana na mapie.");
        }
      },
      () => {
        alert("Nie udało się uzyskać lokalizacji.");
      }
    );
  });
  if (Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Zezwolenie na wyświetlanie ogłoszeń zostało udzielone.");
      } else {
        console.log("Odmowa uprawnień do wyświetlania powiadomień.");
      }
    });
  }
});
function createPuzzlePieces(canvas) {
  const piecesContainer = document.getElementById('pieces');
  piecesContainer.innerHTML = '';

  const gridSize = 4;
  const pieceWidth = canvas.width / gridSize;
  const pieceHeight = canvas.height / gridSize;

  const indices = Array.from(Array(gridSize * gridSize).keys());
  shuffle(indices);

  indices.forEach((index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    const pieceCanvas = document.createElement('canvas');
    pieceCanvas.width = pieceWidth;
    pieceCanvas.height = pieceHeight;

    const context = pieceCanvas.getContext('2d');
    context.drawImage(
      canvas,
      col * pieceWidth,
      row * pieceHeight,
      pieceWidth,
      pieceHeight,
      0,
      0,
      pieceWidth,
      pieceHeight
    );

    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundImage = `url(${pieceCanvas.toDataURL()})`;
    piece.style.width = `${pieceWidth}px`;
    piece.style.height = `${pieceHeight}px`;
    piece.draggable = true;
    piecesContainer.appendChild(piece);

    piece.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', piece.style.backgroundImage);
      e.dataTransfer.setData('index', index);
    });
  });

  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    cell.addEventListener('drop', (e) => {
      const image = e.dataTransfer.getData('text/plain');
      const index = e.dataTransfer.getData('index');
      cell.style.backgroundImage = image;
      cell.dataset.index = index;
      checkPuzzleCompletion();
    });
    grid.appendChild(cell);
  }
}
function checkPuzzleCompletion() {
  const cells = document.querySelectorAll('#grid .cell');
  let isCompleted = true;

  cells.forEach((cell, index) => {
    if (cell.dataset.index != index) {
      isCompleted = false;
    }
  });

  if (isCompleted) {
    console.log("Udało się!");
    alert("Udało się!");
  }
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
