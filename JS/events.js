const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv';

fetch(sheetCSVUrl)
  .then(res => res.text())
  .then(csvText => {
    const parsed = Papa.parse(csvText, { header: true });
    const rows = parsed.data;

    if (!rows || rows.length === 0) {
      console.warn('No data found in CSV.');
      return;
    }

    let html = '<div class="events-row">';
    let count = 0;

    rows.forEach((row, i) => {
      // Check "Show/Hide" column ignoring case and spaces
      const showHide = (row['Show/Hide'] || row['show/hide'] || '').toLowerCase().trim();
      if (showHide !== 'show') return;

      // Extract event fields (case-insensitive keys)
      const title = (row['Event Name'] || row['event name'] || '').trim();
      const date = (row['Date'] || row['date'] || '').trim();
      const time = (row['Time'] || row['time'] || '').trim();
      const location = (row['Location'] || row['location'] || '').trim();
      const description = (row['Description'] || row['description'] || '').trim();

      if (!title) return; // skip rows without a title

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
      if (count % 2 === 0 && i !== rows.length - 1) {
        html += '</div><div class="events-row">';
      }
    });

    html += '</div>';
    document.getElementById('events-list').innerHTML = html;
  })
  .catch(err => console.error('Failed to load events:', err));
