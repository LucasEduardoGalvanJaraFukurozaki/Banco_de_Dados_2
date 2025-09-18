// Função para buscar cliente pelo CPF
function buscarCliente() {
  console.log("=== Iniciando busca do cliente ===");

  const cpf = document.getElementById("cpf-cliente").value.trim();
  console.log("CPF digitado:", cpf);

  if (!cpf) {
    alert("Por favor, insira o CPF do cliente.");
    return;
  }

  const clienteInfo = document.getElementById("cliente-info");
  console.log("Elemento cliente-info encontrado:", clienteInfo);

  // Mostrar "Buscando..." temporariamente
  clienteInfo.innerHTML = "<p>Buscando cliente...</p>";

  fetch(`/clientes?cpf=${cpf}`)
    .then((response) => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Erro ao buscar cliente.");
      }
      return response.json();
    })
    .then((clientes) => {
      console.log("Clientes encontrados:", clientes);

      if (clientes.length === 0) {
        clienteInfo.innerHTML = `<p style="color: red;">Cliente não encontrado.</p>`;
        return;
      }

      const cliente = clientes[0];
      clienteInfo.innerHTML = `
        <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin-top: 10px; border: 1px solid #4CAF50;">
          <h4 style="color: #2E7D32; margin-top: 0;">Cliente Encontrado:</h4>
          <p><strong>Nome:</strong> ${cliente.nome}</p>
          <p><strong>CPF:</strong> ${cliente.cpf}</p>
          <p><strong>Email:</strong> ${cliente.email || "Não informado"}</p>
          <p><strong>Telefone:</strong> ${cliente.telefone || "Não informado"}</p>
          <p><strong>Cidade:</strong> ${cliente.cidade}/${cliente.estado}</p>
        </div>
      `;
    })
    .catch((error) => {
      console.error("Erro completo:", error);
      clienteInfo.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`;
    });
}

// Função para buscar produto e adicioná-lo ao carrinho
function adicionarProdutoAoCarrinho() {
  const id = document.getElementById("produto-nome").value;
  const quantidade = parseInt(
    document.getElementById("produto-quantidade").value,
  );

  if (!id || isNaN(quantidade) || quantidade <= 0) {
    alert(
      "Por favor, insira um produto válido e uma quantidade maior que zero.",
    );
    return;
  } else if (!quantidade || quantidade > 3) {
    alert("Você não tem tudo isso safado!!!");
    return;
  }

  fetch(`/produtos`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos.");
      }
      return response.json();
    })
    .then((produtos) => {
      const produto = produtos.find((p) => p.prod_id_seq == id);
      if (!produto) {
        throw new Error("Produto não encontrado.");
      }
      adicionarProdutoNaTabela(produto, quantidade);
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Função para adicionar produto na tabela de carrinho
function adicionarProdutoNaTabela(produto, quantidade) {
  const carrinhoBody = document.querySelector("#carrinho");
  const subtotal = produto.prod_preco_atual * quantidade;

  const novaLinha = document.createElement("tr");
  novaLinha.setAttribute("data-id", produto.prod_id_seq);
  novaLinha.innerHTML = `
    <td>${produto.prod_id_seq}</td>  
    <td>${produto.prod_nome}</td>
    <td>${quantidade}</td>
    <td>R$ ${parseFloat(produto.prod_preco_atual).toFixed(2)}</td>
    <td>R$ ${subtotal.toFixed(2)}</td>
    <td><button onclick="removerProduto(this, ${subtotal})">Remover</button></td>
  `;

  carrinhoBody.appendChild(novaLinha);
  atualizarTotalVenda(subtotal);
}

// Função para remover produto do carrinho
function removerProduto(botao, subtotal) {
  botao.closest("tr").remove();
  atualizarTotalVenda(-subtotal);
}

// Função para atualizar o total da venda
function atualizarTotalVenda(valor) {
  const totalVendaElement = document.getElementById("total-venda");
  const valorAtual =
  parseFloat(totalVendaElement.getAttribute("data-total")) || 0;
  const novoTotal = valorAtual + valor;
  totalVendaElement.setAttribute("data-total", novoTotal);
  totalVendaElement.textContent = `Total: R$ ${novoTotal.toFixed(2)}`;
}

// Função para listar todas as vendas
async function listarVendas() {
    try {
        const response = await fetch('/vendas');
        const vendas = await response.json();

        const tabela = document.getElementById('tabela-vendas');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (vendas.length === 0) {
            // Caso não encontre vendas, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="7">Nenhuma venda encontrada.</td></tr>';
        } else {
            vendas.forEach(venda => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${venda.venda_id}</td>
                    <td>${venda.cli_id}</td>
                    <td>${venda.venda_produto}</td>
                    <td>${venda.venda_funcionario}</td>
                    <td>R$ ${parseFloat(venda.venda_total).toFixed(2)}</td>
                    <td>${venda.venda_forma_pagamento}</td>
                    <td>${new Date(venda.venda_data).toLocaleString('pt-BR')}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar vendas:', error);
        const tabela = document.getElementById('tabela-vendas');
        tabela.innerHTML = '<tr><td colspan="7">Erro ao carregar vendas.</td></tr>';
    }
}

// Função para buscar vendas por ID da venda
async function buscarVenda() {
    const vendaId = document.getElementById('buscar-venda').value.trim();

    let url = '/vendas';

    if (vendaId) {
        url += `?venda_id=${vendaId}`;
    }

    try {
        const response = await fetch(url);
        const vendas = await response.json();

        const tabela = document.getElementById('tabela-vendas');
        tabela.innerHTML = '';

        if (vendas.length === 0) {
            tabela.innerHTML = '<tr><td colspan="7">Nenhuma venda encontrada.</td></tr>';
        } else {
            vendas.forEach(venda => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${venda.venda_id}</td>
                    <td>${venda.cli_id}</td>
                    <td>${venda.venda_produto}</td>
                    <td>${venda.venda_funcionario}</td>
                    <td>R$ ${parseFloat(venda.venda_total).toFixed(2)}</td>
                    <td>${venda.venda_forma_pagamento}</td>
                    <td>${new Date(venda.venda_data).toLocaleString('pt-BR')}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao buscar vendas:', error);
    }
}

function limparFormulario() {
  document.getElementById("cpf-cliente").value = "";
  document.getElementById("produto-nome").value = "";
  document.getElementById("produto-quantidade").value = "";
  document.getElementById("cliente-info").innerHTML = "";
  document.querySelector("#carrinho").innerHTML = "";
  const totalVendaElement = document.getElementById("total-venda");
  totalVendaElement.setAttribute("data-total", "0");
  totalVendaElement.textContent = "Total: R$ 0,00";
}

// Função para buscar produtos
function buscarProdutos() {
  fetch("/produtos")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      return response.json();
    })
    .then((produtos) => {
      const select = document.getElementById("produto-nome");
      select.innerHTML = '<option value="">Selecione o produto</option>';

      produtos.forEach((produto) => {
        const option = document.createElement("option");
        option.value = produto.prod_id_seq;
        option.textContent = `${produto.prod_nome} - R$ ${parseFloat(produto.prod_preco_atual).toFixed(2)} (Estoque: ${produto.prod_estoque_atual})`;
        select.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar os produtos:", error);
    });
}