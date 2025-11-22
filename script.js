const productFormTemplate = document.getElementById('productFormTemplate');

const itemFormTemplate = document.getElementById('itemFormTemplate');
const itemListTemplate = document.getElementById('itemListTemplate');
const itemRowTemplate = document.getElementById('itemRowTemplate');

const msgContent = document.getElementById('msg-content');
const mainContent = document.getElementById('main-content');

let store = {
    itens: [
        {id: geraId(), name: 'Água', price: 5.5, amount: 1, measure: 'lt'},
        {id: geraId(), name: 'Álcool', price: 10.5, amount: 500, measure: 'ml'},
        {id: geraId(), name: 'Cêra', price: 9.3, amount: 1, measure: 'kg'},
        {id: geraId(), name: 'Farinha', price: 6.0, amount: 100, measure: 'gr'},
        {id: geraId(), name: 'Frasco', price: 9.3,  amount: 1, measure: 'un'},
    ],
    products: [
        {id: geraId(), name: 'Agua de cheiro'}
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

    mainContent.innerHTML = '';
    let rows = '';

    store.itens.forEach(i => {
        rows += `<tr>
            <td>${i.id}</td>
            <td>${i.name}</td>
            <td>${convertReal(i.price)}</td>
            <td>${i.amount}${i.measure}</td>
            <td><span class="btn btn-sm btn-primary" onclick="deleteItem('${i.id}')">Excluir</td>
        </tr>`
    });

    mainContent.innerHTML = card('Produtos',
        `<table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Açoes</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>`);
}

function renderProductList() {
    // limpa conteúdo
    mainContent.innerHTML = '';

    let rows = '';

    // para cada item, clona a linha e preenche células
    store.products.forEach(p => {
        rows += `<tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>
                <span class="btn btn-sm btn-warning" onclick="factoryProduct('${p.id}')">Fabricar</span>
                <span class="btn btn-sm btn-primary" onclick="deleteProduct('${p.id}')">Excluir</span>
            </td>
        </tr>`
    });

    mainContent.innerHTML = card('Produtos',
        `<table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
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
        id: geraId(),
        name: document.getElementById("name").value,
        price: parseFloat(document.getElementById("price").value),
        amount: parseFloat(document.getElementById("amount").value),
        measure: document.getElementById("measure").value
    };
    store.itens.push(item)
    renderItemList();
}

function deleteItem(itemId) {
    if (confirm(`Remover item ${itemId}?`)) {
        store.itens = store.itens.filter(i => i.id !== itemId);
        renderItemList();
    }
}

function createProduct(event) {
    event.preventDefault(); // evita recarregar a página
    const prd = {
        id: geraId(),
        name: document.getElementById("name").value,
    };
    store.products.push(prd)
    renderProductList();
}

function deleteProduct(prodId) {
    if (confirm(`Remover o produto ${prodId}?`)) {
        store.products = store.products.filter(i => i.id !== prodId);
        renderProductList();
    }
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


// util
function geraId() {
    return crypto.randomUUID().split('-')[0];
}

function convertReal(value){
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}