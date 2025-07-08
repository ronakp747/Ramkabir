const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSryEqgNxEKpF4HteGTSrk8J0gLLtjyhs2ilFfbE7yrY57pyGguGdGCPom2H3aPwCNDYOGHUAjO04Ry/pub?output=csv';

fetch(sheetCSVUrl)
  .then(res => res.text())
  .then(csvText => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');

    let html = '';
    let currentRow = '';
    let cardCount = 0;

    const maxRows = Math.min(20, lines.length - 1);

    for (let i = 1; i <= maxRows; i++) {
      const cols = lines[i].split(',');

      if (cols.length < 6) continue;
      const showHide = cols[5].toLowerCase().trim();
      if (showHide !== 'show') continue;

      const title = cols[0].trim();
      const date = cols[1].trim();
      const time = cols[2].trim();
      const location = cols[3].trim();
      const description = cols[4].trim();

      const positionClass = `position-${(cardCount % 3) + 1}`; // 1, 2, 3

      currentRow += `
        <div class="event-box ${positionClass}">
          <h2 class="event-title">${title}</h2>
          <p class="event-description">${description}</p>
          <p class="event-location"><strong>Location:</strong> ${location}</p>
          <p class="event-date"><strong>Date:</strong> ${date}</p>
          <p class="event-time"><strong>Time:</strong> ${time}</p>
        </div>
      `;

      cardCount++;

      if (cardCount % 3 === 0) {
        html += `<div class="events-row">${currentRow}</div>`;
        currentRow = '';
      }
    }

    // Add remaining cards if not multiple of 3
    if (currentRow.trim() !== '') {
      html += `<div class="events-row">${currentRow}</div>`;
    }

    document.getElementById('events-list').innerHTML = html;
  })
  .catch(err => {
    console.error('Failed to load events:', err);
    document.getElementById('events-list').innerHTML = '<p>Unable to load events at this time.</p>';
  });
