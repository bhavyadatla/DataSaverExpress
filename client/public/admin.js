async function addProject(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            alert('Project added successfully');
            event.target.reset();
        } else {
            const error = await res.json();
            alert('Failed to add project: ' + (error.message || 'Unknown error'));
        }
    } catch (err) {
        console.error('Error adding project:', err);
        alert('Error adding project. Please try again.');
    }
}

async function addClient(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch('/api/clients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            alert('Client added successfully');
            event.target.reset();
        } else {
            const error = await res.json();
            alert('Failed to add client: ' + (error.message || 'Unknown error'));
        }
    } catch (err) {
        console.error('Error adding client:', err);
        alert('Error adding client. Please try again.');
    }
}

async function fetchAndDisplayContacts() {
    const list = document.getElementById('contacts-list');
    if (!list) return;
    
    try {
        const res = await fetch('/api/contacts');
        const data = await res.json();
        list.innerHTML = data.map(contact => `
            <div class="list-item">
                <p><strong>Name:</strong> ${contact.name}</p>
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Phone:</strong> ${contact.phone}</p>
                <p><strong>City:</strong> ${contact.city}</p>
                <p class="timestamp">${new Date(contact.createdAt).toLocaleString()}</p>
            </div>
        `).join('') || '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No submissions found.</p>';
    } catch (err) {
        console.error('Error loading contacts:', err);
        list.innerHTML = '<p style="text-align: center; color: var(--error); padding: 2rem;">Error loading contacts.</p>';
    }
}

async function fetchAndDisplaySubscribers() {
    const list = document.getElementById('subscribers-list');
    if (!list) return;

    try {
        const res = await fetch('/api/subscribers');
        const data = await res.json();
        list.innerHTML = data.map(sub => `
            <div class="list-item">
                <p><strong>Email:</strong> ${sub.email}</p>
                <p class="timestamp">${new Date(sub.createdAt).toLocaleString()}</p>
            </div>
        `).join('') || '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No subscribers found.</p>';
    } catch (err) {
        console.error('Error loading subscribers:', err);
        list.innerHTML = '<p style="text-align: center; color: var(--error); padding: 2rem;">Error loading subscribers.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial data fetch
    fetchAndDisplayContacts();
    fetchAndDisplaySubscribers();

    // Form Event Listeners
    const projectForm = document.getElementById('add-project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', addProject);
    }

    const clientForm = document.getElementById('add-client-form');
    if (clientForm) {
        clientForm.addEventListener('submit', addClient);
    }
});
