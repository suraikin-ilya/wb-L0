const dropStock = document.getElementById('dropStock');
const stockProducts = document.querySelector('.products__list');
const stockHeaderCheckbox = document.querySelector('.stock__header--checkbox');
const stockHeaderDrop = document.querySelector('.stock__header--drop');


dropStock.addEventListener('click', function() {
    dropStock.classList.toggle('rotated');
    stockProducts.classList.toggle('hidden');
    stockHeaderCheckbox.classList.toggle('hidden');
    stockHeaderDrop.classList.toggle('hidden');
});



const dropAbsent = document.getElementById('dropAbsent');
const absentList = document.querySelector('.absent__list');

dropAbsent.addEventListener('click', function() {
    dropAbsent.classList.toggle('rotated');
    absentList.classList.toggle('hidden');
});