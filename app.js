// let titulo = document.querySelector("h1");
// titulo.innerHTML = "Jogo do Número Secreto";

// let paragrafo = document.querySelector("p");
// paragrafo.innerHTML = "Digite um número entre 1 e 10:";
let listaDeNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumberAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  // Implementando uma Voz no site, para acessibilidade ( porém código no front linha 7)
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do Número Secreto");
  exibirTextoNaTela("p", "Digite um número entre 1 e 10:");
}

exibirMensagemInicial();

// eu só quero o valor do input, no caso (value)
function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : " tentativa";
    let mensagemTentativas = `Você descobriu o número secretro com ${tentativas} ${palavraTentativa}! `;
    exibirTextoNaTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor.");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior.");
    }
    // está atribuindo +1 para tentativas
    tentativas++;
    limparCampo();
  }
}
//  sem o 'return' o número gerado vai pro espaço, ele não retorna nada.

function gerarNumberAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumeroSorteados = [];
  }
  if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
      return gerarNumberAleatorio ();
  } else {
    listaDeNumeroSorteados.push(numeroEscolhido);
    console.log(listaDeNumeroSorteados)
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumberAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  // botão desabilitado até acertar o NSecreto
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
