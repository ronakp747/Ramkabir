const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSryEqgNxEKpF4HteGTSrk8J0gLLtjyhs2ilFfbE7yrY57pyGguGdGCPom2H3aPwCNDYOGHUAjO04Ry/pub?output=csv';

// Fetch the CSV with cache busting to ensure fresh data
fetch(sheetCSVUrl + '&cacheBust=' + new Date().getTime())
  .then(res => res.text())
  .then(csvText => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        const events = results.data;
        const container = document.getElementById('events-list');
        container.innerHTML = ''; // Clear old events
        const today = new Date();

        let html = '<div class="events-row">';
        let count = 0;

        events.slice(0, 20).forEach((event, index) => {
          const showHide = event['Show/Hide']?.toLowerCase().trim();
          const eventDate = new Date(event['Date']);

          if (showHide === 'show' && eventDate >= today) {
            html += `
              <div class="event-box">
                <h2 class="event-title">${event['Title']}</h2>
                <p class="event-description">${event['Description']}</p>
                <p class="event-location"><strong>Location:</strong> ${event['Location']}</p>
                <p class="event-date"><strong>Date:</strong> ${event['Date']}</p>
                <p class="event-time"><strong>Time:</strong> ${event['Time']}</p>
              </div>
            `;

            count++;
            if (count % 4 === 0 && index !== 19) {
              html += '</div><div class="events-row">';
            }
          }
        });

        html += '</div>';
        container.innerHTML = html.trim() === '<div class="events-row"></div>' ? '<p>No upcoming events.</p>' : html;
      }
    });
  })
  .catch(err => console.error('Failed to load events:', err));
