# Fluxo do projeto Mental Tech

## Visão geral

O app inicia em `src/app/index.tsx` e segue para a escolha de perfil em `src/app/roles.tsx`.

Perfis principais:
- **Aluno**
- **Professor**
- **Escola**

## Fluxo do aluno

1. Login em `src/app/(auth)/aluno/login.tsx`
2. Cadastro de nome em `src/app/(auth)/aluno/nome.tsx`
3. Tela final em `src/app/(auth)/aluno/concluido.tsx`
4. Usuário entra na área de aluno em `src/app/(aluno)/aluno`

Páginas do aluno:
- `trilha.tsx`
- `missao.tsx`
- `historico.tsx`
- `notificacoes.tsx`
- `perfil.tsx`
- `personalizar.tsx`
- `recompensa.tsx`
- `enviado.tsx`
- `reenviado.tsx`

## Fluxo da escola e onboarding

1. Seleção de escola em `src/app/roles.tsx`
2. Cadastro inicial em `src/app/(auth)/escola/cadastro.tsx`
3. Wizard em `src/app/(auth)/wizard.tsx`

Etapas do wizard:
- `WizardStepClass` — dados da turma
- `WizardStepTeacher` — vínculo com professor
- `WizardStepStudents` — lista de alunos
- `WizardDoneScreen` — conclusão

O wizard usa `src/hooks/useWizardFlow.tsx` para manter estado entre etapas.

## Fluxo do professor

1. Login em `src/app/(auth)/professor/login.tsx`
2. Área principal em `src/app/(professor)/index.tsx`
3. Rotas e telas do professor:
   - `dashboard.tsx`
   - `atividades/index.tsx`
   - `atividades/nova` (criação)
   - `correcoes/index.tsx`
   - `relatorios.tsx`
   - `notificacoes.tsx`
   - `perfil.tsx`
   - `alunos/[studentId]` (perfil de aluno)
   - `[activityId]` (detalhe de atividade)
   - `[activityId]/editar` (edição de atividade)
   - `correcoes/[submissionId]` (detalhe de correção)

## Rotas nomeadas

- `src/router/auth.routes.ts`
- `src/router/wizard.routes.ts`
- `src/router/professor.routes.ts`
- `src/router/aluno.routes.ts`
- `src/router/index.ts`

## Estrutura de pastas

- `src/app/` — telas e rotas expo-router
- `src/components/` — componentes UI reutilizáveis
- `src/constants/` — textos, temas e dados estáticos
- `src/hooks/` — hooks e estado compartilhado
- `src/integration/` — integrações com APIs
- `src/service/` — regras de negócio e comunicação com backend
- `src/styles/` — estilos e temas
- `src/types/` — tipagens TypeScript
- `src/utils/` — utilitários e helpers

## Integração com backend

- `src/service/supabase.ts` cria o cliente Supabase
- `src/hooks/useAuth.ts` gerencia autenticação e onboarding
- `src/service/emailServices.ts` envia e-mails via EmailJS
- `src/utils/auth.ts` consulta BrasilAPI e ViaCEP