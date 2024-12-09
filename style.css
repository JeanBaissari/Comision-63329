document.addEventListener('DOMContentLoaded', () => {
    // Products data
    const products = [
        { title: "Motorola RAZR Clásico", description: "Teléfono plegable icónico", image: "images/razr.jpg" },
        { title: "Sony Walkman", description: "Música portátil clásica", image: "images/walkman.jpg" },
        { title: "Boombox Años 80", description: "Sonido potente disco", image: "images/boombox.jpg" }
    ];

    // Inject products into the DOM
    const productContainer = document.getElementById('productContainer');
    products.forEach(product => {
        const card = `
            <div class="col-md-4 product-card">
                <div class="product-card">
                    <img class="product-image" src="${product.image}" alt="${product.title}">
                    <h4 class="product-title">${product.title}</h4>
                    <p class="product-description">${product.description}</p>
                </div>
            </div>
        `;
        productContainer.innerHTML += card;
    });

    // Search functionality
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const noResultsMessage = document.createElement('p');
    noResultsMessage.id = 'noResultsMessage';
    noResultsMessage.textContent = 'No se encontraron resultados.';
    noResultsMessage.style.display = 'none';
    productContainer.parentElement.appendChild(noResultsMessage);

    searchForm.addEventListener('submit', e => {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        const productCards = document.querySelectorAll('.product-card');
        let foundResults = false;

        // Input validation
        if (query.length < 2) {
            alert('Por favor, introduce al menos 2 caracteres para buscar.');
            return;
        }

        // Search logic
        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();
            if (title.includes(query) || description.includes(query)) {
                card.style.display = 'block';
                foundResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Handle no results
        noResultsMessage.style.display = foundResults ? 'none' : 'block';
    });

    // Reset the search bar on input clear
    searchInput.addEventListener('input', () => {
        const productCards = document.querySelectorAll('.product-card');
        const query = searchInput.value.trim();
        if (!query) {
            productCards.forEach(card => (card.style.display = 'block'));
            noResultsMessage.style.display = 'none';
        }
    });
});
