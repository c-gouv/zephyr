// Verificar/Sair Sessão ----------------------------------------------------------
const email = sessionStorage.EMAIL_USUARIO;
const usuario = sessionStorage.NOME_USUARIO;

function validarSessao() {
    
    if (email == null && usuario == null) {
        window.location = "./login.html";
    }
}
function previnirLogin() {
    var foraPosicao = email != null && usuario != null && window.location.href == "http://localhost:3335/login.html"
    if (foraPosicao) {
        window.location = "./home.html"
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "./login.html";
}