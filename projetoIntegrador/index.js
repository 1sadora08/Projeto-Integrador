// --- O BACKEND IMAGINÁRIO (Onde a mágica do banco de dados acontece) ---
const URL_API_CARRINHO = 'http://seu-servidor.com.br/api/carrinho/adicionar'; 
// (Você precisaria criar este servidor)

// Função que será chamada ao clicar em "Adicionar"
function adicionarAoCarrinho(produtoId) {
    console.log(`Produto ID ${produtoId} selecionado. Enviando para o Backend...`);

    // 1. Prepara os dados que serão enviados ao servidor
    const dadosParaEnviar = {
        produto_id: produtoId,
        quantidade: 1 // Adiciona 1 por padrão
    };

    // 2. Envia a requisição HTTP (AJAX/Fetch) para o Backend
    fetch(URL_API_CARRINHO, {
        method: 'POST', // Método para enviar dados
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar) // Converte o objeto JS para JSON
    })
    .then(response => {
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao adicionar produto ao carrinho!');
        }
        return response.json();
    })
    .then(data => {
        // 3. Recebe a resposta do Backend (ex: novo total de itens)
        console.log('Resposta do servidor:', data);
        alert(`"${data.nome_produto}" adicionado com sucesso!`);
        // Aqui você atualizaria o ícone do carrinho na tela
    })
    .catch(error => {
        console.error('Houve um erro na comunicação:', error);
        alert('Falha ao conectar. O servidor da padaria está fora do ar!');
    });
}

// ----------------------------------------------------
// EVENT LISTENERS (Escuta os cliques na página)
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const botoesAdicionar = document.querySelectorAll('.add-carrinho');

    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', (evento) => {
            // Pega o ID do produto a partir do atributo 'data-produto-id'
            const id = evento.currentTarget.getAttribute('data-produto-id');
            adicionarAoCarrinho(id);
        });
    });
});