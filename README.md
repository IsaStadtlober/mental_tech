# Mental Tech

O Mental Tech é uma plataforma de tecnologia educacional voltada para promover a inclusão escolar de crianças neurodivergentes por meio de uma experiência de aprendizagem mais acessível e organizada.

## Tecnologias utilizadas

- **React Native -** Framework para desenvolvimento de aplicativos nativos
- **Expo -** Ferramenta de desenvolvimento de aplicativos nativos
- **Expo Router -** Gerenciador de rotas com Tab Navigator e Stack Navigator
- **TypeScript -** Linguagem de programação de tipagem forte
- **ESLint -** Ferramenta de qualidade de código

## Estrutura do projeto

```text
src/
├── app/
├── (auth)/                  # Grupo de Autenticação
│   ├── aluno/
│   │   └── login.tsx        # Login exclusivo do Aluno (sem cadastro/recuperação)
│   ├── profissional/        # Nome genérico para Professor + Escola
│   │   ├── login.tsx        # Login unificado (Professor + Escola)
│   │   ├── cadastro_escola.tsx     # Cadastro exclusivo da Escola
│   │   └── recuperar.tsx    # Recuperação de senha unificada (Professor + Escola)
│   └── _layout.tsx          
├── (aluno)/
├── (professor)/
├── (instituição)/
├── _layout.tsx              
└── index.tsx           # Tela inicial de escolha ("Sou Aluno" ou "Sou Professor/Escola")
├── components/         # Componentes reutilizáveis
├── constants/          # Constantes globais
├── hooks/              # Lógicas da aplicação
├── service/            # Serviços da aplicação
├── styles/             # Estilos globais
├── types/              # Tipos para o TypeScript
└── utils/              # Funções auxiliares
```

## Dependências Principais

- **@expo-google-fonts/quicksand -** Fonte Quicksand para Headline
- **@expo-google-fonts/atkinson-hyperlegible -** Fonte Atkinson Hyperlegible para Body
- **react-native-gesture-handler -** Para gestos e toques na tela
- **react-native-reanimated -** Para animações
- **lucide-react-native -** Biblioteca de icones
- **@react-native-async-storage/async-storage -** Para armazenamento local

## Como rodar

```bash
npm install # Para instalar as dependências
npx expo start # Para rodar e mostrar QR Code para o Expo Go
```

## Comandos

### Lint

```bash
npm run lint # Para ver os erros
npm run fix # Para corrigir alguns erros
```

## Web

```bash
npx expo start --web # Para rodar na web
```

## Observação

Este projeto está em fase inicial e a estrutura está organizada para receber as telas e fluxos de autenticação, aluno, professor e instituição.