# Mental Tech

O Mental Tech é uma plataforma de tecnologia educacional voltada para promover a inclusão escolar de crianças neurodivergentes por meio de uma experiência de aprendizagem mais acessível e organizada.

### Tecnologias utilizadas
     
- **React Native** - Framework cross-platform para desenvolvimento de aplicativos nativos.
- **Expo** - Plataforma para desenvolvimento, build e execução do aplicativo.
- **Expo Router** - Gerenciador de rotas baseado em arquivos.
- **TypeScript** - Linguagem com tipagem estática para maior segurança e organização do código.
- **ESLint** - Ferramenta de padronização e qualidade de código.
- **React Native Reanimated** - Biblioteca para animações fluidas e performáticas.
- **React Native Gesture Handler** - Biblioteca para gestos nativos, swipes e interações por toque.
- **React Native SVG** - Renderização de SVGs e ícones customizados.
- **Expo Linear Gradient** - Criação de gradientes em cards, botões, badges e elementos visuais.
- **Expo Splash Screen** - Controle da tela de carregamento inicial enquanto fontes e assets são preparados.
- **Lucide React Native** - Biblioteca de ícones vetoriais.
- **Expo Google Fonts** - Carregamento das fontes Quicksand e Atkinson Hyperlegible.

## Dependências Principais

- **@expo-google-fonts/quicksand** - Fonte usada em títulos, chamadas principais e elementos de destaque.
- **@expo-google-fonts/atkinson-hyperlegible** - Fonte usada em textos corridos, descrições e labels.
- **expo-font** - Necessário para carregamento das fontes customizadas.
- **expo-splash-screen** - Controle do splash/loading enquanto as fontes carregam.
- **expo-linear-gradient** - Gradientes usados em cards, badges e elementos de identidade visual.
- **react-native-svg** - SVGs customizados e ícones animados.
- **react-native-reanimated** - Animações de entrada, loop, transições, botões e elementos decorativos.
- **react-native-gesture-handler** - Gestos do carrossel e interações nativas.
- **lucide-react-native** - Ícones gerais da interface.
- **@react-native-async-storage/async-storage** - Armazenamento local simples.
- **react-native-safe-area-context** - Ajuste da interface para notch, status bar e áreas seguras.
- **react-hook-form** - Gerenciamento dos formulários de login, cadastro, recuperação de senha, etc.
- **zod** - Validação dos campos de e-mail, senha, PIN, nome da escola, turma e alunos.
- **expo-secure-store** - Armazenamento seguro de tokens, sessão e dados sensíveis.
- **expo-document-picker** - Seleção de arquivos CSV/XLSX para importação de alunos.
- **papaparse** - Leitura e validação de arquivos CSV.

## Estrutura do projeto

Abaixo está uma partilha da estrutura do projeto:

```text
mental_tech/
├── assets/
│   ├── animations/            # Animações e lotties
│   ├── images/                # Imagens e arquivos SVG
│   └── expo.icons/            # Ícones do Expo
└──src/
    ├── app/
    │   ├── (auth)/            # Rotas de autenticação
    │   │   ├── aluno/
    │   │   ├── escola/
    │   │   └── professor/
    │   ├── (aluno)/           # Rotas de aluno
    │   ├── (escola)/          # Rotas de escola
    │   ├── (professor)/       # Rotas de professor
    │   ├── _layout.tsx
    │   ├── index.tsx          # Tela com o Carrossel de telas
    │   └── roles.tsx          # Tela de escolha de perfil
    ├── components/            # Componentes reutilizáveis
    ├── constants/             # Constantes e variáveis globais
    ├── hooks/                 # Lógica do aplicativo
    ├── service/               # Serviços e regras de negócio
    ├── styles/                # Estilos
    ├── types/                 # Tipagens
    └── utils/                 # Funções auxiliares
```

## Como rodar

```bash
npm install # Para instalar as dependências
npx expo start # Para rodar e mostrar QR Code para o Expo Go
```

## Comandos

### Lint

```bash
npm run lint # Para verificar erros de padronização de código
npm run fix  # Para corrigir erros de padronização automaticamente
```

## Web

```bash
npx expo start --web # Para rodar o projeto no navegador
```

## Observação

Este projeto está em fase inicial e a estrutura está organizada para receber as telas e fluxos de autenticação, aluno, professor e escola.