const emailInput = document.getElementById("email");
const errorSpan = document.querySelector(".info-span--error");
let isValid = false;

emailInput.addEventListener("input", function() {
    const email = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailPattern.test(email) || email.trim() === "") {
        isValid = true;
        errorSpan.style.display = "none";
    } else {
        isValid = false;
    }
});

emailInput.addEventListener("blur", function() {
    if (!isValid && emailInput.value.trim() !== "") {
        errorSpan.style.display = "block";
    }
});



const phoneNumberInput = document.getElementById('phone-number');
const errorSpanPhone = document.querySelector('.info-error--phone');

function formatPhoneNumber(inputValue) {
    const match = inputValue.match(/^(\d{1})?(\d{3})?(\d{3})?(\d{2})?(\d{2})?$/);
    if (match) {
        const groups = match.slice(1, 6).filter(Boolean);
        let formattedValue = groups.join(' ');
        if (formattedValue.length > 10) {
            formattedValue = `+${formattedValue}`;
        }
        return formattedValue;
    }
    return null;
}

phoneNumberInput.addEventListener('input', function(event) {
    const inputValue = event.target.value.replace(/\D/g, '');
    const formattedValue = formatPhoneNumber(inputValue);
    if (inputValue.length > 0 && inputValue.length <= 30 && formattedValue) {
        phoneNumberInput.value = formattedValue;
        errorSpanPhone.style.display = 'none';
    } else {
        errorSpanPhone.style.display = 'block';
    }
});

phoneNumberInput.addEventListener('blur', function(event) {
    const inputValue = event.target.value.replace(/\D/g, '');
    const formattedValue = formatPhoneNumber(inputValue);
    if (inputValue.length > 0 && inputValue.length <= 30 && formattedValue) {
        phoneNumberInput.value = formattedValue;
        errorSpanPhone.style.display = 'none';
    } else {
        errorSpanPhone.style.display = 'block';
    }
});

const INNInput = document.getElementById('INN');
const infoSpan = document.querySelector('.info-span');
const errorSpanINN = document.querySelector('.info-error--INN');

INNInput.addEventListener('blur', function(event) {
    const inputValue = event.target.value.replace(/\D/g, ''); // Оставляем только цифры
    if (inputValue.length === 14) {
        infoSpan.style.display = 'block';
        errorSpanINN.style.display = 'none';
    } else {
        infoSpan.style.display = 'none';
        errorSpanINN.style.display = 'block';
    }
});