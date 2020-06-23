console.log('javascript no frontend');

const cotacoesForm = document.querySelector('form');
const mainMensage = document.querySelector('h3');
const price = document.querySelector('#price');
const price_open = document.querySelector('#price_open');
const day_high = document.querySelector('#day_high');
const day_low = document.querySelector('#day_low');

cotacoesForm.addEventListener('submit', (event) => {
    mainMensage.innerText = 'Buscando...'
    price.innerText = ``;
    price_open.innerText = ``;
    day_high.innerText = ``;
    day_low.innerText = ``;
    
    event.preventDefault();
    const ativo = document.querySelector('input').value;

    if (!ativo) {
        mainMensage.innerText = `Um ativo deve ser informado.`;
        return
    }
    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if (data.err) {
                mainMensage.innerText = `Alguma coisa deu errado:`;
                price.innerText = `Erro: ${data.err.message}, Código: ${data.err.code}`;
            } else {
                mainMensage.innerText = data.symbol;
                price.innerText = `PRICE: ${data.price}`;
                price_open.innerText = `PRICE OPEN: ${data.price_open}`;
                day_high.innerText = `PRICE HIGH: ${data.day_high}`;
                day_low.innerText = `PRICE LOW: ${data.day_low}`;
            }
        });
    });
});
