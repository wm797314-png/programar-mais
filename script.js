let dados = [];
const cardContainer = document.querySelector('.card-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('botao-busca');

// Função para renderizar os cards na tela
function renderizarCards(items) {
    cardContainer.innerHTML = ''; // Limpa os cards existentes

    if (items.length === 0) {
        cardContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'logo-card'; // Usaremos uma nova classe para o estilo
 
        card.innerHTML = `
            <img src="${item.logo}" alt="Logo ${item.nome}" class="lang-logo">
            <h2>${item.nome}</h2>
            <p><b>Ano:</b> ${item.ano} <br><br> ${item.descricao}</p>
        `;

        // Adiciona o evento de duplo clique para abrir o link em uma nova aba
        card.addEventListener('dblclick', () => {
            window.open(item.link, '_blank');
        });

        cardContainer.appendChild(card);
    });
}

// Função para filtrar os dados com base na busca
function iniciarBusca() {
    const termoBusca = searchInput.value.toLowerCase();
    const resultados = dados.filter(item => 
        item.nome.toLowerCase().includes(termoBusca) || 
        item.descricao.toLowerCase().includes(termoBusca) ||
        item.ano.toString().includes(termoBusca)
    );
    renderizarCards(resultados);
}

// Função principal para carregar os dados iniciais
async function carregarDados() {
   try {
       const resposta = await fetch("date.json");
       dados = await resposta.json();
       renderizarCards(dados); // Exibe os cards inicialmente
   } catch (error) {
       console.error("Erro ao carregar os dados:", error);
       cardContainer.innerHTML = '<p>Houve um erro ao carregar as informações. Tente novamente mais tarde.</p>';
   }
}

// Adiciona os ouvintes de evento
searchButton.addEventListener('click', iniciarBusca);
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        iniciarBusca();
    }
});

// Carrega os dados quando o script é executado
carregarDados();
