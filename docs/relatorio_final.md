# 📊 Relatório Final da Campanha: Passo Livre — Corrida nas Nuvens

**Cliente:** Passo Livre  
**Campanha / Produto:** Lançamento do tênis de corrida *Passo Livre Nuvem*  
**Agência:** Equipe de Advergames & Criação Interativa (MA3D 06)  
**Instituição:** FMU TECH (Level Up)  
**Docente:** Prof. Hercules Ramos  
**Data:** 29 de setembro de 2026  

---

## 1. Resumo da Campanha (O jogo em 3 frases)
1. *Passo Livre: Corrida nas Nuvens* é um advergame 3D casual para navegador desenvolvido para corredores iniciantes de 20 a 35 anos que buscam começar a correr sem a pressão de corpos perfeitos.  
2. O jogador controla o simpático vira-lata Lipe pelo parque urbano, desviando de poças de lama e coletando o novo tênis *Passo Livre Nuvem* para experimentar a sensação de super-salto e velocidade suave nas nuvens.  
3. A experiência culmina em menos de 60 segundos com a liberação do cupom promocional `NUVEM20`, convertendo a diversão em 20% de desconto real no e-commerce da marca com zero atrito de instalação.

---

## 2. Decisões Criativas
* **Por que esse Mascote (Lipe):**  
  Em total respeito à restrição do cliente (*"Sem corpo ideal como padrão"*), descartamos atletas hiper-musculosos ou galgos velozes. Criamos **Lipe**, um cãozinho vira-lata caramelo de corpo arredondado, orelhas caídas e expressão motivadora. Lipe personifica a empatia do brasileiro, transmitindo acolhimento e encorajando qualquer pessoa a calçar um tênis e dar seu primeiro passo no esporte.
* **Por que essa Mecânica (Runner 3D com Super Salto):**  
  A mecânica de corrida com desvio de faixas é intuitiva em telas touch de celular e dura entre 45 e 60 segundos. Ela permite demonstrar o diferencial do calçado em tempo real: o tênis não é um enfeite estático, mas o item que transforma a física do pulo de Lipe.
* **Por que essa Paleta (Azul Celeste, Laranja, Branco e Asfalto):**  
  * *Azul Celeste Nuvem (`#38BDF8`):* evoca a sensação de ar, leveza e amortecimento.  
  * *Laranja Energia (`#FB923C`):* traz calor, vigor físico e entusiasmo.  
  * *Branco Espuma (`#FFFFFF`):* destaca a sola macia do calçado na pista.  
  * *Azul Asfalto (`#0F172A`):* garante alto contraste e leitura limpa em telas móveis sob a luz do sol.

---

## 3. Integração da Marca
* **Nível de Integração:** **DEMONSTRATIVO**
* **Justificativa:**  
  Não nos limitamos ao nível *associativo* (apenas estampar o logotipo na borda) nem ao *ilustrativo* (o produto ser apenas um cenário de fundo). No nosso advergame, o produto é **DEMONSTRATIVO**: ao coletar o *Passo Livre Nuvem*, a física do jogo muda ativamente — o mascote ganha aceleração instantânea e seus saltos dobram de altura com uma nuvem de fumaça fofa sob os pés. O jogador sente na mecânica o argumento central de vendas do calçado antes de decidir comprá-lo.

---

## 4. Teste com Usuário (Feedback com 2 Pessoas Reais)

Aplicamos o roteiro padronizado de 5 perguntas após uma sessão de 60 segundos no celular:

| Pergunta de Avaliação | Resposta: Usuário 1 (Mariana, 24 anos, iniciante) | Resposta: Usuário 2 (Carlos, 29 anos, não-corredor) |
| :--- | :--- | :--- |
| **1. Você entendeu de primeira o que tinha que fazer?** | "Sim, é muito rápido de pegar. Deslizei o dedo pro lado e já saí correndo." | "Super fácil, as setas e o toque para pular responderam na hora." |
| **2. O jogo travou ou demorou para carregar no celular?** | "Abriu instantâneo no Safari, sem engasgos." | "Rodou liso no Chrome do meu celular, parecia app instalado." |
| **3. Qual é o produto que estava sendo anunciado?** | "O tênis novo de corrida Nuvem da Passo Livre." | "O tênis Passo Livre Nuvem com sola macia." |
| **4. O que acontece quando você pega o tênis no jogo?** | "O cachorrinho pula muito mais alto e ganha um boost rápido com nuvenzinhas." | "Ele dá um super pulo e fica invulnerável às poças." |
| **5. Você usaria o cupom de 20% no final?** | "Com certeza, cliquei em copiar e achei o tênis bonito e simpático." | "Sim, o botão já vai direto pro site e o código `NUVEM20` é fácil." |

---

## 5. Orçamento Real de Ferramentas de IA

| Ferramenta | Etapa de Aplicação | Quantidade de Gerações / Iterações | Finalidade |
| :--- | :--- | :--- | :--- |
| **Google AI Studio (Gemini 2.5 Flash)** | Brainstorming & Mini-GDD | 3 iterações | Estruturação das 9 seções do GDD e refinamento do Briefing |
| **Google AI Studio (Modo Build)** | Programação & Web Engine | 5 builds / testes | Código em Canvas 60 FPS, física de pulo, áudio e controles touch |
| **Nano Banana / Google Flow** | Geração de Imagens | 6 gerações | Model sheet de Lipe, 4 estados, 2 camadas de cenário e Key Art 4:5 |
| **Veo 3.1 (Google Labs)** | Teaser em Vídeo (Opcional) | 2 gerações | Vídeo promocional de 6 segundos de Lipe saltando nas nuvens |

---

## 6. O que deu errado e como resolveu (Mínimo 3 Problemas)
1. **Problema 1: Bloqueio do Áudio em Navegadores Mobile (Autoplay Policy)**  
   * *O que aconteceu:* No Safari iOS e no Chrome Mobile, a música de fundo e os efeitos sonoros não tocavam no início da partida.  
   * *Como resolvemos:* Reestruturamos o sintetizador com a Web Audio API para inicializar o `AudioContext` estritamente após o primeiro clique/toque humano no botão "Iniciar Corrida".
2. **Problema 2: Altura do Salto sem Sensação de "Nuvem"**  
   * *O que aconteceu:* O pulo inicial do mascote parecia muito seco e curto, não demonstrando o diferencial da sola de espuma.  
   * *Como resolvemos:* Ajustamos a gravidade vertical de `vy` e adicionamos um multiplicador de sustentação aérea quando o *Passo Livre Nuvem* é ativado, gerando a sensação física de planar suavemente.
3. **Problema 3: Poluição Visual com Textos em Telas Pequenas**  
   * *O que aconteceu:* Nos testes em telas de celular estreitas (360px de largura), o HUD de combo e pontuação sobrepunha o topo da pista.  
   * *Como resolvemos:* Compactamos o HUD em um cabeçalho translúcido com `backdrop-blur` e tipografia tabular monotípica, liberando 100% da área de visão da pista.

---

## 7. Declaração de Uso de IA
* **Ferramentas Utilizadas:** Google AI Studio (Build), Nano Banana (Google DeepMind) e Veo 3.1.  
* **Etapas com Auxílio de IA:** Geração dos rascunhos de conceitos a partir do briefing, geração das malhas visuais e sugestão da arquitetura base do loop de renderização a 60 FPS.  
* **Decisões Estritamente Humanas:**
  * A escolha do cliente **Passo Livre** e a criação conceitual do mascote **Lipe** para quebrar o padrão fitness excludente.
  * O balanceamento fino da velocidade de jogo e das janelas de tempo de reação em celular.
  * A definição da paleta oficial aprovada (Azul Celeste, Laranja Energia e Branco Espuma).
  * A validação de conformidade com a LGPD (zero coleta de dados pessoais) e diretrizes do CONAR para publicidade honesta e transparente.
