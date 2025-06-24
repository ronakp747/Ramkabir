const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv';

fetch(sheetCSVUrl)
  .then(res => res.text())
  .then(csvText => {
    console.log('Raw CSV:', csvText);

    const parsed = Papa.parse(csvText, { header: true });
    const rows = parsed.data;

    console.log('Parsed rows:', rows);
    if (!rows.length) {
      console.warn('No event rows found!');
      return;
    }
    console.log('Columns:', Object.keys(rows[0]));

    let html = '<div class="events-row">';
    let count = 0;

    rows.forEach((row, i) => {
      if (!row['Show/Hide'] || row['Show/Hide'].toLowerCase().trim() !== 'show') {
        console.log(`Skipping row ${i} due to Show/Hide: "${row['Show/Hide']}"`);
        return;
      }

      const title = row['Event Name']?.trim() || '';
      const date = row['Date']?.trim() || '';
      const time = row['Time']?.trim() || '';
      // Check for both 'Location' and 'location' keys to be safe
      const location = (row['Location'] || row['location'] || '').trim();
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
      if (count % 3 === 0 && i !== rows.length - 1) {
        html += '</div><div class="events-row">';
      }
    });

    html += '</div>';
    document.getElementById('events-list').innerHTML = html;
  })
  .catch(err => console.error('Failed to load events:', err));
