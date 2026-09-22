export type TicketCategory = 'TI' | 'Instalações' | 'RH';
export type TicketPriority = 'Baixa' | 'Média' | 'Alta' | 'Urgente';
export type TicketStatus = 'Aberto' | 'Em andamento' | 'Resolvido' | 'Fechado';


export interface StatusHistory {
  id: number;
  ticket_id: number;
  old_status: TicketStatus | null;
  new_status: TicketStatus;
  changed_at: string;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  created_at?: string;
}

export type CreateTicketDTO = Omit<Ticket, 'id' | 'created_at'>;

export interface TicketFilterOptions {
  status?: string;
  category?: string;
  priority?: string;
  sortBy?: 'created_at' | 'priority';
  order?: 'asc' | 'desc';
}