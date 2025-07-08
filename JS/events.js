const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSryEqgNxEKpF4HteGTSrk8J0gLLtjyhs2ilFfbE7yrY57pyGguGdGCPom2H3aPwCNDYOGHUAjO04Ry/pub?output=csv';

fetch(sheetCSVUrl)
  .then(res => res.text())
  .then(csvText => {
    const lines = csvText.trim().split('\n');

    const events = [];

    const maxRows = Math.min(20, lines.length - 1);

    for (let i = 1; i <= maxRows; i++) {
      const cols = lines[i].split(',');

      if (cols.length < 6) continue;
      if (cols[5].toLowerCase().trim() !== 'show') continue;

      const title = cols[0].trim();
      const dateStr = cols[1].trim();
      const time = cols[2].trim();
      const location = cols[3].trim();
      const description = cols[4].trim();

      // Parse dateStr (MM/DD/YY) to Date object
      const [month, day, year] = dateStr.split('/').map(n => parseInt(n, 10));
      const fullYear = year < 100 ? 2000 + year : year; // convert 2-digit year
      const dateObj = new Date(fullYear, month - 1, day);

      events.push({ title, dateStr, dateObj, time, location, description });
    }

    // Sort events ascending by date
    events.sort((a, b) => a.dateObj - b.dateObj);

    // Build HTML with 2 events per row
    let html = '';
    let currentRow = '';

    events.forEach((event, index) => {
      currentRow += `
        <div class="event-box">
          <h2 class="event-title">${event.title}</h2>
          <p class="event-description">${event.description}</p>
          <p class="event-location"><strong>Location:</strong> ${event.location}</p>
          <p class="event-date"><strong>Date:</strong> ${event.dateStr}</p>
          <p class="event-time"><strong>Time:</strong> ${event.time}</p>
        </div>
      `;

      if ((index + 1) % 2 === 0) {
        html += `<div class="events-row">${currentRow}</div>`;
        currentRow = '';
      }
    });

    // Add leftover event if any
    if (currentRow.trim() !== '') {
      html += `<div class="events-row">${currentRow}</div>`;
    }

    document.getElementById('events-list').innerHTML = html;
  })
  .catch(err => {
    console.error('Failed to load events:', err);
    document.getElementById('events-list').innerHTML = '<p>Unable to load events at this time.</p>';
  });
