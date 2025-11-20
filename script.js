const msgTemplate = document.getElementById('msgTemplate');
const poductListTemplate = document.getElementById('poductListTemplate');

const itemFormTemplate = document.getElementById('itemFormTemplate');
const itemListTemplate = document.getElementById('itemListTemplate');
const itemRowTemplate = document.getElementById('itemRowTemplate');

const msgContent = document.getElementById('msg-content');
const mainContent = document.getElementById('main-content');

let store = {
    itens: [],
    products: []
}

function sendMessage(textMsg) {
    let newContent = msgTemplate.innerHTML
        .replace('title', textMsg + '!')
        .replace('text', textMsg);
    msgContent.innerHTML = newContent;
}

function renderBuyForm() {
    clearAll();
    sendMessage('Cadastrar um item para confecção de produtos');
    let newContent = itemFormTemplate.innerHTML;
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
    rowClone.querySelector('.cell-unity').textContent = i.unity;
    tbody.appendChild(rowClone);
  });

  // insere a tabela pronta no DOM
  mainContent.appendChild(tableClone);
}

function renderMaterialList() {
    clearAll();
    sendMessage('Lista de mateiais acessada');
}

function renderProductList() {
    clearAll();
    sendMessage('Lista de produtos acessada')
    let newContent = poductListTemplate.innerHTML;
    mainContent.innerHTML = newContent;
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
        name: document.getElementById("nome").value,
        price: parseFloat(document.getElementById("preco").value),
        unity: document.getElementById("unidade").value
    };
    store.itens.push(item)
    renderItemList();
    //alert("Item criado:\n" + JSON.stringify(item, null, 2));
}