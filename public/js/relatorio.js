function mostrarTabela() {
    // esconde todas
    document.querySelectorAll(".tabela-relatorio").forEach(sec => sec.style.display = "none");

    // pega a escolhida
    let valor = document.getElementById("tipo_relatorio").value;
    if (valor) {
        document.getElementById(valor).style.display = "block";
    }
}