document.addEventListener('DOMContentLoaded', function() {
    loadLeaderboard(leaderboardFile);
});

function loadLeaderboard(json) {
    fetch(json)
        .then(response => response.json())
        .then(data => {
            updateLeaderboardTable(data);
            // updateDatasetSummary(data.dataset);
        })
        .catch(error => console.error('Error loading the leaderboard:', error));
}

function getModelPretty(model) {
    if (modelPrettyName.has(model))
        return modelPrettyName.get(model);
    return model;
}

function updateLeaderboardTable(data) {
    const submissionsLoader = document.querySelector('#submissions_loader');
    const submissionsTableBody = document.querySelector('#submissions tbody');

    if (!submissionsTableBody.classList.contains('is-hidden')) {
        submissionsTableBody.classList.add('is-hidden');
    }
    if (submissionsLoader.classList.contains('is-hidden')) {
        submissionsLoader.classList.remove('is-hidden');
    }

    submissionsTableBody.innerHTML = ''; // Clear existing rows
    
    // Sort by date (most recent first)
    data.submissions.sort((a, b) => {
        const dateA = new Date(a.date.replace(/\//g, '-'));
        const dateB = new Date(b.date.replace(/\//g, '-'));
        return dateB - dateA; // Most recent first
    });

    data.submissions.forEach((item, index) => {
        const row = document.createElement('tr');
        // Format the date for display - handle different date formats
        let formattedDate;
        try {
            // Try to parse the date
            const date = new Date(item.date.replace(/\//g, '-')); // Convert yyyy/mm/dd to yyyy-mm-dd for better parsing
            if (isNaN(date.getTime())) {
                // If date parsing fails, just show the original date string
                formattedDate = item.date;
            } else {
                formattedDate = date.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                });
            }
        } catch (e) {
            // If any error occurs, just show the original date string
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
