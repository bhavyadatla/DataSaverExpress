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
            alert('Project listing created successfully');
            event.target.reset();
        } else {
            const error = await res.json();
            alert('Error: ' + (error.message || 'Could not save project'));
        }
    } catch (err) {
        console.error(err);
        alert('Server connection error');
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
            alert('Client testimonial added');
            event.target.reset();
        } else {
            const error = await res.json();
            alert('Error: ' + (error.message || 'Could not save client'));
        }
    } catch (err) {
        console.error(err);
        alert('Server connection error');
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
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-bold text-slate-900">${contact.name}</h4>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${new Date(contact.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div class="flex items-center gap-2 text-slate-600">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        ${contact.email}
                    </div>
                    <div class="flex items-center gap-2 text-slate-600">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        ${contact.phone}
                    </div>
                </div>
                <div class="mt-2 text-sm font-medium text-slate-500 bg-slate-50 p-2 rounded">
                    Interested in: ${contact.city || 'Property Inquiries'}
                </div>
            </div>
        `).join('') || '<div class="p-12 text-center text-slate-400">No inquiries yet</div>';
    } catch (err) {
        list.innerHTML = '<div class="p-12 text-center text-red-400 font-medium">Error loading data</div>';
    }
}

async function fetchAndDisplaySubscribers() {
    const list = document.getElementById('subscribers-list');
    if (!list) return;

    try {
        const res = await fetch('/api/subscribers');
        const data = await res.json();
        list.innerHTML = data.map(sub => `
            <div class="list-item flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <span class="font-medium text-slate-700">${sub.email}</span>
                </div>
                <span class="text-[10px] font-bold text-slate-400">${new Date(sub.createdAt).toLocaleDateString()}</span>
            </div>
        `).join('') || '<div class="p-12 text-center text-slate-400">No active subscribers</div>';
    } catch (err) {
        list.innerHTML = '<div class="p-12 text-center text-red-400 font-medium">Error loading data</div>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayContacts();
    fetchAndDisplaySubscribers();

    const projectForm = document.getElementById('add-project-form');
    if (projectForm) projectForm.addEventListener('submit', addProject);

    const clientForm = document.getElementById('add-client-form');
    if (clientForm) clientForm.addEventListener('submit', addClient);
});
