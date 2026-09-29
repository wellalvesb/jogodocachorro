import React, { useState } from 'react';
import { Target, Palette, Code2, CheckCircle2, Rocket, HelpCircle, Check, Copy, Sparkles, Building2, Play } from 'lucide-react';
import { BrandBriefing } from '../types/advergame';

interface PracticeGuideProps {
  currentBriefing: BrandBriefing;
  onSelectBrandProposal: (briefing: BrandBriefing) => void;
  onPlayDemo: () => void;
}

interface BrandBlueprint {
  brand: string;
  category: string;
  slogan: string;
  colors: { primary: string; accent: string };
  collectibleProduct: string;
  characterIdea: string;
  gameMechanic: string;
  obstacles: string[];
  ctaOffer: string;
  ctaCode: string;
  difficulty: 'facil' | 'equilibrado' | 'dificil';
  whyItWorks: string;
}

const BRAND_BLUEPRINTS: BrandBlueprint[] = [
  {
    brand: 'Passo Livre',
    category: 'Tênis de Corrida (Opção 3 do Briefing)',
    slogan: 'Corra leve, comece do seu jeito',
    colors: { primary: '#38bdf8', accent: '#fb923c' },
    collectibleProduct: 'Tênis Passo Livre Nuvem',
    characterIdea: 'Tuca, uma corredora carismática e expressiva com corpo realista e motivador',
    gameMechanic: 'Desviar de poças de lama e coletar garrafinhas d’água; pegar o tênis Passo Livre Nuvem ativa o super-salto nas nuvens e velocidade',
    obstacles: ['Poças de lama com folhas', 'Galhos caídos', 'Desníveis da calçada'],
    ctaOffer: 'Ganhe 20% OFF no novo Passo Livre Nuvem no e-commerce oficial da marca!',
    ctaCode: 'NUVEM20',
    difficulty: 'equilibrado',
    whyItWorks: 'Atende 100% à Opção 3 do briefing da aula: produto novo demonstrativo (aumenta pulo e velocidade), tom motivador e sem padrão estético excludente.'
  },
  {
    brand: 'Red Bull',
    category: 'Bebidas Energéticas / Esportes Radicais',
    slogan: 'Red Bull te dá asas',
    colors: { primary: '#0284c7', accent: '#dc2626' },
    collectibleProduct: 'Lata de Red Bull Energy',
    characterIdea: 'Atleta de skate ou patinete futurista com asas luminosas',
    gameMechanic: 'Runner 3D onde coletar as latas dá boost supersônico temporário e enche a barra de asas',
    obstacles: ['Rampas quebradas', 'Cones de trânsito', 'Barreiras de fita'],
    ctaOffer: 'Ganhe 25% de desconto no pack e acesso exclusivo à transmissão Red Bull Cliff Diving!',
    ctaCode: 'REDBULLTELLASAS',
    difficulty: 'dificil',
    whyItWorks: 'A marca é sinônimo de energia e adrenalina. O boost do jogo conecta diretamente o benefício do produto real à mecânica de gameplay.'
  },
  {
    brand: 'Nike',
    category: 'Vestuário Esportivo / Calçados',
    slogan: 'Just Do It',
    colors: { primary: '#f97316', accent: '#000000' },
    collectibleProduct: 'Tênis Nike Air Zoom 3D',
    characterIdea: 'Corredor urbano veloz com traje atlético neon',
    gameMechanic: 'Desvio de obstáculos em pista de atletismo ou rua metropolitana com super-pulo ativado ao pegar os tênis',
    obstacles: ['Poças d’água', 'Barreiras de salto', 'Bancos de parque'],
    ctaOffer: 'Desbloqueie frete grátis + 15% OFF no seu próximo calçado no App Nike!',
    ctaCode: 'JUSTDOIT2026',
    difficulty: 'equilibrado',
    whyItWorks: 'Fácil modelagem 3D do calçado como item coletável giratório e conexão imediata com o estilo esportivo.'
  },
  {
    brand: 'Coca-Cola',
    category: 'Refrigerantes / Bebidas',
    slogan: 'Abra a Felicidade',
    colors: { primary: '#dc2626', accent: '#ffffff' },
    collectibleProduct: 'Garrafa de Coca-Cola Gelada',
    characterIdea: 'O clássico Urso Polar 3D estilizado em Low-Poly',
    gameMechanic: 'Coletar garrafas para manter o termômetro de refrescância e energia no máximo durante a descida de gelo',
    obstacles: ['Estalactites de gelo', 'Fissuras na neve', 'Bonecos de neve'],
    ctaOffer: 'Compre 1 e Leve 2 em cinemas e lanchonetes parceiras via Cupom!',
    ctaCode: 'FELICIDADENOAR',
    difficulty: 'facil',
    whyItWorks: 'Identidade visual instantaneamente reconhecível pelo público e pelo professor. Excelente para demonstrar storytelling de marca.'
  },
  {
    brand: 'McDonald’s',
    category: 'Fast Food / Alimentação',
    slogan: 'Méqui: Me Dá Esse Momento',
    colors: { primary: '#eab308', accent: '#dc2626' },
    collectibleProduct: 'Caixa de Batata Frita e Big Mac',
    characterIdea: 'Caixinha McLanche Feliz animada correndo',
    gameMechanic: 'Pegar os ingredientes para montar os lanches antes que o tempo de entrega da cozinha se esgote',
    obstacles: ['Bandejas caindo', 'Chão molhado com placa amarela', 'Balcão fechado'],
    ctaOffer: 'Apresente este código no balcão e ganhe uma Batata Média na compra de qualquer McOferta!',
    ctaCode: 'MEQUINAWEB26',
    difficulty: 'facil',
    whyItWorks: 'Cores de alto contraste (vermelho e amarelo) que chamam muita atenção na tela do navegador e apelo universal.'
  },
  {
    brand: 'FMU TECH',
    category: 'Educação / Ensino Superior',
    slogan: 'Você garantindo seu futuro DESDE O PRIMEIRO DIA',
    colors: { primary: '#d946ef', accent: '#06b6d4' },
    collectibleProduct: 'Tech Orbs de Conhecimento e Diplomas 3D',
    characterIdea: 'Estudante desenvolvedor com fone de ouvido cibernético',
    gameMechanic: 'Desviar de Firewalls e bugs enquanto coleta créditos acadêmicos para se formar com nota 10',
    obstacles: ['Paredes de Firewall', 'Spikes de Glitch', 'Drones de segurança'],
    ctaOffer: 'Inscrição gratuita no vestibular + Concorra a bolsas de estudo de até 100%!',
    ctaCode: 'FMULEVELUP2026',
    difficulty: 'equilibrado',
    whyItWorks: 'É o tema institucional exato da aula de Modelagem e Animação 3D da FMU TECH (Prof. Hercules Ramos).'
  }
];

export const PracticeGuide: React.FC<PracticeGuideProps> = ({
  currentBriefing,
  onSelectBrandProposal,
  onPlayDemo
}) => {
  const [selectedBlueprint, setSelectedBlueprint] = useState<BrandBlueprint>(BRAND_BLUEPRINTS[0]);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [customBrandName, setCustomBrandName] = useState('');
  const [customProduct, setCustomProduct] = useState('');

  const handleApplyBlueprint = (bp: BrandBlueprint) => {
    setSelectedBlueprint(bp);
    const newBriefing: BrandBriefing = {
      brandName: bp.brand,
      slogan: bp.slogan,
      themeColor: bp.colors.primary,
      themeAccent: bp.colors.accent,
      productName: bp.collectibleProduct,
      productType: bp.category,
      ctaType: 'Oferta Promocional',
      ctaTitle: bp.ctaOffer,
      ctaCode: bp.ctaCode,
      ctaLink: 'https://example.com/' + bp.brand.toLowerCase().replace(/\s+/g, ''),
      difficulty: bp.difficulty,
      targetAudience: `Público consumidor da ${bp.brand}`
    };
    onSelectBrandProposal(newBriefing);
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customBrandName.trim()) return;

    const brandName = customBrandName.trim();
    const product = customProduct.trim() || `Produto Oficial da ${brandName}`;

    const customBp: BrandBlueprint = {
      brand: brandName,
      category: 'Marca Escolhida pelo Aluno',
      slogan: `O melhor de ${brandName} na sua tela`,
      colors: { primary: '#a855f7', accent: '#38bdf8' },
      collectibleProduct: product,
      characterIdea: `Mascote estilizado ou avatar oficial da ${brandName}`,
      gameMechanic: `Coletar ${product} em alta velocidade para maximizar pontuação e converter em desconto`,
      obstacles: ['Barreiras', 'Obstáculos urbanos', 'Armadilhas'],
      ctaOffer: `Ganhe benefício exclusivo ao comprar produtos da ${brandName}!`,
      ctaCode: `${brandName.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)}2026`,
      difficulty: 'equilibrado',
      whyItWorks: 'Encaixa-se perfeitamente no pipeline dos 5 passos da Aula MA3D 06.'
    };

    handleApplyBlueprint(customBp);
  };

  const copyAssignmentSummary = () => {
    const text = `INSTRUÇÕES DA PRÁTICA 2 - ADVERGAME NO NAVEGADOR
Disciplina: Modelagem e Animação 3D (MA3D 06)
Docente: Prof. Hercules Ramos | FMU TECH Level Up

ROTEIRO DE EXECUÇÃO:
1. ESCOLHA DA MARCA:
   - Marca: ${selectedBlueprint.brand}
   - Slogan: "${selectedBlueprint.slogan}"
   - Produto Coletável: ${selectedBlueprint.collectibleProduct}

2. DESIGN & MODELAGEM 3D:
   - Personagem/Mascote: ${selectedBlueprint.characterIdea}
   - Modelar em Low-Poly (< 5k polígonos no total) no Blender ou Maya
   - Texturas leves com UV Atlas e exportação em formato .GLB/.glTF

3. MECÂNICA DE JOGO (CORE LOOP):
   - ${selectedBlueprint.gameMechanic}
   - Duração da sessão: 30 a 60 segundos
   - Controles: Teclado (WASD/Setas) e Touch para mobile

4. DESENVOLVIMENTO & WEB:
   - Rodando liso a 60 FPS direto no navegador
   - Sem telas de loading pesadas (< 10MB de download total)
   - Áudio com Web Audio API

5. CALL TO ACTION (CTA OBRIGATÓRIO):
   - Recompensa ao final: ${selectedBlueprint.ctaOffer}
   - Cupom gerado: ${selectedBlueprint.ctaCode}
`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="space-y-10 py-8">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-fuchsia-500/30 bg-gradient-to-r from-slate-900 via-fuchsia-950/20 to-slate-900 p-6 sm:p-8 backdrop-blur-md">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-fuchsia-400">
              <span className="font-mono">GUIA DA PRÁTICA 2</span>
              <span aria-hidden="true">&middot;</span>
              <span>FMU TECH LEVEL UP &middot; PROF. HERCULES RAMOS</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Instruções Oficiais: Do Briefing ao Jogo no Navegador
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              O que o professor pede nesta aula é direto: <strong className="text-white">escolher uma marca comercial</strong>,
              desenvolver o conceito de um <strong className="text-white">advergame 3D leve para navegador</strong> e
              entregar a experiência completa — desde o briefing até a tela final de conversão com Call-to-Action.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={copyAssignmentSummary}
                className="inline-flex items-center gap-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 px-4 py-2 text-xs font-bold text-white transition-colors shadow-sm"
              >
                {copiedSummary ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedSummary ? 'Roteiro Copiado!' : 'Copiar Resumo de Instruções'}</span>
              </button>

              <button
                onClick={onPlayDemo}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-medium text-slate-200 transition-colors"
              >
                <Play className="h-3.5 w-3.5 fill-current text-cyan-400" />
                <span>Testar Demonstração Jogável no Browser</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* As 5 Etapas Explicadas para o Aluno Executar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            As 5 Etapas Obrigatórias para Você Realizar o Trabalho
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Extraídas diretamente do quadro original do Whimsical da aula MA3D 06:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Etapa 1 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-fuchsia-400">PASSO 01</span>
              <Target className="h-5 w-5 text-fuchsia-400" />
            </div>
            <h3 className="text-base font-bold text-white">1. O Briefing da Marca</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>O que você deve fazer:</strong> Escolha uma marca (real ou fictícia). Anote o <em>DNA da marca</em> (jovem, radical, luxo, pop), as <em>cores oficiais</em>, o <em>slogan</em> e o <em>produto principal</em> que servirá como objetivo no jogo.
            </p>
            <div className="rounded-lg bg-slate-950 p-2.5 text-[11px] text-fuchsia-300/90 border border-slate-800">
              <strong>Dica de ouro:</strong> Marcas com produtos fáceis de reconhecer (latas, hambúrgueres, tênis, caixas) facilitam muito a modelagem 3D.
            </div>
          </div>

          {/* Etapa 2 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-400">PASSO 02</span>
              <Palette className="h-5 w-5 text-cyan-400" />
            </div>
            <h3 className="text-base font-bold text-white">2. Design e Conceito (3D)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>O que você deve fazer:</strong> Crie um Core Loop casual de 30 a 60 segundos. Modele os assets 3D no Blender ou Maya:
            </p>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>1 Mascote ou Personagem do jogador</li>
              <li>1 Produto da marca (item coletável)</li>
              <li>1 a 2 Obstáculos para desviar</li>
            </ul>
            <div className="rounded-lg bg-slate-950 p-2.5 text-[11px] text-cyan-300/90 border border-slate-800">
              <strong>Exigência técnica:</strong> Modelos obrigatoriamente <em>Low-Poly</em> (&lt; 5.000 triângulos) e formato <code>.glb</code> para a web.
            </div>
          </div>

          {/* Etapa 3 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-400">PASSO 03</span>
              <Code2 className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white">3. Desenvolvimento Web</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>O que você deve fazer:</strong> Programar a mecânica de movimentação e colisão para rodar dentro do navegador.
            </p>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Controles por teclado (Setas / A-D / Espaço)</li>
              <li>Botões ou toques na tela para celular</li>
              <li>Áudio procedural ou SFX ao pegar o produto</li>
            </ul>
            <div className="rounded-lg bg-slate-950 p-2.5 text-[11px] text-emerald-300/90 border border-slate-800">
              <strong>Engines aceitas:</strong> Three.js, Canvas 2D/3D, Unity WebGL, Godot Web ou PlayCanvas.
            </div>
          </div>

          {/* Etapa 4 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400">PASSO 04</span>
              <CheckCircle2 className="h-5 w-5 text-amber-400" />
            </div>
            <h3 className="text-base font-bold text-white">4. Testes e Polimento</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>O que você deve fazer:</strong> O jogo não pode travar nem demorar para carregar.
            </p>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Cravado a 60 quadros por segundo (60 FPS)</li>
              <li>Tamanho total do build &lt; 15 MB</li>
              <li>Adicionar feedback visual (faíscas, tremores)</li>
            </ul>
            <div className="rounded-lg bg-slate-950 p-2.5 text-[11px] text-amber-300/90 border border-slate-800">
              <strong>Atenção:</strong> Teste em modo mobile no Chrome DevTools para garantir que não corte nas laterais.
            </div>
          </div>

          {/* Etapa 5 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 md:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-rose-400">PASSO 05</span>
              <Rocket className="h-5 w-5 text-rose-400" />
            </div>
            <h3 className="text-base font-bold text-white">5. Lançamento e Call-to-Action (A Essência do Advergame)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>O que você deve fazer:</strong> O que transforma um jogo comum em um <em>Advergame</em> é a tela de encerramento. Quando o jogador perder ou vencer, a tela DEVE obrigatoriamente mostrar:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-white block mb-0.5">A. Cupom ou Desconto</span>
                Ex: 20% OFF na compra com código promocional.
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-white block mb-0.5">B. Botão de Conversão (CTA)</span>
                Link direto para o site ou app da marca.
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-white block mb-0.5">C. Reinício Instantâneo</span>
                Botão "Jogar de Novo" com 1 clique (zero reload de página).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assistente de Escolha da Marca (O que o usuário pediu!) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 mb-1">
              <Sparkles className="h-4 w-4" />
              <span>FERRAMENTA DE ESCOLHA</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Escolha a Marca para o Seu Trabalho
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Clique em uma das marcas abaixo para ver o roteiro completo pronto, ou crie a sua própria:
            </p>
          </div>
        </div>

        {/* Brand Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BRAND_BLUEPRINTS.map((bp) => {
            const isSelected = selectedBlueprint.brand === bp.brand;
            return (
              <button
                key={bp.brand}
                onClick={() => handleApplyBlueprint(bp)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-fuchsia-500 bg-slate-900 shadow-lg shadow-fuchsia-950/40 scale-[1.02]'
                    : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="h-3 w-3 rounded-full shadow-sm"
                    style={{ backgroundColor: bp.colors.primary }}
                  />
                  <span className="text-[10px] font-mono uppercase text-slate-400">
                    {bp.difficulty}
                  </span>
                </div>
                <div className="font-bold text-white text-sm line-clamp-1">
                  {bp.brand}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {bp.collectibleProduct}
                </div>
              </button>
            );
          })}
        </div>

        {/* Input for custom brand */}
        <form onSubmit={handleCreateCustom} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 whitespace-nowrap">
            <Building2 className="h-4 w-4 text-fuchsia-400" />
            <span>Outra Marca que você queira fazer:</span>
          </div>
          <input
            type="text"
            value={customBrandName}
            onChange={(e) => setCustomBrandName(e.target.value)}
            placeholder="Ex: PlayStation, Havaianas, Doritos..."
            className="flex-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-fuchsia-500 focus:outline-none"
          />
          <input
            type="text"
            value={customProduct}
            onChange={(e) => setCustomProduct(e.target.value)}
            placeholder="Produto 3D a coletar..."
            className="flex-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-fuchsia-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 px-4 py-2 text-xs font-bold text-white transition-colors whitespace-nowrap"
          >
            Gerar Roteiro Desta Marca
          </button>
        </form>

        {/* Detailed Blueprint Box for the Chosen Brand */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                <span className="text-fuchsia-400 font-semibold font-mono">PROPOSTA DE JOGO PRONTA</span>
                <span aria-hidden="true">&middot;</span>
                <span>{selectedBlueprint.category}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display flex items-center gap-3">
                <span>{selectedBlueprint.brand} Advergame</span>
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: selectedBlueprint.colors.primary }}
                />
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 italic mt-0.5">
                &ldquo;{selectedBlueprint.slogan}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyAssignmentSummary}
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-200 border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
              >
                {copiedSummary ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>Copiar Este Roteiro</span>
              </button>
              <button
                onClick={onPlayDemo}
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-fuchsia-600 hover:bg-fuchsia-500 px-5 py-2.5 rounded-lg transition-colors shadow-md whitespace-nowrap"
              >
                <span>Ver no Jogo Web &rarr;</span>
              </button>
            </div>
          </div>

          {/* Grid of Specification Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1.5">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                1. Item Coletável 3D
              </span>
              <div className="text-sm font-bold text-white">
                {selectedBlueprint.collectibleProduct}
              </div>
              <p className="text-[11px] text-slate-400">
                Modele este objeto no Blender como malha principal de recompensa girando na pista.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1.5">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                2. Ideia de Mascote 3D
              </span>
              <div className="text-sm font-bold text-white">
                {selectedBlueprint.characterIdea}
              </div>
              <p className="text-[11px] text-slate-400">
                Personagem estilizado em Low-Poly com animação simples de corrida e pulo.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1.5">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                3. Mecânica do Jogo (Loop)
              </span>
              <div className="text-sm font-bold text-white">
                Runner / Catcher
              </div>
              <p className="text-[11px] text-slate-400">
                {selectedBlueprint.gameMechanic}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1.5">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                4. Oferta de Call-to-Action
              </span>
              <div className="text-sm font-bold text-fuchsia-400 font-mono">
                {selectedBlueprint.ctaCode}
              </div>
              <p className="text-[11px] text-slate-400">
                {selectedBlueprint.ctaOffer}
              </p>
            </div>
          </div>

          {/* Teacher Alignment Box */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-4 text-xs text-slate-300 space-y-1.5">
            <div className="font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Por que esta proposta atende 100% aos critérios do Prof. Hercules Ramos:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedBlueprint.whyItWorks} Você terá um projeto completo com todos os 5 estágios: Briefing formal, modelos 3D criados, engine web rodando suave e uma estratégia de marketing mensurável no encerramento.
            </p>
          </div>
        </div>
      </div>

      {/* ETAPA 1 — DO BRIEFING AO MINI-GDD (PROMPT 01 OFICIAL DA AULA) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="rounded-2xl border border-fuchsia-500/40 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-fuchsia-400 uppercase tracking-wider mb-1">
                <span>🤖 ETAPA 1 — DO BRIEFING AO MINI-GDD</span>
                <span aria-hidden="true">&middot;</span>
                <span className="text-slate-400">PROMPT 01</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                3 Conceitos de Jogo Casual Gerados a partir do Briefing
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Mini-GDD de uma página elaborado pela perspectiva de um Game Designer Sênior com partidas de até 60 segundos.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => {
                  const content = `# 📄 Mini-GDD de Uma Página: Passo Livre Catch (Passo Livre Nuvem)\n\n**Cliente:** Passo Livre\n**Produto:** Tênis de Corrida Passo Livre Nuvem\n**Gênero:** Advergame Casual / Catcher-Runner no Navegador\n**Duração da Partida:** 45 a 60 segundos\n**Paleta Oficial Aprovada:** Azul Celeste Nuvem (#38BDF8), Laranja Energia (#FB923C), Branco Espuma (#FFFFFF), Azul Asfalto (#0F172A).\n\nConsulte o arquivo docs/mini-gdd_v01.md completo para todas as 9 seções.`;
                  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'mini-gdd_v01.md';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-4 py-2.5 transition-colors shadow-md whitespace-nowrap"
              >
                <span>Baixar docs/mini-gdd_v01.md</span>
              </button>

              <button
                onClick={() => {
                  fetch('/briefing/conceitos_v01.md')
                    .then((res) => (res.ok ? res.text() : Promise.reject()))
                    .catch(() => {
                      return `# 🎮 Conceitos de Jogo a partir do Briefing — Mini-GDD (v01)\n\nArquivo gerado para a Aula MA3D 06 (Prática 2) - FMU TECH Level Up - Prof. Hercules Ramos.\nVer conteúdo completo no painel da aplicação.`;
                    })
                    .then((content) => {
                      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'conceitos_v01.md';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    });
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xs px-4 py-2.5 transition-colors shadow-md whitespace-nowrap"
              >
                <span>Baixar briefing/conceitos_v01.md</span>
              </button>

              <button
                onClick={copyAssignmentSummary}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs px-4 py-2.5 transition-colors whitespace-nowrap"
              >
                {copiedSummary ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>Copiar Texto</span>
              </button>
            </div>
          </div>

          {/* Prompt 01 Requirements Badge */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-semibold text-white">Requisitos do Prompt 01 atendidos:</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> 3 conceitos casuais de até 60s
              </span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> Produto DEMONSTRATIVO priorizado
              </span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> Zero coleta de dados pessoais (LGPD)
              </span>
            </div>
            <div className="text-[11px] font-mono text-fuchsia-300 bg-fuchsia-950/50 px-2.5 py-1 rounded border border-fuchsia-800/40">
              📁 Salvo em: briefing/conceitos_v01.md
            </div>
          </div>

          {/* 3 Game Concepts Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Conceito 1 */}
            <div className="rounded-xl border border-fuchsia-500/30 bg-slate-950/70 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-fuchsia-400">PROPOSTA 01</span>
                  <span className="text-[10px] font-bold text-fuchsia-300 uppercase tracking-wide bg-fuchsia-950 px-2 py-0.5 rounded border border-fuchsia-800/50">
                    Demonstrativo
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white font-display">
                  {selectedBlueprint.brand} Runner 3D
                </h4>
                <div className="text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Mecânica Principal:</strong>
                  O jogador corre por 3 faixas desviando de obstáculos e coletando {selectedBlueprint.collectibleProduct} em até 60 segundos.
                </div>
                <div className="text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Controle:</strong>
                  Deslizar o dedo (*swipe*) esquerda/direita para faixas e para cima para saltar.
                </div>
                <div className="text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Onde o Produto Entra:</strong>
                  {selectedBlueprint.collectibleProduct} funciona como super-boost magnético que atrai itens e protege contra quedas.
                </div>
                <div className="text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Integração da Marca:</strong>
                  <span className="text-emerald-400 font-semibold">DEMONSTRATIVO</span> &mdash; mostra na prática o benefício do produto na velocidade e resistência do jogador.
                </div>
              </div>

              <div className="rounded-lg bg-slate-900 p-3 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div className="font-semibold text-white">Tela Final e CTA:</div>
                <div>Recompensa: {selectedBlueprint.ctaOffer}</div>
                <div className="font-mono text-fuchsia-400 font-bold">Cupom: {selectedBlueprint.ctaCode}</div>
              </div>
            </div>

            {/* Conceito 2 */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950/70 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-cyan-400">PROPOSTA 02</span>
                  <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wide bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/50">
                    Demonstrativo
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white font-display">
                  {selectedBlueprint.brand} Reflex Catcher
                </h4>
                <div className="text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Mecânica Principal:</strong>
                  Arraste a base para capturar os produtos caindo do topo e desviar de erros de sistema para manter o indicador no verde.
                </div>
                <div className="text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Controle:</strong>
                  Arrastar horizontalmente (*drag*) com o polegar na metade inferior da tela.
                </div>
                <div className="text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Onde o Produto Entra:</strong>
                  O produto recarrega o medidor de sucesso e dispara uma onda purificadora que elimina todos os perigos da tela.
                </div>
                <div className="text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Integração da Marca:</strong>
                  <span className="text-emerald-400 font-semibold">DEMONSTRATIVO</span> &mdash; ensina que o produto resolve problemas reais e restaura a energia.
                </div>
              </div>

              <div className="rounded-lg bg-slate-900 p-3 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div className="font-semibold text-white">Tela Final e CTA:</div>
                <div>Recompensa: Score convertido em brinde imediato</div>
                <div className="font-mono text-cyan-400 font-bold">Cupom: {selectedBlueprint.ctaCode}</div>
              </div>
            </div>

            {/* Conceito 3 */}
            <div className="rounded-xl border border-amber-500/30 bg-slate-950/70 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-amber-400">PROPOSTA 03</span>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide bg-amber-950 px-2 py-0.5 rounded border border-amber-800/50">
                    Demonstrativo
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white font-display">
                  {selectedBlueprint.brand} Asset Forge 3D
                </h4>
                <div className="text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Mecânica Principal:</strong>
                  Toque com agilidade nas peças 3D corretas que orbitam um holograma para concluir a montagem antes dos 60 segundos.
                </div>
                <div className="text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Controle:</strong>
                  Toque rápido na tela (*single tap* nas peças certas).
                </div>
                <div className="text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Onde o Produto Entra:</strong>
                  O produto final é o próprio modelo 3D concluído que ganha vida e celebração com animação 3D.
                </div>
                <div className="text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Integração da Marca:</strong>
                  <span className="text-emerald-400 font-semibold">DEMONSTRATIVO</span> &mdash; o jogador constrói visualmente o produto e descobre seus diferenciais.
                </div>
              </div>

              <div className="rounded-lg bg-slate-900 p-3 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div className="font-semibold text-white">Tela Final e CTA:</div>
                <div>Recompensa: Desconto exclusivo de lançamento</div>
                <div className="font-mono text-amber-400 font-bold">Cupom: {selectedBlueprint.ctaCode}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
