from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class TicketStatusHistoryResponse(BaseModel):
  id: int
  ticket_id: int
  old_status: Optional[str] = None
  new_status: Optional[str] = None
  evidence: Optional[str] = None
  changed_at: datetime

  model_config = ConfigDict(from_attributes=True)


class TicketBase(BaseModel):
  title: str
  description: str
  category: str
  priority: str
  status: Optional[str] = "Aberto"


class TicketCreate(TicketBase):
  pass


class StatusUpdate(BaseModel):
  status: str
  evidence: Optional[str] = None


class TicketResponse(TicketBase):
  id: int
  status: str
  created_at: datetime
  updated_at: datetime
  history: List[TicketStatusHistoryResponse] = []

  model_config = ConfigDict(from_attributes=True)