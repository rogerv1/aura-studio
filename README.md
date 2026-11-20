# Aura Studio · Landing Page Express

Template demonstrativo de estética e beleza para a oferta de R$ 1.490. A página apresenta seis seções em português e conduz o visitante à conversa de agendamento.

## Rodar localmente

Com Node.js 20.9 ou superior:

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. No Windows, use `npm.cmd` se o PowerShell bloquear o script do npm. Para validar a versão de produção, execute `npm run build` e `npm start`.

## Testes e integração contínua

`npm run typecheck` verifica os tipos do TypeScript. Em seguida, `npm run build` gera a versão de produção e `npm test` inicia essa versão temporariamente para verificar as âncoras, os metadados, a imagem e o contato. Execute o build antes do teste com as mesmas variáveis de ambiente.

O arquivo `tests/landing-page.test.mjs` usa o executor de testes do Node. Cada chamada `test` descreve uma expectativa e `assert` faz o teste falhar quando ela não é atendida. O servidor usado pelo teste é iniciado no começo e encerrado ao final.

O arquivo `.github/workflows/ci.yml` prepara o GitHub Actions para instalar as dependências, verificar tipos, gerar o build e executar os testes a cada push ou pull request. Ele repete essas etapas para a demonstração e para uma configuração comercial fictícia. Para funcionar no GitHub, o projeto precisa estar em um repositório que contenha esse arquivo. A aba Actions mostra o resultado de cada etapa.

## Adaptar para um cliente

1. Edite a marca, textos, serviços, perguntas, mensagens e SEO em `src/config/site.ts`. Mantenha os identificadores dos serviços únicos. Atualize a saudação do WhatsApp ao trocar de marca.
2. Ajuste as cores em `src/app/globals.css`. As fontes Cormorant Garamond e Inter são servidas localmente pelo projeto.
3. Substitua as quatro imagens WebP em `public/` e atualize os caminhos, as larguras e o texto alternativo em `src/config/site.ts`. Elas são usadas no `srcSet` para que cada navegador escolha uma imagem adequada à tela.
4. Copie `.env.example` para `.env.local`. Preencha `WHATSAPP_NUMBER` com país, DDD e número, só dígitos. Sem número válido, os botões exibem uma prévia local da mensagem. Com um número válido, os botões abrem o WhatsApp com a origem da consulta preenchida.
5. Informe `SITE_URL` com o endereço completo incluindo https:// e o caminho, caso exista. Defina `SITE_INDEXABLE=true` após revisar o site. Gere um novo build ao alterar essas configurações. A publicação desta demonstração no GitHub Pages configura essas variáveis em `.github/workflows/pages.yml`.

## Adaptação semanal · até 6 horas

- **Sábado · 2h** — aplicar identidade, conteúdo e imagens fornecidos.
- **Domingo · 1h** — revisar no celular, testar os links e conferir as prévias.
- **Segunda · 3h** — uma rodada consolidada de ajustes, validação do build e publicação quando houver domínio e hospedagem definidos.

O escopo cobre uma página, até seis seções e conversão direta por WhatsApp. A demonstração usa uma marca fictícia e uma imagem ilustrativa.

