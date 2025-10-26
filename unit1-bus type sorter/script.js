// Drag & drop logic
const cards = document.querySelectorAll('.card');
const zones = document.querySelectorAll('.zone');
const pile = document.querySelector('.pile');
const checkBtn = document.getElementById('checkBtn');
const resetBtn = document.getElementById('resetBtn');
const scoreEl = document.getElementById('score');

let dragged = null;

// Make cards draggable with pointer
cards.forEach(card => {
  card.addEventListener('dragstart', e => {
    dragged = card;
    card.classList.add('dragging');
    e.dataTransfer.setData('text/plain', card.textContent);
    e.dataTransfer.effectAllowed = 'move';
  });
  card.addEventListener('dragend', () => {
    if (dragged) dragged.classList.remove('dragging');
    dragged = null;
  });

  // Keyboard support: Enter to move focused card back to pile
  card.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      pile.appendChild(card);
      card.focus();
    }
  });
});

// Zones events
zones.forEach(zone => {
  zone.addEventListener('dragover', e => {
    e.preventDefault(); // allow drop
    zone.classList.add('over');
  });
  zone.addEventListener('dragleave', () => zone.classList.remove('over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('over');
    if (dragged) zone.appendChild(dragged);
  });
});

// Allow dropping back into the pile
pile.addEventListener('dragover', e => e.preventDefault());
pile.addEventListener('drop', e => {
  e.preventDefault();
  if (dragged) pile.appendChild(dragged);
});

// Check answers
checkBtn.addEventListener('click', () => {
  let total = 0, correct = 0;

  document.querySelectorAll('.card').forEach(card => {
    total++;
    const correctZoneId = card.dataset.answer;
    const parentZone = card.closest('.zone');
    const isCorrect = parentZone && parentZone.dataset.zone === correctZoneId;

    card.classList.remove('correct', 'incorrect');
    if (isCorrect) {
      card.classList.add('correct');
      correct++;
    } else {
      // Only mark incorrect if it has been placed (not in pile)
      if (parentZone) card.classList.add('incorrect');
    }
  });

  scoreEl.textContent = `Score: ${correct} / ${total}`;
});

// Reset
resetBtn.addEventListener('click', () => {
  scoreEl.textContent = '';
  document.querySelectorAll('.card').forEach(card => {
    card.classList.remove('correct', 'incorrect');
    pile.appendChild(card);
  });
});
