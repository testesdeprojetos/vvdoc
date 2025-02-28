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
            const remetente = document.getElementById('remetente').value;
            const destinatario = document.getElementById('destinatario').value;
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
            fecharModalSelAjudante();
            fecharModalSelVeiculo();
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
                    nomeMotorista.value = 'Edvaldo Costa da Cunha';                    
                    fecharModalSelMotorista()
                break;
                case '2':
                    nomeMotorista.value = "Josinaldo Antônio do Nascimento";
                    fecharModalSelMotorista()
                break;
                case '3':
                    nomeMotorista.value = "Jose Wilson Sales da Silva";
                    fecharModalSelMotorista()
                break;
                case '4':
                    nomeMotorista.value = "Filipe Viana Paiva";
                    fecharModalSelMotorista()
                break;
                default:
                    window.alert("nada");
            }
        }



        function abrirModalSelAjudante(){
            fecharModalSelVeiculo();
            fecharModalSelMotorista();
            document.getElementById('modalSelAjudante').style.display = 'block';
        }

        function fecharModalSelAjudante(){
            document.getElementById('modalSelAjudante').style.display = 'none';
        }

let ajudantes = [];

        function salvarSelAjudante(){
            const nomeAjudante = document.getElementById('ajudante');
            
            const nenhum = document.getElementById('nenhum');
            const andre = document.getElementById('andre');
            const julio = document.getElementById('julio');
            const roberto = document.getElementById('roberto');
            const weslley = document.getElementById('weslley');

            ajudantes = [];

            if (nenhum.checked) {
                andre.checked = false;
                julio.checked = false;
                roberto.checked = false;
                weslley.checked = false;
                ajudantes.push("Nenhum");
            } else {
                if (andre.checked) ajudantes.push(andre.value);
                if (julio.checked) ajudantes.push(julio.value);
                if (roberto.checked) ajudantes.push(roberto.value);
                if (weslley.checked) ajudantes.push(weslley.value);    
            }

            nomeAjudante.value = ajudantes.join(", ");
            fecharModalSelAjudante();
        }

        function desmarcarNenhum() {
            document.getElementById('nenhum').checked = false;
        }

        function marcarNenhum() {
            document.getElementById('andre').checked = false;
            document.getElementById('julio').checked = false;
            document.getElementById('roberto').checked = false;
            document.getElementById('weslley').checked = false;
        }


        function abrirModalSelVeiculo() {
            fecharModalSelAjudante();
            fecharModalSelMotorista();
            document.getElementById('modalSelVeiculo').style.display = 'block';
        }

        function fecharModalSelVeiculo() {
            document.getElementById('modalSelVeiculo').style.display = 'none';
        }

let veiculoMarcado;
let outro;

        function desmarcarVeiculos(veiculo) {

            let veiculos = ['vw', 'mbenz', 'hr1', 'hr2', 'fiorino', 'outroVeiculo'];
            const veiculoSelecionado = document.getElementById(veiculo).value;
            const outroVeiculoInput = document.getElementById('outroVeiculoInput');

            veiculoMarcado = veiculoSelecionado;

            veiculos.forEach(v => {
                if (v !== veiculo){
                    document.getElementById(v).checked = false;
                    outroVeiculoInput.style.display = 'none';
                    outro = false;
                }
            });

            
            if (veiculo == 'outroVeiculo'){
                outroVeiculoInput.style.display = 'block';
                outro = true;
            }
        }

        function marcarOutroVeiculo() {
            desmarcarVeiculos('outroVeiculo');
            document.getElementById('outroVeiculoInput').style.display = 'block';
        }

        function salvarSelVeiculo() {
            if (outro === true){
                veiculoMarcado = document.getElementById('outroVeiculoInput').value;
                if (veiculoMarcado == ""){
                    window.alert("Veículo em branco!");
                }
            }
            
            document.getElementById('veiculo').value = veiculoMarcado;
            fecharModalSelVeiculo();
        }
        