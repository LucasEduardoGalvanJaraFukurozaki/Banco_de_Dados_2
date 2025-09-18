async function cadastrarFornecedor(event) {
    event.preventDefault();

    const fornecedor = {
        nome: document.getElementById("fornecedor-nome").value,
        cnpj: document.getElementById("fornecedor-cnpj").value,
        telefone: document.getElementById("fornecedor-telefone").value,
        email: document.getElementById("fornecedor-email").value,
        cep: document.getElementById("fornecedor-cep").value,
        logradouro: document.getElementById("fornecedor-logradouro").value,
        numero: document.getElementById("fornecedor-numero").value,
        complemento: document.getElementById("fornecedor-complemento").value,
        bairro: document.getElementById("fornecedor-bairro").value,
        cidade: document.getElementById("fornecedor-cidade").value,
        estado: document.getElementById("fornecedor-estado").value,
        contatoNome: document.getElementById("fornecedor-contato-nome").value,
        contatoCargo: document.getElementById("fornecedor-contato-cargo").value,
        contatoTelefone: document.getElementById("fornecedor-contato-telefone")
            .value,
        contatoEmail: document.getElementById("fornecedor-contato-email").value,
    };

    try {
        const response = await fetch("/fornecedores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fornecedor),
        });
        const result = await response.json();
        if (response.ok) {
            alert("Fornecedor cadastrado com sucesso!");
            document.getElementById("fornecedor-form").reset();
            listarFornecedores();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar fornecedor.");
    }
}

async function listarFornecedores() {
    const cnpj = document.getElementById("buscar-fornecedor").value.trim();
    let url = "/fornecedores";

    if (cnpj) {
        url += `?cnpj=${cnpj}`;
    }

    try {
        const response = await fetch(url);
        const fornecedores = await response.json();
        const tabela = document.getElementById("tabela-fornecedores");
        tabela.innerHTML = "";

        if (fornecedores.length === 0) {
            tabela.innerHTML =
                '<tr><td colspan="8">Nenhum fornecedor encontrado.</td></tr>';
        } else {
            fornecedores.forEach((fornecedor) => {
                const linha = document.createElement("tr");
                linha.innerHTML = `
                    <td>${fornecedor.id}</td>
                    <td>${fornecedor.nome}</td>
                    <td>${fornecedor.cnpj}</td>
                    <td>${fornecedor.telefone}</td>
                    <td>${fornecedor.email}</td>
                    <td>${fornecedor.cidade}/${fornecedor.estado}</td>
                    <td>${fornecedor.contatoNome}/${fornecedor.contatoTelefone}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error("Erro ao listar fornecedores:", error);
    }
}

async function atualizarFornecedor() {
    const nome = document.getElementById("fornecedor-nome").value;
    const cnpj = document.getElementById("fornecedor-cnpj").value;
    const telefone = document.getElementById("fornecedor-telefone").value;
    const email = document.getElementById("fornecedor-email").value;
    const cep = document.getElementById("fornecedor-cep").value;
    const logradouro = document.getElementById("fornecedor-logradouro").value;
    const numero = document.getElementById("fornecedor-numero").value;
    const complemento = document.getElementById("fornecedor-complemento").value;
    const bairro = document.getElementById("fornecedor-bairro").value;
    const cidade = document.getElementById("fornecedor-cidade").value;
    const estado = document.getElementById("fornecedor-estado").value;
    const contatoNome = document.getElementById(
        "fornecedor-contato-nome",
    ).value;
    const contatoCargo = document.getElementById(
        "fornecedor-contato-cargo",
    ).value;
    const contatoTelefone = document.getElementById(
        "fornecedor-contato-telefone",
    ).value;
    const contatoEmail = document.getElementById(
        "fornecedor-contato-email",
    ).value;

    const fornecedorAtualizado = {
        nome,
        cnpj,
        telefone,
        email,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        contatoNome,
        contatoCargo,
        contatoTelefone,
        contatoEmail,
    };

    try {
        const response = await fetch(`/fornecedores/cnpj/${cnpj}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fornecedorAtualizado),
        });

        if (response.ok) {
            alert("Fornecedor atualizado com sucesso!");
            listarFornecedores();
        } else {
            const errorMessage = await response.text();
            alert("Erro ao atualizar fornecedor: " + errorMessage);
        }
    } catch (error) {
        console.error("Erro ao atualizar fornecedor:", error);
        alert("Erro ao atualizar fornecedor.");
    }
}

async function limpaFornecedor() {
    document.getElementById("fornecedor-nome").value = "";
    document.getElementById("fornecedor-cnpj").value = "";
    document.getElementById("fornecedor-telefone").value = "";
    document.getElementById("fornecedor-email").value = "";
    document.getElementById("fornecedor-cep").value = "";
    document.getElementById("fornecedor-logradouro").value = "";
    document.getElementById("fornecedor-numero").value = "";
    document.getElementById("fornecedor-complemento").value = "";
    document.getElementById("fornecedor-bairro").value = "";
    document.getElementById("fornecedor-cidade").value = "";
    document.getElementById("fornecedor-estado").value = "";
    document.getElementById("fornecedor-contato-nome").value = "";
    document.getElementById("fornecedor-contato-cargo").value = "";
    document.getElementById("fornecedor-contato-telefone").value = "";
    document.getElementById("fornecedor-contato-email").value = "";
}

async function editarFornecedor(cnpj) {
    try {
        const response = await fetch(`/fornecedores?cnpj=${cnpj}`);
        const fornecedores = await response.json();

        if (fornecedores.length > 0) {
            const fornecedor = fornecedores[0];

            document.getElementById("fornecedor-nome").value = fornecedor.nome;
            document.getElementById("fornecedor-cnpj").value = fornecedor.cnpj;
            document.getElementById("fornecedor-telefone").value =
                fornecedor.telefone;
            document.getElementById("fornecedor-email").value =
                fornecedor.email;
            document.getElementById("fornecedor-cep").value = fornecedor.cep;
            document.getElementById("fornecedor-logradouro").value =
                fornecedor.logradouro;
            document.getElementById("fornecedor-numero").value =
                fornecedor.numero;
            document.getElementById("fornecedor-complemento").value =
                fornecedor.complemento;
            document.getElementById("fornecedor-bairro").value =
                fornecedor.bairro;
            document.getElementById("fornecedor-cidade").value =
                fornecedor.cidade;
            document.getElementById("fornecedor-estado").value =
                fornecedor.estado;
            document.getElementById("fornecedor-contato-nome").value =
                fornecedor.contatoNome;
            document.getElementById("fornecedor-contato-cargo").value =
                fornecedor.contatoCargo;
            document.getElementById("fornecedor-contato-telefone").value =
                fornecedor.contatoTelefone;
            document.getElementById("fornecedor-contato-email").value =
                fornecedor.contatoEmail;
            document.getElementById("btn-salvar").style.display = "none";
            document.getElementById("btn-atualizar").style.display =
                "inline-block";
            document.getElementById("btn-cancelar").style.display =
                "inline-block";

            document.getElementById("fornecedor-cnpj").readOnly = true;
        }
    } catch (error) {
        console.error("Erro ao carregar fornecedor:", error);
        alert("Erro ao carregar dados do fornecedor.");
    }
}

function cancelarEdicao() {
    limpaFornecedor();
    document.getElementById("btn-salvar").style.display = "inline-block";
    document.getElementById("btn-atualizar").style.display = "none";
    document.getElementById("btn-cancelar").style.display = "none";
    document.getElementById("fornecedor-cnpj").readOnly = false;
}
