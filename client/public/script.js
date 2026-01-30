async function fetchAndRenderProjects() {
  const container = document.querySelector('#projects-container');
  if (!container) return;

  try {
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error('Failed to fetch projects');
    
    const projects = await response.json();
    
    // Clear existing content if any (though React usually handles this, 
    // we're adding JS behavior to a React app which is unconventional 
    // but requested by the user)
    // container.innerHTML = ''; 

    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'border-none shadow-2xl overflow-hidden rounded-[40px] group hover:-translate-y-2 transition-all duration-500 bg-white';
      card.innerHTML = `
        <div class="h-64 overflow-hidden">
          <img src="${project.imageUrl}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="${project.name}">
        </div>
        <div class="p-8">
          <h3 class="text-2xl font-black mb-4">${project.name}</h3>
          <p class="text-[#4A4A4A] font-medium mb-6 line-clamp-3">${project.description}</p>
          <button class="w-full rounded-xl border border-gray-200 font-bold py-2 px-4 hover:bg-gray-50 transition-colors">Read More</button>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderProjects();
});

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
