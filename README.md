# Mental Tech

O Mental Tech é uma plataforma de tecnologia educacional voltada para promover a inclusão escolar de crianças neurodivergentes por meio de uma experiência de aprendizagem mais acessível e organizada.

### Tecnologias utilizadas
     
- **React Native** - Framework cross-platform para desenvolvimento de aplicativos nativos.
- **Expo** - Plataforma para desenvolvimento, build e execução do aplicativo.
- **Expo Router** - Gerenciador de rotas baseado em arquivos.
- **TypeScript** - Linguagem com tipagem estática para maior segurança e organização do código.
- **ESLint** - Ferramenta de padronização e qualidade de código.
- **Supabase** - Banco de dados Postgres, autenticação, sessões e integração de dados em tempo real.
- **React Native Reanimated** - Biblioteca para animações fluidas e performáticas.
- **React Native Gesture Handler** - Biblioteca para gestos nativos, swipes e interações por toque.
- **React Native SVG** - Renderização de SVGs e ícones customizados.
- **Expo Linear Gradient** - Criação de gradientes em cards, botões, badges e elementos visuais.
- **Expo Splash Screen** - Controle da tela de carregamento inicial enquanto fontes e assets são preparados.
- **Lucide React Native** - Biblioteca de ícones vetoriais.
- **Expo Google Fonts** - Carregamento das fontes Quicksand e Atkinson Hyperlegible.
- **EmailJS** - Envio de e-mails de convite e acesso para professores e responsáveis.
- **BrasilAPI / ViaCEP** - Consulta de dados de CNPJ e endereço por CEP para preenchimento automático de cadastro.

## Dependências Principais

- **@expo-google-fonts/quicksand** - Fonte usada em títulos, chamadas principais e elementos de destaque.
- **@expo-google-fonts/atkinson-hyperlegible** - Fonte usada em textos corridos, descrições e labels.
- **@supabase/supabase-js** - Cliente oficial para comunicação com o Supabase, autenticação e consultas ao banco.
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
- **expo-constants** - Leitura de variáveis de ambiente e configuração de runtime do app.

## Banco de dados e APIs

### Banco de dados

- **Supabase** é a principal base de dados do projeto, com modelo em PostgreSQL.
- O sistema utiliza autenticação do Supabase para perfis de escola, professor, aluno e responsável.
- As tabelas principais estão estruturadas para cadastro de escolas, professores, turmas, estudantes, atividades, submissões, shop de itens e inventário do avatar.
- Também existe suporte a funções SQL e triggers para manutenção automática de campos como `updated_at` e onboarding de escola.

### APIs e integrações externas

- **Supabase API** - responsável por autenticação, persistência de sessão e consultas ao banco.
- **EmailJS** - envio de e-mails de convite para professores e acesso para responsáveis de alunos.
- **BrasilAPI** - consulta de dados da empresa com base no CNPJ durante o cadastro escolar.
- **ViaCEP** - preenchimento automático de endereço com base no CEP.

### Variáveis de ambiente

O app utiliza variáveis de ambiente para conectar com o Supabase e com os serviços de e-mail, por exemplo:

```bash
EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
EXPO_PUBLIC_EMAILJS_SERVICE_ID
EXPO_PUBLIC_EMAILJS_TEMPLATE_ID
EXPO_PUBLIC_EMAILJS_PUBLIC_KEY
EXPO_PUBLIC_EMAILJS_STUDENT_TEMPLATE_ID
EXPO_PUBLIC_APP_URL
```

Essas variáveis devem ser configuradas no ambiente do projeto antes de executar o aplicativo em desenvolvimento.

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