from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from database import Base


class Ticket(Base):
  __tablename__ = "tickets"

  id = Column(Integer, primary_key=True, index=True)
  title = Column(String, index=True, nullable=False)
  description = Column(Text, nullable=False)
  category = Column(String, nullable=False)  # Ex: TI, RH, Instalações
  priority = Column(String, nullable=False)  # Ex: Baixa, Média, Alta, Urgente
  status = Column(
      String, default="Aberto", nullable=False
  )  # Aberto, Em andamento, Resolvido, Fechado
  created_at = Column(DateTime, default=datetime.utcnow)
  updated_at = Column(
      DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
  )

  history = relationship(
      "TicketStatusHistory",
      back_populates="ticket",
      cascade="all, delete-orphan",
  )


class TicketStatusHistory(Base):
  __tablename__ = "ticket_status_history"

  id = Column(Integer, primary_key=True, index=True)
  ticket_id = Column(Integer, ForeignKey("tickets.id"), nullable=False)
  old_status = Column(String, nullable=False)
  new_status = Column(String, nullable=False)
  changed_at = Column(DateTime, default=datetime.utcnow)

  ticket = relationship("Ticket", back_populates="history")