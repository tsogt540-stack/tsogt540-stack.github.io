const form1 = document.getElementById("form1")
const number1 = document.getElementById("number1")
const result1 = document.getElementById("result1")

form1.addEventListener("submit", function(event) {

    event.preventDefault();

    const inputValue = Number(number1.value);
    let number = inputValue;
    let sum=0;
    let digit;
    while(number > 0){
        digit = number % 10;
        sum = sum + digit;
        number = Math.floor(number/10);
    }

    let originalSum = sum;
    let temp = sum;
    let reversed = 0;
    while(temp > 0){
        reversed = reversed * 10 + (temp % 10);
        temp = Math.floor(temp / 10);
    }
    if(originalSum == reversed){
        result1.textContent = "Оруулсан тоо: " + inputValue + "\nЦифрүүдийн нийлбэр: " + sum + "\n" + sum + "  Палиндром тоо мөн"
    } else {
        result1.textContent = "Оруулсан тоо: " + inputValue + "\nЦифрүүдийн нийлбэр: " + sum + "\n" + sum + "  Палиндром тоо биш"
    }
});

const form2 = document.getElementById("form2")
const distance = document.getElementById("distance")
const result2 = document.getElementById("result2")

form2.addEventListener("submit", function(event){
    event.preventDefault();

    const distanceValue = Number(distance.value);
    const relativeSpeed = (25 - 18) * 1000 / 3600;
    const totalSeconds = distanceValue / relativeSpeed;
    const roundedSeconds = Math.round(totalSeconds);
    const minutes = Math.floor(roundedSeconds / 60);
    const seconds = roundedSeconds % 60;

    result2.textContent = "Нийт хугацаа: " + roundedSeconds + " секунд" + "\n Гүйцэх хугацаа: " + minutes + " минут " + seconds + " секунд";
})

const form3 = document.getElementById("form3")
const apartment = document.getElementById("apartment")
const result3 = document.getElementById("result3")
form3.addEventListener("submit", function(event){
    event.preventDefault();

    const apartmentValue = Number(apartment.value);
    
    if (Number.isInteger(apartmentValue) && apartmentValue >= 1 && apartmentValue <= 108){
        let entrance = Math.floor((apartmentValue - 1) / 36) + 1;
        let localNumber = (apartmentValue - 1) % 36;
        let floor = Math.floor(localNumber / 4) + 1;
        let door = (localNumber % 4) + 1;
        result3.textContent = "Тоот: " + apartmentValue + "\n Орц: " + entrance + "\n Давхар : " + floor + " \n Хэд дэхь айл: " + door;
    } else {
        result3.textContent = "1-108 хооронд тоо оруулна уу "
    }
});

function gcd(a, b) {
    while (b !== 0) {
        let remainder = a % b;
        a = b;
        b = remainder;
    }
    return a;
}
function lcm(a, b) {
    return (a / gcd(a, b)) * b;
}

const form4 = document.getElementById("form4");

const number4_1 = document.getElementById("number4_1");
const number4_2 = document.getElementById("number4_2");
const number4_3 = document.getElementById("number4_3");
const number4_4 = document.getElementById("number4_4");
const number4_5 = document.getElementById("number4_5");

const result4 = document.getElementById("result4");

form4.addEventListener("submit", function(event) {

    event.preventDefault();
    const A = [
        Number(number4_1.value),
        Number(number4_2.value),
        Number(number4_3.value),
        Number(number4_4.value),
        Number(number4_5.value)
    ];

    if (!A.every(num => Number.isSafeInteger(num) && num > 0)) {
        result4.textContent = "Эерэг бүхэл тоо оруулна уу.";
        return;
    }
    let answer = A[0];
    for (let i = 1; i < A.length; i++) {
        answer = lcm(answer, A[i]);

        if (!Number.isSafeInteger(answer)) {
            result4.textContent = "Үр дүн JavaScript-ийн аюулгүй бүхэл тооны хязгаараас хэтэрлээ.";
            return;
        }
    }
    result4.textContent = "Оруулсан тоонууд: " + A.join(", ") + "\nХБЕК: " + answer;
});

const form5 = document.getElementById("form5")
const number5 = document.getElementById("number5")
const result5 = document.getElementById("result5")

form5.addEventListener("submit", function(event){
    event.preventDefault();

    const now = new Date();
    const hour = now.getHours();
    const number5Value = Number(number5.value);
    let d;

    if (hour >= 6 && hour < 12){
        d = number5Value * number5Value;
    } else if (hour >= 18 && hour < 24) {
        if (number5Value >= 0){
            d = Math.sqrt(number5Value);
        } else {
            d = "Сөрөг тоо тул бодит тоон язуур байхгүй"
        }
    } else {
        d = "Тооцоолол хийх цаг болоогүй байна"
    }

    result5.textContent = d;
});