document.addEventListener('DOMContentLoaded', () => {
  const productContainer = document.getElementById('items');
  const filterButtons = document.querySelectorAll('.filter');

  // Function to fetch product data from the API
  async function fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch product data.');
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Function to display product items
  function displayProducts(products) {
    productContainer.innerHTML = '';
    products.forEach(product => {
      const item = createProductItem(product);
      productContainer.appendChild(item);
    });
  }

  // Function to create a product item
  // Function to create a product item
function createProductItem(product) {
  const item = document.createElement('div');
  item.classList.add('item');

  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.title;
  item.appendChild(image);

  const info = document.createElement('div');
  info.classList.add('info');

  const price = document.createElement('div');
  price.textContent = `$${product.price}`;
  info.appendChild(price);

  if (Array.isArray(product.size)) {
    const sized = document.createElement('div');
    sized.classList.add('row');
    sized.textContent = 'Sizes: ' + product.size.join(', ');
    info.appendChild(sized);
  }

  if (Array.isArray(product.colors)) {
    const colors = document.createElement('div');
    colors.textContent = 'Colors:';
    const colorRow = document.createElement('div');
    product.colors.forEach(color => {
      const circle = document.createElement('div');
      circle.classList.add('circle');
      circle.style.backgroundColor = color;
      colorRow.appendChild(circle);
    });
    colors.appendChild(colorRow);
    info.appendChild(colors);
  }

  const rating = document.createElement('div');
  rating.textContent = 'Rating: ' + product.rating.rate;
  info.appendChild(rating);

  item.appendChild(info);

  const addButton = document.createElement('button');
  addButton.textContent = 'Add to Cart';
  addButton.id = 'addBtn';
  item.appendChild(addButton);

  return item;
}


  // Function to apply filters and display filtered products
  async function applyFilters() {
    const selectedFilters = {
      colors: getSelectedFilters('color'),
      sizes: getSelectedFilters('size'),
      rating: document.getElementById('range').value,
      priceRange: getSelectedFilters('prange'),
      category: document.querySelector('.filter.active').textContent.toLowerCase(),
    };

    const products = await fetchProducts();
    const filteredProducts = products.filter(product => {
      const matchColor = selectedFilters.colors.length === 0 || selectedFilters.colors.includes(product.color);
      const matchSize = selectedFilters.sizes.length === 0 || selectedFilters.sizes.includes(product.size);
      const matchRating = selectedFilters.rating === 0 || product.rating >= selectedFilters.rating;
      const matchPrice = selectedFilters.priceRange.length === 0 || selectedFilters.priceRange.includes(product.priceRange);
      const matchCategory = selectedFilters.category === 'all' || product.category.toLowerCase() === selectedFilters.category;
      return matchColor && matchSize && matchRating && matchPrice && matchCategory;
    });

    displayProducts(filteredProducts);
  }

  // Function to get selected filters by name
  function getSelectedFilters(filterName) {
    const checkboxes = document.querySelectorAll(`input[name="${filterName}"]:checked`);
    return Array.from(checkboxes).map(checkbox => checkbox.id);
  }

  // Event listeners for filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      applyFilters();
    });
  });

  // Event listeners for checkboxes and range input
  const filterCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });

  const rangeInput = document.getElementById('range');
  rangeInput.addEventListener('input', applyFilters);

  // Event listener for category filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      applyFilters();
    });
  });

  // Initial loading of products
  applyFilters();
});
