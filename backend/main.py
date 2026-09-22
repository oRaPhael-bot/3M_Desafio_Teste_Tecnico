from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from typing import List
from database import engine, Base, get_db
import models
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ticket Support API")

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
    return db_ticket

@app.get("/tickets/", response_model=List[schemas.TicketResponse])
def list_tickets(db: Session = Depends(get_db)):
    return db.query(models.Ticket).all()