const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQBZBkLKhdKdhhQ8cTsPlUp1Cp5MkoRI4piPoeMnONSgQHigK82O7ccCeYvFbpOolLX_c9pui9PqzjD/pub?output=csv';

fetch(sheetCSVUrl)
  .then(res => res.text())
  .then(csvText => {
    const parsed = Papa.parse(csvText, { header: true });
    const rows = parsed.data;

    console.log('All rows from CSV:', rows);

    let html = '<div class="events-row">';
    let count = 0;

    rows.forEach((row, i) => {
      console.log(`Row ${i}: Show/Hide='${row['Show/Hide']}'`);
      
      if (row['Show/Hide']?.toLowerCase().trim() !== 'show') {
        console.log(`Skipping row ${i} because Show/Hide is not "show"`);
        return;
      }

      const title = row['Event Name']?.trim() || '';
      const date = row['Date']?.trim() || '';
      const time = row['Time']?.trim() || '';
      const location = row['Location']?.trim() || '';
      const description = row['Description']?.trim() || '';

      console.log(`Adding row ${i}:`, { title, date, time, location, description });

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
      if (count % 3 === 0 && i !== rows.length - 1) {
        html += '</div><div class="events-row">';
      }
    });

    html += '</div>';
    document.getElementById('events-list').innerHTML = html;
  })
  .catch(err => console.error('Failed to load events:', err));
