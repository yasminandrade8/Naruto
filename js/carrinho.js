let carrinho = JSON.parse(localStorage.getItem('carrinhoItens')) || [];

/**
 * Função para adicionar um produto ao carrinho.
 * Chamada quando o botão 'Comprar' é clicado.
 * @param {HTMLElement} botao - O botão que foi clicado.
 */
function adicionarAoCarrinho(botao) {
    const nome = botao.getAttribute('data-nome');
    const preco = parseFloat(botao.getAttribute('data-preco'));
    const imagem = botao.getAttribute('data-img');
    const id = nome.replace(/\s/g, "") + preco; // ID simples baseado no nome e preço

    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        const novoItem = {
            id: id,
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        };
        carrinho.push(novoItem);
    }


    salvarCarrinho();

    alert(`"${nome}" adicionado ao carrinho!`);

}


function salvarCarrinho() {
    localStorage.setItem('carrinhoItens', JSON.stringify(carrinho));
    // Se a página do carrinho estiver aberta, atualiza a exibição
    if (document.getElementById('lista-carrinho')) {
        exibirCarrinho();
    }
}

/**
 * Remove um item do carrinho
 * @param {string} idProduto - O ID único do produto a ser removido.
 */
function removerItem(idProduto) {
    carrinho = carrinho.filter(item => item.id !== idProduto);
    salvarCarrinho();
}

/**
 * Altera a quantidade de um item no carrinho
 * @param {string} idProduto - O ID do produto.
 * @param {number} novaQuantidade - A nova quantidade.
 */
function alterarQuantidade(idProduto, novaQuantidade) {
    const quantidade = parseInt(novaQuantidade);
    if (quantidade < 1) {
        removerItem(idProduto);
        return;
    }
    const item = carrinho.find(item => item.id === idProduto);
    if (item) {
        item.quantidade = quantidade;
        salvarCarrinho();
    }
}



function exibirCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalElement = document.getElementById('total-carrinho');

   
    listaCarrinho.innerHTML = '';
    let totalGeral = 0;

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<p style="text-align: center; padding: 20px;">Seu carrinho está vazio!</p>';
        totalElement.textContent = 'R$ 0,00';
        return;
    }

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrinho');
        itemDiv.innerHTML = `
            <img src="../${item.imagem}" alt="${item.nome}" class="item-img">
            <div class="item-info">
                <span class="item-nome">${item.nome}</span>
                <span class="item-preco">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                <div class="item-controle">
                    <label for="qtd-${item.id}">Qtd:</label>
                    <input type="number" id="qtd-${item.id}" value="${item.quantidade}" min="1" 
                           onchange="alterarQuantidade('${item.id}', this.value)">
                    <span class="item-subtotal">Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>
            <button class="btn-remover" onclick="removerItem('${item.id}')">
                <i class="fas fa-trash"></i>
            </button>
        `;
        listaCarrinho.appendChild(itemDiv);
    });

    
    totalElement.textContent = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
}

const pagamentoRadios = document.querySelectorAll('input[name="pagamento"]');
        const detalhesCartao = document.getElementById("cartao-detalhes");

        pagamentoRadios.forEach(radio => {
            radio.addEventListener("change", () => {
                if (radio.value === "cartao") {
                    detalhesCartao.style.display = "block";
                } else {
                    detalhesCartao.style.display = "none";
                }
            });
        });

        document.getElementById("finalizar").addEventListener("click", () => {
            const metodo = document.querySelector('input[name="pagamento"]:checked');
            if (!metodo) {
                alert("Selecione uma forma de pagamento!");
                return;
            }

            if (metodo.value === "cartao") {
                const numero = document.getElementById("num-cartao").value;
                const nome = document.getElementById("nome-cartao").value;
                const validade = document.getElementById("validade").value;
                const cvv = document.getElementById("cvv").value;

                if (!numero || !nome || !validade || !cvv) {
                    alert("Preencha todos os dados do cartão!");
                    return;
                }
            }

            alert("Compra finalizada com sucesso via " + metodo.value.toUpperCase() + "!");
            localStorage.removeItem("carrinho");
            window.location.href = "../index.html";
        });

