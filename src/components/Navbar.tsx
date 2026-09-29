import React from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';

export type TabType = 'game' | 'briefing' | 'assets' | 'checklist' | 'guide';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPlayNow: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  onToggleSound,
  onPlayNow
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('game');
          }}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-white font-display hover:text-cyan-400 transition-colors"
        >
          <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
          <span>Passo Livre: Corrida nas Nuvens</span>
        </a>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('game')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeTab === 'game' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Jogo no Navegador
          </button>
          <button
            onClick={() => setActiveTab('briefing')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeTab === 'briefing' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Mini-GDD de 1 Página
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeTab === 'assets' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Galeria de Assets & GitHub
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeTab === 'checklist' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Relatório & Checklist
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeTab === 'guide' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Instruções da Aula
          </button>
        </nav>

        {/* Primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Desativar áudio' : 'Ativar áudio'}
            title={soundEnabled ? 'Áudio ativado' : 'Áudio mudo'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 transition-colors hover:border-slate-700 hover:text-white hover:bg-slate-800"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 text-cyan-400" /> : <VolumeX className="h-4 w-4 text-slate-500" />}
          </button>

          <button
            onClick={onPlayNow}
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-cyan-500 hover:shadow-cyan-500/25 active:scale-95 whitespace-nowrap"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Jogar Agora</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden border-t border-slate-800/60 bg-slate-950/95 px-3 py-2 justify-around text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('game')}
          className={`py-1 px-2.5 rounded whitespace-nowrap ${activeTab === 'game' ? 'text-cyan-400 font-semibold bg-cyan-950/40' : 'text-slate-400'}`}
        >
          Jogo
        </button>
        <button
          onClick={() => setActiveTab('briefing')}
          className={`py-1 px-2.5 rounded whitespace-nowrap ${activeTab === 'briefing' ? 'text-cyan-400 font-semibold bg-cyan-950/40' : 'text-slate-400'}`}
        >
          Mini-GDD
        </button>
        <button
          onClick={() => setActiveTab('assets')}
          className={`py-1 px-2.5 rounded whitespace-nowrap ${activeTab === 'assets' ? 'text-cyan-400 font-semibold bg-cyan-950/40' : 'text-slate-400'}`}
        >
          Assets
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`py-1 px-2.5 rounded whitespace-nowrap ${activeTab === 'checklist' ? 'text-cyan-400 font-semibold bg-cyan-950/40' : 'text-slate-400'}`}
        >
          Relatório
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`py-1 px-2.5 rounded whitespace-nowrap ${activeTab === 'guide' ? 'text-cyan-400 font-semibold bg-cyan-950/40' : 'text-slate-400'}`}
        >
          Guia
        </button>
      </div>
    </header>
  );
};
