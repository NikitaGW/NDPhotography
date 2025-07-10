 // Filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.dataset.filter;
                
                // Filter items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        // Lightbox functionality
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDate = document.getElementById('lightbox-date');
        const lightboxDesc = document.getElementById('lightbox-desc');
        const closeLightbox = document.querySelector('.close-lightbox');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                const title = item.querySelector('.item-title').textContent;
                const date = item.querySelector('.item-date').textContent;
                const desc = item.querySelector('.item-desc').textContent;
                
                lightboxImg.src = imgSrc;
                lightboxTitle.textContent = title;
                lightboxDate.textContent = date;
                lightboxDesc.textContent = desc;
                
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });