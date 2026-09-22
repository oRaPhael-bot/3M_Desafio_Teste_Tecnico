from datetime import datetime
from typing import List
from pydantic import BaseModel, ConfigDict


class TicketStatusHistoryResponse(BaseModel):
  id: int
  old_status: str
  new_status: str
  changed_at: datetime

  model_config = ConfigDict(from_attributes=True)


class TicketBase(BaseModel):
  title: str
  description: str
  category: str
  priority: str


class TicketCreate(TicketBase):
  pass


class TicketStatusUpdate(BaseModel):
  status: str


class TicketResponse(TicketBase):
  id: int
  status: str
  created_at: datetime
  updated_at: datetime
  history: List[TicketStatusHistoryResponse] = []

  model_config = ConfigDict(from_attributes=True)