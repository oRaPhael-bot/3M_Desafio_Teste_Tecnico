import React, { useState } from 'react';
import type { CreateTicketDTO, TicketCategory, TicketPriority } from '../types/ticket';

interface TicketFormProps {
  onTicketCreated: (ticket: CreateTicketDTO) => Promise<void>;
  darkMode?: boolean;
}

export function TicketForm({ onTicketCreated, darkMode = false }: TicketFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TicketCategory>('TI');
  const [priority, setPriority] = useState<TicketPriority>('Média');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    try {
      setSubmitting(true);
      await onTicketCreated({
        title,
        description,
        category,
        priority,
        status: 'Aberto',
      });
      setTitle('');
      setDescription('');
      setCategory('TI');
      setPriority('Média');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-6 rounded-xl shadow-sm border mb-8 ${
        darkMode
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-200'
      }`}
    >
      <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Novo Chamado
      </h2>

      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>
            Título
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Impressora do RH desconectada"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              darkMode
                ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-400'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            required
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>
            Descrição
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Descreva o problema com detalhes..."
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              darkMode
                ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-400'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TicketCategory)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                darkMode
                  ? 'bg-slate-700 border-slate-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="TI">TI</option>
              <option value="Instalações">Instalações</option>
              <option value="RH">RH</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>
              Prioridade
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TicketPriority)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                darkMode
                  ? 'bg-slate-700 border-slate-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
              <option value="Urgente">Urgente</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50 mt-2"
        >
          {submitting ? 'A submeter...' : 'Criar Chamado'}
        </button>
      </div>
    </form>
  );
}