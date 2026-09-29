import React, { useState } from 'react';
import { CheckCircle2, Circle, GraduationCap, Award, Check } from 'lucide-react';
import { INITIAL_CHECKLIST } from '../data/pipelineData';
import { ChecklistItem } from '../types/advergame';

interface RubricChecklistProps {
  onGoToGame: () => void;
}

export const RubricChecklist: React.FC<RubricChecklistProps> = ({ onGoToGame }) => {
  const [items, setItems] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = items.filter((i) => i.completed).length;
  const grade = ((completedCount / items.length) * 10).toFixed(1);

  const categories = ['Briefing', '3D & Arte', 'Código', 'Polimento', 'Marketing'] as const;

  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-fuchsia-400 mb-1">
            <GraduationCap className="h-4 w-4" />
            <span>AVALIAÇÃO PRÁTICA &middot; DISCIPLINA MA3D 06</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Checklist de Entrega da Prática 2
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Verifique todos os requisitos pedagógicos estipulados pelo Prof. Hercules Ramos para garantir nota máxima no desenvolvimento do seu Advergame para navegador.
          </p>
        </div>

        {/* Grade Badge */}
        <div className="rounded-xl border border-fuchsia-500/30 bg-slate-900/80 p-3.5 flex items-center gap-4">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Nota Estimada da Prática</div>
            <div className="text-2xl font-black font-mono text-fuchsia-400 tabular-nums">
              {grade} <span className="text-xs text-slate-400 font-normal">/ 10.0</span>
            </div>
          </div>
          <Award className="h-7 w-7 text-amber-400" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
            <span>Progresso da Checklist</span>
            <span className="font-mono text-fuchsia-400">
              {completedCount} de {items.length} itens concluídos ({Math.round((completedCount / items.length) * 100)}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-fuchsia-600 to-cyan-500 transition-all duration-300"
              style={{ width: `${(completedCount / items.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist Groups */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => {
            const catItems = items.filter((i) => i.category === category);
            return (
              <div key={category} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>{category}</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {catItems.filter((i) => i.completed).length} / {catItems.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {catItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                        item.completed
                          ? 'border-fuchsia-500/30 bg-fuchsia-950/10'
                          : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="mt-0.5">
                        {item.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-950" />
                        ) : (
                          <Circle className="h-4 w-4 text-slate-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`text-xs font-semibold ${item.completed ? 'text-white' : 'text-slate-300'}`}>
                          {item.label}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                          {item.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Advice Card */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Check className="h-5 w-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white">Dica do Docente:</span> Advergames eficazes não são sobre gráficos hiper-realistas, mas sim sobre resposta rápida aos comandos, baixa barreira de entrada e recompensa clara associada ao anunciante.
            </div>
          </div>
          <button
            onClick={onGoToGame}
            className="rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 px-4 py-2 text-white font-semibold whitespace-nowrap transition-colors"
          >
            Jogar Advergame &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
