import React from 'react';
import { Sparkles, Gamepad2, ArrowRight, ExternalLink } from 'lucide-react';
import heroImg from '../assets/images/hero_advergame_pipeline_1790722142034.jpg';

interface HeroSectionProps {
  onStartPipeline: () => void;
  onPlayGame: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartPipeline,
  onPlayGame
}) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950 py-12 md:py-20">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-3xl" />
      <div className="pointer-events-none absolute top-20 left-10 h-72 w-72 rounded-full bg-cyan-600/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Academic metadata - zero-pill text with subtle separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
              <span className="text-fuchsia-400 font-semibold">FMU TECH (Level Up)</span>
              <span aria-hidden="true">·</span>
              <span>Modelagem e Animação 3D</span>
              <span aria-hidden="true">·</span>
              <span>Prof. Hercules Ramos</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">Aula MA3D 06 (Prática 2)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-tight" style={{ textWrap: 'balance' }}>
              Advergame: Do Briefing ao Jogo no Navegador
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Aprenda na prática o ciclo profissional completo de um jogo publicitário web:
              da análise da marca e criação de mecânicas ao desenvolvimento em 3D,
              otimização para 60 FPS e conversão com Call-to-Action.
            </p>

            {/* Slogan Banner */}
            <div className="rounded-lg border border-fuchsia-500/20 bg-fuchsia-950/20 p-3.5 text-xs text-fuchsia-200/90 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white">Slogan Institucional:</span> “Você garantindo seu futuro DESDE O PRIMEIRO DIA”
              </div>
              <a
                href="https://whimsical.com/aula-ma3d-06-pratica-2-advergame-do-briefing-ao-jogo-no-navegado-AUjBvLZ5LHuEfdSBz5eXbU"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-fuchsia-400 hover:text-fuchsia-300 hover:underline whitespace-nowrap ml-4"
              >
                <span>Ver Whimsical original</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onPlayGame}
                className="inline-flex items-center gap-2.5 rounded-lg bg-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-600/20 transition-all hover:bg-fuchsia-500 active:scale-95 whitespace-nowrap"
              >
                <Gamepad2 className="h-4 w-4" />
                <span>Testar Jogo no Navegador</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onStartPipeline}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-white whitespace-nowrap"
              >
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>Explorar os 5 Passos do Pipeline</span>
              </button>
            </div>

            {/* Performance & web metrics */}
            <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-400 border-t border-slate-800/80 pt-4">
              <div>
                <span className="font-semibold text-slate-200 tabular-nums">5</span> Fases Integradas
              </div>
              <span aria-hidden="true" className="text-slate-700">|</span>
              <div>
                <span className="font-semibold text-slate-200 tabular-nums">60 FPS</span> Taxa de Render
              </div>
              <span aria-hidden="true" className="text-slate-700">|</span>
              <div>
                <span className="font-semibold text-slate-200">100% Web</span> Sem Download
              </div>
              <span aria-hidden="true" className="text-slate-700">|</span>
              <div>
                <span className="font-semibold text-slate-200">Web Audio API</span> SFX Procedural
              </div>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-2 shadow-2xl backdrop-blur-sm overflow-hidden group">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-950">
                <img
                  src={heroImg}
                  alt="Estúdio de desenvolvimento de Advergames 3D na web"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90 font-medium flex items-center justify-between">
                  <span>Pipeline 3D &middot; FMU TECH</span>
                  <span className="text-fuchsia-400 text-[11px]">WebGL &middot; 60 FPS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
