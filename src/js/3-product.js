import {
  getFurnitures
} from './furniture-api.js';


function createProductsList (functions = getFurnitures(1, 8)) {
    const productsList = document.querySelector('.products-list');

    // Очистка списка, если нужно
    functions.then(data => {
        // Если getFurnitures возвращает объект с полем furnitures
        const furnitures = data.furnitures || data; // на всякий случай

        if (furnitures && furnitures.length) {
            furnitures.forEach(furniture => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.setAttribute('data-id', furniture._id);
                productItem.innerHTML = `
                    <img src="${furniture.images[0]}" alt="${furniture.name}" class="img-card" width="100%" height="256px" />
                    <p class="text-card">${furniture.name}</p>
                    <div class="colors">
                      ${furniture.color.map(c => `<span class="color-one" style="background-color:${c};"></span>`).join('')}
                    </div>
                    <p class="text-card">${furniture.price} грн</p>
                    <button class="btn btn-go-modal">Детальніше</button>
                `;
                productsList.appendChild(productItem);
            });
        } else {
            productsList.innerHTML = '<p>Товари не знайдені.</p>';
        }
    }).catch(error => {
        console.error('Помилка завантаження товарів:', error);
        productsList.innerHTML = '<p>Помилка завантаження товарів.</p>';
    });
}

addEventListener('DOMContentLoaded', () => {
    createProductsList();
});

