const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQBZBkLKhdKdhhQ8cTsPlUp1Cp5MkoRI4piPoeMnONSgQHigK82O7ccCeYvFbpOolLX_c9pui9PqzjD/pub?output=csv';

fetch(sheetCSVUrl)
  .then(res => res.text())
  .then(csvText => {
    const parsed = Papa.parse(csvText, { header: true });
    const rows = parsed.data;

    let html = '<div class="events-row">';
    let count = 0;

    rows.forEach((row, index) => {
      if (!row["Show/Hide"] || row["Show/Hide"].toLowerCase() !== "show") return;

      html += `
        <div class="event-box">
          <h2 class="event-title">${row["Title"]}</h2>
          <p class="event-description">${row["Description"]}</p>
          <p class="event-location"><strong>Location:</strong> ${row["Location"]}</p>
          <p class="event-date-time"><strong>Date:</strong> ${row["Date"]} | <strong>Time:</strong> ${row["Time"]}</p>
        </div>
      `;

      count++;
      if (count % 3 === 0) {
        html += '</div><div class="events-row">';
      }
    });

    html += '</div>';
    document.getElementById('events-list').innerHTML = html;
  })
  .catch(err => console.error('Failed to load events:', err));
