// Sua função cadastrarProduto original (atualizada)
async function cadastrarProduto(event) {
    event.preventDefault();

    const produto = {
        nome: document.getElementById("produto-nome").value,
        codigo: document.getElementById("produto-codigo").value,
        categoria: document.getElementById("produto-categoria").value,
        estoque_atual: document.getElementById("produto-estoque").value,
        quantidade_minima: document.getElementById("produto-quantidade-minima").value,
        preco_anterior: document.getElementById("produto-preco-anterior").value,
        preco_atual: document.getElementById("produto-preco-atual").value,
        preco_medio: document.getElementById("produto-preco-medio").value,
        data_cadastro: document.getElementById("produto-data-cadastro").value,
        lote: document.getElementById("produto-lote").value,
        fornecedor: document.getElementById("produto-fornecedor").value,
        descricao: document.getElementById("produto-descricao").value
    };

    try {
        const response = await fetch('/produto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });

        const result = await response.json();
        if (response.ok) {
            alert("Produto cadastrado com sucesso!");
            // Limpa o formulário correto (não produto-form, mas o form principal)
            document.querySelector('form[method="post"]').reset();
            // Recarrega a lista de produtos
            listarProdutos();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar produto.");
    }
}

// Função para carregar fornecedores no select do formulário de cadastro
async function carregarFornecedores() {
    try {
        const response = await fetch('/fornecedores');

        if (!response.ok) {
            throw new Error('Erro ao buscar fornecedores');
        }

        const fornecedores = await response.json();
        const selectFornecedor = document.getElementById('produto-fornecedor');

        // Limpa o select e adiciona a opção padrão
        selectFornecedor.innerHTML = '<option value="">Selecione um fornecedor</option>';

        // Adiciona cada fornecedor como uma opção
        fornecedores.forEach(fornecedor => {
            const option = document.createElement('option');
            option.value = fornecedor.id; // Ajuste conforme o nome do campo ID no seu banco
            option.textContent = fornecedor.nome; // Ajuste conforme o nome do campo nome no seu banco
            selectFornecedor.appendChild(option);
        });

    } catch (error) {
        console.error('Erro ao carregar fornecedores:', error);
        alert('Erro ao carregar lista de fornecedores');
    }
}

// Função corrigida para listar produtos (removendo a parte confusa do fornecedor)
async function listarProdutos() {
    const codigo = document.getElementById('buscar-produto').value.trim();

    let url = '/produtos';  // URL padrão para todos os produtos

    if (codigo) {
        // Se código foi digitado, adiciona o parâmetro de consulta
        url += `?produto-codigo=${codigo}`;
    }

    try {
        const response = await fetch(url);
        const produtos = await response.json();

        const tabela = document.getElementById('tabela-produtos');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (produtos.length === 0) {
            // Caso não encontre produtos, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="7">Nenhum produto encontrado.</td></tr>';
        } else {
            produtos.forEach(produto => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${produto.prod_id_seq}</td>
                    <td>${produto.prod_nome}</td>
                    <td>${produto.prod_codigo_barra}</td>
                    <td>${produto.prod_categoria}</td>
                    <td>${produto.prod_estoque_atual}</td>
                    <td>R$ ${parseFloat(produto.prod_preco_atual).toFixed(2)}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
    }
}

// Chama a função para carregar fornecedores quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    carregarFornecedores();
});

// Como seu HTML já tem onload="listarProdutos()", você pode também chamar aqui
window.onload = function() {
    listarProdutos();
    carregarFornecedores();
};