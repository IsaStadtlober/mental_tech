# Mental Tech

Plataforma educacional para apoiar inclusão escolar de crianças neurodivergentes com uma experiência mais acessível e organizada.

## Tecnologias utilizadas

- **React Native + Expo**
- **Expo Router**
- **TypeScript**
- **Supabase**
- **EmailJS**, **BrasilAPI**, **ViaCEP**
- **React Native Reanimated** + **Gesture Handler**
- **React Native SVG**, **Lottie**, **Lucide**
- **react-hook-form** + **zod**
- **expo-document-picker** + **papaparse**

## Dependências extras instaladas

- `expo-router` - navegação baseada em rotas de arquivo
- `@expo/ui` - biblioteca de UI para o protótipo
- `@expo-google-fonts/quicksand`, `@expo-google-fonts/atkinson-hyperlegible` - fontes customizadas
- `@supabase/supabase-js` - cliente Supabase para backend
- `react-native-reanimated`, `react-native-gesture-handler` - animações e gestos nativos
- `react-native-svg` - SVGs customizados
- `lucide-react-native`, `lottie-react-native`, `@lottiefiles/dotlottie-react` - ícones e animações
- `react-hook-form`, `zod` - formulários e validação
- `expo-document-picker`, `papaparse` - importação de alunos via CSV
- `expo-device`, `expo-image`, `expo-linking`, `expo-web-browser`, `expo-system-ui`, `expo-symbols`, `expo-glass-effect` - utilitários de plataforma e efeitos visuais
- `@react-native-async-storage/async-storage` - armazenamento local
- `react-native-url-polyfill`, `react-native-worklets` - compatibilidade para web e Reanimated
- `expo-secure-store` - armazenamento seguro para tokens

## Estrutura do projeto

```text
mental_tech/
├── assets/
│   ├── animations/          # animações e lotties
│   ├── images/              # imagens e SVGs
│   └── expo.icon/           # assets do Expo
└── src/
    ├── app/
    │   ├── (auth)/         # autenticação e cadastro
    │   │   ├── aluno/       # fluxo de aluno
    │   │   ├── escola/      # cadastro e onboarding escolar
    │   │   └── professor/   # login e onboarding professor
    │   ├── (aluno)/         # rota de aluno (estrutura)
    │   ├── (escola)/        # rota de escola (estrutura)
    │   ├── (professor)/     # área do professor
    │   ├── _layout.tsx      # layout raiz do app
    │   ├── index.tsx        # tela inicial de carrossel
    │   └── roles.tsx        # seleção de perfil
    ├── components/          # componentes reutilizáveis
    ├── constants/           # textos, temas e dados estáticos
    ├── hooks/               # lógica de estado e hooks customizados
    ├── integration/         # integrações e APIs internas
    ├── router/              # definição e exportação de rotas
    ├── service/             # serviços e regras de negócio
    ├── styles/              # estilos e temas
    ├── types/               # tipagens TypeScript
    └── utils/               # utilitários e helpers
```

## Backend e integrações

- `src/service/supabase.ts` cria o cliente Supabase
- `src/service/emailServices.ts` envia e-mails via EmailJS
- `src/utils/auth.ts` consulta BrasilAPI e ViaCEP

### Variáveis de ambiente

```bash
EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
EXPO_PUBLIC_EMAILJS_SERVICE_ID
EXPO_PUBLIC_EMAILJS_TEMPLATE_ID
EXPO_PUBLIC_EMAILJS_PUBLIC_KEY
EXPO_PUBLIC_EMAILJS_STUDENT_TEMPLATE_ID
EXPO_PUBLIC_APP_URL
```

## Como rodar

```bash
npm install
npx expo start
```

### Web

```bash
npx expo start --web
```

### Lint

```bash
npm run lint
npm run fix
```