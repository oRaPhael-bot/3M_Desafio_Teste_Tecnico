# Portal de Gestão de Chamados

Aplicação full-stack para abertura, acompanhamento e gestão de chamados internos de suporte. O sistema permite registrar solicitações, acompanhar status, aplicar filtros e visualizar o histórico de alterações.

## Objetivo

Este projeto foi desenvolvido como protótipo funcional de um sistema de suporte interno para uma pequena empresa. O foco principal foi demonstrar a capacidade de implementar end-to-end uma aplicação com:
- criação de tickets
- listagem e filtros
- atualização de status
- histórico de mudanças
- interface intuitiva para uso interno

## Requisitos Atendidos

- Frontend em React
- Backend em Python com FastAPI
- API RESTful para comunicação entre frontend e backend
- Persistência de dados em banco local
- Fluxo de gestão de status:
  - Aberto
  - Em andamento
  - Resolvido
  - Fechado
- Visualização detalhada do ticket com histórico

## Funcionalidades

- Criação de ticket com:
  - título
  - descrição
  - categoria
  - prioridade
- Listagem de todos os tickets
- Filtros por:
  - status
  - categoria
  - prioridade
- Ordenação por:
  - data de criação
  - prioridade
- Atualização do status do ticket
- Visualização do histórico de alterações

## Stack Tecnológica

- Frontend: React + TypeScript + Vite
- Backend: Python + FastAPI
- Persistência: SQLite
- ORM: SQLAlchemy
- Validação de dados: Pydantic

## Decisões Técnicas

### Frontend
Foi escolhido React com TypeScript para permitir uma interface mais organizada, reutilizável e segura em termos de tipos. A estrutura foi separada em componentes para manter a UI modular e fácil de manter.

### Backend
FastAPI foi escolhido por proporcionar desenvolvimento rápido, validação automática e documentação interativa via Swagger. Esse framework é muito adequado para APIs REST com baixa complexidade de domínio, como o caso deste projeto.

### Banco de Dados
SQLite foi escolhido por ser simples de configurar, leve e suficiente para um protótipo funcional executado localmente. Ele reduz a necessidade de infraestrutura externa e facilita a execução do projeto em qualquer ambiente de desenvolvimento.

## Trade-offs

- SQLite foi escolhido por simplicidade e velocidade de execução, mas em produção com mais usuários ou volume maior, seria mais apropriado usar PostgreSQL.
- A arquitetura foi organizada para ser simples e clara, em vez de over-engineered. Isso favorece legibilidade e manutenção em um protótipo.
- O projeto prioriza velocidade de implementação e entendimento da regra de negócio em vez de escalabilidade máxima.

## Suposições

- A aplicação será usada em ambiente interno e local, com pouca carga de usuários.
- Os tickets possuem fluxo de status fixo e bem definido.
- A equipe de suporte realiza atualização de status manualmente.
- O uso de SQLite é suficiente para demonstração e validação da solução.

## Estrutura do Projeto

```text
.
├── backend/
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── README.md
└── .gitignore
