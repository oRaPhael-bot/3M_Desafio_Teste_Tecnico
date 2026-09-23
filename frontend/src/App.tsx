import { useEffect, useState } from 'react';
import type { Ticket, CreateTicketDTO, TicketFilterOptions, TicketStatus } from './types/ticket';
import { fetchTickets, createTicket, updateTicketStatus, fetchTicketById } from './services/api';
import { TicketForm } from './components/TicketForm';
import { TicketList } from './components/TicketList';
import { TicketDetailModal } from './components/TicketDetailModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filters, setFilters] = useState<TicketFilterOptions>({ sortBy: 'created_at', order: 'desc' });
  const [newStatus, setNewStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [evidence, setEvidence] = useState('');

  const loadTickets = async () => {
    try {
      setLoading(true);
      const data = await fetchTickets(filters);
      setTickets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (ticket, status) => {
    setSelectedTicket(ticket);
    setNewStatus(status);
    setEvidence('');
    setIsModalOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedTicket) return;

    try {
      // Aqui você enviará o status (e futuramente a evidência) para a API
      await updateTicketStatus(selectedTicket.id, {
        status: newStatus,
        //Nota: O backend precisará ser atualizado para receber isso depois
      });

      setIsModalOpen(false);
      loadTickets(); // Recarrega a lista
    } catch (error) {
      console.error("Erro ao atualizar chamado", error);
      alert("Erro ao atualizar o chamado.");
    }
  };

  useEffect(() => {
    loadTickets();
  }, [filters]);

  const handleCreate = async (dto: CreateTicketDTO) => {
    await createTicket(dto);
    await loadTickets();
  };

  const handleStatusChange = async (id: number, newStatus: TicketStatus) => {
    await updateTicketStatus(id, newStatus);
    const updated = await fetchTicketById(id);
    setSelectedTicket(updated);
    await loadTickets();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Portal de Tickets de Suporte</h1>
          <p className="text-gray-500 text-sm mt-1">Gestão interna de solicitações e infraestrutura</p>
        </header>

        <TicketForm onTicketCreated={handleCreate} />

        {loading ? (
          <div className="text-center py-10 text-gray-500">A carregar chamados...</div>
        ) : (
          <TicketList
            tickets={tickets}
            filters={filters}
            onFilterChange={setFilters}
            onSelectTicket={setSelectedTicket}
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