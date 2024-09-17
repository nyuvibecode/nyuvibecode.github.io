document.addEventListener('DOMContentLoaded', function() {
    loadLeaderboard();
});

function loadLeaderboard() {
    fetch('../data/leaderboard.json')
        .then(response => response.json())
        .then(data => {
            updateLeaderboardTable(data);
            updateDatasetSummary(data.dataset);
        })
        .catch(error => console.error('Error loading the leaderboard:', error));
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
        const score = (item.solved / data.dataset.total * 100).toFixed(2);
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.model}</td>
            <td>${score}%</td>
            <td>${item.logs}</td>
            <td>${item.link}</td>
        `;
        leaderboardTableBody.appendChild(row);
    });

    leaderboardTableBody.classList.remove('is-hidden');
    leaderboardLoader.classList.add('is-hidden');
}
