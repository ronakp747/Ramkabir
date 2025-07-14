const currentUrl1 = window.location.href;
  document.querySelectorAll('.nav-menu a, .sidebar a').forEach(link => {
      if (link.href === currentUrl1) {
          link.classList.add("active");
      }
  });

  // Reset form after successful Formspree submission
  const form = document.querySelector('form');
  form.addEventListener('submit', async function(e) {
      e.preventDefault(); // prevent default form submission
      const formData = new FormData(form);

      // Send the form data using Fetch
      const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
              'Accept': 'application/json'
          }
      });

      if (response.ok) {
          alert('Thank you for your message!');
          form.reset(); // this clears all input fields
      } else {
          alert('Oops! Something went wrong.');
      }
  });