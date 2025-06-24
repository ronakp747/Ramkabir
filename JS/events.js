const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQBZBkLKhdKdhhQ8cTsPlUp1Cp5MkoRI4piPoeMnONSgQHigK82O7ccCeYvFbpOolLX_c9pui9PqzjD/pub?output=csv';

fetch(sheetCSVUrl)
  .then(res => res.text())
  .then(csvText => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');

    let html = '<div class="events-row">'; // container for a row
    let count = 0;

    for(let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',');

      // Check Show/Hide column - skip if "Hide"
      if (cols[5].toLowerCase() !== 'show') continue;

      const title = cols[0];
      const description = cols[1];
      const location = cols[2];
      const date = cols[3];
      const time = cols[4];

      html += `
        <div class="event-box">
          <h2 class="event-title">${title}</h2>
          <p class="event-description">${description}</p>
          <p class="event-location"><strong>Location:</strong> ${location}</p>
          <p class="event-date-time"><strong>Date:</strong> ${date} | <strong>Time:</strong> ${time}</p>
        </div>
      `;

      count++;
      // Every 3 events, close current row and start a new one
      if (count % 3 === 0 && i !== lines.length - 1) {
        html += '</div><div class="events-row">';
      }
    }

    html += '</div>'; // close last row

    document.getElementById('events-list').innerHTML = html;
  })
  .catch(err => console.error('Failed to load events:', err));
