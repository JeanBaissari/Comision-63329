document.addEventListener('DOMContentLoaded', () => {
    // Search Functionality with Error Handling
    const searchForm = document.getElementById('searchForm');
    
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const searchInput = event.target.querySelector('input[type="search"]');
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        try {
            // Basic input validation
            if (searchTerm.length < 2) {
                throw new Error('Por favor, introduce al menos 2 caracteres para buscar.');
            }
            
            // Search logic with error handling
            const productCards = document.querySelectorAll('.product-card');
            let foundResults = false;
            
            productCards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                const description = card.querySelector('.product-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    foundResults = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Handle no results scenario
            if (!foundResults) {
                throw new Error('No se encontraron productos relacionados con su búsqueda.');
            }
        } catch (error) {
            // Centralized error handling
            console.error('Search Error:', error);
            alert(error.message);
            
            // Reset display of all products
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    });

    // Performance Optimization: Lazy Loading Images
    const lazyImages = document.querySelectorAll('.product-image');
    
    const lazyLoadOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px'
    };
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src || image.src;
                    observer.unobserve(image);
                }
            });
        }, lazyLoadOptions);
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});
