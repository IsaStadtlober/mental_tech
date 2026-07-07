# Mental Tech

O Mental Tech é uma plataforma de tecnologia educacional voltada para promover a inclusão escolar de crianças neurodivergentes por meio de uma experiência de aprendizagem mais acessível e organizada.

## Tecnologias utilizadas

- **React Native -** Framework cross-platform para desenvolvimento de aplicativos nativos
- **Expo -** Ferramenta de desenvolvimento de aplicativos nativos
- **Expo Router -** Gerenciador de rotas baseado em arquivos (File-based routing)
- **TypeScript -** Linguagem de programação de tipagem forte
- **ESLint -** Ferramenta de qualidade de código

## Estrutura do projeto

```text
src/
├── app/
│   ├── (auth)/                     # Grupo de Autenticação
│   │   ├── aluno/
│   │   │   └── login.tsx           
│   │   ├── profissional/           # Fluxo unificado para Professor + Escola
│   │   │   ├── login.tsx           # Login unificado
│   │   │   ├── cadastro-escola.tsx # Cadastro da Escola
│   │   │   └── recuperar.tsx       # Recuperação unificada
│   │   └── _layout.tsx             # Layout/Stack do fluxo de autenticação
│   ├── (aluno)/                    
│   ├── (professor)/                
│   ├── (escola)/              
│   ├── _layout.tsx                 # Layout raiz (Gerencia Splash/Loading e Fontes)
│   └── index.tsx                   # Porta de entrada (Escolha de perfil ou Redirecionamento)
├── components/                     # Componentes reutilizáveis
├── constants/                      # Constantes globais
├── hooks/                          # Lógica do aplicativo
├── service/                        # Integração com APIs e serviços externos
├── styles/                         # Estilos
├── types/                          # Definições de tipos do TypeScript
└── utils/                          # Funções auxiliares e utilitários
```

## Dependências Principais

- **@expo-google-fonts/quicksand -** Fonte Quicksand para Headlines (Títulos)
- **@expo-google-fonts/atkinson-hyperlegible -**Fonte Atkinson Hyperlegible para Body
- **react-native-gesture-handler -** Suporte a gestos nativos e toques
- **react-native-reanimated -** Engine para animações fluidas
- **lucide-react-native -** Biblioteca de ícones vetoriais
- **@react-native-async-storage/async-storage -** Para armazenamento local

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