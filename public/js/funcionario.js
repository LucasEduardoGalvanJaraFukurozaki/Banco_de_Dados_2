
async function cadastrarFuncionario(event) {
    event.preventDefault();

    const funcionario = {
        func_nome: document.getElementById("funcionario-nome").value,
        func_cpf: document.getElementById("funcionario-cpf").value,
        func_email: document.getElementById("funcionario-email").value,
        func_telefone: document.getElementById("funcionario-telefone").value,    
        func_logradouro: document.getElementById("funcionario-logradouro").value,
        func_numero: document.getElementById("funcionario-numero").value,
        func_complemento: document.getElementById("funcionario-complemento").value,
        func_bairro: document.getElementById("funcionario-bairro").value,
        func_cidade: document.getElementById("funcionario-cidade").value,
        func_estado: document.getElementById("funcionario-estado").value,
        func_cep: document.getElementById("funcionario-cep").value,
        func_cargo: document.getElementById("funcionario-cargo").value,
        func_salario: document.getElementById("funcionario-salario").value
    };

    try {
        const response = await fetch("/funcionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(funcionario),
        });

        const result = await response.json();
        if (response.ok) {
            alert("Funcionario cadastrado com sucesso!");
            document.querySelector(".form-funcionario").reset();
            listarFuncionarios();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar funcionario.");
    }
}

async function listarFuncionarios() {
    const cpf = document.getElementById('buscar-funcionario').value.trim();

    let url = '/funcionarios';

    if (cpf) {
        url += `?cpf=${cpf}`;
    }

    try {
        const response = await fetch(url);
        const funcionarios = await response.json();

        const tabela = document.querySelector('.tabela-funcionarios');
        tabela.innerHTML = '';

        if (funcionarios.length === 0) {
            tabela.innerHTML = '<tr><td colspan="7">Nenhum funcionario encontrado.</td></tr>';
        } else {
            funcionarios.forEach(funcionario => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${funcionario.func_id}</td>
                    <td>${funcionario.func_nome}</td>
                    <td>${funcionario.func_cpf}</td>
                    <td>${funcionario.func_telefone}</td>
                    <td>${funcionario.func_email}</td>
                    <td>${funcionario.func_cargo}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar funcionarios:', error);
    }
}

async function atualizarFuncionario() {
    const func_nome = document.getElementById("funcionario-nome").value;
    const func_cpf = document.getElementById("funcionario-cpf").value;
    const func_email = document.getElementById("funcionario-email").value;
    const func_telefone = document.getElementById("funcionario-telefone").value;
    const func_logradouro = document.getElementById("funcionario-logradouro").value;
    const func_numero = document.getElementById("funcionario-numero").value;
    const func_complemento = document.getElementById("funcionario-complemento").value;
    const func_bairro = document.getElementById("funcionario-bairro").value;
    const func_cidade = document.getElementById("funcionario-cidade").value;
    const func_estado = document.getElementById("funcionario-estado").value;
    const func_cep = document.getElementById("funcionario-cep").value;
    const func_cargo = document.getElementById("funcionario-cargo").value;
    const func_salario = document.getElementById("funcionario-salario").value;

    const funcionarioAtualizado = {
        func_nome,
        func_cpf,
        func_email,
        func_telefone,
        func_logradouro,
        func_numero,
        func_complemento,
        func_bairro,
        func_cidade,
        func_estado,
        func_cep,
        func_cargo,
        func_salario
    };

    try {
        const response = await fetch(`/funcionarios/cpf/${func_cpf}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionarioAtualizado)
        });

        if (response.ok) {
            alert('Funcionario atualizado com sucesso!');
            listarFuncionarios();
        } else {
            const errorMessage = await response.text();
            alert('Erro ao atualizar funcionario: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao atualizar funcionario:', error);
        alert('Erro ao atualizar funcionario.');
    }
}

async function editarFuncionario(cpf) {
    try {
        const response = await fetch(`/funcionarios?cpf=${cpf}`);
        const funcionarios = await response.json();

        if (funcionarios.length > 0) {
            const funcionario = funcionarios[0];

            document.getElementById("funcionario-nome").value = funcionario.func_nome;
            document.getElementById("funcionario-cpf").value = funcionario.func_cpf;
            document.getElementById("funcionario-email").value = funcionario.func_email;
            document.getElementById("funcionario-telefone").value = funcionario.func_telefone;
            document.getElementById("funcionario-logradouro").value = funcionario.func_logradouro;
            document.getElementById("funcionario-numero").value = funcionario.func_numero;
            document.getElementById("funcionario-complemento").value = funcionario.func_complemento;
            document.getElementById("funcionario-bairro").value = funcionario.func_bairro;
            document.getElementById("funcionario-cidade").value = funcionario.func_cidade;
            document.getElementById("funcionario-estado").value = funcionario.func_estado;
            document.getElementById("funcionario-cep").value = funcionario.func_cep;
            document.getElementById("funcionario-cargo").value = funcionario.func_cargo;
            document.getElementById("funcionario-salario").value = funcionario.func_salario;
        }
    } catch (error) {
        console.error("Erro ao carregar funcionario:", error);
        alert("Erro ao carregar dados do funcionario.");
    }
}

async function limpaFuncionario() {
    document.getElementById('funcionario-nome').value = '';
    document.getElementById('funcionario-cpf').value = '';
    document.getElementById('funcionario-email').value = '';
    document.getElementById('funcionario-telefone').value = '';
    document.getElementById('funcionario-logradouro').value = '';
    document.getElementById('funcionario-numero').value = '';
    document.getElementById('funcionario-complemento').value = '';
    document.getElementById('funcionario-bairro').value = '';
    document.getElementById('funcionario-cidade').value = '';
    document.getElementById('funcionario-estado').value = '';
    document.getElementById('funcionario-cep').value = '';
    document.getElementById('funcionario-cargo').value = '';
    document.getElementById('funcionario-salario').value = '';
}
