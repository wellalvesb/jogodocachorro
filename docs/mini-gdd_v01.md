# 📄 Mini-GDD de Uma Página: Passo Livre — Corrida nas Nuvens

**Cliente:** Passo Livre (Opção 3 do Briefing da Aula)  
**Segmento:** Tênis de corrida e calçados esportivos  
**Produto / Campanha:** Lançamento do novo tênis **Passo Livre Nuvem**  
**Gênero:** Advergame Casual / Endless Runner & Jumper 3D no Navegador  
**Duração da Partida:** 45 a 60 segundos  
**Mascote Oficial:** **Lipe**, o cãozinho vira-lata corredor iniciante (corpinho arredondado e amigável, orelhas ao vento, calçando os tênis Passo Livre Nuvem com sola de espuma branca).  
**🔑 Paleta Oficial Aprovada (3 a 4 cores fixas):**  
* 🔵 **Azul Celeste Nuvem** (`#38BDF8`) — Leveza, ar e amortecimento  
* 🟠 **Laranja Energia** (`#FB923C`) — Motivação, calor e entusiasmo  
* ⚪ **Branco Espuma** (`#FFFFFF`) — Solado ultra macio e detalhes  
* ⚫ **Azul Asfalto Noturno** (`#0F172A`) — Contraste de pista e legibilidade esportiva  

---

### 1. Resumo em uma frase
Controle o simpático mascote Lipe calçando o novo tênis *Passo Livre Nuvem* para desviar de poças d'água no parque, coletar garrafinhas de hidratação e ativar o modo super-salto nas nuvens para desbloquear 20% de desconto antes dos 60 segundos!

---

### 2. Público e plataforma
* **Público-Alvo:** Corredores iniciantes de 20 a 35 anos que buscam começar a correr por saúde, bem-estar e diversão, sem cobrança de corpo perfeito ou atletas de elite.
* **Plataforma:** Navegador web para celular (*mobile-first*, toque e deslizamento com o polegar) e desktop (setas do teclado e barra de espaço), sem downloads, carregando em menos de 2 segundos.

---

### 3. Loop principal (o que o jogador faz a cada 3 segundos)
* **0s a 1s:** Observa o trajeto à frente no parque urbano (faixas com garrafas d’água, poças de lama no asfalto e caixas do tênis *Passo Livre Nuvem*).
* **1s a 2s:** Desliza o dedo na tela para mudar de faixa e toca para saltar sobre poças e galhos caídos na pista.
* **2s a 3s:** Coleta o tênis *Passo Livre Nuvem* para disparar o **Power-Up "Super Salto na Nuvem"**, que dobra a velocidade de corrida, faz Lipe saltar super alto com efeito de nuvens sob as patas e multiplica os pontos coletados.

---

### 4. Regras de pontuação
* **Item Bom (+100 pts):** Garrafinha de Água / Coco gelado (mantém o fôlego da corrida).
* **Item Produto (+300 pts + Power-up por 6s):** Tênis *Passo Livre Nuvem* (ativa o efeito demonstrativo: super-pulo e velocidade máxima, imune a poças de lama).
* **Item Ruim (-50 pts e tropeço de 0.5s):** Poça de lama ou galho molhado (reduz o ritmo momentaneamente).
* **Multiplicador de Combo:** Coletar 3 itens seguidos ativa combo 2x, 3x e até 4x no placar.
* **Critério de Sucesso:** Atingir mais de 1.500 pontos em até 60 segundos para liberar o cupom oficial de desconto.

---

### 5. Lista de estados do mascote (Mascote: Lipe)
1. `mascote_lipe_estado-parado_v01.png`: Lipe em repouso na tela inicial, pose alegre e convidativa, sorrindo e calçando os tênis Passo Livre Nuvem com meia esportiva.
2. `mascote_lipe_estado-correndo_v01.png`: Lipe em passada de corrida ritmada, orelhas balançando para trás com o vento e expressão motivada.
3. `mascote_lipe_estado-powerup_v01.png`: Lipe em salto alto triunfante no ar, flutuando sobre uma nuvem estilizada com rastro de vento azul e laranja (*demonstração de pulo alto e maciez*).
4. `mascote_lipe_estado-tropeco_v01.png`: Lipe desequilibrando-se com respingos de água, olhar surpreso e cômico, sem expressão de dor ou fracasso punitivo.

---

### 6. Lista completa de assets com nome de arquivo no padrão `[tipo]_[nome]_v01.png`
*(Lista de compras para o Nano Banana / Flow e mapa de assets do AI Studio)*:

#### Mascote
* `mascote_lipe_modelsheet_v01.png` *(4 vistas consistentes: frente, perfil direito, costas, perfil esquerdo)*
* `mascote_lipe_estado-parado_v01.png`
* `mascote_lipe_estado-correndo_v01.png`
* `mascote_lipe_estado-powerup_v01.png`
* `mascote_lipe_estado-tropeco_v01.png`

#### Cenário (Mínimo 2 camadas na paleta da marca)
* `cenario_fundo-ceu-nuvens_v01.png` *(Camada distante: céu em gradiente azul-celeste com nuvens suaves em movimento)*
* `cenario_pista-parque-chao_v01.png` *(Camada frontal: pista de corrida emborrachada de parque urbano com bordas verdes)*

#### Itens (Mínimo 1 produto, 1 bom, 1 ruim)
* `itens_tenis-nuvem_v01.png` *(Produto oficial da marca: tênis Passo Livre Nuvem com cabedal azul e solado macio branco)*
* `itens_garrafa-agua_v01.png` *(Item bom: garrafinha de hidratação esportiva)*
* `itens_poca-lama_v01.png` *(Item ruim / obstáculo: poça de água e lama com folhas)*

#### Interface (UI)
* `ui_logo-passolivre_v01.png` *(Logotipo Passo Livre em linhas modernas esportivas)*
* `ui_botao-jogar_v01.png` *(Botão arredondado laranja com texto "Começar Treino")*
* `ui_botao-cta-cupom_v01.png` *(Botão de conversão com texto "Garantir Meu Passo Livre Nuvem")*
* `ui_painel-fim_v01.png` *(Card final comemorativo na paleta da marca com área de score e cupom)*

#### Divulgação
* `divulgacao_keyart_v01.png` *(Pôster vertical 4:5 com Lipe saltando nas nuvens, título do jogo e logo Passo Livre)*

---

### 7. Telas do jogo
* **Tela de Início:** Logotipo da *Passo Livre*, título *"Corrida nas Nuvens"*, mascote Lipe sorrindo com os tênis bem visíveis, botão central *"Começar Treino"* e instrução em 1 linha (*"Deslize para desviar, toque para saltar!"*).
* **Tela de Jogo:** HUD minimalista no topo (Placar, barra de tempo regressiva de 60 segundos e indicador de combo). Pista com movimento dinâmico e feedback sonoro a cada produto coletado.
* **Tela Final (Conversão):** Placar do jogador, mensagem motivadora de celebração (*"Treino Concluído! Você deu o seu primeiro passo!"*), destaque visual do tênis *Passo Livre Nuvem*, cupom de desconto com 1 toque para copiar (**`NUVEM20`** = 20% OFF) e botão direto de CTA: *"Comprar com Desconto no Site Oficial"*.

---

### 8. Integração da marca
* **Nível de Integração:** **DEMONSTRATIVO**
* **Justificativa:** O tênis *Passo Livre Nuvem* é a peça central da mecânica: ao calçá-lo durante a corrida, o mascote ganha **aumento imediato de velocidade e a capacidade de dar super saltos macios**, demonstrando de forma sensorial a promessa do produto (amortecimento ultra macio como pisar em nuvens).

---

### 9. Restrições do cliente
1. **Sem corpo "ideal" como padrão:** Lipe tem anatomia amigável, acolhedora e não-atlética tradicional, transmitindo que corrida é para qualquer pessoa.
2. **Tom de voz motivador:** Proibido usar palavras como *"Derrota"* ou *"Você perdeu"*. Ao final da partida, sempre parabenizar pelo movimento: *"Parabéns pelo treino de hoje!"*.
3. **Privacidade (LGPD):** O jogo **não coleta nenhum dado pessoal** (zero formulários de e-mail, telefone ou cadastro); o cupom é liberado diretamente na tela final.
4. **Declaração de IA:** Rodapé obrigatório na tela final: *"Advergame acadêmico desenvolvido com apoio de ferramentas de IA para a disciplina MA3D 06 (FMU TECH)"*.
