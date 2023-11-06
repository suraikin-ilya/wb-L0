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


