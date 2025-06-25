const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSryEqgNxEKpF4HteGTSrk8J0gLLtjyhs2ilFfbE7yrY57pyGguGdGCPom2H3aPwCNDYOGHUAjO04Ry/pub?output=csv';

function loadEvents() {
  // Add cache buster to avoid cached responses
  const urlWithCacheBuster = sheetCSVUrl + '&_=' + new Date().getTime();

  fetch(urlWithCacheBuster)
    .then(res => res.text())
    .then(csvText => {
      const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
      const data = parsed.data;

      let html = '<div class="events-row">';
      let count = 0;
      const maxRows = Math.min(20, data.length);

      for (let i = 0; i < maxRows; i++) {
        const row = data[i];

        // Check Show/Hide column, skip if missing or not 'show'
        if (!row['Show/Hide'] || row['Show/Hide'].toLowerCase().trim() !== 'show') continue;

        const title = row['Title']?.trim() || '';
        const date = row['Date']?.trim() || '';
        const time = row['Time']?.trim() || '';
        const location = row['Location']?.trim() || '';
        const description = row['Description']?.trim() || '';

        html += `
          <div class="event-box">
            <h2 class="event-title">${title}</h2>
            <p class="event-description">${description}</p>
            <p class="event-location"><strong>Location:</strong> ${location}</p>
            <p class="event-date"><strong>Date:</strong> ${date}</p>
            <p class="event-time"><strong>Time:</strong> ${time}</p>
          </div>
        `;

        count++;
        if (count % 4 === 0 && i !== maxRows - 1) {
          html += '</div><div class="events-row">';
        }
      }
      html += '</div>';

      document.getElementById('events-list').innerHTML = html;
    })
    .catch(err => console.error('Failed to load events:', err));
}

// Call once to load events on page load
loadEvents();
