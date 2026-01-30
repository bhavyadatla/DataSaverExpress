document.addEventListener('submit', async (e) => {
  if (e.target && e.target.id === 'contact-form') {
    e.preventDefault();
    const contactForm = e.target;
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      city: formData.get('city')
    };

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Submitted Successfully');
        contactForm.reset();
      } else {
        const errorData = await response.json();
        alert('Error: ' + (errorData.message || 'Something went wrong'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again later.');
    }
  }

  if (e.target && e.target.id === 'newsletter-form') {
    e.preventDefault();
    const newsletterForm = e.target;
    const formData = new FormData(newsletterForm);
    const data = {
      email: formData.get('email')
    };

    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Subscribed');
        newsletterForm.reset();
      } else {
        const errorData = await response.json();
        alert('Error: ' + (errorData.message || 'Something went wrong'));
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Error subscribing. Please try again later.');
    }
  }
});
