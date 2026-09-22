import { useState } from 'react';
import type { Ticket, TicketStatus } from '../types/ticket';

interface TicketDetailModalProps {
  ticket: Ticket;
  onClose: () => void;
  onStatusChange: (id: number, newStatus: TicketStatus) => Promise<void>;
}

export function TicketDetailModal({ ticket, onClose, onStatusChange }: TicketDetailModalProps) {
  const [updating, setUpdating] = useState(false);

  const handleStatusSelect = async (newStatus: TicketStatus) => {
    if (newStatus === ticket.status) return;
    try {
      setUpdating(true);
      await onStatusChange(ticket.id, newStatus);
    } finally {
      setUpdating(false);
    }
  };

  const statuses: TicketStatus[] = ['Aberto', 'Em andamento', 'Resolvido', 'Fechado'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-2">#{ticket.id} - {ticket.title}</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full border">
            Categoria: {ticket.category}
          </span>
          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full border">
            Prioridade: {ticket.priority}
          </span>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Descrição</h3>
          <p className="text-gray-800 bg-gray-50 p-3 rounded-lg border">{ticket.description}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Alterar Status</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {statuses.map((st) => (
              <button
                key={st}
                disabled={updating}
                onClick={() => handleStatusSelect(st)}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition ${
                  ticket.status === st
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Histórico de Alterações</h3>
          {ticket.history && ticket.history.length > 0 ? (
            <div className="space-y-2">
              {ticket.history.map((h) => (
                <div key={h.id} className="text-xs bg-gray-50 p-2.5 rounded border flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-gray-700">
                      {h.old_status ? `${h.old_status} → ${h.new_status}` : `Criado como ${h.new_status}`}
                    </span>
                  </div>
                  <span className="text-gray-400">
                    {new Date(h.changed_at).toLocaleString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400">Sem registos no histórico.</p>
          )}
        </div>
      </div>
    </div>
  );
}