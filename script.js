const CHAVE = "portfolio_nanda_mensagens_v1";

const projetos = [
  { nome: "aula-Streamlit-", categoria: "Python / Streamlit", descricao: "Atividade de aula com Python e Streamlit, para praticar a criação de uma aplicação simples.", imagem: "streamlit.svg", link: "https://github.com/Nanda2406/aula-Streamlit-" },
  { nome: "AULA26.10.26.2", categoria: "Atividade de programação", descricao: "Exercício de aula registrado no GitHub para acompanhar minha evolução.", imagem: "aula2.svg", link: "https://github.com/Nanda2406/AULA26.10.26.2" },
  { nome: "aula26.10.26", categoria: "Atividade de programação", descricao: "Mais uma atividade de programação desenvolvida durante os estudos.", imagem: "aula.svg", link: "https://github.com/Nanda2406/aula26.10.26" },
  { nome: "box", categoria: "Prática de layout", descricao: "Exercício para treinar a organização visual de elementos de uma página.", imagem: "box.svg", link: "https://github.com/Nanda2406/box" },
  { nome: "atividade-css", categoria: "CSS", descricao: "Atividade para praticar cores, estilos e formatação de páginas.", imagem: "atividade-css.svg", link: "https://github.com/Nanda2406/atividade-css" },
  { nome: "css", categoria: "CSS", descricao: "Exercícios de CSS para aprender a personalizar páginas web.", imagem: "css.svg", link: "https://github.com/Nanda2406/css" },
  { nome: "forms", categoria: "Formulários HTML", descricao: "Prática com campos e estrutura básica de formulários em HTML.", imagem: "forms.svg", link: "https://github.com/Nanda2406/forms" },
  { nome: "links", categoria: "HTML", descricao: "Atividade para aprender a criar links e navegar entre páginas.", imagem: "links.svg", link: "https://github.com/Nanda2406/links" },
  { nome: "primeiro-projeto-HTML", categoria: "HTML", descricao: "Meu primeiro projeto em HTML, com a estrutura de uma página web.", imagem: "html.svg", link: "https://github.com/Nanda2406/primeiro-projeto-HTML" }
];

function mostrarProjetos() {
  const lista = document.getElementById("listaProjetos");
  projetos.forEach(projeto => {
    const coluna = document.createElement("div");
    coluna.className = "col-md-6 col-lg-4";
    coluna.innerHTML = `
      <article class="caixa projeto h-100">
        <img class="projeto-imagem" src="imagens/projetos/${projeto.imagem}" alt="Capa ilustrativa da atividade ${projeto.nome}" loading="eager">
        <div class="projeto-corpo">
          <div class="projeto-tipo">${projeto.categoria}</div>
          <h3>${projeto.nome}</h3>
          <p>${projeto.descricao}</p>
          <a href="${projeto.link}" target="_blank" rel="noopener noreferrer">Ver repositório no GitHub ↗</a>
        </div>
      </article>`;
    lista.appendChild(coluna);
  });
}

function gerarId() {
  return Date.now().toString() + Math.random().toString(36).slice(2, 7);
}

function lerMensagens() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE) || "[]");
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

function guardarMensagens(mensagens) {
  localStorage.setItem(CHAVE, JSON.stringify(mensagens));
}

function iniciarDadosTeste() {
  if (localStorage.getItem(CHAVE) !== null) return;
  const exemplos = [];
  for (let i = 1; i <= 20; i++) {
    exemplos.push({
      id: "teste" + i,
      nome: "Visitante Teste " + String(i).padStart(2, "0"),
      email: "teste" + i + "@example.com",
      assunto: "Mensagem de teste " + i,
      mensagem: "Registro de exemplo para a avaliação do portfólio.",
      data: new Date(2026, 10, i).toISOString()
    });
  }
  guardarMensagens(exemplos);
}

function mensagemStatus(id, texto, erro = false) {
  const elemento = document.getElementById(id);
  elemento.textContent = texto;
  elemento.classList.toggle("mensagem-erro", erro);
  elemento.classList.toggle("mensagem-sucesso", !erro);
}

async function enviarAutomacao(dados) {
  const endereco = CONFIG.AUTOMACAO_URL.trim();
  if (!endereco) return "sem_configuracao";
  if (!/^https:\/\//.test(endereco)) return "endereco_invalido";
  try {
    const tipo = CONFIG.AUTOMACAO_TIPO === "formulario" ? "formulario" : "json";
    let resposta;
    if (tipo === "formulario") {
      const corpo = new URLSearchParams({ nome: dados.nome, email: dados.email, assunto: dados.assunto, mensagem: dados.mensagem });
      resposta = await fetch(endereco, { method: "POST", body: corpo });
    } else {
      resposta = await fetch(endereco, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) });
    }
    return resposta.ok ? "enviado" : "erro";
  } catch {
    return "erro";
  }
}

document.getElementById("formContato").addEventListener("submit", async event => {
  event.preventDefault();
  const dados = {
    id: gerarId(),
    nome: document.getElementById("nome").value.trim(),
    email: document.getElementById("email").value.trim(),
    assunto: document.getElementById("assunto").value.trim(),
    mensagem: document.getElementById("mensagem").value.trim(),
    data: new Date().toISOString()
  };
  if (!dados.nome || !dados.email || !dados.assunto || !dados.mensagem) return;
  try {
    const mensagens = lerMensagens();
    mensagens.push(dados);
    guardarMensagens(mensagens);
  } catch {
    mensagemStatus("retornoContato", "Não foi possível salvar os dados neste navegador.", true);
    return;
  }
  document.getElementById("formContato").reset();
  mensagemStatus("retornoContato", "Mensagem salva neste navegador. Verificando o envio automático...");
  const status = await enviarAutomacao(dados);
  if (status === "enviado") {
    mensagemStatus("retornoContato", "Mensagem salva e enviada para a automação com sucesso! ♡");
  } else if (status === "sem_configuracao") {
    mensagemStatus("retornoContato", "Mensagem salva neste navegador. O formulário INTERESSADOS usa o Microsoft Forms; o envio automático deste formulário interno ainda precisa do endereço de integração.");
  } else {
    mensagemStatus("retornoContato", "Mensagem salva neste navegador, mas o envio automático não pôde ser confirmado. Confira a integração.", true);
  }
  atualizarTabela();
});

function abrirPainel() {
  document.getElementById("painelAdmin").classList.remove("d-none");
  document.getElementById("abrirAdmin").setAttribute("aria-expanded", "true");
  atualizarTabela();
  document.getElementById("painelAdmin").scrollIntoView({ behavior: "smooth" });
}

function fecharPainel() {
  document.getElementById("painelAdmin").classList.add("d-none");
  document.getElementById("abrirAdmin").setAttribute("aria-expanded", "false");
  document.getElementById("contato").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("abrirAdmin").addEventListener("click", abrirPainel);
document.getElementById("fecharAdmin").addEventListener("click", fecharPainel);
document.addEventListener("keydown", event => {
  if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "m") {
    event.preventDefault();
    abrirPainel();
  }
});

function criarCelula(linha, texto) {
  const celula = document.createElement("td");
  celula.textContent = texto;
  linha.appendChild(celula);
  return celula;
}

function atualizarTabela() {
  const mensagens = lerMensagens();
  const tabela = document.getElementById("tabelaMensagens");
  tabela.replaceChildren();
  document.getElementById("totalMensagens").textContent = mensagens.length;
  mensagens.slice().reverse().forEach(dados => {
    const linha = document.createElement("tr");
    const nome = criarCelula(linha, dados.nome);
    nome.title = dados.email + " • " + dados.mensagem;
    criarCelula(linha, dados.assunto);
    const data = new Date(dados.data);
    criarCelula(linha, isNaN(data.getTime()) ? "—" : data.toLocaleDateString("pt-BR"));
    const acoes = document.createElement("td");
    const grupo = document.createElement("div");
    grupo.className = "acoes-administracao";
    const editar = document.createElement("button");
    editar.type = "button";
    editar.className = "btn btn-contorno";
    editar.textContent = "Editar";
    editar.addEventListener("click", () => editarMensagem(dados.id));
    const excluir = document.createElement("button");
    excluir.type = "button";
    excluir.className = "btn btn-outline-danger";
    excluir.textContent = "Excluir";
    excluir.addEventListener("click", () => excluirMensagem(dados.id));
    grupo.append(editar, excluir);
    acoes.appendChild(grupo);
    linha.appendChild(acoes);
    tabela.appendChild(linha);
  });
  if (mensagens.length === 0) {
    const linha = document.createElement("tr");
    const celula = document.createElement("td");
    celula.colSpan = 4;
    celula.textContent = "Nenhuma mensagem salva.";
    linha.appendChild(celula);
    tabela.appendChild(linha);
  }
}

function limparFormularioAdmin() {
  document.getElementById("formAdmin").reset();
  document.getElementById("adminId").value = "";
  document.getElementById("tituloFormAdmin").textContent = "Nova mensagem";
}

function editarMensagem(id) {
  const dados = lerMensagens().find(mensagem => mensagem.id === id);
  if (!dados) return;
  document.getElementById("adminId").value = dados.id;
  document.getElementById("adminNome").value = dados.nome;
  document.getElementById("adminEmail").value = dados.email;
  document.getElementById("adminAssunto").value = dados.assunto;
  document.getElementById("adminMensagem").value = dados.mensagem;
  document.getElementById("tituloFormAdmin").textContent = "Editar mensagem";
  document.getElementById("formAdmin").scrollIntoView({ behavior: "smooth", block: "center" });
}

function excluirMensagem(id) {
  if (!confirm("Deseja excluir esta mensagem?")) return;
  guardarMensagens(lerMensagens().filter(dados => dados.id !== id));
  limparFormularioAdmin();
  atualizarTabela();
  mensagemStatus("retornoAdmin", "Mensagem excluída.");
}

document.getElementById("cancelarEdicao").addEventListener("click", limparFormularioAdmin);
document.getElementById("formAdmin").addEventListener("submit", event => {
  event.preventDefault();
  const id = document.getElementById("adminId").value;
  const mensagens = lerMensagens();
  const registro = {
    id: id || gerarId(),
    nome: document.getElementById("adminNome").value.trim(),
    email: document.getElementById("adminEmail").value.trim(),
    assunto: document.getElementById("adminAssunto").value.trim(),
    mensagem: document.getElementById("adminMensagem").value.trim(),
    data: new Date().toISOString()
  };
  if (id) {
    const posicao = mensagens.findIndex(dados => dados.id === id);
    if (posicao >= 0) {
      registro.data = mensagens[posicao].data;
      mensagens[posicao] = registro;
    }
  } else {
    mensagens.push(registro);
  }
  guardarMensagens(mensagens);
  limparFormularioAdmin();
  atualizarTabela();
  mensagemStatus("retornoAdmin", "Mensagem salva com sucesso.");
});

function campoCsv(valor) {
  return '"' + String(valor ?? "").replaceAll('"', '""') + '"';
}

document.getElementById("exportarCsv").addEventListener("click", () => {
  const colunas = ["id", "nome", "email", "assunto", "mensagem", "data"];
  const linhas = [colunas.join(";")];
  lerMensagens().forEach(dados => {
    linhas.push(colunas.map(coluna => campoCsv(dados[coluna])).join(";"));
  });
  const arquivo = new Blob(["\uFEFF" + linhas.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(arquivo);
  const link = document.createElement("a");
  link.href = url;
  link.download = "mensagens_portfolio_nanda.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  mensagemStatus("retornoAdmin", "Arquivo CSV exportado.");
});

function analisarCsv(texto) {
  const separador = texto.split(/\r?\n/, 1)[0].includes(";") ? ";" : ",";
  const linhas = [];
  let linha = [];
  let campo = "";
  let entreAspas = false;
  const conteudo = texto.replace(/^\uFEFF/, "");
  for (let i = 0; i < conteudo.length; i++) {
    const caractere = conteudo[i];
    if (caractere === '"') {
      if (entreAspas && conteudo[i + 1] === '"') {
        campo += '"';
        i++;
      } else {
        entreAspas = !entreAspas;
      }
    } else if (caractere === separador && !entreAspas) {
      linha.push(campo);
      campo = "";
    } else if ((caractere === "\n" || caractere === "\r") && !entreAspas) {
      if (caractere === "\r" && conteudo[i + 1] === "\n") i++;
      linha.push(campo);
      if (linha.some(valor => valor.trim())) linhas.push(linha);
      linha = [];
      campo = "";
    } else {
      campo += caractere;
    }
  }
  linha.push(campo);
  if (linha.some(valor => valor.trim())) linhas.push(linha);
  const cabecalho = (linhas.shift() || []).map(campo => campo.trim().toLowerCase());
  if (!["nome", "email", "assunto", "mensagem"].every(campo => cabecalho.includes(campo))) {
    throw new Error("O CSV precisa ter as colunas nome, email, assunto e mensagem.");
  }
  return linhas.map(valores => {
    const get = coluna => valores[cabecalho.indexOf(coluna)] || "";
    return {
      id: gerarId(), nome: get("nome"), email: get("email"),
      assunto: get("assunto"), mensagem: get("mensagem"),
      data: get("data") || new Date().toISOString()
    };
  }).filter(dados => dados.nome.trim() && dados.email.trim());
}

document.getElementById("importarCsv").addEventListener("change", async event => {
  const arquivo = event.target.files[0];
  if (!arquivo) return;
  try {
    const importadas = analisarCsv(await arquivo.text());
    guardarMensagens([...lerMensagens(), ...importadas]);
    atualizarTabela();
    mensagemStatus("retornoAdmin", importadas.length + " mensagens importadas do CSV.");
  } catch (erro) {
    mensagemStatus("retornoAdmin", erro.message, true);
  }
  event.target.value = "";
});

function ativarFormularioExterno() {
  if (CONFIG.FORMULARIO_INTERESSADOS_URL.trim().startsWith("https://")) {
    const link = document.getElementById("linkInteressados");
    link.href = CONFIG.FORMULARIO_INTERESSADOS_URL.trim();
    link.classList.remove("d-none");
  }
}

mostrarProjetos();
iniciarDadosTeste();
ativarFormularioExterno();
atualizarTabela();
