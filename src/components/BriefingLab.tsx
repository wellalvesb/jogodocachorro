import React, { useState } from 'react';
import { Sliders, Download, Check, Sparkles, Gamepad2, ArrowRight } from 'lucide-react';
import { BrandBriefing } from '../types/advergame';

interface BriefingLabProps {
  briefing: BrandBriefing;
  onUpdateBriefing: (updated: BrandBriefing) => void;
  onLaunchGame: () => void;
}

const BRAND_PRESETS: BrandBriefing[] = [
  {
    brandName: 'FMU TECH',
    slogan: 'Você garantindo seu futuro DESDE O PRIMEIRO DIA',
    themeColor: '#d946ef', // fuchsia / magenta
    themeAccent: '#06b6d4',
    productName: 'Tech Orbs de Conhecimento',
    productType: 'Badge Educacional',
    ctaType: 'Bolsa de Estudos',
    ctaTitle: 'Conquiste até 100% de Bolsa no Vestibular Tech da FMU!',
    ctaCode: 'FMULEVELUP2026',
    ctaLink: 'https://fmu.br',
    difficulty: 'equilibrado',
    targetAudience: 'Estudantes e jovens talentos interessados em tecnologia, 3D e games.'
  },
  {
    brandName: 'NEXUS ENERGY',
    slogan: 'Energia Pura para Bater Todos os Seus Recordes',
    themeColor: '#10b981', // emerald
    themeAccent: '#3b82f6',
    productName: 'Latas de Energético Gelado',
    productType: 'Bebida Energética',
    ctaType: 'Cupom de Desconto',
    ctaTitle: 'Ganhe 40% OFF no pack de 12 latas no delivery oficial!',
    ctaCode: 'NEXUSBOOST40',
    ctaLink: 'https://example.com/nexus',
    difficulty: 'dificil',
    targetAudience: 'Gamers de esportes eletrônicos e streamers que buscam foco e reflexos rápidos.'
  },
  {
    brandName: 'BURGER CYBER',
    slogan: 'O Sabor do Futuro Direto na Sua Mesa',
    themeColor: '#f97316', // orange / amber
    themeAccent: '#ef4444',
    productName: 'Mega Burgers Defumados',
    productType: 'Fast Food Gourmet',
    ctaType: 'Combo Grátis',
    ctaTitle: 'Apresente seu print na loja física e ganhe Batata Grande grátis!',
    ctaCode: 'CYBERCOMBOFREE',
    ctaLink: 'https://example.com/burger',
    difficulty: 'facil',
    targetAudience: 'Consumidores de delivery de comida rápida entre 16 e 35 anos.'
  }
];

export const BriefingLab: React.FC<BriefingLabProps> = ({
  briefing,
  onUpdateBriefing,
  onLaunchGame
}) => {
  const [formData, setFormData] = useState<BrandBriefing>(briefing);
  const [copiedGDD, setCopiedGDD] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const handleChange = (field: keyof BrandBriefing, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBriefing(formData);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleApplyPreset = (preset: BrandBriefing) => {
    setFormData(preset);
    onUpdateBriefing(preset);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  // Generate complete Academic GDD Markdown for Prof. Hercules Ramos
  const generateGDDMarkdown = () => {
    return `# Game Design Document (GDD) - Advergame Web
**Disciplina:** Modelagem e Animação 3D (MA3D 06)  
**Instituição:** FMU TECH (Level Up)  
**Docente:** Prof. Hercules Ramos  
**Data:** ${new Date().toLocaleDateString('pt-BR')}  

---

## 1. O Briefing da Marca
* **Marca Anunciante:** ${formData.brandName}
* **Slogan Oficial:** "${formData.slogan}"
* **Público-Alvo / Persona:** ${formData.targetAudience}
* **Produto Coletável Principal:** ${formData.productName} (${formData.productType})

---

## 2. Design e Conceito (Core Loop)
* **Gênero:** 3D Pseudo-Perspective Casual Endless Runner
* **Plataforma:** Web Browser (Desktop e Mobile sem instalação)
* **Tempo Médio de Sessão:** 45 a 90 segundos
* **Regras do Jogo:**
  1. O jogador controla o mascote correndo por 3 faixas cibernéticas.
  2. Ao coletar **${formData.productName}**, acumula pontos e alimenta o multiplicador de combo (1x a 8x).
  3. Desviar de barreiras de Firewall e spikes para evitar Game Over.
  4. Power-ups de Escudo Protetor e Ímã Magnético para amplificar a retenção.

---

## 3. Desenvolvimento & Especificações Técnicas
* **Motor de Renderização:** HTML5 Canvas / WebGL (60 FPS contínuos)
* **Assets 3D:** Modelos Low-Poly texturizados via UV Atlas otimizado
* **Sistema de Áudio:** Web Audio API com sintetizador procedural (Zero dependência de arquivos pesados)
* **Controles:** Teclado (Setas / A-D / Espaço) e Touch Virtual (Mobile Responsivo)

---

## 4. Testes e Polimento (QA & Game Feel)
* **Juice:** Partículas dinâmicas neon, screen shake de colisão e feedback de combo sonoro.
* **Compatibilidade:** Testado em Chrome, Safari iOS, Edge e Firefox.

---

## 5. Lançamento e Conversão (Marketing CTA)
* **Oferta ao Final da Partida:** ${formData.ctaTitle}
* **Código Promocional:** \`${formData.ctaCode}\`
* **Link de Conversão:** ${formData.ctaLink}
* **Métrica Principal (KPI):** Taxa de clique no CTA final e tempo médio de exposição à marca.
`;
  };

  const copyGDD = () => {
    const md = generateGDDMarkdown();
    navigator.clipboard.writeText(md);
    setCopiedGDD(true);
    setTimeout(() => setCopiedGDD(false), 2500);
  };

  const downloadGDDFile = () => {
    const md = generateGDDMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `GDD_Advergame_${formData.brandName.replace(/\s+/g, '_')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-fuchsia-400 mb-1">
            <Sliders className="h-4 w-4" />
            <span>LABORATÓRIO PRÁTICO &middot; BRIEFING & GDD GENERATOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Customizador de Briefing e Gerador de GDD
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Configure a marca patrocinadora, defina o produto que o jogador coletará e veja o jogo no navegador mudar em tempo real! Exporte o Game Design Document pronto para entrega da aula.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3">
          <button
            onClick={downloadGDDFile}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-200 border border-slate-700 bg-slate-900/80 px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5 text-cyan-400" />
            <span>Baixar GDD (.md)</span>
          </button>
          <button
            onClick={copyGDD}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-200 border border-slate-700 bg-slate-900/80 px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            {copiedGDD ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" />}
            <span>{copiedGDD ? 'GDD Copiado!' : 'Copiar GDD'}</span>
          </button>
        </div>
      </div>

      {/* Preset Brands Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Carregar Briefings Pré-Configurados:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BRAND_PRESETS.map((preset) => (
              <button
                key={preset.brandName}
                onClick={() => handleApplyPreset(preset)}
                className={`p-3 rounded-lg border text-left transition-all text-xs ${
                  formData.brandName === preset.brandName
                    ? 'border-fuchsia-500 bg-slate-900 shadow-md'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-white mb-1">
                  <span>{preset.brandName}</span>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: preset.themeColor }}
                  />
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1">
                  Coletável: {preset.productName}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form & Realtime Preview */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleApply} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Input Form Controls */}
          <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
            <h3 className="text-base font-bold text-white font-display border-b border-slate-800 pb-3">
              1. Parâmetros do Briefing Publicitário
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nome da Marca Anunciante
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => handleChange('brandName', e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-fuchsia-500 focus:outline-none"
                  placeholder="Ex: FMU TECH"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Cor da Identidade Visual
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.themeColor}
                    onChange={(e) => handleChange('themeColor', e.target.value)}
                    className="h-9 w-12 rounded cursor-pointer border border-slate-700 bg-slate-950 p-0.5"
                  />
                  <input
                    type="text"
                    value={formData.themeColor}
                    onChange={(e) => handleChange('themeColor', e.target.value)}
                    className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-white focus:border-fuchsia-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Slogan Oficial da Campanha
              </label>
              <input
                type="text"
                value={formData.slogan}
                onChange={(e) => handleChange('slogan', e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-fuchsia-500 focus:outline-none"
                placeholder="Ex: Você garantindo seu futuro DESDE O PRIMEIRO DIA"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Item Coletável no Jogo
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => handleChange('productName', e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-fuchsia-500 focus:outline-none"
                  placeholder="Ex: Tech Orbs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Dificuldade da Campanha
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => handleChange('difficulty', e.target.value as 'facil' | 'equilibrado' | 'dificil')}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-fuchsia-500 focus:outline-none"
                >
                  <option value="facil">Fácil (Mais casual / Alto engajamento)</option>
                  <option value="equilibrado">Equilibrado (Padrão de Advergame)</option>
                  <option value="dificil">Difícil (Desafio intenso para gamers)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Persona e Público-Alvo
              </label>
              <textarea
                rows={2}
                value={formData.targetAudience}
                onChange={(e) => handleChange('targetAudience', e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-fuchsia-500 focus:outline-none resize-none"
                placeholder="Descreva quem irá jogar este advergame..."
              />
            </div>

            <h3 className="text-base font-bold text-white font-display border-b border-slate-800 pb-2 pt-2">
              2. Conversão & Recompensa Publicitária (CTA)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Título da Recompensa
                </label>
                <input
                  type="text"
                  value={formData.ctaTitle}
                  onChange={(e) => handleChange('ctaTitle', e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-fuchsia-500 focus:outline-none"
                  placeholder="Ex: Conquiste até 100% de Bolsa!"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Código do Cupom / Promo
                </label>
                <input
                  type="text"
                  value={formData.ctaCode}
                  onChange={(e) => handleChange('ctaCode', e.target.value.toUpperCase())}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono font-bold text-fuchsia-400 focus:border-fuchsia-500 focus:outline-none"
                  placeholder="Ex: FMULEVELUP2026"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-fuchsia-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-fuchsia-500 shadow-md transition-all active:scale-95"
              >
                {justSaved ? <Check className="h-4 w-4" /> : null}
                <span>{justSaved ? 'Briefing Salvo no Jogo!' : 'Aplicar ao Jogo Agora'}</span>
              </button>

              <button
                type="button"
                onClick={onLaunchGame}
                className="inline-flex items-center gap-2 text-xs font-semibold text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
              >
                <Gamepad2 className="h-4 w-4" />
                <span>Testar no Jogo Web &rarr;</span>
              </button>
            </div>
          </div>

          {/* Right: Real-time Live Advergame Preview Card */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Prévia da Tela de Vitória / Conversão
                </span>
                <span
                  className="h-3 w-3 rounded-full shadow-sm"
                  style={{ backgroundColor: formData.themeColor }}
                />
              </div>

              {/* Mock Game Over / Victory Modal Displaying Live Brand */}
              <div
                className="rounded-xl p-5 border text-center space-y-3"
                style={{
                  backgroundColor: '#070a14',
                  borderColor: formData.themeColor + '44'
                }}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {formData.brandName} Rush
                </div>

                <div className="text-xl font-black text-white font-display">
                  Vitória! Obrigado por Jogar!
                </div>

                <div className="text-xs text-slate-300 italic">
                  &ldquo;{formData.slogan}&rdquo;
                </div>

                <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3 text-left space-y-2">
                  <div className="text-[11px] font-semibold text-slate-200">
                    {formData.ctaTitle}
                  </div>
                  <div className="bg-slate-950 p-2 rounded text-xs font-mono font-bold text-center text-white border border-slate-800">
                    CUPOM: {formData.ctaCode}
                  </div>
                  <div
                    className="w-full py-2 rounded text-center text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: formData.themeColor }}
                  >
                    Resgatar Oferta da Marca &rarr;
                  </div>
                </div>

                <div className="text-[10px] text-slate-500">
                  Este mockup simula a conversão gerada pelo Advergame no navegador ao final de uma sessão.
                </div>
              </div>

              {/* Quick Summary of GDD */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2 text-xs text-slate-300">
                <div className="font-semibold text-white">Resumo Técnico do GDD:</div>
                <div className="space-y-1 text-slate-400 text-[11px]">
                  <div>&bull; Core Loop: Coletar {formData.productName} e desviar de barreiras</div>
                  <div>&bull; Render: HTML5 Canvas 60 FPS com Web Audio API</div>
                  <div>&bull; Dificuldade: {formData.difficulty.toUpperCase()}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={onLaunchGame}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs py-3 transition-colors shadow-sm"
              >
                <span>Ir para o Jogo no Navegador</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
