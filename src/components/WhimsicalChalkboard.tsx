import React, { useState } from 'react';
import { Target, Palette, Code2, CheckCircle2, Rocket, ArrowRight, Lightbulb, ChevronRight, Layers, Cpu } from 'lucide-react';
import { PIPELINE_STAGES } from '../data/pipelineData';
import { StageId } from '../types/advergame';
import chalkboardImg from '../assets/images/chalkboard_pipeline_flow_1790722165660.jpg';

interface WhimsicalChalkboardProps {
  onPlayGame: () => void;
  onOpenGDDLab: () => void;
}

export const WhimsicalChalkboard: React.FC<WhimsicalChalkboardProps> = ({
  onPlayGame,
  onOpenGDDLab
}) => {
  const [selectedStageId, setSelectedStageId] = useState<StageId>('briefing');
  const activeStage = PIPELINE_STAGES.find((s) => s.id === selectedStageId) || PIPELINE_STAGES[0];

  const getStageIcon = (id: StageId) => {
    switch (id) {
      case 'briefing':
        return <Target className="h-5 w-5 text-fuchsia-400" />;
      case 'design':
        return <Palette className="h-5 w-5 text-cyan-400" />;
      case 'dev':
        return <Code2 className="h-5 w-5 text-emerald-400" />;
      case 'qa':
        return <CheckCircle2 className="h-5 w-5 text-amber-400" />;
      case 'launch':
        return <Rocket className="h-5 w-5 text-rose-400" />;
    }
  };

  return (
    <div className="space-y-10 py-10">
      {/* Header of Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3 px-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-fuchsia-400 tracking-wider">
          <Lightbulb className="h-4 w-4" />
          <span>DIAGRAMA METODOLÓGICO DA AULA MA3D 06</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white font-display" style={{ textWrap: 'balance' }}>
          Do Briefing ao Jogo Jogável no Navegador
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          O quadro mental do Whimsical mapeia a transição fluida entre as necessidades de negócios da marca,
          a concepção de game design 3D e a engenharia web de alta performance.
        </p>
      </div>

      {/* Visual Chalkboard Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 shadow-xl overflow-hidden">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-slate-950">
            <img
              src={chalkboardImg}
              alt="Diagrama do Whimsical da Aula MA3D 06"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs text-white">
              <span className="font-semibold tracking-wide text-fuchsia-300">
                FMU TECH &middot; Prof. Hercules Ramos &middot; Prática 2
              </span>
              <span className="text-slate-300">
                Clique nos 5 passos abaixo para explorar cada etapa
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Step Pipeline Interactive Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PIPELINE_STAGES.map((stage, idx) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`relative flex flex-col text-left p-4 rounded-xl border transition-all text-sm ${
                  isSelected
                    ? 'border-fuchsia-500 bg-slate-900 shadow-lg shadow-fuchsia-950/40'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      0{stage.stepNumber}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Etapa
                    </span>
                  </div>
                  <div>{getStageIcon(stage.id)}</div>
                </div>

                <div className="font-bold text-white text-base mb-1">
                  {stage.title}
                </div>
                <div className="text-xs text-slate-400 line-clamp-2">
                  {stage.subtitle}
                </div>

                {isSelected && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-fuchsia-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* In-depth Stage Card Presentation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-md">
          {/* Card Title & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                <span className="text-fuchsia-400 font-semibold font-mono">Fase 0{activeStage.stepNumber} de 05</span>
                <span aria-hidden="true">&middot;</span>
                <span>Pipeline de Advergame Web</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {activeStage.title}
              </h3>
              <p className="text-sm font-medium text-fuchsia-300/90 mt-1">
                {activeStage.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {activeStage.id === 'launch' ? (
                <button
                  onClick={onPlayGame}
                  className="inline-flex items-center gap-2 rounded-lg bg-fuchsia-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-fuchsia-500 transition-colors whitespace-nowrap"
                >
                  <span>Executar Jogo no Navegador</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={onOpenGDDLab}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors whitespace-nowrap"
                >
                  <span>Abrir Briefing & GDD Lab</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Card Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Left Column: Summary & Marketing Focus */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Visão Geral da Etapa
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {activeStage.summary}
                </p>
              </div>

              <div className="rounded-xl border border-fuchsia-500/20 bg-fuchsia-950/20 p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-fuchsia-400">
                  <Target className="h-4 w-4" />
                  <span>Foco Estratégico de Marketing</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeStage.marketingFocus}
                </p>
              </div>

              <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                  <Cpu className="h-4 w-4" />
                  <span>Dica de Navegador Web & Performance</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  {activeStage.browserTips.map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Creative Tasks, Tech Tasks & Deliverables */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Creative / 3D Tasks */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Palette className="h-4 w-4 text-cyan-400" />
                    <span>Design, Arte 3D & Conteúdo</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2">
                    {activeStage.creativeTasks.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold mt-0.5">&bull;</span>
                        <span className="leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech / Dev Tasks */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Code2 className="h-4 w-4 text-emerald-400" />
                    <span>Engenharia & Otimização Web</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2">
                    {activeStage.technicalTasks.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold mt-0.5">&bull;</span>
                        <span className="leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Deliverables Box */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Layers className="h-4 w-4 text-amber-400" />
                  <span>Entregáveis Avaliados na Prática 2 (Prof. Hercules Ramos)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {activeStage.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-slate-800 bg-slate-900/80 p-2.5 text-xs text-slate-200"
                    >
                      <span className="text-fuchsia-400 font-mono font-bold mr-1.5">{idx + 1}.</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
