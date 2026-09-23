from datetime import datetime
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from starlette.middleware.cors import CORSMiddleware

from database import engine, Base, get_db
import models
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ticket Support API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PRIORITY_ORDER = {"Urgente": 1, "Alta": 2, "Média": 3, "Baixa": 4}

@app.post("/tickets/", response_model=schemas.TicketResponse)
def create_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    db_ticket = models.Ticket(
        title=ticket.title,
        description=ticket.description,
        category=ticket.category,
        priority=ticket.priority
    )
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)

    history_entry = models.TicketStatusHistory(
        ticket_id=db_ticket.id,
        old_status=None,
        new_status=db_ticket.status,
        changed_at=datetime.utcnow(),
    )
    db.add(history_entry)
    db.commit()
    db.refresh(db_ticket)

    return db_ticket

@app.get("/tickets/", response_model=List[schemas.TicketResponse])
def list_tickets(status: Optional[str] = None,
    category: Optional[str] = None,
    priority: Optional[str] = None,
    sort_by: Optional[str] = "created_at",
    order: Optional[str] = "desc",
    db: Session = Depends(get_db),
):
    query = db.query(models.Ticket)

    if status:
        query = query.filter(models.Ticket.status == status)
    if category:
        query = query.filter(models.Ticket.category == category)
    if priority:
        query = query.filter(models.Ticket.priority == priority)

    tickets = query.all()

    if sort_by == "priority":
        tickets.sort(
            key=lambda t: PRIORITY_ORDER.get(t.priority, 99),
            reverse=(order == "desc"),
        )
    else:
        tickets.sort(key=lambda t: t.created_at, reverse=(order == "desc"))

    return tickets


@app.patch("/tickets/{ticket_id}/status", response_model=schemas.TicketResponse)
def update_status(
    ticket_id: int,
    status_update: schemas.StatusUpdate,
    db: Session = Depends(get_db),
):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Chamado não encontrado")

    old_status = ticket.status
    new_status = status_update.status

    if old_status != new_status:
        ticket.status = new_status
        history_entry = models.TicketStatusHistory(
            ticket_id=ticket.id,
            old_status=old_status,
            new_status=new_status,
            evidence=status_update.evidence,
            changed_at=datetime.utcnow(),
        )
        db.add(history_entry)
        db.commit()
        db.refresh(ticket)

    return ticket

@app.get("/tickets/{ticket_id}", response_model=schemas.TicketResponse)
def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Chamado não encontrado")
    return ticket