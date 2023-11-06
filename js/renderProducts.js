import renderAbsent from './renderAbsent.js';

const products = [
    {
        id: 1,
        image: './img/t-short.jpg',
        name: 'Футболка UZcotton мужская',
        price: 1051,
        priceWithSale: 522,
        color: 'белый',
        size: '56',
        store: 'Коледино WB',
        seller: 'OOO Вайлдберриз',
        currentAmount: 1,
        totalAmount: 2,
        remain: 2
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
        totalAmount: 2,
        remain: 2
    }
];


let totalAmount = 0;
let totalProducts = products.length;
const itemCountElement = document.querySelector('.item-count');


itemCountElement.textContent = totalProducts.toString();

window.onload = function() {
    renderProducts();
    renderAbsent();
    updateTotalAmount();
    updateTotalPriceWithDiscount();
    updateTotalItems();

};
function renderProducts() {
    const productList = document.querySelector('.products__list');
    // Проходим по каждому товару и создаем карточку с изображением
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product__card';
        card.id = product.id;
        const checkBoxId = `checkbox-${product.id}`;
        const size_mobile = product.size ? `<span class="size-mobile">${product.size}</span>` : "";
        const remain = product.remain ? `<div class="buttons__left"><span>Осталось ${product.remain} шт.</span></div>` : '';
        const size = product.size ? `<span class="description__size">Размер: ${product.size}</span>` : '';
        const color = product.color ? `<span class="description__color">Цвет: ${product.color}</span>` : '';
        const colorSizeMarkup = size || color ? `<div class="description__color__size">${color}${size}</div>` : '';
        card.innerHTML = `
            <div class="card__description">
                <div class="description__image description__image-mobile">
                    <div class="card_description--checkbox checkbox-mobile">
                        <input type="checkbox" id="${checkBoxId}" class="checkbox" checked data-price="${product.priceWithSale}">
                        <label for="${checkBoxId}"></label>
                    </div>
                    ${size_mobile}
                    <img class="card__photo" src="${product.image}" alt="">
                </div>
                <div class="description__text">
                    <div class="actions__price actions__price-mobile">
                        <div class="price__actual-mobile">
                            <h3>${product.priceWithSale * product.currentAmount}</h3><h4> сом</h4>
                        </div>
                        <span class="price__sale-mobile">${product.price * product.currentAmount} сом</span>
                     </div>
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
                    ${remain}
                    <div class="buttons">
                        <img class="button_delete" src="./img/delete.svg" alt="">
                        <img class="button_favorite" src="./img/favorites.svg" alt="">
                    </div>
                </div>
                <div class="actions__price">
                    <div class="price__actual">
                        <h3>${product.priceWithSale * product.currentAmount}</h3><h4> сом</h4>
                    </div>
                    <span class="price__sale">${product.price * product.currentAmount} сом</span>
                </div>
            </div>
        `;

        const chooseAllCheckbox = document.getElementById('choose_all');

        chooseAllCheckbox.addEventListener('change', () => {
            const isChecked = chooseAllCheckbox.checked;

            // Перебираем все чекбоксы и устанавливаем или снимаем атрибут checked в зависимости от состояния "Выбрать все"
            const checkboxes = document.querySelectorAll('.checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });

            // Обновляем данные на странице
            updateTotalAmount();
            updateTotalPriceWithDiscount();
            updateTotalItems();
        });

        const deleteButton = card.querySelector('.button_delete');
        // Добавляем обработчик события к кнопке удаления
        deleteButton.addEventListener('click', () => {
            deleteProduct(product.id);
        });

        const checkBox = card.querySelector('.checkbox');

        const updateCardPrice = () => {
            const actualPriceElement = card.querySelector('.price__actual h3');
            const salePriceElement = card.querySelector('.price__sale');

            // Пересчитываем цены и обновляем текстовое содержимое DOM-элементов
            const actualPrice = product.priceWithSale * product.currentAmount;
            const salePrice = product.price * product.currentAmount;
            actualPriceElement.textContent = actualPrice.toLocaleString();
            salePriceElement.textContent = salePrice.toLocaleString() + ' сом';
        };

        const reduceButton = card.querySelector('.reduce_amount');
        const increaseButton = card.querySelector('.increase_amount');

        // Добавляем обработчики событий к кнопкам увеличения
        increaseButton.addEventListener('click', () => {
            if (product.currentAmount < product.totalAmount) {
                product.currentAmount++;
                updateProductAmount(product.id, product.currentAmount);
                updateCardPrice();
            }
        });

        // Добавляем обработчики событий к кнопкам уменьшения
        reduceButton.addEventListener('click', () => {
            if (product.currentAmount > 1) {
                product.currentAmount--;
                updateProductAmount(product.id, product.currentAmount);
                updateCardPrice();
            }
        });


        checkBox.addEventListener('change', () => {
            const isChecked = checkBox.checked;

            if (isChecked) {
                totalAmount += product.priceWithSale * product.currentAmount;
            } else {
                totalAmount -= product.priceWithSale * product.currentAmount;
            }

            if (totalAmount < 0) {
                totalAmount = 0;
            }

            updateTotalAmount(totalAmount);
        });

        productList.appendChild(card);
        updateCardPrice();


        updateProductAmount(product.id, product.currentAmount);
    });

}

function deleteProduct(productId) {
    const index = products.findIndex(product => product.id === productId);
    if (index !== -1) {
        products.splice(index, 1);
    }

    // Пересчитываем данные на странице
    updateTotalAmount();
    updateTotalPriceWithDiscount();
    updateTotalItems();
    updateTotalProducts(); // Вызываем функцию для обновления totalProducts

    // Находим и удаляем соответствующий элемент из DOM
    const cardElement = document.getElementById(productId);
    if (cardElement) {
        cardElement.remove();
    }
}

function updateTotalProducts() {
    totalProducts = products.length;
    const totalProductsElement = document.querySelector('.item-count');
    totalProductsElement.textContent = totalProducts; // Обновляем значение на странице

    // Находим элементы для скрытия
    const stockSection = document.querySelector('.stock');
    const totalDiv = document.querySelector('.total');

    // Проверяем значение totalProducts и скрываем/показываем соответствующие блоки
    if (totalProducts === 0) {
        stockSection.style.display = 'none';
        totalDiv.style.display = 'none';
    } else {
        stockSection.style.display = 'block';
        totalDiv.style.display = 'block';
    }
}

function updateTotalAmount() {
    const totalAmountElement = document.querySelector('.total-amount');
    const totalAmount = calculateTotalAmount();
    const totalAmountSpan = document.querySelector('.header__drop--amount');

    totalAmountSpan.textContent = `${totalAmount.toLocaleString()} сом`;

    totalAmountElement.textContent = `${totalAmount.toLocaleString()} сом`; // Преобразовываем число в строку с форматированием

}

function calculateTotalAmount() {
    // Вычисляем общую стоимость выбранных товаров из массива products
    return products.reduce((total, product) => {
        const checkBox = document.getElementById(`checkbox-${product.id}`);
        // Проверяем, выбран ли чекбокс товара
        if (checkBox && checkBox.checked) {
            // Если чекбокс выбран, добавляем цену товара с учетом количества к общей стоимости
            return total + product.priceWithSale * product.currentAmount;
        }
        // Если чекбокс не выбран или не найден, оставляем общую стоимость без изменений
        return total;
    }, 0);
}

function updateTotalPriceWithDiscount() {
    const totalPriceWithDiscountElement = document.querySelector('.total-price-with-discount');
    const totalPriceWithDiscount = calculateTotalPriceWithDiscount();
    totalPriceWithDiscountElement.textContent = `${totalPriceWithDiscount.toLocaleString()} сом`;
}
function calculateTotalPriceWithDiscount() {
    return products.reduce((total, product) => {
        const checkBox = document.getElementById(`checkbox-${product.id}`);
        // Проверяем, выбран ли чекбокс товара, включено ли товар в общую стоимость и больше ли нуля текущее количество товара
        if (checkBox && checkBox.checked && product.currentAmount > 0) {
            // Если чекбокс выбран и товар включен в общую стоимость, учитываем цену товара с учетом количества
            total += product.price * product.currentAmount;
        }
        return total;
    }, 0);
}

function updateTotalItems() {
    const totalItemsElement = document.querySelector('.total-items');
    const totalItems = calculateTotalItems();
    totalItemsElement.textContent = `${totalItems} товара`;

    const itemsCountSpan = document.querySelector('.header__drop--items');
    itemsCountSpan.textContent = `${totalItems} товара`;

    // Функция для подсчета общего количества выбранных товаров
    function calculateTotalItems() {
        // Вычисляем общее количество выбранных товаров из массива products
        return products.reduce((total, product) => {
            const checkBox = document.getElementById(`checkbox-${product.id}`);
            // Проверяем, выбран ли чекбокс товара и включено ли товар в общее количество
            if (checkBox && checkBox.checked && product.currentAmount > 0) {
                // Если чекбокс выбран и товар включен в общее количество, увеличиваем общее количество товаров
                return total + product.currentAmount;
            }
            // Если чекбокс не выбран или не найден, или товар не включен в общее количество, оставляем общее количество без изменений
            return total;
        }, 0);
    }
}

function updateProductAmount(productId, newAmount) {
    const product = products.find(item => item.id === productId);

    if (product) {
        product.currentAmount = newAmount; // Обновляем количество товара в массиве products
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

            if (newAmount === product.totalAmount) {
                increaseButton.classList.add('max-amount');
            } else {
                increaseButton.classList.remove('max-amount');
            }

            // Обновляем общую стоимость товаров
            updateTotalAmount();
            updateTotalPriceWithDiscount();
            updateTotalItems();
        }
    }
}

