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

            const cte = document.getElementById('cte').value;
            const nfNumero = document.getElementById('nfNumero').value;
            const remetente = document.getElementById('remetenteRazaoSocial').value;
            const destinatario = document.getElementById('destinatarioRazaoSocial').value;
            const quantidade = document.getElementById('quantidade').value;

            if (notasFiscais.some(nf => nf.cte === cte && nf.nfNumero === nfNumero && nf.remetente === remetente && nf.destinatario === destinatario)) {
                
                alert("Nota fiscal já inserida!");
                return;
            }

            const novaNF = { cte, nfNumero, remetente, destinatario, quantidade};
            notasFiscais.push(novaNF);
            atualizarTabela();
            fecharModal();
        }

        function excluirNota(cteExcluir, nfNumeroExcluir, remetenteExcluir, destinatarioExcluir) {
            notasFiscais = notasFiscais.filter(nf => !(nf.cte === cteExcluir && nf.nfNumero === nfNumeroExcluir && nf.remetente === remetenteExcluir && nf.destinatario === destinatarioExcluir));
            atualizarTabela();
        }

        function atualizarTabela() {
            const tabela = document.getElementById("tabelaNFs");
            tabela.innerHTML = "";
            
            const agrupadoPorCTE = {};
            notasFiscais.forEach(nf => {
                if (!agrupadoPorCTE[nf.cte]) {
                    agrupadoPorCTE[nf.cte] = [];
                }
                agrupadoPorCTE[nf.cte].push(nf);
            });
            
            for (const conhecimento in agrupadoPorCTE) {
                const grupoNFs = agrupadoPorCTE[conhecimento];
                tabela.innerHTML += `<tr><td colspan="6" style="background-color: #e0e0e0; font-weight: bold;">${conhecimento}</td></tr>`;
                grupoNFs.forEach(nf => {
                    const row = `<tr class="list">
                        <td></td>
                        <td contenteditable="true" class="list">${nf.nfNumero}</td>
                        <td contenteditable="true" class="list">${nf.remetente}</td>
                        <td contenteditable="true" class="list">${nf.destinatario}</td>
                        <td contenteditable="true" class="list">${nf.quantidade}</td>
                        <td id="invisivel"><button onclick="excluirNota('${nf.cte}', '${nf.nfNumero}', '${nf.remetente}', '${nf.destinatario}')">Excluir</button></td>
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

            switch(motoristaSelecionado) {
                case '0':
                    window.alert("Ops, você não selecionou um motorista...");
                break;
                case '1':
                    nomeMotorista.textContent = "Edvaldo";                    
                    fecharModalSelMotorista()
                break;
                case '2':
                    nomeMotorista.textContent = "Josinaldo";
                    fecharModalSelMotorista()
                break;
                case '3':
                    nomeMotorista.textContent = "Jose Wilson Sales da Silva";
                    fecharModalSelMotorista()
                break;
                case '4':
                    nomeMotorista.textContent = "Filipe Viana Paiva";
                    fecharModalSelMotorista()
                break;
                default:
                    window.alert("nada");
            }
        }



        function abrirModalSelAjudante(){
            document.getElementById('modalSelAjudante').style.display = 'block';
        }

        function fecharModalSelAjudante(){
            document.getElementById('modalSelAjudante').style.display = 'none';
        }


const ajudanteSelecionado = [];

        function salvarSelAjudante(){
            const nomeAjudante = document.getElementById('ajudante');

            ajudanteSelecionado = document.getElementsByClassName('ajudantes').value;

            switch(motoristaSelecionado) {
                case '0':
                    window.alert("Ops, você não selecionou um motorista...");
                break;
                case '1':
                    nomeAjudante.textContent = "";                    
                    fecharModalSelAjudante();
                break;
                case '2':
                    nomeAjudante.textContent = "";                    
                    fecharModalSelAjudante();
                break;
                case '3':
                    nomeAjudante.textContent = "";
                    fecharModalSelAjudante();
                break;
                case '4':
                    nomeAjudante.textContent = "";                    
                    fecharModalSelAjudante();
                break;
                default:
                    window.alert("nada");
            }
        }