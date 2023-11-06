const absentProducts = [
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


function renderAbsent() {
    const productList = document.querySelector('.absent__list');
    productList.innerHTML = '';
    // Проходим по каждому товару и создаем карточку с изображением
    absentProducts.forEach(product => {
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
                        <img class="button_delete button_delete--absent" src="./img/delete.svg" alt="">
                        <img class="button_favorite button_favorite--absent" src="./img/favorites.svg" alt="">
                    </div>
                </div>
            </div>
        `;


        productList.appendChild(absentCard);

        const deleteButton = absentCard.querySelector('.button_delete--absent');
        deleteButton.addEventListener('click', function() {
            const productId = parseInt(absentCard.id);
            const index = absentProducts.findIndex(product => product.id === productId);
            if (index !== -1) {
                absentProducts.splice(index, 1);
                renderAbsent();
                updateAbsentItemsCount(); // Обновляем количество отсутствующих товаров после удаления
            }
        });

    });
}

function updateAbsentItemsCount() {
    const absentItemsAmount = document.querySelector('.absent-items-amount');
    absentItemsAmount.textContent = absentProducts.length;

    const absentSection = document.querySelector('.absent');
    if (absentProducts.length === 0) {
        absentSection.style.display = 'none';
    } else {
        absentSection.style.display = 'block';
    }
}



export default renderAbsent;