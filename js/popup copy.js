//Este ecript mostra uma nessagem popup de aviso de cadastro bem sussedido, e, após 7 segundos exibindo a mensagem, direciona para a página inial da aplicação.

function mostrarPopup() {
    document.getElementById("popup").style.display = "flex";

    let tempo = 7;
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

//VERIFICAR COMO TORNAR ESTE RECURSO ACESSIVEL A OUTRAS PÁGINAS ALÉM DA DE CADASTRO DE USUÁRIOS.