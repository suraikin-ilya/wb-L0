import products from './products';
function renderProducts() {
    const productList = document.querySelector('.products__list');

    // Проходим по каждому товару и создаем карточку с изображением
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product__card';
        const checkBoxId = `checkbox-${product.id}`;
        const size = product.size ? `<span class="description__size">Размер: ${product.size}</span>` : '';
        const color = product.color ? `<span class="description__color">Цвет: ${product.color}</span>` : '';
        const colorSizeMarkup = size || color ? `<div class="description__color__size">${color}${size}</div>` : '';
        card.innerHTML = `
            <div class="card__description">
                <div class="description__image">
                    <div class="card_description--checkbox">
                        <input type="checkbox" id="${checkBoxId}" class="checkbox" checked>
                        <label for="${checkBoxId}"></label>
                    </div>
                    <img class="card__photo" src="${product.image}" alt="">
                </div>
                <div class="description__text">
                    <span class="description__name">${product.name}</span>
                    ${colorSizeMarkup}
                    <span class="description__store">${product.store}</span>
                    <div class="seller">
                        <span class="description__seller">${product.seller}</span>
                        <img class="seller__info" src="./img/info.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="card__actions">
                <div class="actions__buttons">
                    <div class="buttons__quantity">
                        <span class="reduce_amount">−</span>
                        <span class="amount">${product.currentAmount}</span>
                        <span class="increase_amount">+</span>
                    </div>
                    <div class="buttons__left">
                        <span>Осталось 2 шт.</span>
                    </div>
                    <div class="buttons">
                        <img class="button_delete" src="./img/delete.svg" alt="">
                        <img class="button_favorite" src="./img/favorites.svg" alt="">
                    </div>
                </div>
                <div class="actions__price">
                    <div class="price__actual">
                        <h3>${product.priceWithSale}</h3><h4> сом</h4>
                    </div>
                    <span class="price__sale">${product.price} сом</span>
                </div>
            </div>
        `;

        productList.appendChild(card);
    });
}
// Вызываем функцию отображения товаров при загрузке страницы
window.onload = renderProducts;