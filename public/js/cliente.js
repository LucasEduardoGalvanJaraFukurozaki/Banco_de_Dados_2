
////////////////////////////////////////////////////////////FUNÇÃO CADASTRO///////////////////////////////////////////////////////////

async function cadastrarCliente(event) {
    event.preventDefault();


    const cliente = {
        nome: document.getElementById("cliente-nome").value,
        cpf: document.getElementById("cliente-cpf").value,
        email: document.getElementById("cliente-email").value,
        telefone: document.getElementById("cliente-telefone").value,    
        logradouro: document.getElementById("cliente-logradouro").value,
        numero: document.getElementById("cliente-numero").value,
        complemento: document.getElementById("cliente-complemento").value,
        bairro: document.getElementById("cliente-bairro").value,
        cidade: document.getElementById("cliente-cidade").value,
        estado: document.getElementById("cliente-estado").value,
        cep: document.getElementById("cliente-cep").value
    };

    try {
        const response = await fetch("/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cliente),
        });

        const result = await response.json();
        if (response.ok) {
            alert("Cliente cadastrado com sucesso!");
            document.querySelector("form").reset();
            listarClientes();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar cliente.");
    }
}

// Função para listar todos os clientes ou buscar clientes por CPF
async function listarClientes() {
    const cpf = document.getElementById('buscar-cliente').value.trim();  // Pega o valor do CPF digitado no input

    let url = '/clientes';  // URL padrão para todos os clientes

    if (cpf) {
        // Se CPF foi digitado, adiciona o parâmetro de consulta
        url += `?cpf=${cpf}`;
    }

    try {
        const response = await fetch(url);
        const clientes = await response.json();

        const tabela = document.getElementById('tabela-clientes');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (clientes.length === 0) {
            // Caso não encontre clientes, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="6">Nenhum cliente encontrado.</td></tr>';
        } else {
            clientes.forEach(cliente => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.cpf}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.telefone}</td>
                   <td>${cliente.cidade}/${cliente.estado}</td>
            
                
                
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
    }
}
//////////////////////////////////////////////////////////FUNÇÃO ATUALIZAR///////////////////////////////////////////////////////////

// Função para atualizar as informações do cliente
async function atualizarCliente() {
        nome= document.getElementById("cliente-nome").value,
        telefone= document.getElementById("cliente-telefone").value,
        email= document.getElementById("cliente-email").value,
        cpf= document.getElementById("cliente-cpf").value,
        logradouro= document.getElementById("cliente-logradouro").value,
        numero= document.getElementById("cliente-numero").value,
        complemento= document.getElementById("cliente-complemento").value,
        bairro= document.getElementById("cliente-bairro").value,
        cidade= document.getElementById("cliente-cidade").value,
        estado= document.getElementById("cliente-estado").value,
        cep= document.getElementById("cliente-cep").value

    const clienteAtualizado = {
        nome,
        cpf,
        email,
        telefone,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep
        

    };

    try {
        const response = await fetch(`/clientes/cpf/${cpf}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteAtualizado)
        });

        if (response.ok) {
            alert('Cliente atualizado com sucesso!');
        } else {
            const errorMessage = await response.text();
            alert('Erro ao atualizar cliente: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        alert('Erro ao atualizar cliente.');
    }
}


async function limpaCliente() {
    document.getElementById('cliente-nome').value = '';
    document.getElementById('cliente-cpf').value = '';
    document.getElementById('cliente-email').value = '';
    document.getElementById('cliente-telefone').value = '';
    document.getElementById('cliente-logradouro').value = '';
    document.getElementById('cliente-numero').value = '';
    document.getElementById('cliente-complemento').value = '';
    document.getElementById('cliente-bairro').value = '';
    document.getElementById('cliente-cidade').value = '';
    document.getElementById('cliente-estado').value = '';
    document.getElementById('cliente-cep').value = '';

}
