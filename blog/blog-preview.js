// Blog preview functionality for homepage
(function () {
    // Load and display latest 4 blog posts on homepage
    async function loadBlogPreview() {
        try {
            const response = await fetch('blog/blog-posts.json');
            const blogPosts = await response.json();

            // Sort by date, newest first
            blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Get latest 4 posts
            const latestPosts = blogPosts.slice(0, 4);

            const featuredContainer = document.getElementById('blog-featured-posts');

            if (!featuredContainer) {
                // Not on homepage, exit
                return;
            }

            if (latestPosts.length === 0) {
                featuredContainer.innerHTML = '<p>No blog posts yet. Check back soon!</p>';
                return;
            }

            const postsHTML = latestPosts.map(post => {
                const date = new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                return `
                    <article class="blog-featured-post">
                        <h4><a href="blog/index.html#${post.id}">${post.title}</a></h4>
                        <div class="blog-post-meta">${date}</div>
                        <p class="blog-post-excerpt">${post.excerpt}</p>
                    </article>
                `;
            }).join('');

            featuredContainer.innerHTML = postsHTML;
        } catch (error) {
            console.error('Error loading blog preview:', error);
            const featuredContainer = document.getElementById('blog-featured-posts');
            if (featuredContainer) {
                featuredContainer.innerHTML = '<p>Error loading blog posts.</p>';
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadBlogPreview);
    } else {
        loadBlogPreview();
    }
})();
