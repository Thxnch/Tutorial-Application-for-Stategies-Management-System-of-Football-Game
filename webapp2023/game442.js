let draggedPlayer = null;
let players = [];
let zIndexCounter = 1;

var score = 0; // เพิ่มตัวแปรสำหรับเก็บคะแนน

const slotColors = {
    slot1: "red",
    slot2: "red",
    slot3: "yellow",
    slot4: "yellow",
    slot5: "yellow",
    slot6: "yellow",
    slot7: "blue",
    slot8: "blue",
    slot9: "blue",
    slot10: "blue"
};

document.getElementById('field').addEventListener('mouseup', function (e) {
    if (draggedPlayer) {
        var emptySlot = findEmptySlot(e.clientX, e.clientY);
        var fieldRect = document.getElementById('field').getBoundingClientRect();

        if (emptySlot) {
            if (!isSlotOccupied(emptySlot)) {
                var playerColor = draggedPlayer.style.backgroundColor;
                var slotColor = slotColors[emptySlot.id];

                if (playerColor == slotColor) {
                    score += 1;
                    updateScore();
                }
                

                showColorAndNamePopup(draggedPlayer);
                draggedPlayer.style.pointerEvents = 'none';

                emptySlot.appendChild(draggedPlayer);
                draggedPlayer.style.position = 'static';
                draggedPlayer.style.left = '';
                draggedPlayer.style.top = '';

                draggedPlayer.style.pointerEvents = 'none';
            } else {
                alert('This slot is already occupied!');
            }
        } else {
            var originalPosition = players.find(p => p.element === draggedPlayer);
            draggedPlayer.style.left = originalPosition.element.style.left;
            draggedPlayer.style.top = originalPosition.element.style.top;
        }

        draggedPlayer = null;
    }
});

document.getElementById('field').addEventListener('touchend', function (e) {
    if (draggedPlayer) {
        var emptySlot = findEmptySlot(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        var fieldRect = document.getElementById('field').getBoundingClientRect();

        if (emptySlot) {
            if (!isSlotOccupied(emptySlot)) {
                var playerColor = draggedPlayer.style.backgroundColor;
                var slotColor = slotColors[emptySlot.id];

                if (playerColor == slotColor) {
                    score += 1;
                    updateScore();
                }
                

                showColorAndNamePopup(draggedPlayer);
                draggedPlayer.style.pointerEvents = 'none';

                emptySlot.appendChild(draggedPlayer);
                draggedPlayer.style.position = 'static';
                draggedPlayer.style.left = '';
                draggedPlayer.style.top = '';

                draggedPlayer.style.pointerEvents = 'none';
            } else {
                alert('This slot is already occupied!');
            }
        } else {
            var originalPosition = players.find(p => p.element === draggedPlayer);
            draggedPlayer.style.left = originalPosition.element.style.left;
            draggedPlayer.style.top = originalPosition.element.style.top;
        }

        draggedPlayer = null;
    }
});

function isSlotOccupied(slot) {
    return Array.from(slot.children).some(child => child.classList.contains('player'));
}

function findEmptySlot(mouseX, mouseY) {
    var emptySlots = document.querySelectorAll('.empty-slot');
    for (var i = 0; i < emptySlots.length; i++) {
        var slotRect = emptySlots[i].getBoundingClientRect();
        if (
            mouseX >= slotRect.left &&
            mouseX <= slotRect.right &&
            mouseY >= slotRect.top &&
            mouseY <= slotRect.bottom
        ) {
            return emptySlots[i];
        }
    }
    return null;
}

function showColorAndNamePopup(player) {
    document.getElementById('color-name-popup').style.display = 'block';
    currentSelectedPlayer = player;
}

function addPlayer(x, y, playerName) {
    var player = document.createElement('div');
    player.className = 'player';
    player.style.left = x + 'px';
    player.style.top = y + 'px';
    player.innerText = playerName;

    player.style.zIndex = zIndexCounter;
    zIndexCounter++;

    player.addEventListener('mousedown', function (e) {
        draggedPlayer = player;
    });

    player.addEventListener('touchstart', function (e) {
        draggedPlayer = player;
    });

    document.getElementById('field').appendChild(player);
    players.push({ element: player, name: playerName });
}

let currentSelectedPlayer = null;

function setColorAndName(color, playerName) {
    if (color.trim() !== '' && playerName.trim() !== '') {
        currentSelectedPlayer.style.backgroundColor = color;
        currentSelectedPlayer.innerText = playerName;

        document.getElementById('color-name-popup').style.display = 'none';

        var emptySlot = findEmptySlot(currentSelectedPlayer.getBoundingClientRect().left, currentSelectedPlayer.getBoundingClientRect().top);
        if (emptySlot) {
            emptySlot.appendChild(currentSelectedPlayer);
            currentSelectedPlayer.style.position = 'static';
            currentSelectedPlayer.style.left = '';
            currentSelectedPlayer.style.top = '';

            currentSelectedPlayer.style.pointerEvents = 'none';
        }
    } else {
        alert('กรุณาเลือกสีและกรอกตำแหน่งผู้เล่น!');
    }
}

function cancelColorAndName() {
    document.getElementById('color-name-popup').style.display = 'none';
}

function updateScore() {
    console.log('Updating score:', score);
    document.getElementById('score-value').innerText = score;
}

// เพิ่มฟังก์ชันเพื่อลบตัวละครที่ไม่ได้ถูกใช้งาน
function removeUnusedPlayers() {
    players.forEach(player => {
        if (document.getElementById('field').contains(player.element)) {
            return;
        }

        const index = players.indexOf(player);
        if (index > -1) {
            players.splice(index, 1);
        }
    });
}

function confirmButtonClicked() {
    removeUnusedPlayers();

    // ตรวจสอบสีของผู้เล่นทุกตัว
    players.forEach(player => {
        var slotId = player.element.parentElement.id; // ใช้ ID ของผู้เล่นอยู่ในช่องปัจจุบัน
        var slotColor = slotColors[slotId];
        var playerColor = player.element.style.backgroundColor;

        // เปรียบเทียบสีของผู้เล่นกับสีในช่อง
        if (playerColor == slotColor) {
            score += 1;
        }
    });

    updateScore();
    alert('การจัดตำแหน่งเสร็จสิ้น!');

    // ล้างค่าคะแนนเป็น 0
    score = 0;
}
