# 🍫 ChocoLand — Landing Page

Landing page de chocolates artesanais construída com **React**, **TypeScript** e **Tailwind CSS**.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)

## Preview

A página inclui:

- **Header** — navegação fixa com efeito de vidro (backdrop-blur)
- **Hero** — seção principal com headline, subtítulo e CTA
- **Features** — grid responsivo de benefícios (6 cards)
- **Call to Action** — formulário de e-mail com renderização condicional
- **Footer** — rodapé com 3 colunas (Grid)

## Tech Stack

| Tecnologia                                   | Função                    |
| -------------------------------------------- | ------------------------- |
| [React 19](https://react.dev)                | Biblioteca de UI          |
| [TypeScript](https://www.typescriptlang.org) | Tipagem estática          |
| [Tailwind CSS 4](https://tailwindcss.com)    | Estilização utility-first |
| [Vite 7](https://vite.dev)                   | Build tool + dev server   |

## Estrutura do Projeto

```
src/
├── components/
│   ├── Header.tsx          # Navegação principal
│   └── FeatureCard.tsx     # Card reutilizável (props)
├── sections/
│   ├── Hero.tsx            # Seção principal
│   ├── Features.tsx        # Grid de benefícios (map + key)
│   ├── CallToAction.tsx    # Formulário com useState
│   └── Footer.tsx          # Rodapé
├── App.tsx                 # Componente raiz
├── main.tsx                # Ponto de entrada
└── index.css               # Importação do Tailwind
```

## Como Rodar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Conceitos React Aplicados

- Componentes funcionais
- Props com interfaces TypeScript
- `useState` (estado do formulário)
- Renderização condicional (ternário)
- Listas com `.map()` e `key`
- Controlled inputs
- Eventos (`onChange`, `onSubmit`)

## Licença

MIT
