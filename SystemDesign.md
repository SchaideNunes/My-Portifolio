Diretrizes Avançadas de Design de Interfaces (UI/UX)
Objetivo: Este documento define as regras absolutas, atalhos visuais e princípios de design que a I.A. deve seguir ao gerar código (HTML/CSS/JS), layouts ou sugerir melhorias de interface.

1. Comunicação Visual e Significantes (Signifiers)
FAZER: A interface deve explicar-se sozinha sem depender de texto. Use alterações de estado (hover), opacidade reduzida para itens inativos e contêineres de fundo para mostrar itens selecionados ou agrupados. O design deve indicar claramente o que é clicável e o que não é.

FAZER: Substitua rótulos de texto longos por ícones e recursos visuais sempre que possível (ex: usar um ícone de seta ou linha entre duas cidades em vez de escrever as palavras "De" e "Para").

2. A Regra do Mínimo e Espaçamento (Whitespace)
FAZER: Foque na funcionalidade principal do ecrã. O bom design é o mínimo de design possível.

FAZER: O espaço em branco (whitespace) é mais importante do que seguir rigorosamente um "Grid de 12 colunas". Deixe a interface respirar.

FAZER: Use o Sistema de Grid de 4 Pontos. Todos os espaçamentos, margens e paddings devem ser múltiplos de 4 (4, 8, 12, 16, 24, 32...). Isso garante consistência e facilidade em dividir seções visualmente pela metade.

NÃO FAZER: Adicionar elementos apenas para "preencher espaço".

3. Hierarquia Visual (O que os olhos veem primeiro)
FAZER: Crie hierarquia usando Contraste, Tamanho e Posição. As informações vitais devem ser grandes, em negrito e no topo.

FAZER: Reduza o contraste visual de dados secundários (ex: hora e data devem ser menores e mais acinzentados do que o título principal).

NÃO FAZER: Presumir que tags HTML (h1, h2, h3) ditam o peso visual. A hierarquia visual adapta-se ao contexto do utilizador, não apenas ao SEO.

4. Tipografia (O Segredo Profissional)
FAZER: Escolha apenas UMA boa família de fontes sem serifa (Sans-Serif) para o projeto inteiro. Você raramente precisa de mais do que isso.

FAZER [Hack de Títulos]: Para textos grandes (Headings), reduza o espaçamento entre letras (letter-spacing) entre -2% e -3% e defina a altura da linha (line-height) entre 110% e 120%. Isso dá imediatamente um visual de topo e profissional.

FAZER: Limite a escala tipográfica. Landing pages devem ter no máximo 6 tamanhos de fonte. Para Dashboards, o limite é menor ainda (raramente usando textos acima de 24px devido à necessidade de alta densidade de informação).

FAZER: Para textos menores e parágrafos normais, aumente o line-height para garantir legibilidade.

5. Cores e Semântica
FAZER: Comece com apenas UMA cor primária (cor da marca). Crie variações mais claras para fundos secundários e variações mais escuras para textos.

FAZER: Use cores com propósitos semânticos absolutos: Azul para Confiança/Links, Vermelho para Perigo/Erro, Amarelo para Aviso e Verde para Sucesso.

NÃO FAZER: Aplicar cores de forma aleatória apenas para decorar a página. Toda cor deve ter um propósito.

6. O Desafio do Dark Mode
FAZER: No modo escuro, NÃO use sombras para criar profundidade (elas não aparecem no preto). Em vez disso, use fundos ligeiramente mais claros (elevação de cor) para cartões que estão "acima" do fundo base.

FAZER: Reduza a saturação e o brilho de cores e bordas no modo escuro. Cores muito vibrantes agridem os olhos num fundo escuro; prefira tons pastel ou dessaturados.

7. Polimento: Sombras, Ícones e Overlays
FAZER: Sombras no Light Mode devem ser quase impercetíveis. Diminua drasticamente a opacidade e aumente o desfoque (blur). Se a sombra for a primeira coisa que o utilizador nota, ela está forte demais.

FAZER: Tamanho de Ícones: O ícone deve ter o tamanho exato do line-height do texto adjacente (ex: Se o texto tem um line-height de 24px, o ícone deve ser de 24x24px).

FAZER: Em botões, o preenchimento lateral (padding-left/right) deve ser o dobro do preenchimento vertical (padding-top/bottom). Ex: padding: 12px 24px;.

FAZER: Se precisar colocar texto sobre uma imagem, não escureça a imagem inteira. Use um gradiente linear suave na parte inferior ou aplique um desfoque progressivo (progressive blur) apenas onde o texto se encontra.

8. Interatividade e Estados Obrigatórios
A Regra de Ouro: Toda ação do utilizador DEVE ter uma resposta visual.

FAZER: Botões e Links exigem no mínimo 4 estados projetados: Padrão (Default), Foco/Mouse em cima (Hover), Pressionado/Ativo (Active) e Desativado (Disabled). Um estado de carregamento (Loading spinner) também é recomendado.

FAZER: Campos de entrada (Inputs) exigem estados de "Em foco" (Focus) com bordas destacadas e estados de "Erro" contendo mensagens claras.

FAZER: Implemente micro-interações para confirmações. Exemplo: Após o utilizador clicar em "Copiar", exiba um pequeno balão (toast/snackbar) confirmando "Copiado com sucesso" em vez de apenas alterar a cor do botão silenciosamente.

Módulo 2: Otimização de Dashboards, SaaS e Prevenção de Erros de IA
Objetivo: Este módulo foca em interfaces orientadas a dados (Data-heavy UIs), painéis de administração e os erros clássicos gerados quando se delega o layout ou as cores diretamente a uma IA geradora de código.

9. O Problema do "Vibe Coding" (IA escolhendo Design)
NÃO FAZER: Nunca deixe a IA escolher as suas paletas de cores livremente. Elas tendem a selecionar azuis escuros genéricos ou cores vibrantes que não combinam e cansam a vista.

FAZER: Se a IA gerar um fundo azul genérico com cards vibrantes, substitua-os por fundos mais neutros e sofisticados (ex: verde-escuro profundo ou cinza/preto) e injete cor de forma útil, como em micro-gráficos, em vez de botões ou ícones aleatórios.

NÃO FAZER: Não repita o mesmo KPI (Indicador-Chave de Desempenho) em várias seções diferentes. Um erro comum de layouts gerados por IA é mostrar as mesmas 4 métricas duplicadas na mesma tela.

10. Ícones Profissionais vs. Emojis
FAZER: Use bibliotecas de ícones de interface limpas, consistentes e profissionais (como Phosphor Icons ou Lucide).

NÃO FAZER: Não use emojis na interface da sua aplicação como substitutos para ícones. Embora funcione no Notion, na maioria dos softwares SaaS ou corporativos, os emojis destroem a credibilidade visual e parecem amadores.

11. Limpeza de Layout e Navegação
FAZER: Simplifique a barra lateral (Sidebar). Esconda itens de configuração, faturamento e opções de usuário dentro de um menu popover (dropdown) vinculado ao "Card de Perfil" na parte inferior da barra.

NÃO FAZER: Não use "círculos com as iniciais do usuário e fundo em gradiente" (outra marca registrada de IAs). Use um card de conta estruturado.

FAZER: Em listas de itens ou cards com muita informação, oculte botões secundários dentro de um "Menu de Três Pontos" (triple dot menu). Mova informações como "Data" para o centro e recolha rótulos (chips) transformando-os apenas em ícones.

12. Criação de Dados: Modais vs. Flyouts
FAZER: Ao criar novos registros no sistema (ex: "Criar novo Link" ou "Novo Relatório") e houver bastante espaço em tela, utilize um Modal centralizado em vez de uma barra lateral deslizando (flyout) escassa.

FAZER: Esconda "Opções Avançadas" por padrão (collapsed) nos modais para manter a interface inicial limpa e amigável.

13. Telas de Faturamento (Billing & Pricing)
FAZER: Use layouts de duas colunas com pequenos gráficos de rosca (doughnut charts) para mostrar o uso do plano atual. Fica muito mais limpo do que cards gigantes de texto.

FAZER: Mostre claramente qual é o desconto financeiro real que o utilizador está a receber.

FAZER: Em páginas de upgrade, exiba claramente o que o plano superior tem que o plano atual não tem.

NÃO FAZER: Não ofereça opções em excesso (ex: 5 planos diferentes). Mantenha a hierarquia simples, removendo planos que não fazem sentido financeiro.

14. Analytics e Visualização de Dados
FAZER: Procure implementar funcionalidades simples de grande impacto, como adicionar um botão "toggle" (alternância) para permitir que o utilizador compare itens individuais diretamente na tabela.

FAZER: Enriqueça as linhas de dados com ícones úteis que tragam pequenos toques de cor.

FAZER: Para dados geográficos, abandone os gráficos de barras entediantes. Use mapas interativos com regiões sombreadas — isso enriquece a experiência instantaneamente.

15. Landing Pages (A Primeira Impressão)
FAZER: A regra de ouro de uma Landing Page para software é estabelecer Confiança. A qualidade visual da página de vendas é percebida como a qualidade do próprio produto.

FAZER: Use imagens ou mockups reais do seu Dashboard/Software (mesmo que com uma leve inclinação ou distorção perspectiva para dar um ar moderno).

NÃO FAZER: Não confie apenas em textos e ícones básicos sem graça ("lame-ass icons"). Substitua blocos de texto vazios por pequenos trechos ou recortes visuais de como a ferramenta realmente se parece por dentro.