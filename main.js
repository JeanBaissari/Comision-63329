document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'retroProducts';

    const fetchProducts = async () => {
        try {
            const storedProducts = localStorage.getItem(STORAGE_KEY);
            if (storedProducts) {
                return JSON.parse(storedProducts);
            }

            const response = await fetch('data/products.json');
            const data = await response.json();
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.products));
            
            return data.products;
        } catch (error) {
            return [];
        }
    };

    const renderProducts = (products) => {
        const productContainer = document.getElementById('productContainer');
        if (!productContainer) return;
        
        productContainer.innerHTML = ''; // Clear previous results

        if (products.length === 0) {
            productContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p class="no-results">No se encontraron resultados para tu búsqueda.</p>
                </div>`;
            return;
        }

        products.forEach(product => {
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="product-card">
                        <div class="product-image-container">
                            <img src="${product.image}" 
                                 alt="${product.title}" 
                                 class="product-image">
                        </div>
                        <div class="product-details">
                            <h4 class="product-title">${product.title}</h4>
                            <p class="product-description">${product.description}</p>
                            <button class="btn btn-primary">Ver Detalles</button>
                        </div>
                    </div>
                </div>
            `;
            productContainer.innerHTML += card;
        });
    };

    const handleSearch = (products) => {
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = searchInput.value.trim().toLowerCase();

            if (searchTerm.length < 2) {
                alert('Por favor, introduce al menos 2 caracteres para buscar.');
                return;
            }

            const filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );

            renderProducts(filteredProducts);
        });
    };

    // Initialize
    fetchProducts().then(products => {
        renderProducts(products);
        handleSearch(products);
    });
});
