import { useState } from 'react';
import type { Ticket, TicketStatus } from '../types/ticket';

interface TicketDetailModalProps {
  ticket: Ticket;
  onClose: () => void;
  onStatusChange: (id: number, newStatus: TicketStatus, evidence?: string) => Promise<void>;
}

export function TicketDetailModal({ ticket, onClose, onStatusChange }: TicketDetailModalProps) {
  const [updating, setUpdating] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<TicketStatus | null>(null);
  const [evidence, setEvidence] = useState('');

  const handleStatusSelect = (newStatus: TicketStatus) => {
    if (newStatus === ticket.status) return;
    setPendingStatus(newStatus);
    setEvidence('');
  };

  const handleConfirm = async () => {
    if (!pendingStatus) return;

    try {
      setUpdating(true);
      await onStatusChange(ticket.id, pendingStatus, evidence.trim() || undefined);
      setPendingStatus(null);
      setEvidence('');
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
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg font-bold cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          #{ticket.id} - {ticket.title}
        </h2>

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
                className={`cursor-pointer select-none py-2 px-3 rounded-lg text-xs font-semibold border transition-all active:scale-[0.98] ${
                  ticket.status === st
                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {pendingStatus && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
            <label htmlFor="status-evidence" className="block text-sm font-medium text-blue-900 mb-2">
              Evidência da alteração para "{pendingStatus}"
            </label>
            <textarea
              id="status-evidence"
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              rows={3}
              placeholder="Descreva o que foi feito..."
              className="w-full border border-blue-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={updating}
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                type="button"
                onClick={() => {
                  setPendingStatus(null);
                  setEvidence('');
                }}
                disabled={updating}
                className="cursor-pointer select-none px-3 py-2 rounded-lg text-xs font-semibold border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-[0.98] disabled:opacity-50 transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={updating}
                className="cursor-pointer select-none px-3 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 transition-all"
              >
                {updating ? 'A atualizar...' : 'Confirmar'}
              </button>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Histórico de Alterações</h3>
          {ticket.history && ticket.history.length > 0 ? (
            <div className="space-y-2">
              {ticket.history.map((h) => (
                <div
                  key={h.id}
                  className="text-xs bg-gray-50 p-2.5 rounded border flex justify-between items-center"
                >
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