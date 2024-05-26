(() => {
    document.getElementById("headerPadrao").innerHTML = `
    <img src="./assets/img/logo.svg" class="headerLogo" onclick="resetarFeed()">
    <div class="barraPesquisa">
        <i class="fa-solid fa-magnifying-glass iconPesquisa" style="display: flex;"></i>
        <hr style="height: 100%; width: 2px; background-color: white; border: none;">
        <input type="text" class="inputPesquisa">
    </div>
    <div class="headerUserArea">
        <i class="fa-regular fa-bell iconSino"></i>
        <img src="./assets/img/pfpIcon.svg" class="iconPfp">
    </div>`
})();