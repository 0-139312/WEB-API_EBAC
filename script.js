document.addEventListener("DOMContentLoaded", ()=>{ //o DOMContentLoaded garante que o JS só rode depois que o HTML estiver pronto.
    const inputCEP = document.getElementById("cep"); //seleciona o input do user e guarda ele
    //console.log("Verificando debug:",cepDigitado); // teste no console
    const campos = ["cep", "estado", "cidade", "bairro", "rua"];
    campos.forEach(campo => {
        const dadoSalvo = localStorage.getItem(campo);
        if (dadoSalvo) {
            try{
                document.getElementById(campo).value = JSON.parse(dadoSalvo);
            } catch (erro) {
                console.warn(`Erro ao ler o campo ${campo}:`, erro)
                localStorage.removeItem(campo);
            }
            
        }
    });

    inputCEP.addEventListener("blur", function(){
        const cepDigitado = inputCEP.value; // está pegando o inputCEP que está como string e transformando em valor numérico para usarmos depois
        localStorage.setItem("cepSalvoLocal", JSON.stringify(cepDigitado));
        

        fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`)
            .then(resposta => resposta.json()) //converte a resposta em JSON, este é o objeto RESPONSE que precisa ser processado
            .then(dados => {
                console.log("Verificando debug:", dados) // teste no console

                document.getElementById("cep").value = dados.cep;
                const inputNovoCEP = document.getElementById("cep").value;
                localStorage.setItem("cep", JSON.stringify(inputNovoCEP));

                document.getElementById("estado").value = dados.estado;
                const inputEstado = document.getElementById("estado").value;
                localStorage.setItem("estado", JSON.stringify(inputEstado));

                document.getElementById("cidade").value = dados.localidade;
                const inputCidade = document.getElementById("cidade").value;
                localStorage.setItem("cidade", JSON.stringify(inputCidade));

                document.getElementById("bairro").value = dados.bairro;
                const inputBairro = document.getElementById("bairro").value;
                localStorage.setItem("bairro", JSON.stringify(inputBairro));

                document.getElementById("rua").value = dados.logradouro;
                const inputRua = document.getElementById("rua").value;
                localStorage.setItem("rua", JSON.stringify(inputRua));

            }) //aqui nomeamos os objetos como dados, assim podemos acessar suas propriesdades (chaves) e usar o valor delas (valor)
            .catch(erro => console.error(erro)) //captura eerros durante a requisição
    });
});

