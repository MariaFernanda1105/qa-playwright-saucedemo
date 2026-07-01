# 🧪 Playwright SauceDemo Automation

Framework de automação E2E para o site [SauceDemo](https://www.saucedemo.com/) utilizando **Playwright** + **TypeScript** com arquitetura **Page Object Model (POM)**.

---

## 🚀 Tecnologias

| Tecnologia | Versão |
|------------|--------|
| Playwright | ^1.47 |
| TypeScript | ^5.5 |
| Node.js    | 20+    |

---

## 📁 Estrutura do Projeto

```
playwright-saucedemo/
├── .github/workflows/
│   └── playwright.yml          # CI/CD com GitHub Actions
├── pages/
│   ├── LoginPage.ts            # POM: Login
│   ├── ProductsPage.ts         # POM: Produtos
│   ├── CartPage.ts             # POM: Carrinho
│   └── CheckoutPage.ts         # POM: Checkout
├── tests/
│   ├── login.spec.ts           # Testes de Login (7 cenários)
│   ├── products.spec.ts        # Testes de Produtos (8 cenários)
│   ├── cart.spec.ts            # Testes de Carrinho (7 cenários)
│   └── checkout.spec.ts        # Testes de Checkout (6 cenários)
├── fixtures/
│   └── users.ts                # Dados de teste (usuários, checkout)
├── playwright.config.ts        # Configuração do Playwright
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## ⚡ Como Executar

### 1. Instalar dependências
```bash
npm install
```

### 2. Instalar navegadores do Playwright
```bash
npx playwright install
```

### 3. Executar todos os testes
```bash
npm test
```

### 4. Executar em modo visual (headed)
```bash
npm run test:headed
```

### 5. Executar apenas Smoke Tests
```bash
npm run test:smoke
```

### 6. Executar apenas Regression Tests
```bash
npm run test:regression
```

### 7. Abrir UI do Playwright
```bash
npm run test:ui
```

### 8. Gerar relatório HTML
```bash
npm run report
```

---

## 📋 Casos de Teste

### Login (7 testes)
- ✅ Login válido com `standard_user`
- ✅ Login válido com `performance_glitch_user`
- ❌ Usuário bloqueado (`locked_out_user`)
- ❌ Senha incorreta
- ❌ Campos vazios
- ❌ Espaços em branco
- 🛡️ SQL Injection (não deve funcionar)
- 🔄 Logout

### Produtos (8 testes)
- ✅ Verificar quantidade de produtos (6)
- ✅ Verificar nomes dos produtos
- ✅ Verificar preços dos produtos
- ✅ Imagens carregadas
- 🔽 Ordenação A → Z
- 🔽 Ordenação Z → A
- 🔽 Ordenação menor preço
- 🔽 Ordenação maior preço

### Carrinho (7 testes)
- ✅ Adicionar um produto
- ✅ Adicionar vários produtos
- ✅ Adicionar todos os produtos
- ❌ Remover um produto
- ❌ Remover todos os produtos
- 🔄 Persistência do carrinho após navegação
- 📊 Quantidade correta no carrinho

### Checkout (6 testes)
- ✅ Fluxo completo de checkout
- ❌ Campo First Name obrigatório
- ❌ Campo Last Name obrigatório
- ❌ Campo Postal Code obrigatório
- 🔄 Cancelar checkout (retorna ao carrinho)
- ✅ Finalizar compra com múltiplos itens

**Total: 28 testes automatizados**

---

## 🏗️ Arquitetura

- **Page Object Model (POM)**: Separação de responsabilidades entre páginas e testes
- **Fixtures**: Dados centralizados para reutilização
- **Data Driven**: Usuários e dados de checkout parametrizados
- **Tags**: `@smoke` e `@regression` para execução seletiva
- **Cross-browser**: Chromium, Firefox, WebKit e Mobile Chrome
- **CI/CD**: GitHub Actions com artefatos de relatório

---

## 📊 Relatórios

- **HTML Report**: `playwright-report/index.html`
- **Screenshots**: Capturadas automaticamente em falhas
- **Vídeos**: Gravados automaticamente em falhas
- **Traces**: Disponíveis para debug no primeiro retry

---

## 🐛 Bugs Conhecidos do SauceDemo

| Bug | Descrição |
|-----|-----------|
| `problem_user` | Imagens quebradas na página de produtos |
| `performance_glitch_user` | Login lento (~3-5s) |
| `visual_user` | Layout visual diferente |
| `error_user` | Erros no checkout |

---

## 📝 Licença

Projeto educacional para portfólio de QA Automation.
