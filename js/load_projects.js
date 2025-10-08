document.addEventListener('DOMContentLoaded', function() {
    loadProjects(projectsFile);
});

function loadProjects(json) {
    fetch(json)
        .then(response => response.json())
        .then(data => {
            updateProjectsTable(data);
            // updateDatasetSummary(data.dataset);
        })
        .catch(error => console.error('Error loading the projects:', error));
}

function getModelPretty(model) {
    if (modelPrettyName.has(model))
        return modelPrettyName.get(model);
    return model;
}

function updateProjectsTable(data) {
    const submissionsLoader = document.querySelector('#submissions_loader');
    const submissionsTableBody = document.querySelector('#submissions tbody');

    if (!submissionsTableBody.classList.contains('is-hidden')) {
        submissionsTableBody.classList.add('is-hidden');
    }
    if (submissionsLoader.classList.contains('is-hidden')) {
        submissionsLoader.classList.remove('is-hidden');
    }

    submissionsTableBody.innerHTML = '';
    
    data.submissions.sort((a, b) => {
        const dateA = new Date(a.date.replace(/\//g, '-'));
        const dateB = new Date(b.date.replace(/\//g, '-'));
        return dateB - dateA;
    });

    data.submissions.forEach((item) => {
        const row = document.createElement('tr');
        let formattedDate;
        try {
            const date = new Date(item.date.replace(/\//g, '-'));
            formattedDate = isNaN(date.getTime()) ? item.date : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        } catch (e) {
            formattedDate = item.date;
        }
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${item.name} <i>${item.comment}</i></td>
            <td>${item.model}</td>
            <td>${item.tech_stack}</td>
            <td><a href="${item.src_code}">📁</a></td>
            <td><a href="${item.link}">🔗</a></td>
        `;
        submissionsTableBody.appendChild(row);
    });

    submissionsTableBody.classList.remove('is-hidden');
    submissionsLoader.classList.add('is-hidden');
}


