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

        function formatarMoeda(valor) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
        }

        function salvarDados() {
            const serie = document.getElementById('serie').value;
            const nfNumero = document.getElementById('nfNumero').value;
            const remetente = formatarCNPJ(document.getElementById('remetente').value);
            const destinatario = formatarCNPJ(document.getElementById('destinatario').value);
            const valor = formatarMoeda(document.getElementById('valor').value);
            const quantidade = document.getElementById('quantidade').value;
            const peso = document.getElementById('peso').value;

            if (notasFiscais.some(nf => nf.nfNumero === nfNumero)) {
                alert("Nota fiscal já inserida!");
                return;
            }
            
            const novaNF = { serie, nfNumero, remetente, destinatario, valor, quantidade, peso };
            notasFiscais.push(novaNF);
            atualizarTabela();
            fecharModal();
        }

        function excluirNota(nfNumero) {
            notasFiscais = notasFiscais.filter(nf => nf.nfNumero !== nfNumero);
            atualizarTabela();
        }

        function atualizarTabela() {
            const tabela = document.getElementById("tabelaNFs");
            tabela.innerHTML = "";
            
            const agrupadoPorDestinatario = {};
            notasFiscais.forEach(nf => {
                if (!agrupadoPorDestinatario[nf.destinatario]) {
                    agrupadoPorDestinatario[nf.destinatario] = [];
                }
                agrupadoPorDestinatario[nf.destinatario].push(nf);
            });
            
            for (const destinatario in agrupadoPorDestinatario) {
                const grupoNFs = agrupadoPorDestinatario[destinatario];
                tabela.innerHTML += `<tr><td colspan="6" style="background-color: #e0e0e0; font-weight: bold;">${destinatario}</td></tr>`;
                grupoNFs.forEach(nf => {
                    const row = `<tr>
                        <td></td>
                        <td>${nf.nfNumero}</td>
                        <td>${nf.peso}</td>
                        <td>${nf.valor}</td>
                        <td>${nf.quantidade}</td>
                        <td><button onclick="excluirNota('${nf.nfNumero}')">Excluir</button></td>
                    </tr>`;
                    tabela.innerHTML += row;
                });
            }
        }