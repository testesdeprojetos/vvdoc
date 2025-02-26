let notasFiscais = [];

        function abrirModal() {
            document.getElementById('modal').style.display = 'block';
        }

        function fecharModal() {
            document.getElementById('modal').style.display = 'none';
        }

        function formatarCNPJ(cnpj) {
            return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        }

        function formatarCPF(cpf) {
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        }

        function formatarMoeda(valor) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
        }

        function salvarDados() {

            const serie = document.getElementById('serie').value;
            const nfNumero = document.getElementById('nfNumero').value;
            const remetenteCNPJ = formatarCNPJ(document.getElementById('remetente').value);
            const remetenteRazaoSocial = document.getElementById('remetenteRazaoSocial').value;
            const destinatarioCNPJ = formatarCNPJ(document.getElementById('destinatario').value);
            const destinatarioRazaoSocial = document.getElementById('destinatarioRazaoSocial').value;
            const valor = formatarMoeda(document.getElementById('valor').value);
            const quantidade = document.getElementById('quantidade').value;
            const peso = document.getElementById('peso').value;

            if (notasFiscais.some(nf => nf.serie === serie && nf.nfNumero === nfNumero && nf.remetenteCNPJ === remetenteCNPJ && nf.remetenteRazaoSocial === remetenteRazaoSocial && nf.destinatarioCNPJ === destinatarioCNPJ && nf.destinatarioRazaoSocial === destinatarioRazaoSocial)) {
                
                alert("Nota fiscal já inserida!");
                return;
            }

            const novaNF = { serie, nfNumero, remetenteCNPJ, remetenteRazaoSocial, destinatarioCNPJ, destinatarioRazaoSocial, valor, quantidade, peso };
            notasFiscais.push(novaNF);
            atualizarTabela();
            fecharModal();
        }

        function excluirNota(serie, nfNumero, remetenteCNPJ, remetenteRazaoSocial, destinatarioCNPJ, destinatarioRazaoSocial) {
            notasFiscais = notasFiscais.filter(nf => !(nf.serie === serie && nf.nfNumero === nfNumero && nf.remetenteCNPJ === remetenteCNPJ && nf.remetenteRazaoSocial === remetenteRazaoSocial && nf.destinatarioCNPJ === destinatarioCNPJ && nf.destinatarioRazaoSocial === destinatarioRazaoSocial));
            atualizarTabela();
        }

        function atualizarTabela() {
            const tabela = document.getElementById("tabelaNFs");
            tabela.innerHTML = "";
            
            const agrupadoPorDestinatario = {};
            notasFiscais.forEach(nf => {
                if (!agrupadoPorDestinatario[nf.destinatarioCNPJ]) {
                    agrupadoPorDestinatario[nf.destinatarioCNPJ] = [];
                }
                agrupadoPorDestinatario[nf.destinatarioCNPJ].push(nf);
            });
            
            for (const destinatarioCNPJ in agrupadoPorDestinatario) {
                const grupoNFs = agrupadoPorDestinatario[destinatarioCNPJ];
                tabela.innerHTML += `<tr><td colspan="6" style="background-color: #e0e0e0; font-weight: bold;">${destinatarioCNPJ}</td></tr>`;
                grupoNFs.forEach(nf => {
                    const row = `<tr>
                        <td></td>
                        <td>${nf.nfNumero}</td>
                        <td>${nf.remetenteRazaoSocial} (${nf.remetenteCNPJ})</td>
                        <td>${nf.destinatarioRazaoSocial} (${nf.destinatarioCNPJ})</td>
                        <td>${nf.quantidade}</td>
                        <td>${nf.peso}</td>
                        <td>${nf.valor}</td>
                        <td id="invisivel"><button onclick="excluirNota('${nf.serie}', '${nf.nfNumero}', '${nf.remetenteCNPJ}', '${nf.remetenteRazaoSocial}', '${nf.destinatarioCNPJ}', '${nf.destinatarioRazaoSocial}')">Excluir</button></td>
                    </tr>`;
                    tabela.innerHTML += row;
                });
            }
        }



        function gerarDocumento(){
            
            const containerDIV = document.getElementById("container");

            containerDIV.style.border = "none";
            containerDIV.style.position = "absolute";
            containerDIV.style.top = "0";
            containerDIV.style.left = "0";
            containerDIV.style.maxWidth = "100%";
            containerDIV.style.width = "100%";

            window.print();
            
            containerDIV.style.border = "1px solid #ddd";
            containerDIV.style.position = "static";
            containerDIV.style.top = "auto";
            containerDIV.style.left = "auto";
            containerDIV.style.maxWidth = "600px";
            containerDIV.style.width = "80%";
        }


        function abrirModalSelMotorista(){
            document.getElementById('modalSelMotorista').style.display = 'block';
        }

        function fecharModalSelMotorista(){
            document.getElementById('modalSelMotorista').style.display = 'none';
        }

        function salvarSelMotorista(){
            const motoristaSelecionado = document.getElementById('selecaoMotorista').value;
            const nomeMotorista = document.getElementById('motorista');
            const enderecoMotorista = document.getElementById('endereco');
            const habilitacaoMotorista = document.getElementById('habilitacao');
            const cpfMotorista = document.getElementById('cpf');

            switch(motoristaSelecionado) {
                case '0':
                    window.alert("Ops, você não selecionou um motorista...");
                break;
                case '1':
                    nomeMotorista.textContent = "Edvaldo";
                    enderecoMotorista.textContent = "Rua Consuelo Leandro Dutra, nº 345 - Jaboatão dos Guararapes/PE";
                    habilitacaoMotorista.textContent = "";
                    cpfMotorista.textContent = "";
                    fecharModalSelMotorista()
                    
                    fecharModalSelMotorista()
                break;
                case '2':
                    nomeMotorista.textContent = "Josinaldo";
                    enderecoMotorista.textContent = "Rua Consuelo Leandro Dutra, nº 345 - Jaboatão dos Guararapes/PE";
                    habilitacaoMotorista.textContent = "";
                    cpfMotorista.textContent = "";
                    fecharModalSelMotorista()
                    
                    fecharModalSelMotorista()
                break;
                case '3':
                    nomeMotorista.textContent = "Jose Wilson Sales da Silva";
                    enderecoMotorista.textContent = "Rua Consuelo Leandro Dutra, nº 345 - Jaboatão dos Guararapes/PE";
                    habilitacaoMotorista.textContent = "2761201062/AE";
                    cpfMotorista.textContent = "041.561.634-40";
                    fecharModalSelMotorista()
                    
                    fecharModalSelMotorista()
                break;
                case '4':
                    nomeMotorista.textContent = "Filipe Viana Paiva";
                    enderecoMotorista.textContent = "Rua Consuelo Leandro Dutra, nº 345 - Jaboatão dos Guararapes/PE";
                    habilitacaoMotorista.textContent = "";
                    cpfMotorista.textContent = "709.236.094-31";
                    fecharModalSelMotorista()
                break;
                default:
                    window.alert("nada");
            }
        }