document.addEventListener('DOMContentLoaded', () => {
    const fetchProducts = async () => {
        try {
            const response = await fetch('data/products.json');
            if (!response.ok) throw new Error('Error al cargar los productos.');
            const data = await response.json();
            return data.products;
        } catch (error) {
            console.error('Fetch Error:', error);
            alert('No se pudieron cargar los productos.');
            return [];
        }
    };

    const renderProducts = (products) => {
        const productContainer = document.getElementById('productContainer');
        productContainer.innerHTML = ''; // Limpiar productos existentes
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
    };

    const handleSearch = (products) => {
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No se encontraron resultados.';
        noResultsMessage.style.display = 'none';
        document.getElementById('productContainer').parentElement.appendChild(noResultsMessage);

        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const query = searchInput.value.trim().toLowerCase();

            if (query.length < 2) {
                alert('Por favor, introduce al menos 2 caracteres para buscar.');
                return;
            }

            const filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            );

            if (filteredProducts.length === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
            }

            renderProducts(filteredProducts);
        });
    };

    const init = async () => {
        const products = await fetchProducts(); // Cargar productos desde JSON
        renderProducts(products); // Mostrar todos los productos
        handleSearch(products); // Configurar barra de búsqueda
    };

    init(); // Inicializar la aplicación
});
