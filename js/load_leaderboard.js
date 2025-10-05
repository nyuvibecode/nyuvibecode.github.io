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
    const leaderboardLoader = document.querySelector('#leaderboard_loader');
    const leaderboardTableBody = document.querySelector('#leaderboard tbody');

    if (!leaderboardTableBody.classList.contains('is-hidden')) {
        leaderboardTableBody.classList.add('is-hidden');
    }
    if (leaderboardLoader.classList.contains('is-hidden')) {
        leaderboardLoader.classList.remove('is-hidden');
    }

    leaderboardTableBody.innerHTML = ''; // Clear existing rows
    data.submissions.sort((a, b) => {return a.solved - b.solved;}).reverse();

    data.submissions.forEach((item, index) => {
        const row = document.createElement('tr');
        const totalSolved = Object.values(item.per_category).reduce((sum, val) => sum + val, 0);
        const score = (totalSolved / data.dataset.total * 100).toFixed(2);
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name} <i>${item.comment}</i></td>
            <td>${item.model}</td>
            <td>${item.tech_stack}</td>
            <td>${score}%</td>
            <td><a href="${item.src_code}">📁</a></td>
            <td><a href="${item.link}">🔗</a></td>
        `;
        leaderboardTableBody.appendChild(row);
    });

    leaderboardTableBody.classList.remove('is-hidden');
    leaderboardLoader.classList.add('is-hidden');
}
