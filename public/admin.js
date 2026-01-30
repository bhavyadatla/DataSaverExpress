let projectsData = [];
let clientsData = [];

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
            showToast('Project listing created successfully', 'success');
            event.target.reset();
            fetchAndDisplayProjects();
        } else {
            const error = await res.json();
            showToast('Error: ' + (error.message || 'Could not save project'), 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Server connection error', 'error');
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
            showToast('Client testimonial added', 'success');
            event.target.reset();
            fetchAndDisplayClients();
        } else {
            const error = await res.json();
            showToast('Error: ' + (error.message || 'Could not save client'), 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Server connection error', 'error');
    }
}

async function fetchAndDisplayProjects() {
    const list = document.getElementById('projects-list');
    if (!list) return;

    try {
        const res = await fetch('/api/projects');
        projectsData = await res.json();
        
        document.getElementById('stat-projects').textContent = projectsData.length;
        
        if (projectsData.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                    <p>No projects yet. Add your first project above.</p>
                </div>
            `;
            return;
        }

        list.innerHTML = projectsData.map(project => `
            <div class="project-card" data-testid="card-project-${project.id}">
                <img src="${project.imageUrl}" alt="${project.name}" class="project-image" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image'">
                <div class="p-4">
                    <h4 class="font-bold text-gray-900 mb-1 truncate">${project.name}</h4>
                    <p class="text-sm text-gray-500 line-clamp-2 mb-3">${project.description}</p>
                    <div class="flex gap-2">
                        <button onclick="openEditProjectModal(${project.id})" class="btn btn-edit flex-1" data-testid="button-edit-project-${project.id}">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                            Edit
                        </button>
                        <button onclick="deleteProject(${project.id})" class="btn btn-danger" data-testid="button-delete-project-${project.id}">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (err) {
        list.innerHTML = '<div class="empty-state text-red-500">Error loading projects</div>';
    }
}

async function fetchAndDisplayClients() {
    const list = document.getElementById('clients-list');
    if (!list) return;

    try {
        const res = await fetch('/api/clients');
        clientsData = await res.json();
        
        document.getElementById('stat-clients').textContent = clientsData.length;
        
        if (clientsData.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <p>No clients yet. Add your first testimonial above.</p>
                </div>
            `;
            return;
        }

        list.innerHTML = clientsData.map(client => `
            <div class="client-card" data-testid="card-client-${client.id}">
                <img src="${client.imageUrl}" alt="${client.name}" class="client-avatar" onerror="this.src='https://via.placeholder.com/100?text=?'">
                <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-gray-900 truncate">${client.name}</h4>
                    <p class="text-sm text-gray-500 truncate">${client.designation}</p>
                </div>
                <div class="flex gap-2 flex-shrink-0">
                    <button onclick="openEditClientModal(${client.id})" class="btn btn-edit" data-testid="button-edit-client-${client.id}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </button>
                    <button onclick="deleteClient(${client.id})" class="btn btn-danger" data-testid="button-delete-client-${client.id}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    } catch (err) {
        list.innerHTML = '<div class="empty-state text-red-500">Error loading clients</div>';
    }
}

function openEditProjectModal(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;

    document.getElementById('edit-project-id').value = project.id;
    document.getElementById('edit-project-name').value = project.name;
    document.getElementById('edit-project-image').value = project.imageUrl;
    document.getElementById('edit-project-description').value = project.description;
    
    document.getElementById('edit-project-modal').classList.add('active');
}

function closeEditProjectModal() {
    document.getElementById('edit-project-modal').classList.remove('active');
}

async function updateProject(event) {
    event.preventDefault();
    const id = document.getElementById('edit-project-id').value;
    const data = {
        name: document.getElementById('edit-project-name').value,
        imageUrl: document.getElementById('edit-project-image').value,
        description: document.getElementById('edit-project-description').value
    };

    try {
        const res = await fetch(`/api/projects/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            showToast('Project updated successfully', 'success');
            closeEditProjectModal();
            fetchAndDisplayProjects();
        } else {
            const error = await res.json();
            showToast('Error: ' + (error.message || 'Could not update project'), 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Server connection error', 'error');
    }
}

async function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        return;
    }

    try {
        const res = await fetch(`/api/projects/${id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            showToast('Project deleted successfully', 'success');
            fetchAndDisplayProjects();
        } else {
            const error = await res.json();
            showToast('Error: ' + (error.message || 'Could not delete project'), 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Server connection error', 'error');
    }
}

function openEditClientModal(id) {
    const client = clientsData.find(c => c.id === id);
    if (!client) return;

    document.getElementById('edit-client-id').value = client.id;
    document.getElementById('edit-client-name').value = client.name;
    document.getElementById('edit-client-designation').value = client.designation;
    document.getElementById('edit-client-image').value = client.imageUrl;
    document.getElementById('edit-client-description').value = client.description;
    
    document.getElementById('edit-client-modal').classList.add('active');
}

function closeEditClientModal() {
    document.getElementById('edit-client-modal').classList.remove('active');
}

async function updateClient(event) {
    event.preventDefault();
    const id = document.getElementById('edit-client-id').value;
    const data = {
        name: document.getElementById('edit-client-name').value,
        designation: document.getElementById('edit-client-designation').value,
        imageUrl: document.getElementById('edit-client-image').value,
        description: document.getElementById('edit-client-description').value
    };

    try {
        const res = await fetch(`/api/clients/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            showToast('Client updated successfully', 'success');
            closeEditClientModal();
            fetchAndDisplayClients();
        } else {
            const error = await res.json();
            showToast('Error: ' + (error.message || 'Could not update client'), 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Server connection error', 'error');
    }
}

async function deleteClient(id) {
    if (!confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
        return;
    }

    try {
        const res = await fetch(`/api/clients/${id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            showToast('Client deleted successfully', 'success');
            fetchAndDisplayClients();
        } else {
            const error = await res.json();
            showToast('Error: ' + (error.message || 'Could not delete client'), 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Server connection error', 'error');
    }
}

async function fetchAndDisplayContacts() {
    const list = document.getElementById('contacts-list');
    if (!list) return;
    
    try {
        const res = await fetch('/api/contacts');
        const data = await res.json();
        
        document.getElementById('stat-contacts').textContent = data.length;
        
        if (data.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <p>No inquiries yet</p>
                </div>
            `;
            return;
        }

        list.innerHTML = data.map(contact => `
            <div class="list-item" data-testid="item-contact-${contact.id}">
                <div class="flex justify-between items-start mb-2 gap-2">
                    <h4 class="font-bold text-gray-900">${contact.name}</h4>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex-shrink-0">${new Date(contact.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div class="flex items-center gap-2 text-gray-600">
                        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        <span class="truncate">${contact.email}</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-600">
                        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        <span>${contact.phone}</span>
                    </div>
                </div>
                <div class="mt-3 text-sm font-medium text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Interested in: ${contact.city || 'Property Inquiries'}
                </div>
            </div>
        `).join('');
    } catch (err) {
        list.innerHTML = '<div class="empty-state text-red-500">Error loading data</div>';
    }
}

async function fetchAndDisplaySubscribers() {
    const list = document.getElementById('subscribers-list');
    if (!list) return;

    try {
        const res = await fetch('/api/subscribers');
        const data = await res.json();
        
        document.getElementById('stat-subscribers').textContent = data.length;
        
        if (data.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                    <p>No subscribers yet</p>
                </div>
            `;
            return;
        }

        list.innerHTML = data.map(sub => `
            <div class="list-item flex items-center justify-between gap-3" data-testid="item-subscriber-${sub.id}">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white flex-shrink-0">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <span class="font-medium text-gray-700 truncate">${sub.email}</span>
                </div>
                <span class="text-[10px] font-bold text-gray-400 flex-shrink-0">${new Date(sub.createdAt).toLocaleDateString()}</span>
            </div>
        `).join('');
    } catch (err) {
        list.innerHTML = '<div class="empty-state text-red-500">Error loading data</div>';
    }
}

function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    const bgColor = type === 'success' ? '#10b981' : 
                    type === 'error' ? '#ef4444' : 
                    '#0f172a';
    
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: ${bgColor};
        color: white;
        padding: 0.75rem 1.25rem;
        border-radius: 0.5rem;
        font-weight: 500;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    toast.innerHTML = `
        ${type === 'success' ? '<svg style="width:18px;height:18px" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>' : 
          type === 'error' ? '<svg style="width:18px;height:18px" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>' : ''}
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayProjects();
    fetchAndDisplayClients();
    fetchAndDisplayContacts();
    fetchAndDisplaySubscribers();

    const projectForm = document.getElementById('add-project-form');
    if (projectForm) projectForm.addEventListener('submit', addProject);

    const clientForm = document.getElementById('add-client-form');
    if (clientForm) clientForm.addEventListener('submit', addClient);

    const editProjectForm = document.getElementById('edit-project-form');
    if (editProjectForm) editProjectForm.addEventListener('submit', updateProject);

    const editClientForm = document.getElementById('edit-client-form');
    if (editClientForm) editClientForm.addEventListener('submit', updateClient);

    document.getElementById('edit-project-modal').addEventListener('click', (e) => {
        if (e.target.id === 'edit-project-modal') closeEditProjectModal();
    });

    document.getElementById('edit-client-modal').addEventListener('click', (e) => {
        if (e.target.id === 'edit-client-modal') closeEditClientModal();
    });
});
