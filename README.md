# 👟 Passo Livre: Corrida nas Nuvens — Advergame 3D Web

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38BDF8.svg)](https://tailwindcss.com/)
[![Canvas 60FPS](https://img.shields.io/badge/Canvas-60_FPS-10B981.svg)]()
[![LGPD](https://img.shields.io/badge/Compliance-LGPD_Zero_Data-success.svg)]()

> **Disciplina:** Modelagem e Animação 3D (MA3D 06)  
> **Curso:** Jogos Digitais / Ciência da Computação / Design  
> **Instituição:** FMU TECH (Level Up)  
> **Docente:** Prof. Hercules Ramos  
> **Briefing Oficial:** Opção 3 — Passo Livre (Lançamento do tênis esportivo *Passo Livre Nuvem*)  
> **Mascote Autoral:** Lipe, o simpático cãozinho vira-lata corredor  
> **Link Jogável no Navegador:** [Jogar Passo Livre: Corrida nas Nuvens](https://ais-pre-opgv4oqvafhss5htmfaton-463263372549.us-east1.run.app)

---

## 🎮 1. Sobre o Jogo (Advergame Casual Catcher)

**Passo Livre: Corrida nas Nuvens** é um advergame casual desenvolvido para navegadores móveis e desktop, rodando a **60 FPS fluidos**, sem necessidade de instalação.

* **Objetivo:** Controlar o mascote Lipe pela pista do parque coletando itens e desviando de perigos durante 60 segundos de treino.
* **Sistema de 3 Vidas (❤️❤️❤️):**
  * Se pedras ou obstáculos pesados caírem na cabeça do Lipe, ele perde 1 vida e ganha 1,4s de invulnerabilidade piscando.
  * Se perder as 3 vidas, ocorre o Game Over!
* **Mecânica Central com o Produto (DEMONSTRATIVO):**
  * Ao coletar o novo **Tênis Passo Livre Nuvem**, o Lipe ativa o modo **"Super Salto na Nuvem"**: uma nuvenzinha fofa se materializa debaixo dos seus calçados, permitindo saltos altos no ar, imunidade contra obstáculos (+50 pts) e pontuação multiplicada!
* **Itens de Hidratação:** Garrafinhas d'água refrescantes que concedem +100 pontos e mantêm o combo ativo.
* **Conversão & Call-to-Action (CTA):** Na tela final, o jogador recebe o cupom exclusivo **`NUVEM20`** (20% OFF) para adquirir o tênis no e-commerce oficial da Passo Livre.
* **Privacidade & Conformidade:** Zero coleta de dados pessoais, cumprindo estritamente a LGPD e as normas do Conanda.

---

## 📂 2. Estrutura de Pastas do Repositório (Padrão Oficial da Aula)

O projeto está 100% estruturado na árvore de diretórios oficial exigida pelo professor:

```text
advergame_welton/
├── briefing/
│   ├── briefing_passolivre.md           # Briefing formal do cliente Passo Livre
│   └── conceitos_v01.md                 # 3 conceitos iniciais com justificativa da escolha
├── docs/
│   ├── mini-gdd_v01.md                  # Mini-GDD de 1 página com as 9 seções obrigatórias
│   └── relatorio_final.md               # Relatório final com as 7 seções (testes, problemas e IA)
├── prompts/
│   ├── ficha_mascote_lipe.md            # Ficha de personagem com 4 vistas e model sheet
│   └── log_de_prompts.md                # Log de prompts utilizados no Nano Banana e Flow
├── assets/                              # Lista completa de assets no padrão [tipo]_[nome]_v01.png
│   ├── mascote_lipe_modelsheet_v01.png  # Model Sheet do Lipe (4 vistas: Frente, Perfis e Costas)
│   ├── mascote_lipe_estado-parado_v01.png
│   ├── mascote_lipe_estado-correndo_v01.png
│   ├── mascote_lipe_estado-powerup_v01.png
│   ├── mascote_lipe_estado-tropeco_v01.png
│   ├── cenario_fundo-ceu-nuvens_v01.png # Camada 1: Céu com nuvens em parallax
│   ├── cenario_pista-parque-chao_v01.png# Camada 2: Pista de asfalto e gramado do parque
│   ├── itens_tenis-nuvem_v01.png        # Produto principal com aura de energia
│   ├── itens_garrafa-agua_v01.png       # Garrafinha de hidratação translúcida
│   ├── itens_poca-lama_v01.png          # Poça de lama e obstáculos
│   ├── ui_logo-passolivre_v01.png       # Logomarca oficial da Passo Livre
│   ├── ui_botao-jogar_v01.png           # Botão de início de treino (laranja)
│   ├── ui_botao-cta-cupom_v01.png       # Botão de garantia do tênis (ciano)
│   └── ui_painel-fim_v01.png            # Card final com cupom e pontuação
├── game/
│   ├── link_do_jogo.txt                 # Link oficial jogável na nuvem
│   └── prints/                          # 3 capturas de tela obrigatórias
│       ├── tela_01_inicial.png          # Tela de abertura e apresentação
│       ├── tela_02_gameplay.png         # Partida em ação (Lipe, tênis e nuvem)
│       └── tela_03_tela_final_cta.png   # Conversão com cupom NUVEM20 e declaração IA
├── divulgacao/
│   └── divulgacao_keyart_v01.png        # Pôster vertical oficial no formato 4:5
└── README.md                            # Documentação acadêmica completa
```

---

## 🎨 3. Paleta Oficial Aprovada da Marca

As cores foram estritamente mantidas em todo o jogo, HUD e interface:

| Cor | Nome | Hex | Aplicação Principal |
| :--- | :--- | :--- | :--- |
| 🔵 | **Azul Celeste Nuvem** | `#38BDF8` | Cabedal do tênis, céu, botões secundários, auras |
| 🟠 | **Laranja Energia** | `#FB923C` | Acentos do tênis, botões principais (CTA), combos |
| ⚪ | **Branco Espuma Nuvem**| `#FFFFFF` | Solado de amortecimento do tênis, nuvens do cenário |
| ⚫ | **Azul Asfalto Noturno** | `#0F172A` | Pista de corrida do parque, fundos de alto contraste |

---

## ⌨️ 4. Controles do Jogo

| Dispositivo | Ação de Movimento | Ação de Pulo |
| :--- | :--- | :--- |
| **📱 Celular / Tablet** | Arrastar o dedo na tela ou botões `[←]` e `[→]` | Botão grande central `[ PULAR ☁️ ]` |
| **💻 Computador (PC/Mac)** | Setas `←` e `→` ou teclas `A` e `D` | Barra de `Espaço` ou seta para cima `↑` / `W` |

---

## 🛠️ 5. Como Executar o Projeto Localmente

1. **Clone o repositório:**
```bash
git clone https://github.com/SEU_USUARIO/advergame_passolivre.git
cd advergame_passolivre
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Acesse no seu navegador:**
```text
http://localhost:3000
```

---

## 📤 6. Comandos para Subir no seu GitHub

Para enviar este projeto para o seu repositório pessoal no GitHub:

```bash
# 1. Inicialize o repositório Git local
git init

# 2. Adicione todos os arquivos e pastas estruturados
git add .

# 3. Crie o commit com a mensagem da entrega
git commit -m "feat: advergame passo livre corrida nas nuvens completo - ma3d 06 fmu tech"

# 4. Defina o branch principal como main
git branch -M main

# 5. Conecte ao seu repositório remoto no GitHub
git remote add origin https://github.com/SEU_USUARIO/advergame_passolivre.git

# 6. Envie o código
git push -u origin main
```

---

## 📋 7. Checklist de Validação da Entrega (Slide 5)

- [x] Jogado no celular e no desktop a 60 FPS com zero borrão.
- [x] Tela final exibe o código promocional **NUVEM20** (20% OFF) e CTA para o site.
- [x] Rodapé contém a declaração de uso de IA e nota de conformidade com a LGPD.
- [x] O jogo não coleta nem solicita nenhum dado pessoal do usuário.
- [x] Todos os arquivos da pasta `assets/` seguem rigorosamente a convenção `[tipo]_[nome]_v01.png`.
- [x] O mascote Lipe é o mesmo em todos os materiais e na renderização do jogo.
- [x] Relatório final com as 7 seções completas redigido em `docs/relatorio_final.md`.
- [x] Mini-GDD de 1 página com as 9 seções completas redigido em `docs/mini-gdd_v01.md`.
- [x] Link público do jogo salvo em `game/link_do_jogo.txt`.
- [x] Pasta pronta para envio no GitHub ou compactação em `advergame_welton.zip`.

---

## ⚖️ 8. Declaração de Uso de IA & Conformidade Legal

Advergame acadêmico desenvolvido como trabalho prático da disciplina **Modelagem e Animação 3D (MA3D 06)** da **FMU TECH (Level Up)**, sob orientação do **Prof. Hercules Ramos**.

* **Ferramentas de IA Utilizadas:** Google AI Studio (modo Build), Nano Banana / Google Flow (geração de assets 2D conceituais) e Veo 3.1.
* **Propriedade Intelectual & Conanda:** Projeto estritamente educativo, de autoria própria para a marca fictícia *Passo Livre*.
* **LGPD (Lei nº 13.709/2018):** Nenhuma informação cadastral, cookie de rastreamento ou dado pessoal é armazenado ou transmitido pelo jogo.
