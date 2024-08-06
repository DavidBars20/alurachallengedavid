document.addEventListener("DOMContentLoaded", () => {
    function codificarTexto(texto) {
        const mapaSubstituicoes = {
            "a": "ai",
            "e": "enter",
            "i": "imes",
            "o": "ober",
            "u": "ufat"
        };
        let textoCodificado = "";
        for (let caractere of texto.toLowerCase()) {
            if (mapaSubstituicoes.hasOwnProperty(caractere)) {
                textoCodificado += mapaSubstituicoes[caractere];
            } else {
                textoCodificado += caractere;
            }
        }
        return textoCodificado;
    }
    function decodificarTexto(textoCodificado) {
        const mapaDecodificacao = {
            "ai": "a",
            "enter": "e",
            "imes": "i",
            "ober": "o",
            "ufat": "u"
        };
        const substituicoes = Object.keys(mapaDecodificacao).sort((a, b) => b.length - a.length);
        let textoDecodificado = textoCodificado;
        for (let chave of substituicoes) {
            const valorOriginal = mapaDecodificacao[chave];
            const regex = new RegExp(chave, 'g');
            textoDecodificado = textoDecodificado.replace(regex, valorOriginal);
        }
        return textoDecodificado;
    }
    function mostrarTextoNaTela(seletor, texto) {
        let elemento = document.querySelector(seletor);
        elemento.textContent = texto;
    }
    function esconderElemento(id) {
        document.getElementById(id).style.display = "none";
    }
    function mostrarElemento(id) {
        document.getElementById(id).style.display = "block";
    }
    const botaoCriptografar = document.querySelector("#criptografar");
    botaoCriptografar.addEventListener("click", (evento) => {
        evento.preventDefault();
        const campoTexto = document.querySelector("#texto-original");
        const texto = campoTexto.value;
        const textoCodificado = codificarTexto(texto);
        mostrarTextoNaTela('#resultado', textoCodificado);
        mostrarElemento('btn_copiar');
        mostrarElemento('resultado');
        esconderElemento('imagem-mensagem');
    });
    const botaoDescriptografar = document.querySelector("#descriptografar");
    botaoDescriptografar.addEventListener("click", (evento) => {
        evento.preventDefault();
        const campoTexto = document.querySelector("#texto-original");
        const texto = campoTexto.value;
        const textoDecodificado = decodificarTexto(texto);
        mostrarTextoNaTela('#resultado', textoDecodificado);
        mostrarElemento('btn_copiar');
        mostrarElemento('resultado');
        esconderElemento('imagem-mensagem');
    });
    document.getElementById('btn_copiar').addEventListener('click', copiarParaClipboard);
    async function copiarParaClipboard() {
        let texto = document.querySelector("#resultado").textContent;
        await navigator.clipboard.writeText(texto);
    }
});
