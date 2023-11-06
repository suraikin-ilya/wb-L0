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

let selectedCardId = null;
let selectedCard = null;

// Слушаем событие изменения выбора радиокнопок
document.querySelectorAll('input[name="payment-method"]').forEach(radioInput => {
    radioInput.addEventListener('change', () => {
        selectedCardId = getSelectedCardId();
        if (selectedCardId) {
            selectedCard = cards.find(card => card.id === parseInt(selectedCardId));
        }
    });
});

chooseButton.addEventListener('click', () => {
    if (selectedCard) {
        const paymentMethodImage = document.querySelector('.total__payment-image');
        const paymentMethodNumber = document.querySelector('.total__payment-number');
        const bankCardImage = document.querySelector('.total__payment-mir');
        const cardNumberSpan = document.querySelector('.card-number');

        paymentMethodImage.src = selectedCard.image;
        paymentMethodNumber.textContent = selectedCard.number;
        bankCardImage.src = selectedCard.image;
        cardNumberSpan.textContent = selectedCard.number;

        // Скрыть или показать блоки согласно вашей логике
        // Например:
        // popupPayment.style.display = 'none';
        // popupDelivery.style.display = 'none';
    }
});

const delivery = [
    {
        id: 1,
        address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1',
        default: true,
        type: 'point'
    },
    {
        id: 2,
        address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1',
        default: false,
        type: 'point'
    },
    {
        id: 2,
        address: 'г. Бишкек, улица Табышалиева, д. 57',
        default: false,
        type: 'point'
    },
    {
        id: 4,
        address: 'Бишкек, улица Табышалиева, 57',
        default: false,
        type: 'courier'
    },
    {
        id: 5,
        address: 'Бишкек, улица Жукеева-Пудовкина, 77/1',
        default: false,
        type: 'courier'
    },
    {
        id: 6,
        address: 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1',
        default: false,
        type: 'courier'
    },
];


document.addEventListener('DOMContentLoaded', () => {
    const pointCardList = document.querySelector('.courier__card-list');
    const courierCardList = document.querySelector('.point__card-list');

    const [pointAddresses, courierAddresses] = delivery.reduce((acc, address) => {
        if (address.type === 'point') {
            acc[0].push(address);
        } else if (address.type === 'courier') {
            acc[1].push(address);
        }
        return acc;
    }, [[], []]);

    function renderPoints() {
        pointCardList.innerHTML = '';

        pointAddresses.forEach(point => {
            const addressCardDiv = document.createElement('div');
            addressCardDiv.classList.add('address-card', 'address-card-courier');

            const radioContainerDiv = document.createElement('div');

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'point-address';
            radioInput.id = `point-${point.id}`;
            radioInput.classList.add('custom-radio');
            if (point.default) {
                radioInput.checked = true;
            }

            const label = document.createElement('label');
            label.setAttribute('for', `point-${point.id}`);

            radioContainerDiv.appendChild(radioInput);
            radioContainerDiv.appendChild(label);
            addressCardDiv.appendChild(radioContainerDiv);

            const cardCourierAddressDiv = document.createElement('div');
            cardCourierAddressDiv.classList.add('card-courier__address');

            const addressSpan = document.createElement('span');
            addressSpan.classList.add('courier__address');
            addressSpan.textContent = point.address;

            const starPointDiv = document.createElement('div');
            starPointDiv.classList.add('star-point');

            const starImg = document.createElement('img');
            starImg.src = './img/star_fill.svg';
            starImg.alt = '';

            const starSpan = document.createElement('span');
            starSpan.textContent = 'Пункт выдачи';

            starPointDiv.appendChild(starImg);
            starPointDiv.appendChild(starSpan);
            cardCourierAddressDiv.appendChild(addressSpan);
            cardCourierAddressDiv.appendChild(starPointDiv);
            addressCardDiv.appendChild(cardCourierAddressDiv);

            const deleteImg = document.createElement('img');
            deleteImg.classList.add('deleteAddress');
            deleteImg.src = 'img/delete-address.svg';
            deleteImg.alt = '';
            addressCardDiv.appendChild(deleteImg);

            cardCourierAddressDiv.addEventListener('click', () => {
                radioInput.checked = true;
            });

            if (point.default) {
                radioInput.checked = true;
            }

            deleteImg.addEventListener('click', () => {
                const index = delivery.findIndex(item => item.id === point.id);
                if (index !== -1) {
                    delivery.splice(index, 1);
                    renderPoints();
                }
            });

            pointCardList.appendChild(addressCardDiv);
        });
    }

    function renderCouriers() {
        courierCardList.innerHTML = '';

        courierAddresses.forEach(courier => {
            const addressCardDiv = document.createElement('div');
            addressCardDiv.classList.add('address-card');

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'point-address';
            radioInput.id = `point-${courier.id}`;
            radioInput.classList.add('custom-radio');
            if (courier.default) {
                radioInput.checked = true;
            }

            const label = document.createElement('label');
            label.setAttribute('for', `point-${courier.id}`);
            const addressSpan = document.createElement('span');
            addressSpan.textContent = courier.address;

            const deleteImg = document.createElement('img');
            deleteImg.classList.add('deleteAddress');
            deleteImg.src = 'img/delete-address.svg';
            deleteImg.alt = '';

            label.appendChild(addressSpan);
            addressCardDiv.appendChild(radioInput);
            addressCardDiv.appendChild(label);
            addressCardDiv.appendChild(deleteImg);

            deleteImg.addEventListener('click', () => {
                const index = delivery.findIndex(item => item.id === courier.id);
                if (index !== -1) {
                    delivery.splice(index, 1);
                    renderCouriers();
                }
            });

            courierCardList.appendChild(addressCardDiv);
        });
    }

    const selectButton = document.getElementById('selectButton');
    const deliveryAddressSpan = document.querySelector('.delivery-address');
    const propertyValueAddressSpan = document.querySelector('.property-value-address');

    selectButton.addEventListener('click', () => {
        const selectedPointId = document.querySelector('input[name="point-address"]:checked').id;

        delivery.forEach(item => {
            item.default = false;
        });

        const selectedPoint = delivery.find(item => item.id.toString() === selectedPointId.split('-')[1]);
        if (selectedPoint) {
            selectedPoint.default = true;
        }

        const defaultAddress = delivery.find(item => item.default);
        if (defaultAddress) {
            deliveryAddressSpan.textContent = defaultAddress.address;
            propertyValueAddressSpan.textContent = defaultAddress.address;
        } else {
            deliveryAddressSpan.textContent = 'Адрес не выбран';
            propertyValueAddressSpan.textContent = 'Адрес не выбран';
        }

        renderPoints();
        renderCouriers();
        closeDeliveryPopup();
    });

    renderPoints();
    renderCouriers();

});

