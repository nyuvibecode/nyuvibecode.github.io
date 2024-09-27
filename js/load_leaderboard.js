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

const modelPrettyName = new Map();
modelPrettyName.set("gpt-4-0125-preview", "GPT 4");
modelPrettyName.set("gpt-4-1106-preview", "GPT 4");
modelPrettyName.set("gpt-3.5-turbo-1106", "GPT 3.5");
modelPrettyName.set("claude-3-haiku-20240307", "Claude 3 Haiku");

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
        const score = (item.solved / data.dataset.total * 100).toFixed(2);
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name} <i>${item.comment}</i></td>
            <td>${getModelPretty(item.model)}</td>
            <td>${score}%</td>
            <td><a class="animsition-link" href="${item.logs}">🔗</a></td>
            <td><a class="animsition-link" href="${item.link}">🔗</a></td>
        `;
        leaderboardTableBody.appendChild(row);
    });

    leaderboardTableBody.classList.remove('is-hidden');
    leaderboardLoader.classList.add('is-hidden');
}
