# Fluxo do projeto Mental Tech

### Arquivos principais

- **src/app/_layout.tsx:** layout raiz do app e inicialização dos providers.
- **src/app/index.tsx:** tela de carrossel inicial.
- **src/app/roles.tsx:** tela de escolha de perfil.
- **src/app/(auth)/:** telas de autenticação e cadastro.
- **src/app/(professor)/:** área do professor.
- **src/router/:** definição das rotas nomeadas usadas pelo app.
- **src/hooks/useWizardFlow.tsx:** estado do fluxo de onboarding da escola.
- **src/hooks/useAuth.ts:** integração com Supabase para cadastro e onboarding.
- **src/hooks/professor/useProfessorPrototype.tsx:** provedor com dados simulados para o protótipo do professor.

## 1. Fluxo de navegação principal

### 1.1 Entrada inicial

A abertura do app começa em **src/app/index.tsx**.

**1**. Tela de carrossel inicial.

**2**. Ao terminar, o usuário é levado para a tela de escolha de perfil em src/app/roles.tsx.

**3**. A partir daí, o usuário escolhe entre:
   - aluno;
   - professor;
   - cadastro de escola.

### 1.2 Fluxo de aluno

O fluxo de aluno comeca em **src/app/roles.tsx**.

- escolha de perfil -> aluno;
- tela de login do aluno;
- tela de nome do aluno;
- tela de conclusão.

### 1.3 Fluxo de escola e onboarding

O fluxo de escola comeca em **src/app/roles.tsx**.

**1**. O usuário escolhe a opção "Cadastrar escola" na tela de perfil.

**2**. Vai para src/app/(auth)/escola/cadastro.tsx.

**3**. O formulário coleta dados da escola e salva o estado no contexto do wizard.

**4**. A navegação segue para o fluxo de onboarding em src/app/(auth)/wizard.tsx.

**5**. O wizard possui 4 etapas:
   - etapa 1: dados da turma;
   - etapa 2: vínculo com professor;
   - etapa 3: lista de alunos;
   - etapa 4: conclusão.

O estado do wizard é mantido por **src/hooks/useWizardFlow.tsx**, que armazena os dados em um contexto global.

### 1.4 Fluxo de professor

O professor entra pela tela de login em **src/app/(auth)/professor/login.tsx**.

Após autenticar, o app navega para a área do professor:

- dashboard;
- atividades;
- correções;
- relatórios;
- notificações;
- perfil;
- detalhe de atividade;
- edição de atividade;
- detalhe de correção;
- perfil de aluno.

Essa área é organizada em **src/app/(professor)/** e controlada pelo layout **src/app/(professor)/_layout.tsx**.

## 2. Como o roteamento funciona

O projeto usa Expo Router com rotas baseadas em arquivos.

### Principais grupos de rota

- **src/app/(auth)/:** telas de entrada e cadastro.
- **src/app/(professor)/:** telas da área do professor.
- **src/app/(aluno)/ e src/app/(escola)/:** estruturas preparadas para expansão futura.

### Centralização das rotas

As rotas nomeadas são definidas em:

- **src/router/auth.routes.ts**
- **src/router/wizard.routes.ts**
- **src/router/professor.routes.ts**

Esses arquivos centralizam os caminhos usados em navegação, o que facilita a manutenção.

## 3. Papel de hooks, utils, constants, types e styles

### 3.1 Hooks

Os hooks guardam lógica e estado compartilhado.

### 3.2 Utils

A pasta src/utils contém funções auxiliares, como:

- validação e formatação de CPF/CNPJ/CEP;
- validação de e-mail;
- utilidades do wizard.

Essas funções deixam os componentes mais enxutos e padronizam regras de negócio simples.

### 3.3 Constants

A pasta src/constants armazena:

- textos de telas;
- labels e placeholders;
- temas e cores;
- configurações de carrossel;
- dados estáticos usados em telas do professor.

Isso separa conteúdo visual e textual da lógica, facilitando mudanças futuras.

### 3.4 Types

A pasta src/types define as interfaces e tipos usados em todo o app.
Esses tipos ajudam a manter a aplicação mais previsível e segura em TypeScript.

### 3.5 Styles

A pasta **src/styles** reúne estilos globais e por contexto.

- **src/styles/index.ts** centraliza os módulos de estilos.
- As telas consomem esse objeto para manter visual consistente.

## 4. Integração com backend

A integração com backend é feita principalmente por meio de Supabase.

- **src/service/supabase.ts** cria o cliente do Supabase.
- **src/hooks/useAuth.ts** usa esse cliente para:
  - criar usuário autenticado;
  - inserir perfil da escola;
  - salvar dados da escola;
  - criar turma e alunos em fluxo de onboarding.

Em resumo, o backend é usado no cadastro da escola e no onboarding, mas a área do professor ainda é principalmente um protótipo local.

## 5. Pontos de atenção

- A área do professor usa dados simulados em **src/hooks/professor/useProfessorPrototype.tsx**. Não é uma integração completa com backend.
- O fluxo de aluno está mais voltado para experiência visual e navegação do que para persistência real.
- A importação em lote de alunos no wizard exibe apenas um alerta; a ação de importar arquivo ainda não está totalmente implementada.
- Algumas telas existem como estrutura e podem estar sem integração completa com o restante do fluxo.
- O app está em fase inicial, então parte do fluxo funciona como protótipo e parte como estrutura de evolução.