function getCarrinho() {
    const carrinhoJSON = localStorage.getItem('carrinhoItens');
    return carrinhoJSON ? JSON.parse(carrinhoJSON) : [];
}


function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinhoItens', JSON.stringify(carrinho));
}


function adicionarAoCarrinho(id, nome, preco, imagem) {
    let carrinho = getCarrinho();
    let precoNumerico = parseFloat(preco);

    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id: id,
            nome: nome,
            preco: precoNumerico,
            imagem: imagem,
            quantidade: 1
        });
    }

    salvarCarrinho(carrinho);

    mostrarToast(`${nome} foi adicionado ao carrinho!`, 'success');

    
}



function atualizarTotal(carrinho) {
    const totalGeral = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    
    const totalFormatado = totalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    document.getElementById('subtotal').textContent = totalFormatado;
    document.getElementById('total-geral').textContent = totalFormatado;
}


window.removerItem = function(id) {
    let carrinho = getCarrinho();
    carrinho = carrinho.filter(item => item.id !== id);
    
    salvarCarrinho(carrinho);
    carregarCarrinho(); 
}

window.alterarQuantidade = function(id, novaQuantidade) {
    let carrinho = getCarrinho();
    let quantidade = parseInt(novaQuantidade);

    if (quantidade <= 0) {
        removerItem(id);
        return;
    }

    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade = quantidade;
        salvarCarrinho(carrinho);
        carregarCarrinho(); 
    }
}

window.limparCarrinho = function() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        localStorage.removeItem('carrinhoItens');
        carregarCarrinho(); 
    }
}


window.carregarCarrinho = function() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const carrinho = getCarrinho();

    
    listaCarrinho.innerHTML = '';

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<p style="text-align: center; padding: 50px;">Seu carrinho está vazio, que tal adicionar alguns Funko Pops?</p>';
        atualizarTotal([]);
        return;
    }

    
    carrinho.forEach(item => {
        const subtotalItem = item.preco * item.quantidade;
        const subtotalFormatado = subtotalItem.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const itemHTML = `
            <div class="carrinho-item">
                <img src="../${item.imagem}" alt="${item.nome}" class="carrinho-img">
                <div class="carrinho-detalhes">
                    <h4>${item.nome}</h4>
                    <p>Preço Unitário: R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="carrinho-quantidade">
                    <label for="qtd-${item.id}">Qtd:</label>
                    <input type="number" id="qtd-${item.id}" value="${item.quantidade}" min="1" 
                           onchange="alterarQuantidade('${item.id}', this.value)">
                </div>
                <div class="carrinho-subtotal">
                    <p>Subtotal: <strong>${subtotalFormatado}</strong></p>
                </div>
                <button class="btn_remover" onclick="removerItem('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        listaCarrinho.innerHTML += itemHTML;
    });

    
    atualizarTotal(carrinho);
}
