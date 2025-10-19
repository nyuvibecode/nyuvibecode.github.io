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
    
    data.submissions.sort((a, b) => {
        const dateA = new Date(a.date.replace(/\//g, '-'));
        const dateB = new Date(b.date.replace(/\//g, '-'));
        return dateB - dateA;
    });

    // Update submissions table
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


