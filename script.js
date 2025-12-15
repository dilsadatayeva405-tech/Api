let valyutalar1 = document.querySelectorAll(".valyuta1");
let input1 = document.querySelector(".card1 input");
let p1 = document.querySelector(".card1 p");
let valyutalar2 = document.querySelectorAll(".valyuta2");
let input2 = document.querySelector(".card2 input");
let p2 = document.querySelector(".card2 p");

let currency1 = "RUB";
let currency2 = "USD";

let rates = {};

fetch("https://api.exchangerate.host/live?access_key=631c5835645acffaa71b8ed68ece41b7")
    .then((response) => response.json())
    .then((data) => {
        rates = data.quotes;
        setInitialActive();
        calculate();
    })

valyutalar1.forEach(button => {
    button.addEventListener('click', () => {
        valyutalar1.forEach(btn => {
            btn.style.backgroundColor = 'white';
            btn.style.color = '#666';
        });
        button.style.backgroundColor = '#7B3FF2';
        button.style.color = 'white';

        currency1 = button.innerText;
        calculate();
    });
});

valyutalar2.forEach(button => {
    button.addEventListener('click', () => {
        valyutalar2.forEach(btn => {
            btn.style.backgroundColor = 'white';
            btn.style.color = '#666';
        });
        button.style.backgroundColor = '#7B3FF2';
        button.style.color = 'white';

        currency2 = button.innerText;
        calculate();
    });
});


input1.addEventListener("input", () => {
    let value = input1.value;
    value = value.replace(/,/g, ".");
    value = value.replace(/[^0-9.]/g, "");

   let noqte = value.split('.');
   if (noqte.length > 2) {
       value = noqte[0] + '.' + noqte[1];
   }

   
  if (noqte.length === 2 && noqte[1].length > 5) {
    value = noqte[0] + '.' + noqte[1].slice(0, 5);
}

    input1.value = value;
    calculate();
});

input2.addEventListener("input", () => {
    let value = input2.value;
    value = value.replace(/,/g, ".");
    value = value.replace(/[^0-9.]/g, "");
    input2.value = value;
    
    value = Number(value);

    if (value <= 0 || isNaN(value)) {
        input1.value = "0";
        return;
    }

    let rate1 = getRate(currency1);
    let rate2 = getRate(currency2);

    if (!rate1 || !rate2) return;

    let result = (value * rate1) / rate2;
    input1.value = result.toFixed(5);

    updateRateText();
});

function getRate(currency) {
    if (currency == "USD") return 1;
    return rates["USD" + currency];
}

function calculate() {
    let value = input1.value;
    value = value.replace(/,/g, ".");
    value = value.replace(/[^0-9.]/g, "");
    value = Number(value);

    if (value <= 0 || isNaN(value)) {
        input2.value = "0";
        return;
    }

    let rate1 = getRate(currency1);
    let rate2 = getRate(currency2);

    if (!rate1 || !rate2) return;

    let result = (value * rate2) / rate1;
    input2.value = result.toFixed(5);

    updateRateText();
}

function updateRateText() {
    let rate1 = getRate(currency1);
    let rate2 = getRate(currency2);

    if (!rate1 || !rate2) return;

    let rate1to2 = rate2 / rate1;
    let rate2to1 = rate1 / rate2;

    p1.textContent = `1 ${currency1} = ${rate1to2.toFixed(4)} ${currency2}`;
    p2.textContent = `1 ${currency2} = ${rate2to1.toFixed(4)} ${currency1}`;
}

function setInitialActive() {
    document.querySelector(".rub1").style.backgroundColor = '#7B3FF2';
    document.querySelector(".rub1").style.color = 'white';

    document.querySelector(".usd2").style.backgroundColor = '#7B3FF2';
    document.querySelector(".usd2").style.color = 'white';
}




const internetMesaj = document.querySelector('.internet');
const birinci = document.querySelector('#input1');
const ikinci = document.querySelector('#input2');


function baglantiniYoxla() {
 
  if (navigator.onLine) {
   
    internetMesaj.style.display = 'none';
    birinci.disabled = false;
    ikinci.disabled = false;
    birinci.style.backgroundColor = '';
    ikinci.style.backgroundColor = '';
  } else {
   
    internetMesaj.style.display = 'block';
    birinci.disabled = true;
    ikinci.disabled = true;
    birinci.style.backgroundColor = 'white';
    ikinci.style.backgroundColor = 'white';
  }
}

window.addEventListener('offline', baglantiniYoxla);
window.addEventListener('online', baglantiniYoxla);
baglantiniYoxla();