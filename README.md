# Handoff: Site Eduardo Kayser (Método LUCIDEZ)

## Sobre este pacote
Este é um projeto **Next.js** já pronto para rodar, versionar no GitHub e publicar na Vercel — convertido do protótipo HTML de design (`Homepage Eduardo Kayser.dc.html`) para código real em React.

**Fidelidade:** alta (hifi). O visual, cores, tipografia, espaçamentos e comportamento (tema claro/escuro, preloader de segmentação PJ/PF, slider de depoimentos, botão flutuante de WhatsApp) foram recriados fielmente. Fotos e logos de clientes ainda são placeholders — substituir pelos arquivos reais quando o cliente enviar.

## Rodando localmente
```bash
npm install
npm run dev
```
Abra `http://localhost:3000`.

## Colando no Claude Code
1. Crie uma pasta local e copie todos os arquivos desta pasta (`handoff-nextjs/`) para dentro dela, mantendo a estrutura.
2. Rode `claude` (Claude Code) dentro dessa pasta.
3. Peça ajustes normalmente — é um app Next.js padrão (App Router), sem dependências exóticas.

## Subindo pro GitHub
```bash
git init
git add .
git commit -m "Site Eduardo Kayser — versão inicial"
gh repo create eduardo-kayser-site --private --source=. --remote=origin --push
```
(ou crie o repo manualmente no GitHub e rode `git remote add origin <url>` + `git push -u origin main`)

## Deploy na Vercel
Opção A — CLI:
```bash
npm i -g vercel
vercel
```
Opção B — pelo site: importe o repo em vercel.com/new, framework é detectado automaticamente como Next.js, clique em Deploy.

## Estrutura
- `app/layout.js` — fontes (Space Grotesk, Public Sans), ícones Tabler, metadata
- `app/page.js` — página inteira (client component, com estado de tema/segmentação/slider)
- `app/globals.css` — reset mínimo
- `lib/sx.js` — helper que converte strings CSS (`"color:red;padding:8px"`) em objetos de estilo React — mantém o código próximo ao original
- `lib/data.js` — todo o conteúdo de dados (depoimentos, resultados, marcas, pilares, parceiros etc.) separado da UI
- `components/ImagePlaceholder.js` — placeholder listrado para fotos ainda não recebidas

## Pendências de conteúdo (ver `script-projeto-eduardo-kayser.md` do cliente para detalhes)
- Fotos reais do Eduardo (hero + Sobre)
- Logos reais dos parceiros do ecossistema e dos 24 clientes
- Confirmação do link real de agendamento do Google Agenda (hoje é placeholder em `app/page.js`, seção "Agende uma reunião comigo")
- Dores mapeadas do público pessoa física (só uma frase de briefing até agora)

## Notas técnicas
- Paleta e tokens de cor vivem como CSS custom properties (`--bg`, `--accent` etc.) no elemento raiz, trocadas via JS ao alternar tema — mesma abordagem do protótipo original.
- Um único H1 no hero, hierarquia de H2 por seção — SEO básico já estruturado; falta meta description por página e alt text (depende das imagens reais).
- Ícones via Tabler Icons webfont (CDN). Trocar por pacote local se preferir não depender de CDN em produção.
