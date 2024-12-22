document.getElementById('search-input').addEventListener('input', searchPosts);

function searchPosts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const posts = document.querySelectorAll('.news-container');
    const clearButton = document.getElementById('clear-button');
    
    posts.forEach(post => {
        const title = post.querySelector('.news-title').textContent.toLowerCase();
        const topic = post.querySelector('.news-topic').textContent.toLowerCase();
        const nation = post.querySelector('.news-nation').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || topic.includes(searchTerm) || nation.includes(searchTerm)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });

    if (searchTerm) {
        clearButton.style.display = 'inline-block';
    } else {
        clearButton.style.display = 'none';
    }
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    searchPosts();
}