// events.js
const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSryEqgNxEKpF4HteGTSrk8J0gLLtjyhs2ilFfbE7yrY57pyGguGdGCPom2H3aPwCNDYOGHUAjO04Ry/pub?output=csv';

// simple CSV parser (handles quotes + commas inside quotes)
function parseCSVRow(line) {
  const out = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"'; // escaped quote
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);

  return out.map(s => s.trim().replace(/^"|"$/g, ''));
}

fetch(sheetCSVUrl)
  .then(res => res.text())
  .then(csvText => {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length <= 1) {
      document.getElementById('events-list').innerHTML = '<p>No events found.</p>';
      return;
    }

    const events = [];
    const maxRows = Math.min(20, lines.length - 1);

    for (let i = 1; i <= maxRows; i++) {
      const cols = parseCSVRow(lines[i]);
      // expecting: title, date, time, location, description, show/hide
      if (!cols || cols.length < 6) continue;
      if (cols[5].toLowerCase().trim() !== 'show') continue;

      const title = cols[0];
      const dateStr = cols[1];
      const time = cols[2];
      const location = cols[3];
      const description = cols[4]; // now full multi-word text is preserved

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
