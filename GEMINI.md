# Regras de Desenvolvimento - Gemini

Este arquivo mantém um histórico de regras, preferências e das principais alterações realizadas no projeto em conjunto com o Gemini.

## Regras e Preferências (A partir de 11/08/2026)
1. **Commits Frequentes:** Sempre que uma alteração significativa for concluída e estiver funcionando, um `commit` detalhado deverá ser feito antes de avançar para a próxima tarefa.
2. **Organização de Assets:** Novas imagens devem ser colocadas nas pastas correspondentes dentro de `public/images/` (ex: `about/`, `projects/`, `brand/`).
3. **Design Limpo e Minimalista:**
   - Evitar textos desnecessários na Navbar (ex: mostrar apenas a logo, sem o nome ao lado).
   - O título do site (metadados e index) deve se manter limpo (apenas "Schaide Nunes").
   - Remover badges ou tags antigas (como "Estágio / Júnior") da página principal.

## Histórico de Alterações Realizadas

### Preloader
- **Redesign completo**: Fundo substituído pelo canvas de estrelas 3D (`StarBackground`).
- **Sistema Planetário**: "Planeta Terra" detalhado com continentes verdes, nuvens brancas, atmosfera com sombra interna, e uma "Lua" texturizada com crateras em órbita contínua.
- **Foguete**: Utilização do ícone `FaRocket` configurado para decolar da Terra conforme a porcentagem avança.
- **Loading**: Porcentagem de carregamento reposicionada para o canto inferior direito com uma fonte mais grossa (sans-serif), dourada e com efeito de brilho intenso.
- **Animação**: Saída alterada para deslizar a tela toda para cima (`y: "-100%"`).

### Organização de Imagens e Branding
- Substituição da logo antiga por `logo.webp`.
- Criação da estrutura de pastas em `public/images/` e migração de todos os assets estáticos que antes estavam soltos na raiz.
- Atualização e refatoração de todos os caminhos de imagens nos arquivos `constants/index.ts`, `pages/about.tsx` e `navbar.tsx`.

### Ajustes de Conteúdo (Home & Nav)
- Remoção do texto "Schaide Nunes" ao lado da logo na Navbar.
- Remoção do termo "Space Portfolio" dos metadados no arquivo de configurações e título do site (`index.html`).
- Remoção da badge "Estágio / Júnior" do topo da introdução principal (`hero-content.tsx`).
