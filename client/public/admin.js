document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display data
    fetchContacts();
    fetchSubscribers();

    // Add Project Form
    document.getElementById('add-project-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                alert('Project added successfully');
                e.target.reset();
            } else {
                alert('Failed to add project');
            }
        } catch (err) {
            console.error(err);
        }
    });

    // Add Client Form
    document.getElementById('add-client-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                alert('Client added successfully');
                e.target.reset();
            } else {
                alert('Failed to add client');
            }
        } catch (err) {
            console.error(err);
        }
    });
});

async function fetchContacts() {
    const list = document.getElementById('contacts-list');
    try {
        const res = await fetch('/api/leads');
        const data = await res.json();
        list.innerHTML = data.map(contact => `
            <div class="p-4 border-b">
                <p><strong>Name:</strong> ${contact.name}</p>
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Phone:</strong> ${contact.phone}</p>
                <p><strong>City:</strong> ${contact.city}</p>
                <p class="text-xs text-gray-400">${new Date(contact.createdAt).toLocaleString()}</p>
            </div>
        `).join('') || '<p class="text-gray-500">No submissions found.</p>';
    } catch (err) {
        list.innerHTML = '<p class="text-red-500">Error loading contacts.</p>';
    }
}

async function fetchSubscribers() {
    const list = document.getElementById('subscribers-list');
    try {
        const res = await fetch('/api/subscriptions');
        const data = await res.json();
        list.innerHTML = data.map(sub => `
            <div class="p-2 border-b">
                <p>${sub.email}</p>
                <p class="text-xs text-gray-400">${new Date(sub.createdAt).toLocaleString()}</p>
            </div>
        `).join('') || '<p class="text-gray-500">No subscribers found.</p>';
    } catch (err) {
        list.innerHTML = '<p class="text-red-500">Error loading subscribers.</p>';
    }
}
