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

const cards = [
    {
        id: 1,
        image: './img/mir.svg',
        number: '1234 56•• •••• 1234',
        default: true
    },
    {
        id: 2,
        image: './img/visa.svg',
        number: '1234 56•• •••• 1234',
        default: false
    },
    {
        id: 3,
        image: './img/mastercard.svg',
        number: '1234 56•• •••• 1234',
        default: false
    },
    {
        id: 4,
        image: './img/maestro.svg',
        number: '1234 56•• •••• 1234',
        default: false
    },

]
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
                        <input type="checkbox" id="${checkBoxId}" class="checkbox" checked>
                        <label for="${checkBoxId}"></label>
                    </div>
                    ${size_mobile}
                    <img class="card__photo" src="${product.image}" alt="">
                </div>
                <div class="description__text">
                    <div class="actions__price actions__price-mobile">
                        <div class="price__actual">
                            <h3>${product.priceWithSale}</h3><h4> сом</h4>
                        </div>
                        <span class="price__sale">${product.price} сом</span>
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

function renderAbsent() {
    const productList = document.querySelector('.absent__list');
    // Проходим по каждому товару и создаем карточку с изображением
    products.forEach(product => {
        const absentCard = document.createElement('div');
        absentCard.className = 'absent__card';
        absentCard.id = product.id;
        const size_mobile = product.size ? `<span class="size-mobile">${product.size}</span>` : "";
        const size = product.size ? `<span class="description__size">Размер: ${product.size}</span>` : '';
        const color = product.color ? `<span class="description__color">Цвет: ${product.color}</span>` : '';
        const colorSizeMarkup = size || color ? `<div class="description__color__size">${color}${size}</div>` : '';
        absentCard.innerHTML = `
            <div class="card__description">
                <div class="description__image description__image-mobile">
                    ${size_mobile}
                    <img class="card__photo" src="${product.image}" alt="">
                </div>
                <div class="description__text">
                    <span class="description__name">${product.name}</span>
                    ${colorSizeMarkup}
                </div>
            </div>
            <div class="card__actions">
                <div class="actions__buttons">
                    <div class="buttons">
                        <img class="button_delete" src="./img/delete.svg" alt="">
                        <img class="button_favorite" src="./img/favorites.svg" alt="">
                    </div>
                </div>
            </div>
        `;

        productList.appendChild(absentCard);
    });

}

const popupPayment = document.getElementById('popup-payment');
const popupPaymentButton = document.getElementById('popup-payment-button');
const closeBtn = document.getElementById('closeBtn');
const changePaymentButton = document.querySelector('.change-payment');
popupPaymentButton.addEventListener('click', () => {
    popupPayment.style.display = 'flex';
});

changePaymentButton.addEventListener('click', () => {
    popupPayment.style.display = 'flex';
    document.body.classList.add('popup-open');
});
closeBtn.addEventListener('click', () => {
    popupPayment.style.display = 'none';
    document.body.classList.remove('popup-open');
});


const popupDelivery = document.getElementById('popup-delivery');
const popupDeliveryButton = document.getElementById('popup-delivery-button');
const changeDeliveryButton = document.querySelector('.change-delivery');
const closeBtnDelivery = document.getElementById('closeBtn-delivery');

// Функция для открытия pop-up
function openDeliveryPopup() {
    popupDelivery.style.display = 'flex';
    document.body.classList.add('popup-open');
}

// Функция для закрытия pop-up
function closeDeliveryPopup() {
    popupDelivery.style.display = 'none';
    document.body.classList.remove('popup-open');
}

const courierRadio = document.getElementById('courier');
const pointRadio = document.getElementById('point');
const courierList = document.getElementById('courier-list');
const pointList = document.getElementById('point-list');

pointRadio.checked = true; // Устанавливаем pointRadio в состояние checked по умолчанию
pointList.style.display = 'block'; // Показываем point-list по умолчанию

courierRadio.addEventListener('change', () => {
    courierList.style.display = courierRadio.checked ? 'block' : 'none';
    pointList.style.display = pointRadio.checked ? 'block' : 'none';
});

pointRadio.addEventListener('change', () => {
    courierList.style.display = courierRadio.checked ? 'block' : 'none';
    pointList.style.display = pointRadio.checked ? 'block' : 'none';
});

// Назначаем события клика на кнопки и кнопку закрытия
popupDeliveryButton.addEventListener('click', openDeliveryPopup);
changeDeliveryButton.addEventListener('click', openDeliveryPopup);
closeBtnDelivery.addEventListener('click', closeDeliveryPopup);


const courierButton = document.querySelector('.courier-button');
const pointButton = document.querySelector('.point-button');
const courierInput = document.getElementById('courier');
const pointInput = document.getElementById('point');

courierInput.addEventListener('change', function() {
    courierButton.style.borderColor = 'rgba(203, 17, 171, 1)';
    pointButton.style.borderColor = 'rgba(203, 17, 171, 0.15)';
});

pointInput.addEventListener('change', function() {
    pointButton.style.borderColor = 'rgba(203, 17, 171, 1)';
    courierButton.style.borderColor = 'rgba(203, 17, 171, 0.15)';
});

const cardListElement = document.getElementById('cardList');
const chooseButton = document.querySelector('.payment-choose__button');

// Перебираем массив cards и создаем элементы для каждой карты
cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('payment-card');

    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'payment-method';
    radioInput.id = `card-${card.id}`;
    radioInput.classList.add('custom-radio');

    const label = document.createElement('label');
    label.setAttribute('for', `card-${card.id}`);

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = '';

    const span = document.createElement('span');
    span.textContent = card.number;

    // Добавляем созданные элементы в дерево DOM
    label.appendChild(img);
    label.appendChild(span);
    cardDiv.appendChild(radioInput);
    cardDiv.appendChild(label);
    cardListElement.appendChild(cardDiv);

    // Если карта помечена как default, делаем ее выбранной по умолчанию
    if (card.default) {
        radioInput.checked = true;
    }

    // Слушаем события изменения выбора радиокнопок
    radioInput.addEventListener('change', () => {
        // Обновляем свойство default в массиве cards в зависимости от выбранной карты
        cards.forEach(c => {
            if (c.id === card.id) {
                c.default = true;
            } else {
                c.default = false;
            }
        });
    });
});

// Слушаем событие клика на кнопке "Выбрать"
chooseButton.addEventListener('click', () => {
    // Здесь вы можете выполнить дополнительные действия при нажатии на кнопку "Выбрать"
    popupPayment.style.display = 'none';
    console.log('Выбрана карта с id:', getSelectedCardId());
});

function getSelectedCardId() {
    // Находим выбранную радиокнопку и возвращаем ее id
    const selectedRadio = document.querySelector('input[name="payment-method"]:checked');
    return selectedRadio ? selectedRadio.id.split('-')[1] : null;
}



// Вызываем функцию отображения товаров при загрузке страницы
window.onload = function() {
    renderProducts();
    renderAbsent();
};