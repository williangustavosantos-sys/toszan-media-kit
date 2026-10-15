# TOSZAN — revisão direta após encerramento do Codex

- Em 2026-10-15, a sessão interativa Codex "Retomar redesign do TOSZAN" foi interrompida com Escape e encerrada com /exit, preservando a branch `fix/iphone-visual-correction-20261015`.
- Branch isolada, sem merge em `main`, sem push e sem alteração da Vercel Production.
- A bateria concluída em `outputs/iphone-correction/after-final-2/functional.json` registrou 14/14 verificações funcionais aprovadas em Chromium e WebKit antes do ajuste final de CSS.
- Foram examinadas capturas reais produzidas por navegadores automatizados para Booking, Creator e página inicial; os vídeos do Creator estão em coluna única no mobile e contato foi simplificado.
- Ajuste direto na galeria de capas de música: largura mobile maior (clamp 174px/52vw/222px) e títulos de 12px.
- `npm run build` e `git diff --check` concluídos com sucesso depois do ajuste, sem falha de compilação. Existe aviso Node.js DEP0205 externo à lógica do site.
- Nova tentativa da bateria longa foi interrompida porque o Chromium automatizado fechou; este resultado NÃO é uma aprovação nem evidência de falha do site. O teste específico do ajuste visual deverá ser validado na Preview/iPhone.
- Limitações: capturas Chromium/WebKit não substituem Safari/iPhone físico nem aprovação visual do proprietário.
- Critério de publicação: Vercel Preview permitida; `main`, `origin/main`, domínio canônico e Production permanecem congelados até aprovação explícita.
