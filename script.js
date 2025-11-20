const msgTemplate = document.getElementById('msgTemplate');
const poductListTemplate = document.getElementById('poductListTemplate');

const msgContent = document.getElementById('msg-content');
const mainContent = document.getElementById('main-content');

function sendMessage(textMsg) {
    let newContent = msgTemplate.innerHTML
        .replace('title', textMsg + '!')
        .replace('text', textMsg);
    msgContent.innerHTML = newContent;
}

function renderBuyList() {
    clearAll();
    sendMessage('Lista de compras acessada');
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

function clearMessage(){
    msgContent.innerHTML = null;
}

function clearContent(){
    mainContent.innerHTML = null;
}

function clearAll(){
    clearMessage();
    clearContent();
}