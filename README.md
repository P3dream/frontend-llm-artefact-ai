# Artefact AI Frontend

Este é o frontend do projeto **Artefact AI Agent**, uma interface interativa para conversar com a API backend que processa prompts matemáticos, perguntas gerais e consultas de câmbio.

O projeto é feito em **React** com **Material-UI** e fornece uma experiência limpa, responsiva e interativa.

---

## Funcionalidades

* Interface simples e centralizada com layout responsivo.
* Input para digitar prompts e envio com botão ou tecla Enter.
* Lista de mensagens exibindo usuário e Artefact AI.
* Indicação do **modelo usado** e **fonte da resposta** com `Chip` e `Tooltip`.
* Mensagem de carregamento enquanto o LLM processa (`Artefact AI está digitando...`).
* Seleção de modelo persistida no `localStorage`.

---

## Tecnologias

* React 18+
* Material-UI (MUI) 5+
* Axios (para comunicação com o backend)
* JavaScript/JSX
* CSS (index.css)

---

## Estrutura do projeto

```
├── index.jsx       # Ponto de entrada do React
├── App.jsx         # Layout principal e centralização
├── components/
│   └── Chat.jsx    # Componente de chat interativo
├── index.css       # Estilos globais
└── public/
    └── logo.png    # Logo do Artefact
```

---

## Instalação e execução

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd frontend
```

2. Instale dependências:

```bash
npm install
```

3. Execute o frontend:

```bash
npm run dev
```

4. Abra o navegador em `http://localhost:5173` (ou porta indicada no terminal) e teste a interface.

> Certifique-se de que o backend (`http://localhost:3000/ia`) esteja rodando para que o chat funcione corretamente.

---

## Exemplos de uso

1. **Operação matemática**:

```
Usuário: quanto é 15 mais 27?
Artefact AI: 42 (Calculadora Regex + AST)
```

2. **Pergunta simples em linguagem natural**:

```
Usuário: Tinha 5 pães, comprei mais dois, quantos pães eu tenho?
Artefact AI: 7 (Parser via LLM)
```

3. **Pergunta sobre cotação do dólar**:

```
Usuário: Quanto está o dólar hoje?
Artefact AI: R$ 5.25 (API de Câmbio)
```

4. **Pergunta geral**:

```
Usuário: Quem foi Albert Einstein?
Artefact AI: Albert Einstein foi um físico teórico alemão... (Resposta direta do LLM)
```

---

## Possiveis pontos de melhoras com mais tempo

* Persistir histórico de mensagens no `localStorage`.
* Adicionar feedback visual de erro (`Snackbar`).
* Tema dark/light toggle.
* Separar mensagens em componente próprio (`Message.jsx`).
* Mostrar timestamp das mensagens.
* Animação de digitação para a mensagem de loading.

---

## Observações

Este frontend foi desenvolvido para ser simples, bonito e interativo, focando em experiência do usuário e comunicação eficiente com o backend. Ele serve como base para integrar novos modelos, melhorar UX ou adicionar funcionalidades avançadas de chat com IA.