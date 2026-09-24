# Portal de Gestão de Chamados

Aplicação full-stack para abertura, acompanhamento e gestão de chamados técnicos. O sistema permite filtrar e ordenar solicitações, alterar seus status e registrar evidências no histórico de transições.

## Funcionalidades

- Abertura de chamados com título, descrição, categoria e prioridade.
- Listagem com filtros por status, categoria e prioridade.
- Ordenação por data de criação ou prioridade.
- Consulta dos detalhes de um chamado.
- Fluxo de status: `Aberto`, `Em andamento`, `Resolvido` e `Fechado`.
- Histórico de alterações com data, status anterior, novo status e evidência.
- API REST com documentação interativa via Swagger.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Frontend | React, TypeScript, Vite e Tailwind CSS |
| Backend | FastAPI, SQLAlchemy, Pydantic e Uvicorn |
| Dados | SQLite |

## Pré-requisitos

- Node.js 18+ e npm
- Python 3.11+

## Execução local

### 1. Clonar o repositório
```bash
git clone https://github.com/oRaPhael-bot/3M_Desafio_Teste_Tecnico.git
cd 3M_Desafio_Teste_Tecnico
2. Iniciar o backend
Em um terminal:
cd backend
python -m venv venv
Ative o ambiente virtual:
# Windows PowerShell
.\venv\Scripts\Activate.ps1

# macOS/Linux
source venv/bin/activate
Instale as dependências e execute a API:
pip install -r requirements.txt
uvicorn main:app --reload
O backend ficará disponível em http://127.0.0.1:8000.
3. Iniciar o frontend
Em outro terminal, na raiz do projeto:
cd frontend
npm install
npm run dev
Abra o endereço exibido pelo Vite, normalmente http://localhost:5173.
O frontend está configurado para consumir a API em http://127.0.0.1:8000. Se a API for executada em outro endereço, atualize frontend/src/services/api.ts.
API
Com o backend em execução:
•
Swagger UI: http://127.0.0.1:8000/docs
•
ReDoc: http://127.0.0.1:8000/redoc
Principais endpoints:
Método
Endpoint
Descrição
POST
/tickets/
Cria um chamado
GET
/tickets/
Lista chamados com filtros e ordenação
GET
/tickets/{ticket_id}
Consulta um chamado
PATCH
/tickets/{ticket_id}/status
Atualiza o status e registra evidência
Estrutura
.
├── backend/
│   ├── main.py          # Rotas da API
│   ├── models.py        # Modelos SQLAlchemy
│   ├── schemas.py       # Schemas Pydantic
│   ├── database.py      # Conexão e migração do SQLite
│   └── requirements.txt
└── frontend/
    ├── src/components/  # Formulário, lista e detalhes
    ├── src/services/    # Comunicação com a API
    └── src/types/       # Tipos TypeScript
O banco local backend/tickets.db é criado e atualizado automaticamente pelo backend.
Verificação
Na pasta frontend, os comandos disponíveis são:
npm run lint
npm run build
Licença
Projeto desenvolvido para fins técnicos e demonstrativos.
