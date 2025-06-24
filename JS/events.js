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

      // Debug: Log each row
      console.log(`Row ${i}:`, cols);

      // Check for empty or incomplete rows to skip
      if (cols.length < 6) {
        console.log(`Skipping row ${i}: not enough columns`);
        continue;
      }

      // Skip if "Show/Hide" column is not "show"
      if (cols[5].toLowerCase().trim() !== 'show') {
        console.log(`Skipping row ${i}: Show/Hide is '${cols[5]}'`);
        continue;
      }

      // Extract columns according to your sheet setup
      const title = cols[0].trim();
      const date = cols[1].trim();
      const time = cols[2].trim();
      const location = cols[3].trim();
      const description = cols[4].trim();

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

      // Every 3 events, close current row and start a new one
      if (count % 3 === 0 && i !== lines.length - 1) {
        html += '</div><div class="events-row">';
      }
    }

    html += '</div>';

    // Insert all the generated HTML into your events container
    document.getElementById('events-list').innerHTML = html;
  })
  .catch(err => {
    console.error('Failed to load events:', err);
  });
