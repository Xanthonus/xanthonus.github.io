// Blog functionality
(function () {
    let blogPosts = [];

    // Load blog posts metadata
    async function loadBlogPosts() {
        try {
            const response = await fetch('blog-posts.json');
            blogPosts = await response.json();
            // Sort by date, newest first
            blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            displayBlogList();

            // Check if we should display a specific post from URL hash
            checkUrlHash();
        } catch (error) {
            console.error('Error loading blog posts:', error);
            document.getElementById('blog-list').innerHTML =
                '<p>Error loading blog posts. Please try again later.</p>';
        }
    }

    // Display list of blog posts
    function displayBlogList() {
        const blogList = document.getElementById('blog-list');

        if (blogPosts.length === 0) {
            blogList.innerHTML = '<p>No blog posts yet. Check back soon!</p>';
            return;
        }

        const postsHTML = blogPosts.map(post => {
            const date = new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const tagsHTML = post.tags
                .map(tag => `<span class="blog-tag">${tag}</span>`)
                .join('');

            return `
                <article class="blog-post-preview">
                    <h3><a href="#${post.id}" data-post-id="${post.id}">${post.title}</a></h3>
                    <div class="blog-post-meta">${date}</div>
                    <p class="blog-post-excerpt">${post.excerpt}</p>
                    <div class="blog-post-tags">${tagsHTML}</div>
                    <a href="#${post.id}" class="blog-read-more" data-post-id="${post.id}">Read more &rarr;</a>
                </article>
            `;
        }).join('');

        blogList.innerHTML = postsHTML;

        // Add click handlers for read more links
        document.querySelectorAll('[data-post-id]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const postId = e.target.getAttribute('data-post-id');
                displayBlogPost(postId);
            });
        });
    }

    // Display a single blog post
    async function displayBlogPost(postId) {
        const post = blogPosts.find(p => p.id === postId);
        if (!post) {
            console.error('Post not found:', postId);
            return;
        }

        try {
            const response = await fetch(post.file);
            const markdown = await response.text();
            const html = marked.parse(markdown);

            const postContent = document.getElementById('blog-post-content');
            postContent.innerHTML = html;

            // Show post view, hide list view
            document.getElementById('blog-posts').style.display = 'none';
            document.getElementById('blog-post-view').style.display = 'block';

            // Update URL hash
            window.location.hash = postId;

            // Scroll to top
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error loading blog post:', error);
            alert('Error loading blog post. Please try again later.');
        }
    }

    // Check URL hash and display post if specified
    function checkUrlHash() {
        const hash = window.location.hash.substring(1);
        if (hash && hash !== 'blog-posts') {
            displayBlogPost(hash);
        }
    }

    // Handle back to list
    document.getElementById('back-to-list').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('blog-post-view').style.display = 'none';
        document.getElementById('blog-posts').style.display = 'block';
        window.location.hash = 'blog-posts';
        window.scrollTo(0, 0);
    });

    // Handle browser back/forward buttons
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        if (hash && hash !== 'blog-posts') {
            displayBlogPost(hash);
        } else {
            document.getElementById('blog-post-view').style.display = 'none';
            document.getElementById('blog-posts').style.display = 'block';
        }
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadBlogPosts);
    } else {
        loadBlogPosts();
    }
})();
