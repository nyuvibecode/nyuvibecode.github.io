document.addEventListener('DOMContentLoaded', function() {
    loadLeaderboard();
});

function loadLeaderboard() {
    fetch('../template/leaderboard.json')
        .then(response => response.json())
        .then(data => {
            updateLeaderboardTable(data.submissions);
            updateDatasetSummary(data.dataset);
        })
        .catch(error => console.error('Error loading the leaderboard:', error));
}

function updateLeaderboardTable(submissions) {
    const leaderboardTableBody = document.querySelector('#leaderboard table tbody');
    leaderboardTableBody.innerHTML = ''; // Clear existing rows

    submissions.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.model}</td>
            <td>${item.solved}</td>
            <td>${item.logs}</td>
            <td>${item.link}</td>
        `;
        leaderboardTableBody.appendChild(row);
    });
}