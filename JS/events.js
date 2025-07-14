const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSryEqgNxEKpF4HteGTSrk8J0gLLtjyhs2ilFfbE7yrY57pyGguGdGCPom2H3aPwCNDYOGHUAjO04Ry/pub?output=csv';

fetch(sheetCSVUrl)
  .then(res => res.text())
  .then(csvText => {
    const lines = csvText.trim().split(/\r?\n/);
    const events = [];
    const maxRows = Math.min(20, lines.length - 1);

    for (let i = 1; i <= maxRows; i++) {
      const cols = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      if (!cols || cols.length < 6) continue;
      if (cols[5].toLowerCase().trim() !== 'show') continue;

      const clean = str => str.replace(/^"|"$/g, '').trim();

      const title = clean(cols[0]);
      const dateStr = clean(cols[1]);
      const time = clean(cols[2]);
      const location = clean(cols[3]);
      const description = clean(cols[4]);

      const parts = dateStr.split('/');
      if (parts.length !== 3) continue;

      let [month, day, year] = parts.map(n => parseInt(n, 10));
      if (year < 100) year += 2000;

      const dateObj = new Date(year, month - 1, day);
      if (isNaN(dateObj)) continue;

      events.push({ title, dateStr, dateObj, time, location, description });
    }

    events.sort((a, b) => a.dateObj - b.dateObj);

    let html = '';
    let currentRow = '';

    events.forEach((event, idx) => {
      currentRow += `
        <div class="event-box">
          <img class="event-image" src="https://phpstack-578376-1871005.cloudwaysapps.com/storage/thumbnails/event/LtPCDALwAp9lsQtPTDxi2g7rPgnBu1BpQP99ES0q.png" alt="Event Image">
          <h2 class="event-title">${event.title}</h2>
          <p class="event-description">${event.description}</p>
          <p class="event-location"><strong>Location:</strong> ${event.location}</p>
          <p class="event-date"><strong>Date:</strong> ${event.dateStr}</p>
          <p class="event-time"><strong>Time:</strong> ${event.time}</p>
        </div>
      `;

      if ((idx + 1) % 2 === 0) {
        html += `<div class="events-row">${currentRow}</div>`;
        currentRow = '';
      }
    });

    if (currentRow.trim() !== '') {
      html += `<div class="events-row">${currentRow}</div>`;
    }

    document.getElementById('events-list').innerHTML = html;
  })
  .catch(err => {
    console.error('Failed to load events:', err);
    document.getElementById('events-list').innerHTML = '<p>Unable to load events at this time.</p>';
  });
