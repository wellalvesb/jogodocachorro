import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-10 text-xs text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="font-bold text-slate-200 font-display">
            FMU TECH (Level Up) &middot; Modelagem e Animação 3D
          </div>
          <div className="text-slate-400">
            Aula MA3D 06 (Prática 2) &middot; Prof. Hercules Ramos
          </div>
          <div className="text-[11px] text-fuchsia-400 font-medium">
            &ldquo;Você garantindo seu futuro DESDE O PRIMEIRO DIA&rdquo;
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
          <a
            href="https://whimsical.com/aula-ma3d-06-pratica-2-advergame-do-briefing-ao-jogo-no-navegado-AUjBvLZ5LHuEfdSBz5eXbU"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <span>Quadro Whimsical Original</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <span className="hidden sm:inline text-slate-700">|</span>

          <span className="flex items-center gap-1 text-slate-500">
            Desenvolvido com <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> para fins pedagógicos
          </span>
        </div>
      </div>
    </footer>
  );
};
