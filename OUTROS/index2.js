function abrirModal() {
    document.getElementById('modal').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

function formatarCNPJ(cnpj) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function atualizarTabela() {
    const tabela = document.getElementById("tabelaNFs");
    tabela.innerHTML = "";

    let row = [];
    
    for (let i = 0; i < row.length; i++) {
        for (let j = 0; j < 7; j++){
            row.push([serie, nfNumero, remetente, destinatario, valor, quantidade, peso])
        }
    }
    row.forEach(nf => {
        if (!agrupadoPorDestinatario[row[nf,4]]) {
            agrupadoPorDestinatario[row[nf,4]] = [];
        }
        
        tabela.innerHTML += `<tr><td colspan="5" style="background-color: #e0e0e0; font-weight: bold;">${destinatario}</td></tr>`;
        for (let j = 0; j < 7; j++){
            agrupadoPorDestinatario[nf].push(row[nf, j]);
            tabela.innerHTML += `<tr>
            <td>${agrupadoPorDestinatario[nf]}</td>
            </tr>`;
        }
    });
}

function salvarDados() {
    const serie = document.getElementById('serie').value;
    const nfNumero = document.getElementById('nfNumero').value;
    const remetente = formatarCNPJ(document.getElementById('remetente').value);
    const destinatario = formatarCNPJ(document.getElementById('destinatario').value);
    const valor = formatarMoeda(document.getElementById('valor').value);
    const quantidade = document.getElementById('quantidade').value;
    const peso = document.getElementById('peso').value;
    
    atualizarTabela();
    fecharModal();
}