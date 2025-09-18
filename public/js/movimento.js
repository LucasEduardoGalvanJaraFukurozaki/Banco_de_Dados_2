 // Script para exibir/esconder campos conforme o tipo de movimento
 document.getElementById("tipo_movimento").addEventListener("change", function() {
    document.querySelectorAll(".tipo-campos").forEach(c => c.style.display = "none");
    let selecionado = this.value;
    if(selecionado) {
        document.getElementById(selecionado + "_campos").style.display = "block";
    }
});