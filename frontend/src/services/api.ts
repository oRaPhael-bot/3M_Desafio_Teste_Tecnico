import type {CreateTicketDTO, Ticket} from "../types/ticket.ts";

const API_BASE_URL = 'http://127.0.0.1:8000';

export async function fetchTickets(): Promise<Ticket[]> {
  const response = await fetch(`${API_BASE_URL}/tickets`);
  if (!response.ok) {
    throw new Error('Falha ao carregar a lista de chamados.');
  }
  return response.json();
}

export async function createTicket(data: CreateTicketDTO): Promise<Ticket> {
  const response = await fetch(`${API_BASE_URL}/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Falha ao criar o chamado.');
  }
  return response.json();
}
