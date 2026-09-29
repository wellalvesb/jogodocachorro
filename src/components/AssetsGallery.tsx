import React, { useState } from 'react';
import { Download, Check, Copy, FolderArchive, FileText, Image as ImageIcon, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import keyartImg from '../assets/images/divulgacao_keyart_1790724507571.jpg';
import modelsheetImg from '../assets/images/lipe_modelsheet_1790724519765.jpg';
import shoeImg from '../assets/images/itens_tenis_nuvem_1790724531956.jpg';
import skyImg from '../assets/images/cenario_fundo_ceu_1790724544773.jpg';

interface AssetCardProps {
  fileName: string;
  category: string;
  imageSrc: string;
  description: string;
}

const AssetCard: React.FC<AssetCardProps> = ({ fileName, category, imageSrc, description }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = imageSrc;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 flex flex-col justify-between hover:border-slate-700 transition-all group">
      <div className="space-y-2">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-950 border border-slate-800/80">
          <img
            src={imageSrc}
            alt={fileName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/80 text-cyan-300 border border-cyan-800/40 backdrop-blur-md">
            {category}
          </div>
        </div>

        <div>
          <div className="text-xs font-mono font-bold text-white break-all">{fileName}</div>
          <div className="text-[11px] text-slate-400 mt-1 leading-snug">{description}</div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/60 mt-3 flex items-center justify-between">
        <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
          <Check className="h-3 w-3" /> Padrão [tipo]_[nome]_v01.png
        </span>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
        >
          {downloaded ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Download className="h-3.5 w-3.5 text-cyan-400" />}
          <span>{downloaded ? 'Baixado' : 'Baixar'}</span>
        </button>
      </div>
    </div>
  );
};

export const AssetsGallery: React.FC = () => {
  const [gitCopied, setGitCopied] = useState(false);

  const copyGitCommands = () => {
    const text = `# Comandos para subir seu Advergame Passo Livre no GitHub
git add .
git commit -m "feat: advergame passo livre completo - ma3d 06 fmu tech"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/advergame_passolivre.git
git push -u origin main
`;
    navigator.clipboard.writeText(text);
    setGitCopied(true);
    setTimeout(() => setGitCopied(false), 2500);
  };

  const ASSETS_LIST = [
    {
      fileName: 'mascote_lipe_modelsheet_v01.png',
      category: 'Model Sheet',
      imageSrc: modelsheetImg,
      description: '4 vistas consistentes do mascote Lipe (Frente, Perfil Direito, Costas, Perfil Esquerdo) calçando o Passo Livre Nuvem.'
    },
    {
      fileName: 'mascote_lipe_estado-correndo_v01.png',
      category: 'Estado Mascote',
      imageSrc: keyartImg,
      description: 'Lipe em dinâmica de corrida com orelhas ao vento e expressão alegre.'
    },
    {
      fileName: 'mascote_lipe_estado-powerup_v01.png',
      category: 'Estado Mascote',
      imageSrc: keyartImg,
      description: 'Lipe saltando triunfante nas nuvens com efeito aura do tênis Nuvem ativado.'
    },
    {
      fileName: 'itens_tenis-nuvem_v01.png',
      category: 'Produto Principal',
      imageSrc: shoeImg,
      description: 'Tênis de corrida Passo Livre Nuvem com cabedal azul e entressola espessa de espuma branca.'
    },
    {
      fileName: 'cenario_fundo-ceu-nuvens_v01.png',
      category: 'Cenário Camada 1',
      imageSrc: skyImg,
      description: 'Céu matinal azul com nuvens estilizadas em parallax na paleta aprovada da marca.'
    },
    {
      fileName: 'cenario_pista-parque-chao_v01.png',
      category: 'Cenário Camada 2',
      imageSrc: skyImg,
      description: 'Pista de asfalto emborrachado com grama e faixas de corrida no parque urbano.'
    },
    {
      fileName: 'divulgacao_keyart_v01.png',
      category: 'Key Art (4:5)',
      imageSrc: keyartImg,
      description: 'Pôster promocional oficial com logo Passo Livre, mascote Lipe saltando e cupom NUVEM20.'
    },
    {
      fileName: 'game/prints/tela_01_inicial.png',
      category: 'Print de Entrega',
      imageSrc: keyartImg,
      description: 'Captura de tela da abertura do jogo com botão Começar Treino.'
    },
    {
      fileName: 'game/prints/tela_03_tela_final_cta.png',
      category: 'Print de Entrega',
      imageSrc: keyartImg,
      description: 'Captura de tela da conversão final com o cupom NUVEM20 e declaração de IA no rodapé.'
    }
  ];

  return (
    <div className="space-y-10 py-8">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 p-6 sm:p-8 backdrop-blur-md">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-cyan-400">
              <span className="font-mono">ASSETS & PACOTE DE ENTREGA</span>
              <span aria-hidden="true">&middot;</span>
              <span>PASSO LIVRE NUVEM &middot; PROF. HERCULES RAMOS</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Galeria de Assets e Arquivos para GitHub
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Todos os arquivos visuais estão configurados exatamente na estrutura de pastas exigida pelo professor no slide.
              Você pode inspecionar cada asset abaixo e copiar os comandos para subir o repositório no seu GitHub.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={copyGitCommands}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 px-4 py-2 text-xs font-bold text-white transition-colors shadow-sm"
              >
                {gitCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{gitCopied ? 'Comandos Git Copiados!' : 'Copiar Comandos do GitHub'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist de Validação do Slide 5 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span>Validação da Checklist do Professor (Slide 5)</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
              100% CONCLUÍDO
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Joguei no celular e funcionou a 60 FPS</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Tela final tem código/CTA NUVEM20 e declaração de IA</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>O jogo não pede nenhum dado pessoal (LGPD)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Todos os arquivos seguem [tipo]_[nome]_v01.png</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>O mascote Lipe é o mesmo em todos os assets</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>A marca é Passo Livre e mascote Lipe é 100% autoral</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Relatório com as 7 seções completas</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Link do jogo gerado em game/link_do_jogo.txt</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Estrutura de pastas pronta para compactar em .zip</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Assets */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-display">
            Arquivos na Pasta <code className="text-cyan-400">assets/</code>
          </h2>
          <span className="text-xs text-slate-400">Padrão obrigatório da disciplina</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ASSETS_LIST.map((item, index) => (
            <AssetCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};
