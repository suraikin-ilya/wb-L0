const products = [
    {
        id: 1,
        image: './img/t-short.jpg',
        name: 'Футболка UZcotton мужская',
        price: 1051,
        priceWithSale: 522,
        color: 'Белый',
        size: '56',
        store: 'Коледино WB',
        seller: 'OOO Вайлдберриз',
        currentAmount: 1,
        totalAmount: 2
    },
    {
        id: 2,
        image: './img/card-holder.jpg',
        name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
        price: 11500,
        priceWithSale: 10500,
        color: 'прозрачный',
        store: 'Коледино WB',
        seller: 'OOO Мегапрофстиль',
        currentAmount: 200,
        totalAmount: 999
    },
    {
        id: 3,
        image: './img/pencil.jpg',
        name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные,&nbsp;Faber-Castell',
        price: 475,
        priceWithSale: 247,
        store: 'Коледино WB',
        seller: 'OOO Вайлдберриз',
        currentAmount: 2,
        totalAmount: 2
    }
];
function renderProducts() {
    const productList = document.querySelector('.products__list');
    // Проходим по каждому товару и создаем карточку с изображением
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product__card';
        card.id = product.id;
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
                        <span class="increase_amount ${product.currentAmount === product.totalAmount ? 'max-amount' : ''}">+</span>
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

        const reduceButton = card.querySelector('.reduce_amount');
        const increaseButton = card.querySelector('.increase_amount');

        // Добавляем обработчики событий к кнопкам увеличения
        increaseButton.addEventListener('click', () => {
            if (product.currentAmount < product.totalAmount) {
                product.currentAmount++;
                updateProductAmount(product.id, product.currentAmount);
            }
        });

        // Добавляем обработчики событий к кнопкам уменьшения
        reduceButton.addEventListener('click', () => {
            if (product.currentAmount > 1) {
                product.currentAmount--;
                updateProductAmount(product.id, product.currentAmount);
            }
        });

        productList.appendChild(card);

        updateProductAmount(product.id, product.currentAmount);
    });

}


function updateProductAmount(productId, newAmount) {
    const card = document.getElementById(productId);
    if (card) {
        card.querySelector('.amount').textContent = newAmount;

        const reduceButton = card.querySelector('.reduce_amount');
        const increaseButton = card.querySelector('.increase_amount');

        // Обновляем классы кнопок увеличения и уменьшения в зависимости от значения newAmount
        if (newAmount === 1) {
            reduceButton.classList.add('max-amount');
        } else {
            reduceButton.classList.remove('max-amount');
        }

        if (newAmount === products.find(item => item.id === productId).totalAmount) {
            increaseButton.classList.add('max-amount');
        } else {
            increaseButton.classList.remove('max-amount');
        }
    }
}

// Вызываем функцию отображения товаров при загрузке страницы
window.onload = function() {
    renderProducts();
    initEventHandlers();
};