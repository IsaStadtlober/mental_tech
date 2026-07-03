# Mental Tech

```
src/
└── app/
    ├── (auth)/             # Área de autenticação
    │   └──  _layout.tsx
    ├── (aluno)/            # Área do Aluno
    │   └──  _layout.tsx    # Pode ter um Bottom Tab Navigator, por exemplo
    │
    ├── (professor)/        # Área do Professor
    │   └──  _layout.tsx    # Pode ter um Bottom Tab Navigator, por exemplo
    │
    ├── (instituicao)/      # Área da Instituição/Admin
    │   └──  _layout.tsx    # Pode ter um Bottom Tab Navigator, por exemplo
    │
    ├── _layout.tsx         # Layout Raiz (Root Layout)
    └── index.tsx           # Tela de Redirecionamento (Splash/Check de Autenticação)