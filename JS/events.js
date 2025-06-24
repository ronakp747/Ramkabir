const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv';

fetch(sheetCSVUrl)
  .then(res => {
    console.log('Fetch response status:', res.status);
    return res.text();
  })
  .then(csvText => {
    console.log('CSV text loaded:', csvText.slice(0, 200)); // first 200 chars
    const parsed = Papa.parse(csvText, { header: true });
    console.log('Parsed data:', parsed.data);

    const rows = parsed.data;
    if (!rows || rows.length === 0) {
      console.warn('No data found in CSV.');
      return;
    }

    let html = '<div class="events-row">';
    let count = 0;

    rows.forEach((row, i) => {
      const showHide = (row['Show/Hide'] || row['show/hide'] || '').toLowerCase().trim();
      console.log(`Row ${i} Show/Hide:`, showHide);
      if (showHide !== 'show') return;

      const title = (row['Event Name'] || row['event name'] || '').trim();
      if (!title) return;

      const date = (row['Date'] || row['date'] || '').trim();
      const time = (row['Time'] || row['time'] || '').trim();
      const location = (row['Location'] || row['location'] || '').trim();
      const description = (row['Description'] || row['description'] || '').trim();

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
