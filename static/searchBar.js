document.getElementById('search-input').addEventListener('input', searchPosts);
document.getElementById('user-dropdown').addEventListener('change', searchPosts);
document.getElementById('topic-dropdown').addEventListener('change', searchPosts);
document.getElementById('nation-dropdown').addEventListener('change', searchPosts);

function searchPosts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const selectedUser = document.getElementById('user-dropdown').value;
    const selectedTopic = document.getElementById('topic-dropdown').value;
    const selectedNation = document.getElementById('nation-dropdown').value;
    const posts = document.querySelectorAll('.news-container');
    const clearButton = document.getElementById('clear-button');
    const ads = document.querySelectorAll('.ad');
    const noPostsMessage = document.getElementById('no-posts-message');

    let foundAny = false;

    posts.forEach(post => {
        const title = post.querySelector('.news-title').textContent.toLowerCase();
        const topic = post.getAttribute('postTopic');
        const nation = post.getAttribute('postNation');
        const postUser = post.getAttribute('postUser');

        if (
            (title.includes(searchTerm) || searchTerm === '') &&
            (selectedUser === 'All Users' || postUser === selectedUser) &&
            (selectedTopic === 'All Topics' || topic === selectedTopic) &&
            (selectedNation === 'All Nations' || nation === selectedNation)
        ) {
            post.style.display = 'block';
            foundAny = true;
        } else {
            post.style.display = 'none';
        }
    });

    if (searchTerm || selectedUser !== 'All Users' || selectedTopic !== 'All Topics' || selectedNation !== 'All Nations') {
        ads.forEach(ad => ad.style.display = 'none');
        clearButton.style.display = 'inline-block';
        noPostsMessage.style.display = foundAny ? 'none' : 'block';
    } else {
        ads.forEach(ad => ad.style.display = 'block');
        clearButton.style.display = 'none';
        noPostsMessage.style.display = 'none';
    }
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('user-dropdown').value = 'All Users';
    document.getElementById('topic-dropdown').value = 'All Topics';
    document.getElementById('nation-dropdown').value = 'All Nations';
    searchPosts();
}

function populateDropdowns() {
    const userDropdown = document.getElementById('user-dropdown');
    const topicDropdown = document.getElementById('topic-dropdown');
    const nationDropdown = document.getElementById('nation-dropdown');
    const posts = document.querySelectorAll('.news-container');

    const users = new Set();
    const topics = new Set();
    const nations = new Set();

    posts.forEach(post => {
        const postUser = post.getAttribute('postUser');
        const postTopic = post.getAttribute('postTopic');
        const postNation = post.getAttribute('postNation');

        if (postUser) users.add(postUser);
        if (postTopic) topics.add(postTopic);
        if (postNation && postNation !== 'All Nations') {
            nations.add(postNation);
        }
    });

    Array.from(users).sort().forEach(user => {
        const option = document.createElement('option');
        option.value = user;
        option.textContent = user;
        userDropdown.appendChild(option);
    });

    Array.from(topics).sort().forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        topicDropdown.appendChild(option);
    });

    Array.from(nations).sort().forEach(nation => {
        const option = document.createElement('option');
        option.value = nation;
        option.textContent = nation;
        nationDropdown.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns();
});