    // HOVER CONTEUDO POSTAGEM --------------------------------------------------------------------------
    function allTools() {
        const titulosPost = document.querySelectorAll(".postContentContainer");
        titulosPost.forEach(titulo => {
            titulo.addEventListener("mouseover", evidenciarTitulo);
            titulo.addEventListener("mouseout", retornarTitulo);
        });
        const botaoLike = document.querySelectorAll(".fa-heart");
        botaoLike.forEach(like => {
            like.addEventListener("click", trocarBotaoLike)
        });
    }
    function evidenciarTitulo(event) {
        const tituloPost = event.currentTarget.querySelector(".tituloPost");
        tituloPost.classList.add("evidenciarElementoHover");
    }
    function retornarTitulo(event) {
        const tituloPost = event.currentTarget.querySelector(".tituloPost");
        tituloPost.classList.remove("evidenciarElementoHover");
    }
    // BOTAO LIKE --------------------------------------------------------------------------------------
    function trocarBotaoLike(e){
        let icone = e.currentTarget
        let estadoAtual = icone.classList.contains("fa-regular") ? "fa-regular" : "fa-solid";
        let novoEstado = estadoAtual === "fa-regular" ? "fa-solid" : "fa-regular";
        
        icone.classList.remove(estadoAtual);
        icone.classList.add(novoEstado);
        icone.classList.toggle("evidenciarElementoHover")
    }