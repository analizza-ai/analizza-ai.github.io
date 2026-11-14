# analizza.ai — portfólio de equity e consultoria (design)

## Intenção

Reposicionar o site: a Analizza deixa de se apresentar como produto único de
due diligence imobiliária e passa a ser o **guarda-chuva** que apresenta o que
construiu — os apps em que tem **participação (equity)** e os sistemas
entregues como **consultoria**. O objetivo da página é apresentar esse
portfólio.

## Objetivos

- Mostrar os quatro apps de equity e os dois cases de consultoria, cada um com
  nome, descrição curta e, quando houver, link.
- Português por padrão, com troca para inglês na própria página.
- Manter a identidade visual atual (tokens de `styles/tokens.css`, logo Az,
  Source Serif 4 / Geist / Geist Mono, modo escuro automático).

## Fora do escopo

- Uma página por app (fica para depois, se algum app precisar).
- Percentual ou papel de participação: cada app de equity leva só o selo
  "Equity".
- Mudanças no deploy (Cloudflare Pages + GitHub Actions continuam iguais).

## Anti-objetivos

- Expor dados de participação ou informação interna de clientes além do nome
  do sistema e do que ele faz.
- Introduzir build, framework ou dependência nova.

## Abordagens consideradas

1. **Reescrever o `index.html` como página única** — escolhida. Mantém o
   arquivo único sem build e o deploy atual; um parágrafo por app basta para
   uma vitrine.
2. Home + uma página por app — mais espaço e SEO, mas seis páginas de
   conteúdo para escrever e manter agora.
3. Página única com cards expansíveis — JS e conteúdo escondido com pouco
   ganho para uma vitrine.

## Estrutura da página

```
[Az] analizza.ai          Equity · Consultoria · Contato   [PT | EN]
Hero      — estúdio que constrói e investe em produtos de IA
§01 Equity       Analizza Auction · Yeroon · Yeroon Play · Ralvin
§02 Consultoria  EAF Documents System · SER
§03 Contato      contact@analizza.ai
Rodapé    — links das seções, © 2026 Analizza, São Paulo · Remoto
```

### Conteúdo dos cards (descrição base; o builder redige a versão final)

**Equity** (selo "Equity")

| App | Descrição | Link |
|---|---|---|
| Analizza Auction | Agente de IA para análise de leilões de imóveis (API, web e servidor MCP). | — |
| Yeroon | App white-label: "seu app, sua marca, seus dados". | https://yeroon.video |
| Yeroon Play | Streaming de vídeo próprio: upload direto para object storage e reprodução no browser, sem serviço de streaming de mercado. | — |
| Ralvin | Plataforma de ensino (Ralvin School) e marketplace de skills para agentes de IA. | — |

**Consultoria** (selo "Consultoria")

| Sistema | Descrição |
|---|---|
| EAF Documents System | Envio, classificação, assinatura e busca de documentos, com agente de IA (Ólly) e gateway MCP. |
| SER | Gestão de contas e carga de arquivos de projetos com fluxo de aprovação. |

## Idioma

- Padrão `pt-BR`; botão PT | EN no nav.
- Um único `index.html`: todo texto traduzível marcado (ex.: `data-i18n`),
  com um dicionário PT/EN em script inline; a troca atualiza os textos e o
  `<html lang>`.
- A escolha fica em `localStorage` (com try/catch) e `?lang=en` força inglês,
  para poder compartilhar o link em inglês.
- Sem JS, a página aparece completa em português.

## Restrições

- Sem etapa de build; abrir o `index.html` no navegador continua funcionando.
- Responsivo até largura de celular, sem rolagem horizontal.
- README atualizado para refletir o novo posicionamento.

## Decisões minhas (podem ser revistas)

- Abordagem 1 (página única).
- Descrições acima, tiradas dos READMEs dos repositórios.
- Link só para o Yeroon (único site público encontrado); os demais sem link
  até existir um.
- Sem estágio ("Beta", "Em produção") nos cards, porque não há fonte
  confiável para isso.
- Título da aba: "Analizza — portfólio".

## Fica para o builder

- Redação final dos textos em PT e EN, no tom do site atual.
- Layout dos cards e do hero dentro do design system existente.
- Ajuste ou remoção do CSS que só servia às seções antigas.
