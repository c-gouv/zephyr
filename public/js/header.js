(() => {
    document.getElementById("headerPadrao").innerHTML = `
    <img src="./assets/img/logo.svg" class="headerLogo" onclick="voltarHome()">
    <div class="barraPesquisa">
        <i class="fa-solid fa-magnifying-glass iconPesquisa" style="display: flex;"></i>
        <hr style="height: 100%; width: 2px; background-color: white; border: none;">
        <input type="text" class="inputPesquisa">
    </div>
    <div class="headerUserArea">
        <i class="fa-regular fa-bell iconSino"></i>
        <img src="./assets/img/pfpIcon.svg" class="iconPfp" onclick="toggleModalPerfil()">
    </div>`
})();

(() => {
    document.getElementById("modal_perfil").innerHTML = `
    <div class="modal-perfil-container" id="modal-perfil">
        <div class="modal-perfil-option">
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

// PUXAR MODAL ------------------------------------------------------------
function toggleModalPerfil(){
    const modal = document.getElementById("modal-perfil");
    modal.classList.toggle("ativo")
}