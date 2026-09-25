import { useEffect, useState } from 'react';
import type { CreateTicketDTO, Ticket, TicketFilterOptions, TicketStatus } from './types/ticket';
import { fetchTickets, createTicket, updateTicketStatus, fetchTicketById } from './services/api';
import { TicketForm } from './components/TicketForm';
import { TicketList } from './components/TicketList';
import { TicketDetailModal } from './components/TicketDetailModal';

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filters, setFilters] = useState<TicketFilterOptions>({
    sortBy: 'created_at',
    order: 'desc',
  });
  const [loading, setLoading] = useState(true);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const data = await fetchTickets(filters);
      setTickets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTickets();
  }, [filters]);

  const handleCreate = async (dto: CreateTicketDTO) => {
    await createTicket(dto);
    await loadTickets();
  };

  const handleStatusChange = async (
    id: number,
    newStatus: TicketStatus,
    evidence?: string,
  ) => {
    await updateTicketStatus(id, { status: newStatus, evidence });
    const updated = await fetchTicketById(id);
    setSelectedTicket(updated);
    await loadTickets();
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 transition-colors duration-200">
      <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Portal de Tickets de Suporte
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Gestão interna de solicitações e infraestrutura
          </p>
        </header>

        <TicketForm onTicketCreated={handleCreate} />

        {loading && tickets.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            A carregar chamados...
          </div>
        ) : (
          <TicketList
            tickets={tickets}
            filters={filters}
            onFilterChange={setFilters}
            onSelectTicket={setSelectedTicket}
            onRefresh={loadTickets}
          />
        )}

        {selectedTicket && (
          <TicketDetailModal
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
}