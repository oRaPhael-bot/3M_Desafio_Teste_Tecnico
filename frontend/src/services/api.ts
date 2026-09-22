import type { CreateTicketDTO, Ticket, TicketFilterOptions, TicketStatus } from '../types/ticket';

const API_BASE_URL = 'http://127.0.0.1:8000';

function buildTicketQuery(filters?: TicketFilterOptions) {
  if (!filters) return '';

  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.category) params.set('category', filters.category);
  if (filters.priority) params.set('priority', filters.priority);
  if (filters.sortBy) params.set('sortBy', filters.sortBy);
  if (filters.order) params.set('order', filters.order);

  const query = params.toString();
  return query ? `?${query}` : '';
}

export async function fetchTickets(filters?: TicketFilterOptions): Promise<Ticket[]> {
  const response = await fetch(`${API_BASE_URL}/tickets/${buildTicketQuery(filters)}`);
  if (!response.ok) {
    throw new Error('Falha ao carregar a lista de chamados.');
  }
  return response.json();
}

export async function createTicket(data: CreateTicketDTO): Promise<Ticket> {
  const response = await fetch(`${API_BASE_URL}/tickets/`, {
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

export async function fetchTicketById(id: number): Promise<Ticket> {
  const response = await fetch(`${API_BASE_URL}/tickets/${id}`);
  if (!response.ok) {
    throw new Error('Falha ao carregar o chamado.');
  }
  return response.json();
}

export async function updateTicketStatus(id: number, status: TicketStatus): Promise<Ticket> {
  const response = await fetch(`${API_BASE_URL}/tickets/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error('Falha ao atualizar o status do chamado.');
  }
  return response.json();
}
