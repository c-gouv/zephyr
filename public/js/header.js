(() => {
    document.getElementById("headerPadrao").innerHTML = `
    <img src="./assets/img/logo.svg" class="headerLogo" onclick="voltarHome()">
    <div class="headerUserArea">
        <img src="./assets/img/pfpIcon.svg" class="iconPfp" onclick="toggleModalPerfil()">
    </div>`
})();

(() => {
    document.getElementById("modal_perfil").innerHTML = `
    <div class="modal-perfil-container" id="modal-perfil">
        <div class="modal-perfil-option" onclick="irPerfil()">
            <i class="fa-solid fa-user"></i> PERFIL
        </div>
        <div class="modal-perfil-option" onclick="limparSessao()">
            <i class="fa-solid fa-right-from-bracket"></i>SAIR
        </div>
    </div>`
})();

function voltarHome(){
    window.location = "./home.html"
}
function irPerfil() {
    window.location = "./perfil.html"
}

// PUXAR MODAL ------------------------------------------------------------
function toggleModalPerfil(){
    const modal = document.getElementById("modal-perfil");
    modal.classList.toggle("ativo")
}