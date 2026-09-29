import { PipelineStage, ChecklistItem, BrandBriefing } from '../types/advergame';

export const DEFAULT_BRIEFING: BrandBriefing = {
  brandName: 'Passo Livre',
  slogan: 'Corra leve, comece do seu jeito',
  themeColor: '#38bdf8', // azul celeste nuvem
  themeAccent: '#fb923c', // laranja energia
  productName: 'Tênis Passo Livre Nuvem',
  productType: 'Tênis de Corrida Leve',
  ctaType: 'Cupom de Lançamento',
  ctaTitle: 'Ganhe 20% OFF no novo Passo Livre Nuvem no e-commerce oficial!',
  ctaCode: 'NUVEM20',
  ctaLink: 'https://passolivre.com.br',
  difficulty: 'equilibrado',
  targetAudience: 'Corredores iniciantes, 20 a 35 anos, que buscam correr por bem-estar sem cobrança de corpo perfeito.'
};

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'briefing',
    stepNumber: 1,
    title: 'O Briefing da Marca',
    subtitle: 'Define objetivos, público-alvo e DNA',
    summary: 'O ponto de partida de qualquer advergame. Antes de abrir a engine ou o software 3D, é obrigatório entender quem é o cliente, o que ele vende, qual a mensagem central e qual métrica determinará o sucesso do projeto.',
    marketingFocus: 'Alinhamento de Marca: Brand Awareness vs Conversão direta (leads, cupons de desconto, cliques para o e-commerce).',
    creativeTasks: [
      'Identificar o DNA e a voz da marca (tons de voz, paleta cromática, slogans institucionais).',
      'Definir a persona do jogador (faixa etária, hábitos de jogo casual, tempo médio de sessão).',
      'Escolher o produto-chave ou conceito a ser gamificado (ex: energético, bolsa de estudo, tênis esportivo).'
    ],
    technicalTasks: [
      'Definir a plataforma de destino (navegadores desktop, mobile web, iframe em rede social).',
      'Estipular orçamento de performance técnica (meta de 60 FPS em celulares intermediários).',
      'Definir requisitos de tracking analítico (Google Analytics 4, eventos de início, game over e clique no CTA).'
    ],
    deliverables: [
      'Briefing Comercial assinado pelo cliente',
      'Moodboard de referências visuais da marca',
      'Definição dos KPIs de Marketing (ex: Tempo de Retenção > 90s, CTR de CTA > 12%)'
    ],
    browserTips: [
      'Em advergames web, cada 1 segundo a mais de loading reduz a taxa de retenção em até 20%.',
      'Mantenha o tamanho total dos assets iniciais abaixo de 10 MB para carregamento instantâneo.'
    ],
    iconName: 'Target'
  },
  {
    id: 'design',
    stepNumber: 2,
    title: 'Design e Conceito',
    subtitle: 'Criação de mecânicas, narrativa e arte',
    summary: 'A tradução do briefing em regras de jogo jogáveis e estética visual atraente. Aqui nasce o Game Design Document (GDD) enxuto e a modelagem 3D dos personagens e itens da marca.',
    marketingFocus: 'Integrar o produto da marca de forma orgânica à mecânica principal (Core Loop) para que o jogador sinta recompensa ao interagir com o produto.',
    creativeTasks: [
      'Elaborar o Game Design Document (GDD One-Pager) com Core Loop de 30 a 90 segundos.',
      'Desenhar sketches de Concept Art dos personagens, obstáculos e itens coletáveis da marca.',
      'Modelar assets 3D em Low-Poly no Blender / Maya com topologia otimizada para WebGL.'
    ],
    technicalTasks: [
      'Garantir mapeamento de UV eficiente e baking de iluminação nas texturas.',
      'Exportar modelos em formato .GLB / .glTF com compressão Draco ou KTX2.',
      'Projetar wireframes de interface (HUD, tela de contagem, game over com CTA visível).'
    ],
    deliverables: [
      'GDD (Game Design Document) com regras, controles e balanceamento',
      'Modelos 3D Low-Poly texturizados prontos para web',
      'Style Guide com tipografia e paleta oficial da marca'
    ],
    browserTips: [
      'Limite a contagem de polígonos por modelo (máx 3.000 a 8.000 triângulos para o personagem).',
      'Utilize uma única atlas de textura compartilhada para diminuir o número de materiais.'
    ],
    iconName: 'Palette'
  },
  {
    id: 'dev',
    stepNumber: 3,
    title: 'Desenvolvimento',
    subtitle: 'Programação, integração de arte e som',
    summary: 'A fase de engenharia onde a arte 3D ganha vida com física, detecção de colisões, controle de entrada de teclado/toque e síntese de efeitos sonoros responsivos.',
    marketingFocus: 'Garantir que a identidade sonora (jingle da marca ou SFX celebratórios) soe triunfante e memorável ao coletar os itens.',
    creativeTasks: [
      'Compor trilha sonora dinâmica ou sintetizada no estilo chiptune / synthwave.',
      'Criar efeitos visuais de impacto: partículas de faísca, linhas de velocidade e rastro de neon.',
      'Animar estados do jogador (correndo, pulando, colidindo, vitorioso).'
    ],
    technicalTasks: [
      'Programar o loop de renderização com requestAnimationFrame visando 60 FPS cravados.',
      'Implementar sistema de colisão rápido (Bounding Boxes AABB ou esferas).',
      'Desenvolver o subsistema de áudio utilizando Web Audio API (com desbloqueio no primeiro clique do usuário).',
      'Construir a máquina de estados do jogo: Menu -> Playing -> Paused -> GameOver -> Victory.'
    ],
    deliverables: [
      'Build executável local no navegador',
      'Sistema de pontuação e multiplicadores de combo funcionais',
      'Controles unificados para teclado (WASD / Setas / Espaço) e toque mobile'
    ],
    browserTips: [
      'Navegadores modernos exigem que o AudioContext seja iniciado apenas após uma interação humana (clique ou toque).',
      'Evite alocações excessivas de memória dentro do loop de renderização para evitar picos de Garbage Collection (GC stutter).'
    ],
    iconName: 'Code2'
  },
  {
    id: 'qa',
    stepNumber: 4,
    title: 'Testes e Polimento',
    subtitle: 'Feedback, correções e otimização para navegadores',
    summary: 'A fase crítica que separa um protótipo cru de uma experiência comercial profissional. Envolve testes em múltiplos aparelhos, ajuste fino de física (Game Feel / Juice) e eliminação de bugs.',
    marketingFocus: 'Garantir que nenhum usuário desista por travamentos ou controles imprecisos, preservando a imagem de qualidade da marca patrocinadora.',
    creativeTasks: [
      'Adicionar "Juice": leve tremor de tela (camera shake) no impacto e freeze frame de 50ms na colisão.',
      'Ajustar curvas de dificuldade (rampa gradual de velocidade e espaçamento de obstáculos).',
      'Refinar legibilidade do texto e contraste das mensagens de recompensa da marca.'
    ],
    technicalTasks: [
      'Testar em Chrome, Safari iOS, Firefox e Edge com simulação de conexões lentas (3G/4G).',
      'Reduzir Draw Calls com mesh instancing e frustum culling.',
      'Verificar responsividade em diferentes proporções de tela (16:9, 18:9, tablets e ultrawide).'
    ],
    deliverables: [
      'Relatório de Performance (FPS médio, tempo de carregamento < 2s)',
      'Checklist de QA (Garantia de Qualidade) sem bugs bloqueadores',
      'Ajuste balanceado das pontuações para geração de cupons'
    ],
    browserTips: [
      'Teste em aparelhos móveis reais com Safari iOS para verificar se as barras de navegação do browser não cortam a área útil do jogo.',
      'Use o Chrome DevTools Performance Profiler para identificar funções lentas.'
    ],
    iconName: 'CheckCircle2'
  },
  {
    id: 'launch',
    stepNumber: 5,
    title: 'Lançamento e Jogo no Navegador',
    subtitle: 'O Advergame está pronto! Jogue agora',
    summary: 'A culminação da prática. O jogo é distribuído via web, permitindo acesso imediato com um clique, sem necessidade de download em lojas de apps, maximizando o ROI e o engajamento da campanha.',
    marketingFocus: 'Conversão máxima no momento de maior dopamina do jogador (a tela de Game Over / Vitória), oferecendo cupom exclusivo e convite para matrícula/compra.',
    creativeTasks: [
      'Criar banners de divulgação para redes sociais (Instagram Stories, TikTok, LinkedIn da faculdade).',
      'Desenhar a tela de vitória com destaque visual para o código de desconto ou brinde.',
      'Configurar botão de compartilhamento de pontuação para viralização orgânica.'
    ],
    technicalTasks: [
      'Deploy em CDN de alta velocidade com compressão Gzip / Brotli.',
      'Integrar meta tags OpenGraph e Twitter Cards para previews atraentes ao compartilhar links.',
      'Persistir recordes de pontuação (High Scores) no LocalStorage ou backend.'
    ],
    deliverables: [
      'URL pública e compartilhável do advergame',
      'Iframe embeddable pronto para sites de parceiros ou campanhas de marketing',
      'Painel de métricas com total de jogadas e cliques no botão de conversão'
    ],
    browserTips: [
      'A ausência de atrito (sem download de 500 MB da Google Play ou App Store) faz o advergame web ter taxas de início até 10x maiores que apps nativos.',
      'Certifique-se de que a tela final ofereça um botão de replay instantâneo com 1 clique.'
    ],
    iconName: 'Rocket'
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: 'c1',
    stageId: 'briefing',
    label: 'Definição do Objetivo de Marketing (Awareness vs Lead)',
    category: 'Briefing',
    description: 'Estabelecer claramente se o jogo visa fixar a marca ou capturar cadastros.',
    completed: true
  },
  {
    id: 'c2',
    stageId: 'briefing',
    label: 'Persona & Público-Alvo Mapeados',
    category: 'Briefing',
    description: 'Delimitar faixa etária, plataformas preferidas e hábitos de jogos casuais.',
    completed: true
  },
  {
    id: 'c3',
    stageId: 'design',
    label: 'Core Loop Rápido (30s a 90s)',
    category: '3D & Arte',
    description: 'Ciclo de ação viciante e intuitivo sem tutoriais complexos.',
    completed: true
  },
  {
    id: 'c4',
    stageId: 'design',
    label: 'Modelos 3D Low-Poly Otimizados (< 5k polígonos)',
    category: '3D & Arte',
    description: 'Malhas leves para renderização suave em qualquer GPU móvel.',
    completed: true
  },
  {
    id: 'c5',
    stageId: 'dev',
    label: 'Controles Responsivos (Teclado + Touch Mobile)',
    category: 'Código',
    description: 'Permitir jogar tanto no PC com setas/espaço quanto no smartphone com toques.',
    completed: true
  },
  {
    id: 'c6',
    stageId: 'dev',
    label: 'Áudio Web Audio API com Inicialização por Interação',
    category: 'Código',
    description: 'Evitar bloqueio automático de autoplay dos navegadores.',
    completed: true
  },
  {
    id: 'c7',
    stageId: 'qa',
    label: 'Meta de 60 FPS Mantida em Dispositivos Médios',
    category: 'Polimento',
    description: 'Execução suave sem quedas bruscas de taxa de quadros.',
    completed: true
  },
  {
    id: 'c8',
    stageId: 'qa',
    label: 'Game Feel ("Juice") com Partículas e Feedback Visual',
    category: 'Polimento',
    description: 'Sensação tátil ao coletar itens e colidir com obstáculos.',
    completed: true
  },
  {
    id: 'c9',
    stageId: 'launch',
    label: 'Tela de Recompensa com CTA e Cupom Promocional',
    category: 'Marketing',
    description: 'Fechar o ciclo do advergame entregando valor real ao consumidor.',
    completed: true
  },
  {
    id: 'c10',
    stageId: 'launch',
    label: 'Botão de Reinício Instantâneo (Zero Reload de Página)',
    category: 'Marketing',
    description: 'Estimular múltiplas tentativas seguidas sem atrito.',
    completed: true
  }
];

export const INITIAL_LEADERBOARD = [
  { id: '1', name: 'Lucas "Cyber" Silva', score: 4850, itemsCollected: 38, brand: 'FMU TECH', date: '29/09/2026' },
  { id: '2', name: 'Mariana Games 3D', score: 4120, itemsCollected: 33, brand: 'FMU TECH', date: '29/09/2026' },
  { id: '3', name: 'Hercules R. (Prof)', score: 3950, itemsCollected: 30, brand: 'FMU TECH', date: '29/09/2026' },
  { id: '4', name: 'Beatriz LevelUp', score: 3240, itemsCollected: 26, brand: 'FMU TECH', date: '29/09/2026' },
  { id: '5', name: 'Gabriel DevWeb', score: 2890, itemsCollected: 22, brand: 'FMU TECH', date: '29/09/2026' },
];
