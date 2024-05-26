// Verificar/Sair Sessão ----------------------------------------------------------
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var usuario = sessionStorage.NOME_USUARIO;

    if (email == null && usuario == null) {
        window.location = "./login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "./login.html";
}