function calcularTempoAtras(dataHora) {
    const dataInicial = new Date(dataHora);
    const dataAtual = new Date();
    let dataPostagem = ""
    
    let diferencaEmMilissegundos = dataAtual - dataInicial;
    let segundosAtras = Math.floor(diferencaEmMilissegundos / 1000);
    let minutosAtras = Math.floor(segundosAtras / 60);
    let horasAtras = Math.floor(minutosAtras / 60);
    let diasAtras = Math.floor(horasAtras / 24);

    segundosAtras %= 60
    minutosAtras %= 60
    horasAtras %= 24

    if (diasAtras > 0) {
        dataPostagem = `${diasAtras} d atrás`;
    } else if (horasAtras > 0) {
        dataPostagem = `${horasAtras} h atrás`;
    } else if (minutosAtras > 0) {
        dataPostagem = `${minutosAtras} m atrás`;
    } else {
        dataPostagem = `${segundosAtras} s atrás`;
    }

    return dataPostagem;
}