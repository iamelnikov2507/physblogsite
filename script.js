async function loadPosts() {
    try {
        const response = await fetch('posts.json');
        const posts = await response.json();
        
        const container = document.getElementById('posts-container');
        container.innerHTML = '';
        
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        posts.forEach(post => {
            const article = document.createElement('article');
            
            const meta = document.createElement('div');
            meta.className = 'post-meta';
            meta.innerText = `${post.date} • ${post.time}`;
            
            const title = document.createElement('h2');
            title.className = 'post-title';
            const titleLink = document.createElement('a');
            titleLink.href = `#post-${post.id}`;
            titleLink.innerText = post.title;
            title.appendChild(titleLink);
            
            const content = document.createElement('div');
            content.className = 'post-content';
            content.innerHTML = post.content;
            
            if (post.image && post.image !== '') {
                const img = document.createElement('img');
                img.src = post.image;
                img.alt = post.imageAlt || '';
                content.insertBefore(img, content.firstChild);
            }
            
            article.appendChild(meta);
            article.appendChild(title);
            article.appendChild(content);
            container.appendChild(article);
        });
    } catch (error) {
        console.error('Ошибка загрузки постов:', error);
        document.getElementById('posts-container').innerHTML = '<p>Ошибка загрузки записей.</p>';
    }
}

loadPosts();