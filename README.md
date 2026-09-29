# 👟 Passo Livre: Corrida nas Nuvens — Advergame 3D Web

> **Disciplina:** Modelagem e Animação 3D (MA3D 06)  
> **Instituição:** FMU TECH (Level Up)  
> **Docente:** Prof. Hercules Ramos  
> **Cliente / Briefing:** Opção 3 — Passo Livre (Lançamento do tênis *Passo Livre Nuvem*)  
> **Mascote:** Lipe, o vira-lata corredor iniciante  
> **Tecnologias:** React + TypeScript, Vite, Tailwind CSS, Canvas 60 FPS, Web Audio API, Google AI Studio, Nano Banana / Google Flow  

---

## 🎮 Sobre o Jogo
**Passo Livre: Corrida nas Nuvens** é um advergame casual desenvolvido para rodar diretamente em navegadores web móveis e desktop, com sessões rápidas de até 60 segundos.

* **Objetivo:** Ajudar o mascote Lipe a desviar de poças de lama e coletar garrafinhas d'água no parque urbano.
* **Mecânica com o Produto (DEMONSTRATIVO):** Ao coletar o novo tênis **Passo Livre Nuvem**, o jogador ativa o *Super Salto na Nuvem*, ganhando impulsão aérea suave e velocidade dobrada.
* **Call-to-Action (CTA):** Ao final da corrida, o jogador recebe o cupom exclusivo **`NUVEM20`** com 20% de desconto no e-commerce da marca.
* **Privacidade & Conformidade:** Zero coleta de dados pessoais (em conformidade estrita com a LGPD e Conanda).

---

## 📁 Estrutura de Pastas do Projeto (Padrão Oficial da Aula)

```text
advergame_welton/
├── briefing/
│   ├── briefing_passolivre.md       # Briefing formal do cliente Passo Livre
│   └── conceitos_v01.md             # 3 conceitos de jogos casuais analisados
├── docs/
│   ├── mini-gdd_v01.md              # Mini-GDD de 1 página com as 9 seções completas
│   └── relatorio_final.md           # Relatório final com as 7 seções (testes, problemas e IA)
├── prompts/
│   ├── ficha_mascote_lipe.md        # Ficha do mascote Lipe com as 4 vistas consistentes
│   └── log_de_prompts.md            # Log completo de prompts do Nano Banana e Flow
├── assets/                          # Lista completa de assets no padrão [tipo]_[nome]_v01.png
│   ├── mascote_lipe_modelsheet_v01.png
│   ├── mascote_lipe_estado-parado_v01.png
│   ├── mascote_lipe_estado-correndo_v01.png
│   ├── mascote_lipe_estado-powerup_v01.png
│   ├── mascote_lipe_estado-tropeco_v01.png
│   ├── cenario_fundo-ceu-nuvens_v01.png
│   ├── cenario_pista-parque-chao_v01.png
│   ├── itens_tenis-nuvem_v01.png
│   ├── itens_garrafa-agua_v01.png
│   ├── itens_poca-lama_v01.png
│   ├── ui_logo-passolivre_v01.png
│   ├── ui_botao-jogar_v01.png
│   ├── ui_botao-cta-cupom_v01.png
│   └── ui_painel-fim_v01.png
├── game/
│   ├── link_do_jogo.txt             # Link público de acesso web ao advergame
│   └── prints/                      # Capturas de tela (início, gameplay e conversão CTA)
│       ├── tela_01_inicial.png
│       ├── tela_02_gameplay.png
│       └── tela_03_tela_final_cta.png
└── divulgacao/
    └── divulgacao_keyart_v01.png    # Pôster vertical no formato 4:5 oficial
```

---

## 🚀 Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/advergame_passolivre.git
cd advergame_passolivre
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```text
http://localhost:3000
```

---

## 🎨 Paleta Oficial Aprovada da Marca
* 🔵 **Azul Celeste Nuvem:** `#38BDF8`
* 🟠 **Laranja Energia:** `#FB923C`
* ⚪ **Branco Espuma:** `#FFFFFF`
* ⚫ **Azul Asfalto Noturno:** `#0F172A`

---

## ⚖️ Declaração de Uso de IA
Advergame acadêmico desenvolvido com auxílio de ferramentas de IA generativa (Google AI Studio modo Build, Nano Banana / Google Flow e Veo 3.1) para a disciplina Modelagem e Animação 3D (MA3D 06) da FMU TECH.
