const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSryEqgNxEKpF4HteGTSrk8J0gLLtjyhs2ilFfbE7yrY57pyGguGdGCPom2H3aPwCNDYOGHUAjO04Ry/pub?output=csv';

fetch(sheetCSVUrl)
  .then(res => res.text())
  .then(csvText => {
    // Split lines robustly, handling Windows and Unix line endings
    const lines = csvText.trim().split(/\r?\n/);
    
    // We will store events here
    const events = [];

    const maxRows = Math.min(20, lines.length - 1);

    for (let i = 1; i <= maxRows; i++) {
      // Split with a regex that respects commas inside quotes (improves CSV parsing)
      const cols = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

      if (!cols || cols.length < 6) continue;

      if (cols[5].toLowerCase().trim() !== 'show') continue;

      // Trim and remove quotes if any
      const clean = str => str.replace(/^"|"$/g, '').trim();

      const title = clean(cols[0]);
      const dateStr = clean(cols[1]);
      const time = clean(cols[2]);
      const location = clean(cols[3]);
      const description = clean(cols[4]);

      // Parse date MM/DD/YY or MM/DD/YYYY robustly
      const parts = dateStr.split('/');
      if (parts.length !== 3) continue; // skip if malformed

      let [month, day, year] = parts.map(n => parseInt(n, 10));
      if (year < 100) year += 2000; // convert 2-digit year to 4-digit

      const dateObj = new Date(year, month - 1, day);
      if (isNaN(dateObj)) continue; // skip invalid dates

      events.push({ title, dateStr, dateObj, time, location, description });
    }

    // Sort ascending by date (most upcoming first)
    events.sort((a, b) => a.dateObj - b.dateObj);

    let html = '';
    let currentRow = '';

    events.forEach((event, idx) => {
      currentRow += `
        <div class="event-box">
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

    // Add leftover cards if any
    if (currentRow.trim() !== '') {
      html += `<div class="events-row">${currentRow}</div>`;
    }

    document.getElementById('events-list').innerHTML = html;
  })
  .catch(err => {
    console.error('Failed to load events:', err);
    document.getElementById('events-list').innerHTML = '<p>Unable to load events at this time.</p>';
  });
