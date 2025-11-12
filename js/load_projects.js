document.addEventListener('DOMContentLoaded', function() {
    loadProjects(projectsFile);
});

let projectsData = null;
let currentSortColumn = 'score';
let currentSortDirection = 'desc';

function loadProjects(json) {
    fetch(json)
        .then(response => response.json())
        .then(data => {
            projectsData = data;
            updateProjectsTable(data);
            setupTableSorting();
            // updateDatasetSummary(data.dataset);
        })
        .catch(error => console.error('Error loading the projects:', error));
}

function setupTableSorting() {
    const headers = document.querySelectorAll('#submissions thead th[data-sort]');
    headers.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            const sortField = header.getAttribute('data-sort');
            if (currentSortColumn === sortField) {
                currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                currentSortColumn = sortField;
                currentSortDirection = 'asc';
            }
            
            // Update sort indicators
            headers.forEach(h => {
                h.classList.remove('sort-asc', 'sort-desc');
            });
            header.classList.add(`sort-${currentSortDirection}`);
            
            sortAndUpdateTable();
        });
    });
}

function sortAndUpdateTable() {
    if (!projectsData) return;
    
    const sortedData = { ...projectsData };
    sortedData.submissions = [...projectsData.submissions].sort((a, b) => {
        let aVal = a[currentSortColumn];
        let bVal = b[currentSortColumn];
        
        // Handle empty values
        if (!aVal && aVal !== 0) aVal = '';
        if (!bVal && bVal !== 0) bVal = '';
        
        // Numeric comparison for score and track_rank
        if (currentSortColumn === 'score' || currentSortColumn === 'track_rank') {
            aVal = parseFloat(aVal) || 0;
            bVal = parseFloat(bVal) || 0;
        } else {
            // String comparison for other fields
            aVal = String(aVal).toLowerCase();
            bVal = String(bVal).toLowerCase();
        }
        
        if (currentSortDirection === 'asc') {
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        } else {
            return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
    });
    
    updateProjectsTable(sortedData, false);
}

function getModelPretty(model) {
    if (modelPrettyName.has(model))
        return modelPrettyName.get(model);
    return model;
}

function updateProjectsTable(data, shouldSort = true) {
    const submissionsLoader = document.querySelector('#submissions_loader');
    const submissionsTableBody = document.querySelector('#submissions tbody');
    const demosContainer = document.querySelector('#demos .row');

    // Update submissions table
    if (!submissionsTableBody.classList.contains('is-hidden')) {
        submissionsTableBody.classList.add('is-hidden');
    }
    if (submissionsLoader.classList.contains('is-hidden')) {
        submissionsLoader.classList.remove('is-hidden');
    }

    submissionsTableBody.innerHTML = '';
    demosContainer.innerHTML = ''; // Clear existing demos
    
    // Sort by score descending (highest first) on initial load
    if (shouldSort) {
        data.submissions.sort((a, b) => b.score - a.score);
    }

    // Update submissions table
    data.submissions.forEach((item) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.track}</td>
            <td>${item.track_rank}</td>
            <td>${item.name} <i>${item.comment}</i></td>
            <td>${item.model}</td>
            <td>${item.tech_stack}</td>
            <td><a href="${item.src_code}">📁</a></td>
            <td><a href="${item.link}">🔗</a></td>
        `;
        submissionsTableBody.appendChild(row);

        // Add to demo videos section if there's a demo video
            if (item.demo_video) {
            let videoEmbed = '';
            if (item.demo_video.includes('drive.google.com')) {
                // Extract file ID from Google Drive URL
                const fileId = item.demo_video.match(/\/d\/([^/]+)/)?.[1] || 
                             item.demo_video.match(/id=([^&]+)/)?.[1];
                if (fileId) {
                    videoEmbed = `<iframe src="https://drive.google.com/file/d/${fileId}/preview" width="100%" height="225" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
                }
            } else if (item.demo_video.includes('youtube.com') || item.demo_video.includes('youtu.be')) {
                // Handle YouTube URLs
                let videoId = '';
                if (item.demo_video.includes('youtu.be/')) {
                    videoId = item.demo_video.split('youtu.be/')[1]?.split('?')[0];
                } else if (item.demo_video.includes('youtube.com/watch')) {
                    videoId = item.demo_video.match(/[?&]v=([^&]+)/)?.[1];
                } else if (item.demo_video.includes('youtube.com/shorts/')) {
                    videoId = item.demo_video.split('shorts/')[1]?.split('?')[0];
                }
                if (videoId) {
                    videoEmbed = `<iframe src="https://www.youtube.com/embed/${videoId}" width="100%" height="225" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
                }
            } else if (item.demo_video.includes('loom.com/share/')) {
                // Handle Loom URLs
                const videoId = item.demo_video.split('loom.com/share/')[1]?.split('?')[0];
                if (videoId) {
                    videoEmbed = `<iframe src="https://www.loom.com/embed/${videoId}" width="100%" height="225" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
                }
            }

            if (videoEmbed) {
                const demoColumn = document.createElement('div');
                demoColumn.className = 'col-4';
                demoColumn.innerHTML = `
                    <div class="card demo-card">
                        <div class="video-wrapper">
                            ${videoEmbed}
                        </div>
                        <div class="demo-info">
                            <p><strong>Team:</strong> ${item.name}</p>
                            <p><strong>Tech:</strong> ${item.tech_stack}</p>
                            <div class="demo-links">
                                <a href="${item.link}" target="_blank" class="button primary small">🚀 Live</a>
                                <a href="${item.src_code}" target="_blank" class="button small">📁 Code</a>
                            </div>
                        </div>
                    </div>
                `;
                demosContainer.appendChild(demoColumn);
            }
        }
    });

    submissionsTableBody.classList.remove('is-hidden');
    submissionsLoader.classList.add('is-hidden');
}


