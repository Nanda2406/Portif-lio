# Meu portfólio - Maria Fernanda

Oi! Esse é o portfólio que eu fiz para o trabalho de TI do 4º bimestre. Coloquei uma apresentação sobre mim, minhas habilidades e os projetos que fui fazendo nas aulas. Também fiz uma página para cada área do conhecimento.

## Como abrir

1. Extraia o arquivo ZIP.
2. Abra o `index.html` no Chrome ou Edge.
3. Clique em **Conhecimentos** para acessar as quatro páginas das matérias.

Tem que manter todos os arquivos e pastas juntos, porque o HTML usa o CSS, o JavaScript e as imagens separados. O site funciona localmente, sem instalar programa ou usar SQL.

## Como organizei os arquivos

- `index.html`: página principal do portfólio.
- `ciencias-humanas.html`: página de Ciências Humanas.
- `ciencias-da-natureza.html`: página de Ciências da Natureza.
- `matematica.html`: página de Matemática.
- `linguagens.html`: página de Linguagens.
- `style.css`: todas as cores, tamanhos, espaçamentos e estilos das cinco páginas.
- `script.js`: funções dos projetos, formulário e painel de mensagens.
- `config.js`: link do Microsoft Forms e configuração da automação.
- `bootstrap/bootstrap.css`: CSS do Bootstrap formatado para facilitar a leitura.
- `bootstrap/bootstrap.bundle.min.js`: JavaScript original do Bootstrap.
- `imagens/`: minha foto e as capas ilustrativas dos projetos.
- `dados/`: um exemplo de arquivo CSV.

Escolhi tons de rosa para o site e deixei as cores concentradas no começo do CSS. Se quiser mudar as cores, basta editar as variáveis de `:root` no `style.css`.

## Tecnologias

Usei HTML, CSS, JavaScript e Bootstrap. As mensagens do formulário são guardadas no LocalStorage, em JSON. Também dá para importar e exportar as mensagens em CSV, sem usar SQL.

## Contato

O botão **INTERESSADOS – Preencher o formulário** abre meu Microsoft Forms:
https://forms.cloud.microsoft/r/63wLh3rpQn

O formulário que aparece dentro do portfólio é diferente do Microsoft Forms. Ele salva as mensagens neste navegador. Para enviar essas mensagens para a automação também, é preciso colocar o endereço da integração em `AUTOMACAO_URL`, no `config.js`. O link do Microsoft Forms já está configurado.

## Como testar o painel

No final do portfólio, clique em **Administração**. Também dá para usar `Ctrl + Alt + M`.

No painel dá para cadastrar, ver, editar e apagar mensagens, além de importar e exportar CSV. No primeiro acesso, o site cria 20 mensagens de exemplo para o professor testar. Esses dados ficam só no navegador em que o site foi aberto.

## Projetos

Os cartões levam para meus nove repositórios no GitHub. As capas são ilustrações, não prints das páginas dos projetos.

Para entregar, vou enviar o ZIP pelo Teams e colocar os arquivos no meu GitHub.

As cores do meu site ficam no `style.css`. O `bootstrap/bootstrap.css` está separado e formatado, mas não preciso mexer nele para mudar as cores.
