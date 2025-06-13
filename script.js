function cadastrar() {
  const nome = document.getElementById("txNome").value.trim();
  const sobrenome = document.getElementById("txSobrenome").value.trim();
  const email = document.getElementById("txEmail").value.trim();
  const confEmail = document.getElementById("txConfEmail").value.trim();
  const senha = document.getElementById("txSenha").value.trim();
  const confSenha = document.getElementById("txConfSenha").value.trim();

  let erro = false;

  document.getElementById("erroNome").innerText = "";
  document.getElementById("erroSobrenome").innerText = "";
  document.getElementById("erroEmail").innerText = "";
  document.getElementById("erroConfEmail").innerText = "";
  document.getElementById("erroSenha").innerText = "";
  document.getElementById("erroConfSenha").innerText = "";

  if (nome === "") {
    document.getElementById("erroNome").innerText = "Campo obrigatório.";
    erro = true;
  }

  if (sobrenome === "") {
    document.getElementById("erroSobrenome").innerText = "Campo obrigatório.";
    erro = true;
  }

  if (email === "") {
    document.getElementById("erroEmail").innerText = "Campo obrigatório.";
    erro = true;
  }

  if (confEmail === "") {
    document.getElementById("erroConfEmail").innerText = "Campo obrigatório.";
    erro = true;
  }

  if (email !== confEmail) {
    document.getElementById("erroEmail").innerText = "E-mails não coincidem.";
    document.getElementById("erroConfEmail").innerText = "E-mails não coincidem.";
    erro = true;
  }

  if (senha === "") {
    document.getElementById("erroSenha").innerText = "Campo obrigatório.";
    erro = true;
  }

  if (confSenha === "") {
    document.getElementById("erroConfSenha").innerText = "Campo obrigatório.";
    erro = true;
  }

  if (senha !== confSenha) {
    document.getElementById("erroSenha").innerText = "Senhas não coincidem.";
    document.getElementById("erroConfSenha").innerText = "Senhas não coincidem.";
    erro = true;
  }

  if (!erro) {
    localStorage.setItem("cadEmail", email);
    localStorage.setItem("cadSenha", senha);
    window.location.href = "Login.html";
  }
}

function login() {
  const logEmail = document.getElementById("logEmail").value.trim();
  const logSenha = document.getElementById("logSenha").value.trim();

  const cadEmail = localStorage.getItem("cadEmail");
  const cadSenha = localStorage.getItem("cadSenha");

  document.getElementById("erro").innerText = "";

  if (logEmail === "" || logSenha === "") {
    document.getElementById("erro").innerText = "Preencha todos os campos.";
    return;
  }

  if (logEmail !== cadEmail || logSenha !== cadSenha) {
    document.getElementById("erro").innerText = "E-mail ou senha estão incorretos.";
  } else {
    window.location.href = "Principal.html";
  }
}

function abrirModal() {
  document.getElementById("meuModal").style.display = "flex";
  mostrarDicaAleatoria("dicaItem");
}

function fecharModal() {
  document.getElementById("meuModal").style.display = "none";
  document.getElementById("nomeItem").value = "";
  document.getElementById("valorItem").value = "";
}

function getIconePorNome(nome) {
  const n = nome.toLowerCase();
  if (n.includes("mercado") || n.includes("supermercado")) return "🛒";
  if (n.includes("uber") || n.includes("transporte")) return "🚗";
  if (n.includes("internet") || n.includes("wi-fi")) return "🌐";
  if (n.includes("luz") || n.includes("energia")) return "💡";
  if (n.includes("água")) return "🚿";
  if (n.includes("aluguel") || n.includes("aluguel")) return "🏠";
  if (n.includes("cinema") || n.includes("lazer")) return "🎬";
  if (n.includes("restaurante") || n.includes("comida")) return "🍽️";
  return "💸"; 
}


function salvarItem() {
  const nome = document.getElementById("nomeItem").value.trim();
  const valorStr = document.getElementById("valorItem").value.trim();
  const valor = parseFloat(valorStr);

  if (nome === "" || isNaN(valor) || valor <= 0) {
    alert("Preencha os dois campos corretamente!");
    return;
  }

  let salario = parseFloat(localStorage.getItem("salario")) || 0;
  let gastos = parseFloat(localStorage.getItem("gastos")) || 0;

  if (valor > salario - gastos) {
    alert("Saldo insuficiente!");
    return;
  }

  const lista = document.getElementById("listaItens");
  const novoItem = document.createElement("li");
  novoItem.className = "item-gasto";

  const icone = getIconePorNome(nome);

  novoItem.innerHTML = `
    <div class="item-info">
      <span class="item-nome">${icone} ${nome}</span>
      <div class="item-direita">
        <span class="item-valor">R$ ${valor.toFixed(2)}</span>
        <button class="btn-excluir" title="Excluir">✖</button>
      </div>
    </div>
  `;

  novoItem.querySelector(".btn-excluir").addEventListener("click", () => {
    lista.removeChild(novoItem);
    gastos -= valor;
    localStorage.setItem("gastos", gastos);
    const salarioRestante = salario - gastos;
    document.getElementById("salario").innerText = salarioRestante.toFixed(2);
  });

  lista.appendChild(novoItem);

  gastos += valor;
  localStorage.setItem("gastos", gastos);

  const salarioRestante = salario - gastos;
  document.getElementById("salario").innerText = salarioRestante.toFixed(2);

  fecharModal();
}


function abrirModalSalario() {
  document.getElementById("modalSalario").style.display = "flex";
  mostrarDicaAleatoria("dicaSalario");
}

function fecharModalSalario() {
  document.getElementById("modalSalario").style.display = "none";
  document.getElementById("inputSalario").value = "";
}

function salvarSalario() {
  const valor = parseFloat(document.getElementById("inputSalario").value);

  if (isNaN(valor) || valor <= 0) {
    alert("Digite um valor válido.");
    return;
  }

  const salarioAnterior = parseFloat(localStorage.getItem("salario")) || 0;
  const gastosAnteriores = parseFloat(localStorage.getItem("gastos")) || 0;

  const novoTotal = salarioAnterior + valor;

  localStorage.setItem("salario", novoTotal);
  localStorage.setItem("gastos", gastosAnteriores); // mantém os gastos atuais

  const salarioRestante = novoTotal - gastosAnteriores;
  document.getElementById("salario").innerText = salarioRestante.toFixed(2);

  fecharModalSalario();
}

window.addEventListener("DOMContentLoaded", () => {
  const salarioSalvo = parseFloat(localStorage.getItem("salario")) || 0;
  const gastos = parseFloat(localStorage.getItem("gastos")) || 0;
  const salarioRestante = salarioSalvo - gastos;

  document.getElementById("salario").innerText = salarioRestante.toFixed(2);
});

const dicasFinanceiras = [
  "Guarde primeiro, gaste depois. Priorize sua reserva!",
  "Investir cedo é melhor que investir muito tarde.",
  "Evite compras por impulso. Espere 24h antes de decidir.",
  "Não dependa de um só salário: pense em renda extra!",
  "Dinheiro parado perde valor. Estude investimentos.",
  "Crie metas financeiras realistas e acompanhe o progresso.",
  "Evite parcelamentos longos: eles viram armadilhas.",
  "Poupar é pagar a si mesmo primeiro.",
  "Antes de gastar, pergunte: eu preciso disso mesmo?"
];

function mostrarDicaAleatoria(idElemento) {
  const dica = dicasFinanceiras[Math.floor(Math.random() * dicasFinanceiras.length)];
  const elemento = document.getElementById(idElemento);
  if (elemento) elemento.innerText = dica;
}
