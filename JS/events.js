const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQBZBkLKhdKdhhQ8cTsPlUp1Cp5MkoRI4piPoeMnONSgQHigK82O7ccCeYvFbpOolLX_c9pui9PqzjD/pub?output=csv';

fetch(sheetCSVUrl)
  .then(res => res.text())
  .then(csvText => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');

    let html = '<div class="events-row">';
    let count = 0;

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',');

      // Skip if "Show/Hide" column is not "show"
      if (cols[5].toLowerCase().trim() !== 'show') continue;

      // Adjusted to your column order
      const title = cols[0];
      const date = cols[1];
      const time = cols[2];
      const location = cols[3];
      const description = cols[4];

      html += `
        <div class="event-box">
          <h2 class="event-title">${title}</h2>
          <p class="event-description">${description}</p>
          <p class="event-location"><strong>Location:</strong> ${location}</p>
          <p class="event-date-time"><strong>Date:</strong> ${date} | <strong>Time:</strong> ${time}</p>
        </div>
      `;

      count++;
      if (count % 3 === 0 && i !== lines.length - 1) {
        html += '</div><div class="events-row">';
      }
    }

    html += '</div>';
    document.getElementById('events-list').innerHTML = html;
  })
  .catch(err => console.error('Failed to load events:', err));
