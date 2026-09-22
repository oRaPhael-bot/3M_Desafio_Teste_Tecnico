import type { Ticket, TicketFilterOptions } from '../types/ticket';

interface TicketListProps {
  tickets: Ticket[];
  filters: TicketFilterOptions;
  onFilterChange: (filters: TicketFilterOptions) => void;
  onSelectTicket: (ticket: Ticket) => void;
}

export function TicketList({ tickets, filters, onFilterChange, onSelectTicket }: TicketListProps) {
  const getStatusBadge = (status: Ticket['status']) => {
    switch (status) {
      case 'Aberto':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Em andamento':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolvido':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Fechado':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Chamados Registados</h2>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          <select
            value={filters.status || ''}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value || undefined })}
            className="text-xs p-2 border rounded-lg bg-gray-50 focus:outline-none"
          >
            <option value="">Todos os Status</option>
            <option value="Aberto">Aberto</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Resolvido">Resolvido</option>
            <option value="Fechado">Fechado</option>
          </select>

          <select
            value={filters.category || ''}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value || undefined })}
            className="text-xs p-2 border rounded-lg bg-gray-50 focus:outline-none"
          >
            <option value="">Todas as Categorias</option>
            <option value="TI">TI</option>
            <option value="Instalações">Instalações</option>
            <option value="RH">RH</option>
          </select>

          <select
            value={filters.sortBy || 'created_at'}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
            className="text-xs p-2 border rounded-lg bg-gray-50 focus:outline-none"
          >
            <option value="created_at">Ordenar por Data</option>
            <option value="priority">Ordenar por Prioridade</option>
          </select>
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">
          Nenhum chamado encontrado.
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => onSelectTicket(ticket)}
              className="py-4 hover:bg-gray-50/80 px-3 rounded-lg cursor-pointer transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-gray-400">#{ticket.id}</span>
                  <h3 className="font-semibold text-gray-900 hover:text-blue-600">{ticket.title}</h3>
                </div>
                <p className="text-xs text-gray-500 line-clamp-1">{ticket.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                  {ticket.category}
                </span>
                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                  {ticket.priority}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${getStatusBadge(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}