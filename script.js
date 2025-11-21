const productFormTemplate = document.getElementById('productFormTemplate');

const itemFormTemplate = document.getElementById('itemFormTemplate');
const itemListTemplate = document.getElementById('itemListTemplate');
const itemRowTemplate = document.getElementById('itemRowTemplate');

const msgContent = document.getElementById('msg-content');
const mainContent = document.getElementById('main-content');

let store = {
    itens: [
        {name: 'Água', price: 5.5, amount: 1, measure: 'lt'},
        {name: 'Álcool', price: 10.5, amount: 500, measure: 'ml'},
        {name: 'Cêra', price: 9.3, amount: 1, measure: 'kg'},
        {name: 'Farinha', price: 6.0, amount: 100, measure: 'gr'},
        {name: 'Frasco', price: 9.3,  amount: 1, measure: 'un'},
    ],
    products: [
        {name: 'Agua de cheiro'}
    ]
}

function sendMessage(textMsg) {
    let htmlmsg = 
        `<div class="alert alert-success">
            ${textMsg}
        </div>`
    msgContent.innerHTML = htmlmsg;
}

function renderItemForm() {
    clearAll();
    let newContent = itemFormTemplate.innerHTML;
    mainContent.innerHTML = newContent;
}

function renderProductForm() {
    clearAll();
    let newContent = productFormTemplate.innerHTML;
    mainContent.innerHTML = newContent;
}


function renderItemList() {
  // limpa conteúdo
  mainContent.innerHTML = '';

  // clona a estrutura da tabela
  const tableClone = itemListTemplate.content.cloneNode(true);
  const tbody = tableClone.querySelector('tbody');

  // para cada item, clona a linha e preenche células
  store.itens.forEach(i => {
    const rowClone = itemRowTemplate.content.cloneNode(true);
    rowClone.querySelector('.cell-name').textContent = i.name;
    rowClone.querySelector('.cell-price').textContent = i.price;
    rowClone.querySelector('.cell-amount').textContent = i.amount +' '+ i.measure;
    tbody.appendChild(rowClone);
  });

  // insere a tabela pronta no DOM
  mainContent.appendChild(tableClone);
}

function renderProductList() {
    // limpa conteúdo
    mainContent.innerHTML = '';

    let rows = '';

    // para cada item, clona a linha e preenche células
    store.products.forEach(p => {
        rows += `<tr><td class="cell-name">${p.name}</td></tr>`
    });

    mainContent.innerHTML = card('Produtos',
        `<table class="table table-bordered">
            <thead>
                <tr><th>Nome</th></tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>`);
}

function clearMessage() {
    msgContent.innerHTML = null;
}

function clearContent() {
    mainContent.innerHTML = null;
}

function clearAll() {
    clearMessage();
    clearContent();
}

// actions 

function createItem(event) {
    event.preventDefault(); // evita recarregar a página
    const item = {
        name: document.getElementById("name").value,
        price: parseFloat(document.getElementById("price").value),
        amount: parseFloat(document.getElementById("amount").value),
        measure: document.getElementById("measure").value
    };
    store.itens.push(item)
    renderItemList();
}

function createProduct(event) {
    event.preventDefault(); // evita recarregar a página
    const prd = {
        name: document.getElementById("name").value,
    };
    store.products.push(prd)
    sendMessage('Produto cadastrado com sucesso!');
    renderProductList();
}

//html help

function card(title, content){
    return `<div class="card shadow-sm">
        <div class="card-header">
            ${title}
        </div>
        <div class="card-body">
        ${content}
        </div>
    </div>`
}
