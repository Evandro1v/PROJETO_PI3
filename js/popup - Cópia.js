/* Este ecript mostra uma mensagem popup de aviso de cadastro bem sucedido, e,
após 10 segundos exibindo a mensagem, direciona para a página inicial da aplicação. */

function mostrarPopup() {
    document.getElementById("popup").style.display = "flex";

    let tempo = 10;
    const contador = document.getElementById("contador");

    const intervalo = setInterval(() => {
        tempo--;
        contador.textContent = tempo;
        if (tempo === 0) {
            clearInterval(intervalo);
            window.location.href = "index_Op-Li";
        }
    }, 1000);
}

// Verifica se deve exibir o popup
if (window.location.search.includes("cadastroSucesso=true")) {
    mostrarPopup();
}

