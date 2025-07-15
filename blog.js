document.addEventListener('DOMContentLoaded', function() {
    // Sample blog data (in a real app, this would come from an API)
    const blogData = [
        {
            id: 1,
            title: "10 Composition Techniques Every Photographer Should Know",
            excerpt: "Mastering composition is fundamental to creating compelling images. Learn the rule of thirds, leading lines, framing, and other essential techniques.",
            image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            category: "composition",
            tags: ["composition", "beginner", "tutorial"],
            date: "June 15, 2023",
            readTime: "8 min read"
        },
        {
            id: 2,
            title: "Advanced Landscape Composition Techniques",
            excerpt: "Take your landscape photography to the next level with these advanced composition techniques for creating depth and interest.",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            category: "composition",
            tags: ["composition", "landscape", "tutorial"],
            date: "June 10, 2023",
            readTime: "10 min read"
        },
        {
            id: 3,
            title: "Mastering Low Light Photography: Tips for Stunning Night Shots",
            excerpt: "Low light situations can be challenging but also incredibly rewarding. Discover how to properly expose your images and reduce noise.",
            image: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
            category: "lighting",
            tags: ["lighting", "portrait", "tutorial"],
            date: "June 8, 2023",
            readTime: "10 min read"
        },
        {
            id: 4,
            title: "5 Essential Portrait Lighting Setups for Flattering Results",
            excerpt: "Lighting can make or break a portrait. Learn five fundamental lighting setups that work for everything from studio portraits to casual shots.",
            image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80",
            category: "lighting",
            tags: ["lighting", "studio", "advanced"],
            date: "May 28, 2023",
            readTime: "12 min read"
        },
        {
            id: 5,
            title: "How to Pose People Who Hate Being Photographed",
            excerpt: "Learn techniques to make your subjects feel comfortable and natural in front of the camera, even if they're camera-shy.",
            image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1886&q=80",
            category: "portraits",
            tags: ["portraits", "posing", "people"],
            date: "May 20, 2023",
            readTime: "9 min read"
        },
        {
            id: 6,
            title: "Family Portrait Photography: Capturing Authentic Moments",
            excerpt: "Tips for creating natural, authentic family portraits that capture real connections and emotions.",
            image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
            category: "portraits",
            tags: ["portraits", "family", "children"],
            date: "May 15, 2023",
            readTime: "11 min read"
        },
        {
            id: 7,
            title: "The Ultimate Guide to Landscape Photography",
            excerpt: "Capture breathtaking landscapes with our comprehensive guide covering equipment, composition, and lighting conditions.",
            image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2048&q=80",
            category: "landscape",
            tags: ["landscape", "nature", "travel"],
            date: "May 10, 2023",
            readTime: "15 min read"
        },
        {
            id: 8,
            title: "Golden Hour Photography: Making the Most of Sunrise and Sunset",
            excerpt: "Learn how to plan and execute perfect golden hour shots with this complete guide to sunrise and sunset photography.",
            image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
            category: "landscape",
            tags: ["landscape", "sunrise", "sunset"],
            date: "May 5, 2023",
            readTime: "8 min read"
        },
        {
            id: 9,
            title: "Photo Editing Workflow: From RAW to Final Image",
            excerpt: "A step-by-step guide to developing your RAW files into stunning final images with professional editing techniques.",
            image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
            category: "editing",
            tags: ["editing", "software", "post-processing"],
            date: "April 28, 2023",
            readTime: "14 min read"
        },
        {
            id: 10,
            title: "Color Grading Techniques for Photographers",
            excerpt: "Learn professional color grading techniques to give your photos a distinctive look and feel.",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            category: "editing",
            tags: ["editing", "color", "retouching"],
            date: "April 20, 2023",
            readTime: "10 min read"
        }
    ];

    // DOM Elements
    const blogContainer = document.getElementById('blog-container');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const tagFilters = document.querySelectorAll('.tag-filter');

    // Initialize blog posts
    function renderBlogPosts(posts) {
        blogContainer.innerHTML = '';
        
        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'col-md-6';
            card.innerHTML = `
                <div class="card" data-categories="${post.category}" data-tags="${post.tags.join(' ')}">
                    <div class="position-relative">
                        <img src="${post.image}" class="card-img-top" alt="${post.title}">
                        <span class="category-badge">${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.excerpt}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">${post.date} • ${post.readTime}</small>
                            <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            `;
            blogContainer.appendChild(card);
        });
    }

    // Filter by category
    function filterByCategory(category) {
        if (category === 'all') {
            renderBlogPosts(blogData);
            return;
        }
        
        const filteredPosts = blogData.filter(post => post.category === category);
        renderBlogPosts(filteredPosts);
    }

    // Filter by tag
    function filterByTag(tag) {
        if (tag === 'all') {
            renderBlogPosts(blogData);
            return;
        }
        
        const filteredPosts = blogData.filter(post => post.tags.includes(tag));
        renderBlogPosts(filteredPosts);
    }

    // Event listeners for category filters
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.dataset.category;
            
            // Update active state
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            filterByCategory(category);
            
            // Update URL
            const newUrl = category === 'all' 
                ? window.location.pathname 
                : `${window.location.pathname}?category=${category}`;
            history.pushState(null, null, newUrl);
        });
    });

    // Event listeners for tag filters
    tagFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tag = this.dataset.tag;
            
            // Update active state
            tagFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            filterByTag(tag);
            
            // Update URL
            const newUrl = tag === 'all' 
                ? window.location.pathname 
                : `${window.location.pathname}?tag=${tag}`;
            history.pushState(null, null, newUrl);
        });
    });

    // Check URL for filters on page load
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const tagParam = urlParams.get('tag');

    if (categoryParam) {
        const matchingFilter = Array.from(categoryFilters).find(
            filter => filter.dataset.category === categoryParam
        );
        if (matchingFilter) matchingFilter.click();
    } else if (tagParam) {
        const matchingFilter = Array.from(tagFilters).find(
            filter => filter.dataset.tag === tagParam
        );
        if (matchingFilter) matchingFilter.click();
    } else {
        // Initial render
        renderBlogPosts(blogData);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});


      AOS.init({ once: true, duration: 800 });

      function toggleMenu() {
        document.getElementById("navLinks").classList.toggle("show");
      }

      function closeMenu() {
        document.getElementById("navLinks").classList.remove("show");
        document.querySelectorAll(".dropdown-content").forEach(dc => dc.classList.remove("show"));
      }

      function toggleDropdown(e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          const content = e.target.nextElementSibling;
          const isOpen = content.classList.contains("show");
          document.querySelectorAll(".dropdown-content").forEach(dc => dc.classList.remove("show"));
          if (!isOpen) content.classList.add("show");
        }
      }

  