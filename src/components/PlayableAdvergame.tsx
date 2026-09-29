import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, RotateCcw, Award, Volume2, VolumeX, ArrowLeft, ArrowRight, ArrowUp, Sparkles, Flame, Copy, Check, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BrandBriefing, GameState } from '../types/advergame';
import { sound } from '../utils/audioSystem';

// Key art for modal preview
import keyartImg from '../assets/images/divulgacao_keyart_1790724507571.jpg';

interface PlayableAdvergameProps {
  briefing: BrandBriefing;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onGoToBriefing: () => void;
}

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'shoe' | 'water' | 'obstacle';
  collected: boolean;
  rotation: number;
  rotSpeed: number;
  wobbleOffset: number;
}

interface FloatingScore {
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  vy: number;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export const PlayableAdvergame: React.FC<PlayableAdvergameProps> = ({
  soundEnabled,
  onToggleSound
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // React HUD states
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [score, setScore] = useState<number>(0);
  const [itemsCollected, setItemsCollected] = useState<number>(0);
  const [combo, setCombo] = useState<number>(1);
  const [lives, setLives] = useState<number>(3); // 3 vidas
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [powerUpActive, setPowerUpActive] = useState<boolean>(false);
  const [powerUpTime, setPowerUpTime] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Gameplay simulation variables
  const gameRef = useRef({
    playerX: 240, // centered on 480px canvas
    targetX: 240,
    playerY: 0, // jump height
    playerVy: 0,
    isJumping: false,
    facing: 1 as 1 | -1, // 1: right, -1: left
    isMoving: false,
    stumbleTimer: 0,
    invulnerableTimer: 0,
    runCycle: 0,
    blinkTimer: 0,
    tailWag: 0,
    powerUpTimer: 0,
    items: [] as FallingItem[],
    scores: [] as FloatingScore[],
    particles: [] as SparkParticle[],
    gameTime: 60,
    livesCount: 3,
    scoreAcc: 0,
    itemsAcc: 0,
    comboAcc: 1,
    nextItemId: 1,
    spawnTimer: 0,
    cloudOffset: 0
  });

  // Controls: Left, Right, Jump
  const moveLeft = useCallback(() => {
    const gr = gameRef.current;
    gr.targetX = Math.max(55, gr.targetX - 75);
    gr.facing = -1;
    gr.isMoving = true;
  }, []);

  const moveRight = useCallback(() => {
    const gr = gameRef.current;
    gr.targetX = Math.min(425, gr.targetX + 75);
    gr.facing = 1;
    gr.isMoving = true;
  }, []);

  const jump = useCallback(() => {
    const gr = gameRef.current;
    if (!gr.isJumping) {
      gr.isJumping = true;
      gr.playerVy = gr.powerUpTimer > 0 ? -17 : -13.5;
      sound.playJump();

      // Cloud puffs underneath
      for (let i = 0; i < 7; i++) {
        gr.particles.push({
          x: gr.playerX + (Math.random() - 0.5) * 40,
          y: 710,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 2,
          radius: Math.random() * 8 + 5,
          alpha: 0.8,
          color: gr.powerUpTimer > 0 ? '#38bdf8' : '#ffffff'
        });
      }
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'PLAYING') return;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        moveLeft();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        moveRight();
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, moveLeft, moveRight, jump]);

  // Touch / Pointer Dragging on Canvas
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameState !== 'PLAYING') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const clientX = (e.clientX - rect.left) * scaleX;

    const gr = gameRef.current;
    if (clientX < gr.playerX - 8) {
      gr.facing = -1;
    } else if (clientX > gr.playerX + 8) {
      gr.facing = 1;
    }
    gr.targetX = Math.max(55, Math.min(425, clientX));
    gr.isMoving = true;
  };

  // Start / Reset Game
  const startGame = () => {
    const gr = gameRef.current;
    gr.playerX = 240;
    gr.targetX = 240;
    gr.playerY = 0;
    gr.playerVy = 0;
    gr.isJumping = false;
    gr.stumbleTimer = 0;
    gr.invulnerableTimer = 0;
    gr.powerUpTimer = 0;
    gr.gameTime = 60;
    gr.livesCount = 3;
    gr.scoreAcc = 0;
    gr.itemsAcc = 0;
    gr.comboAcc = 1;
    gr.items = [];
    gr.scores = [];
    gr.particles = [];
    gr.spawnTimer = 0;

    // Pre-spawn initial items
    for (let i = 0; i < 3; i++) {
      gr.items.push({
        id: gr.nextItemId++,
        x: 80 + Math.random() * 320,
        y: -i * 150 - 50,
        speed: 170 + Math.random() * 40,
        type: i === 0 ? 'shoe' : 'water',
        collected: false,
        rotation: 0,
        rotSpeed: (Math.random() - 0.5) * 1.5,
        wobbleOffset: Math.random() * Math.PI * 2
      });
    }

    setScore(0);
    setItemsCollected(0);
    setCombo(1);
    setLives(3);
    setTimeLeft(60);
    setPowerUpActive(false);
    setPowerUpTime(0);
    setGameState('PLAYING');

    sound.startBGM();
  };

  const copyCoupon = () => {
    navigator.clipboard.writeText('NUVEM20');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // ============================================================
  // MASTERIZED PROCEDURAL PUPPET RENDERER: LIPE THE CARAMEL DOG
  // ============================================================
  const renderLipePuppet = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    gr: typeof gameRef.current,
    now: number
  ) => {
    // If invulnerable, blink
    if (gr.invulnerableTimer > 0 && Math.floor(now / 80) % 2 === 0) {
      return; // blink invisible for iframe
    }

    ctx.save();
    ctx.translate(x, y);

    // Stumble tilt & vibration
    if (gr.stumbleTimer > 0) {
      const shake = Math.sin(gr.stumbleTimer * 30) * 0.35;
      ctx.rotate(shake);
    }

    // Direction flip
    ctx.scale(gr.facing, 1);

    const isPower = gr.powerUpTimer > 0;
    const isJumping = gr.isJumping;
    const isStumble = gr.stumbleTimer > 0;
    const run = gr.runCycle;
    const legSwing = gr.isMoving && !isJumping ? Math.sin(run) : 0;
    const armSwing = gr.isMoving && !isJumping ? Math.cos(run) : 0;
    const headBob = gr.isMoving && !isJumping ? Math.abs(Math.sin(run * 2)) * 3 : 0;

    // 1. CLOUD PLATFORM (Underneath Lipe when in Super Salto Power-Up)
    if (isPower || gr.playerY > 15) {
      ctx.save();
      const cloudY = 32;
      const cloudScale = isPower ? 1.15 : 0.95;
      ctx.scale(cloudScale, cloudScale);

      // Cloud glow
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#ffffff';

      // Fluffy cartoon puffs
      ctx.beginPath();
      ctx.arc(-26, cloudY, 14, 0, Math.PI * 2);
      ctx.arc(0, cloudY - 5, 20, 0, Math.PI * 2);
      ctx.arc(26, cloudY, 14, 0, Math.PI * 2);
      ctx.fill();

      // Cyan soft rim
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Energy speed sparks
      if (isPower) {
        ctx.fillStyle = '#fb923c';
        ctx.beginPath();
        ctx.arc(-42 + Math.sin(now * 0.01) * 4, cloudY + 4, 3, 0, Math.PI * 2);
        ctx.arc(42 + Math.cos(now * 0.01) * 4, cloudY + 4, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // 2. WAGGING CARAMEL TAIL
    ctx.save();
    ctx.translate(-18, -18);
    const tailWagAngle = Math.sin(gr.tailWag) * 0.35 + (isPower ? 0.3 : 0);
    ctx.rotate(tailWagAngle);
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-14, -14, -22, -8);
    ctx.quadraticCurveTo(-18, 2, 0, 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 3. BACK LEG & SHOE
    ctx.save();
    ctx.translate(-8, 8);
    if (isJumping) {
      ctx.rotate(-0.3);
    } else {
      ctx.rotate(-legSwing * 0.45);
    }
    // Leg
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.roundRect(-5, 0, 10, 18, 5);
    ctx.fill();

    // Back Shoe (Passo Livre Nuvem)
    renderShoe(ctx, 0, 16, isPower);
    ctx.restore();

    // 4. CHUBBY CARAMEL BODY
    ctx.save();
    ctx.translate(0, -18 + headBob * 0.4);
    // Main torso
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.ellipse(0, 0, 22, 26, 0, 0, Math.PI * 2);
    ctx.fill();

    // Creamy belly patch
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.ellipse(4, 2, 13, 18, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 5. FRONT LEG & SHOE
    ctx.save();
    ctx.translate(8, 8);
    if (isJumping) {
      ctx.rotate(0.25);
    } else {
      ctx.rotate(legSwing * 0.45);
    }
    // Leg
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.roundRect(-5, 0, 10, 18, 5);
    ctx.fill();

    // Front Shoe (Passo Livre Nuvem)
    renderShoe(ctx, 0, 16, isPower);
    ctx.restore();

    // 6. ARMS / PAWS
    ctx.save();
    ctx.translate(0, -22 + headBob * 0.5);
    if (isStumble) {
      ctx.rotate(Math.sin(now * 0.02) * 0.5);
      renderArm(ctx, -14, -2, -0.6);
      renderArm(ctx, 14, -2, 0.6);
    } else if (isJumping || isPower) {
      renderArm(ctx, -12, -10, -0.9);
      renderArm(ctx, 12, -10, 0.9);
    } else {
      renderArm(ctx, -6, 0, armSwing * 0.5);
      renderArm(ctx, 8, 2, -armSwing * 0.5);
    }
    ctx.restore();

    // 7. CARTOON HEAD & EXPRESSIVE FACE
    ctx.save();
    ctx.translate(2, -48 + headBob);

    // Floppy ears
    const earBounce = isJumping ? -0.3 : Math.sin(run * 2) * 0.15;
    // Left ear
    ctx.save();
    ctx.translate(-18, -12);
    ctx.rotate(-0.35 + earBounce);
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.ellipse(0, 14, 8, 20, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Right ear
    ctx.save();
    ctx.translate(18, -12);
    ctx.rotate(0.35 - earBounce);
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.ellipse(0, 14, 8, 20, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Head base
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.fill();

    // Cheeks
    ctx.beginPath();
    ctx.arc(-10, 4, 12, 0, Math.PI * 2);
    ctx.arc(10, 4, 12, 0, Math.PI * 2);
    ctx.fill();

    // Cream muzzle / snout
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.ellipse(2, 6, 14, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.ellipse(2, 1, 6, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0.5, 0, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    const isBlinking = gr.blinkTimer > 3.4 && gr.blinkTimer < 3.55;

    if (isStumble) {
      // Dizzy cartoon eyes > <
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-11, -8);
      ctx.lineTo(-6, -5);
      ctx.lineTo(-11, -2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(11, -8);
      ctx.lineTo(6, -5);
      ctx.lineTo(11, -2);
      ctx.stroke();
    } else if (isBlinking) {
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-11, -5);
      ctx.lineTo(-5, -5);
      ctx.moveTo(5, -5);
      ctx.lineTo(11, -5);
      ctx.stroke();
    } else {
      // Big friendly puppy eyes
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(-8, -6, 5, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.arc(-7, -5, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-8, -7, 1.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(8, -6, 5, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.arc(9, -5, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(8, -7, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Mouth
    if (isPower || isJumping) {
      ctx.fillStyle = '#e11d48';
      ctx.beginPath();
      ctx.arc(2, 9, 7, 0, Math.PI);
      ctx.fill();
      ctx.fillStyle = '#fda4af';
      ctx.beginPath();
      ctx.arc(2, 13, 4, 0, Math.PI);
      ctx.fill();
    } else {
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(2, 6, 6, 0.2, Math.PI - 0.2);
      ctx.stroke();
    }

    ctx.restore(); // end head

    ctx.restore(); // end character
  };

  // Helper: Render arm / paw
  const renderArm = (ctx: CanvasRenderingContext2D, px: number, py: number, angle: number) => {
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(angle);
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.roundRect(-4, 0, 8, 16, 4);
    ctx.fill();
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(0, 15, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Helper: Render Authentic Passo Livre Nuvem Sneaker
  const renderShoe = (ctx: CanvasRenderingContext2D, sx: number, sy: number, isPower: boolean) => {
    ctx.save();
    ctx.translate(sx, sy);

    if (isPower) {
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
    }

    // Cyan Upper Mesh
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.roundRect(-10, 0, 22, 11, 4);
    ctx.fill();

    // Orange Heel Accent & Lace
    ctx.fillStyle = '#fb923c';
    ctx.fillRect(-10, 2, 4, 6);
    ctx.fillRect(-2, 1, 6, 2);

    // Thick White Cloud Foam Cushion Midsole
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(-11, 9, 24, 7, 3);
    ctx.fill();

    // Cloud Sole Texture Grooves
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-5, 9);
    ctx.lineTo(-5, 16);
    ctx.moveTo(3, 9);
    ctx.lineTo(3, 16);
    ctx.stroke();

    ctx.restore();
  };

  // ============================================================
  // MAIN 60 FPS CANVAS LOOP
  // ============================================================
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const canvas = canvasRef.current;
      if (!canvas) {
        animId = requestAnimationFrame(loop);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animId = requestAnimationFrame(loop);
        return;
      }

      const gr = gameRef.current;
      const W = canvas.width;
      const H = canvas.height;

      // 1. UPDATE GAMEPLAY
      if (gameState === 'PLAYING') {
        gr.gameTime -= dt;
        setTimeLeft(Math.max(0, Math.ceil(gr.gameTime)));

        // Invulnerability timer
        if (gr.invulnerableTimer > 0) {
          gr.invulnerableTimer -= dt;
        }

        // Check Game Over by Time
        if (gr.gameTime <= 0) {
          setGameState('GAMEOVER');
          sound.stopBGM();
          sound.playGameOver();
          confetti({
            particleCount: 85,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#38bdf8', '#fb923c', '#ffffff', '#0284c7']
          });
        }

        // Power-Up Countdown
        if (gr.powerUpTimer > 0) {
          gr.powerUpTimer -= dt;
          setPowerUpTime(Math.ceil(gr.powerUpTimer));
          if (gr.powerUpTimer <= 0) {
            setPowerUpActive(false);
          }
        }

        // Horizontal Movement Smoothing
        const dx = gr.targetX - gr.playerX;
        if (Math.abs(dx) > 1.5) {
          gr.playerX += dx * 13 * dt;
          gr.runCycle += dt * 14;
          gr.isMoving = true;
        } else {
          gr.playerX = gr.targetX;
          gr.isMoving = false;
        }

        // Tail Wag & Blink timer
        gr.tailWag += dt * 8;
        gr.blinkTimer = (gr.blinkTimer + dt) % 3.6;

        // Jump Physics
        if (gr.isJumping) {
          gr.playerVy += (gr.powerUpTimer > 0 ? 28 : 36) * dt;
          gr.playerY -= gr.playerVy;

          if (gr.playerY <= 0) {
            gr.playerY = 0;
            gr.playerVy = 0;
            gr.isJumping = false;
          }
        }

        // Stumble Recovery
        if (gr.stumbleTimer > 0) {
          gr.stumbleTimer -= dt;
        }

        // Scenery Drift
        gr.cloudOffset = (gr.cloudOffset + 16 * dt) % W;

        // Spawn Items: Tênis (25%), Garrafa (50%), Obstáculo Perigoso (25%)
        gr.spawnTimer += dt;
        const spawnDelay = gr.powerUpTimer > 0 ? 0.75 : 1.1;
        if (gr.spawnTimer > spawnDelay) {
          gr.spawnTimer = 0;
          const r = Math.random();
          const type: 'shoe' | 'water' | 'obstacle' =
            r < 0.25 ? 'shoe' : r < 0.75 ? 'water' : 'obstacle';

          gr.items.push({
            id: gr.nextItemId++,
            x: 55 + Math.random() * (W - 110),
            y: -50,
            speed: (gr.powerUpTimer > 0 ? 220 : 180) + Math.random() * 45,
            type,
            collected: false,
            rotation: 0,
            rotSpeed: (Math.random() - 0.5) * 2,
            wobbleOffset: Math.random() * Math.PI * 2
          });
        }

        // Check Item Collisions with Puppet
        const groundLevel = 675;
        const playerScreenY = groundLevel - gr.playerY;

        for (let i = gr.items.length - 1; i >= 0; i--) {
          const item = gr.items[i];
          item.y += item.speed * dt;
          item.rotation += item.rotSpeed * dt;
          item.x += Math.sin(now * 0.003 + item.wobbleOffset) * 0.45;

          if (item.y > H + 60) {
            gr.items.splice(i, 1);
            continue;
          }

          if (item.collected) continue;

          // Hitbox check
          const distX = Math.abs(item.x - gr.playerX);
          const distY = Math.abs(item.y - (playerScreenY - 30));

          if (distX < 45 && distY < 55) {
            if (item.type === 'shoe') {
              // CATCH TÊNIS PASSO LIVRE NUVEM
              item.collected = true;
              gr.powerUpTimer = 6.0;
              setPowerUpActive(true);
              sound.playPowerup();

              const pts = 300 * gr.comboAcc;
              gr.scoreAcc += pts;
              gr.itemsAcc += 1;
              gr.comboAcc = Math.min(4, gr.comboAcc + 1);

              setScore(gr.scoreAcc);
              setItemsCollected(gr.itemsAcc);
              setCombo(gr.comboAcc);

              gr.scores.push({
                x: item.x,
                y: item.y,
                text: `+${pts} NUVEM!`,
                color: '#38bdf8',
                alpha: 1,
                vy: -65
              });

              for (let p = 0; p < 18; p++) {
                gr.particles.push({
                  x: item.x,
                  y: item.y,
                  vx: (Math.random() - 0.5) * 8,
                  vy: (Math.random() - 0.5) * 8,
                  radius: Math.random() * 8 + 4,
                  alpha: 1,
                  color: Math.random() > 0.5 ? '#38bdf8' : '#fb923c'
                });
              }
            } else if (item.type === 'water') {
              // CATCH WATER BOTTLE
              item.collected = true;
              sound.playCollect();

              const pts = 100 * gr.comboAcc;
              gr.scoreAcc += pts;
              gr.itemsAcc += 1;
              gr.comboAcc = Math.min(4, gr.comboAcc + 1);

              setScore(gr.scoreAcc);
              setItemsCollected(gr.itemsAcc);
              setCombo(gr.comboAcc);

              gr.scores.push({
                x: item.x,
                y: item.y,
                text: `+${pts}`,
                color: '#ffffff',
                alpha: 1,
                vy: -55
              });

              for (let p = 0; p < 8; p++) {
                gr.particles.push({
                  x: item.x,
                  y: item.y,
                  vx: (Math.random() - 0.5) * 5,
                  vy: -Math.random() * 4 - 2,
                  radius: Math.random() * 6 + 3,
                  alpha: 0.9,
                  color: '#38bdf8'
                });
              }
            } else if (item.type === 'obstacle') {
              // CAIU COISA QUE NÃO ERA PRA CAIR NA CABEÇA!
              item.collected = true;

              if (gr.powerUpTimer > 0) {
                // Protegido pelo Super Salto Nuvem!
                sound.playCollect();
                gr.scoreAcc += 50;
                setScore(gr.scoreAcc);

                gr.scores.push({
                  x: item.x,
                  y: item.y,
                  text: 'DEFENDEU! +50',
                  color: '#38bdf8',
                  alpha: 1,
                  vy: -45
                });
              } else if (gr.invulnerableTimer <= 0) {
                // PERDE VIDA!
                gr.invulnerableTimer = 1.4;
                gr.stumbleTimer = 0.7;
                gr.comboAcc = 1;
                gr.livesCount -= 1;
                sound.playHit();

                setLives(gr.livesCount);
                setCombo(1);

                gr.scores.push({
                  x: item.x,
                  y: item.y,
                  text: '-1 VIDA! 💔',
                  color: '#ef4444',
                  alpha: 1,
                  vy: -50
                });

                // Splash impact
                for (let p = 0; p < 16; p++) {
                  gr.particles.push({
                    x: item.x,
                    y: item.y,
                    vx: (Math.random() - 0.5) * 7,
                    vy: -Math.random() * 5 - 1,
                    radius: Math.random() * 7 + 3,
                    alpha: 0.9,
                    color: '#ef4444'
                  });
                }

                // PERDEU O GAME SE FICAR SEM VIDAS!
                if (gr.livesCount <= 0) {
                  setGameState('GAMEOVER');
                  sound.stopBGM();
                  sound.playGameOver();
                }
              }
            }
          }
        }

        // Update Floating Scores
        for (let s = gr.scores.length - 1; s >= 0; s--) {
          const sc = gr.scores[s];
          sc.y += sc.vy * dt;
          sc.alpha -= 1.3 * dt;
          if (sc.alpha <= 0) {
            gr.scores.splice(s, 1);
          }
        }
      }

      // ============================================================
      // 2. RENDER CRISP 2D SCENERY (ZERO SMEARING / FULL CLEAR)
      // ============================================================

      // CRITICAL FIX: Clear the entire canvas every frame to prevent smearing
      ctx.clearRect(0, 0, W, H);

      const groundLevel = 675;

      // 2.1 Sunny Morning Blue Sky (from 0 to groundLevel + 2 to guarantee no gaps)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, groundLevel);
      skyGrad.addColorStop(0, '#0284c7'); // deep azure
      skyGrad.addColorStop(0.55, '#38bdf8'); // sky blue
      skyGrad.addColorStop(1, '#bae6fd'); // morning horizon
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, groundLevel + 4);

      // Warm Golden Sun in the corner
      ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
      ctx.beginPath();
      ctx.arc(W * 0.85, H * 0.12, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(W * 0.85, H * 0.12, 32, 0, Math.PI * 2);
      ctx.fill();

      // Stylized Fluffy Clouds drifting
      const drawCloud = (cx: number, cy: number, r: number) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.arc(cx + r * 0.8, cy - r * 0.2, r * 0.7, 0, Math.PI * 2);
        ctx.arc(cx - r * 0.8, cy + r * 0.1, r * 0.6, 0, Math.PI * 2);
        ctx.arc(cx + r * 1.5, cy + r * 0.1, r * 0.5, 0, Math.PI * 2);
        ctx.fill();
      };
      drawCloud(((W * 0.2 + gr.cloudOffset) % (W + 200)) - 100, H * 0.2, 30);
      drawCloud(((W * 0.7 + gr.cloudOffset * 1.3) % (W + 200)) - 100, H * 0.3, 24);

      // 2.2 Park Green Lawn & Bushes
      ctx.fillStyle = '#16a34a'; // grass green
      ctx.fillRect(0, groundLevel, W, H - groundLevel);

      // Stylized park bushes along the border
      ctx.fillStyle = '#15803d';
      for (let bx = -20; bx < W + 40; bx += 60) {
        ctx.beginPath();
        ctx.arc(bx, groundLevel + 4, 26, 0, Math.PI);
        ctx.fill();
      }

      // Asphalt Running Track (covers smoothly to the bottom)
      ctx.fillStyle = '#0f172a'; // Azul Asfalto Noturno (#0F172A)
      ctx.fillRect(0, groundLevel + 22, W, H - groundLevel - 22);

      // White Track Border Stripe
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, groundLevel + 22, W, 5);

      // Dashed lane stripes with motion
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 4;
      ctx.setLineDash([25, 20]);
      ctx.beginPath();
      ctx.moveTo(0, groundLevel + 65);
      ctx.lineTo(W, groundLevel + 65);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2.3 Falling Items
      for (const item of gr.items) {
        if (item.collected) continue;

        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);

        if (item.type === 'shoe') {
          // PRODUTO: Tênis Passo Livre Nuvem com Halo
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 16;

          // Glowing aura disk
          ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
          ctx.beginPath();
          ctx.arc(0, 0, 36, 0, Math.PI * 2);
          ctx.fill();

          // Authentic Sneaker
          ctx.scale(1.4, 1.4);
          renderShoe(ctx, 0, -8, true);

          ctx.shadowBlur = 0;
          ctx.font = 'bold 9px Plus Jakarta Sans, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText('NUVEM', 0, -22);
        } else if (item.type === 'water') {
          // ITEM BOM: Garrafinha de Água
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 10;

          // Translucent Cyan bottle
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.roundRect(-12, -22, 24, 44, 7);
          ctx.fill();

          // Orange cap
          ctx.fillStyle = '#fb923c';
          ctx.fillRect(-8, -26, 16, 6);

          // Water shine reflection
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fillRect(-8, -16, 4, 30);
        } else if (item.type === 'obstacle') {
          // OBSTÁCULO: Pedra / Peso caindo do céu que tira vida!
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 12;

          // Red danger aura
          ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
          ctx.beginPath();
          ctx.arc(0, 0, 26, 0, Math.PI * 2);
          ctx.fill();

          // Stone body
          ctx.fillStyle = '#64748b';
          ctx.beginPath();
          ctx.moveTo(-18, -12);
          ctx.lineTo(14, -18);
          ctx.lineTo(20, 10);
          ctx.lineTo(-8, 18);
          ctx.lineTo(-20, 6);
          ctx.closePath();
          ctx.fill();

          // Cracks on stone
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-8, -6);
          ctx.lineTo(4, 2);
          ctx.lineTo(10, -4);
          ctx.stroke();

          // Skull / Danger symbol
          ctx.font = 'bold 12px sans-serif';
          ctx.fillStyle = '#ef4444';
          ctx.textAlign = 'center';
          ctx.fillText('⚠️', 0, 4);
        }

        ctx.restore();
      }

      // 2.4 Particles
      for (let i = gr.particles.length - 1; i >= 0; i--) {
        const pt = gr.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.025;

        if (pt.alpha <= 0) {
          gr.particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // 2.5 MASCOTE LIPE: ANIMATED CARTOON PUPPET
      const px = gr.playerX;
      const py = groundLevel - gr.playerY + 20;

      // Soft Shadow on ground
      const shadowScale = Math.max(0.2, 1 - gr.playerY / 150);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.beginPath();
      ctx.ellipse(px, groundLevel + 30, 42 * shadowScale, 13 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Render the living puppet!
      renderLipePuppet(ctx, px, py, gr, now);

      // 2.6 Floating Scores
      for (const sc of gr.scores) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, sc.alpha);
        ctx.font = 'bold 18px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = sc.color;
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 6;
        ctx.textAlign = 'center';
        ctx.fillText(sc.text, sc.x, sc.y);
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState]);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      {/* Top Game Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <span>PASSO LIVRE &middot; OPÇÃO 3</span>
            <span aria-hidden="true">&middot;</span>
            <span className="text-orange-400">FLUIDEZ TOTAL &middot; 3 VIDAS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display flex items-center gap-2.5">
            <span>Passo Livre: Corrida nas Nuvens</span>
            <span className="text-xs bg-cyan-950 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded font-mono font-normal">
              60s Catcher
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Desativar som' : 'Ativar som'}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 text-cyan-400" /> : <VolumeX className="h-4 w-4 text-slate-500" />}
            <span>{soundEnabled ? 'Som Ligado' : 'Mudo'}</span>
          </button>

          <button
            onClick={startGame}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-500 px-4 py-2 text-xs font-bold text-white transition-colors shadow-md shadow-orange-600/30"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{gameState === 'IDLE' ? 'Começar Corrida' : 'Reiniciar Treino'}</span>
          </button>
        </div>
      </div>

      {/* Main Game Screen Canvas Container */}
      <div className="relative mx-auto w-full max-w-[480px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-2xl">
        <canvas
          ref={canvasRef}
          width={480}
          height={854}
          onPointerMove={handlePointerMove}
          className="w-full h-full block cursor-pointer touch-none"
        />

        {/* HUD In-Game Overlay */}
        {gameState === 'PLAYING' && (
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none text-white z-10">
            {/* Score & Combo */}
            <div className="bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800 flex items-center gap-3 shadow-lg">
              <div>
                <div className="text-[9px] uppercase font-bold text-slate-400">Pontos</div>
                <div className="text-xl font-black font-mono text-cyan-400 tabular-nums">{score}</div>
              </div>
              <div className="h-6 w-[1px] bg-slate-800" />
              <div>
                <div className="text-[9px] uppercase font-bold text-orange-400 flex items-center gap-0.5">
                  <Flame className="h-2.5 w-2.5" /> Combo
                </div>
                <div className="text-lg font-bold font-mono text-orange-400 tabular-nums">{combo}x</div>
              </div>
            </div>

            {/* Lives (Corações) & Timer */}
            <div className="flex flex-col items-end gap-1.5">
              {/* Hearts Indicator */}
              <div className="bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-800 flex items-center gap-1.5 shadow-lg">
                <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Vidas:</span>
                {[1, 2, 3].map((heartIndex) => (
                  <Heart
                    key={heartIndex}
                    className={`h-4 w-4 ${
                      heartIndex <= lives
                        ? 'text-rose-500 fill-rose-500 animate-pulse'
                        : 'text-slate-600 fill-slate-800'
                    }`}
                  />
                ))}
              </div>

              <div className="bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-800 flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Tempo:</span>
                <span className="text-base font-black font-mono text-white tabular-nums">{timeLeft}s</span>
              </div>

              {powerUpActive && (
                <div className="bg-cyan-950/90 border border-cyan-400/60 px-2.5 py-1 rounded-lg text-[10px] font-bold text-cyan-300 backdrop-blur-md animate-pulse flex items-center gap-1 shadow-lg shadow-cyan-500/20">
                  <span>☁️ Super Salto Nuvem:</span>
                  <span className="font-mono text-white">{powerUpTime}s</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Start Screen Overlay */}
        {gameState === 'IDLE' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-between p-6 text-center z-20">
            <div className="space-y-2 mt-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/40">
                <Sparkles className="h-3 w-3" /> Advergame Oficial Passo Livre
              </div>
              <h2 className="text-3xl font-extrabold text-white font-display">
                Passo Livre: Corrida nas Nuvens
              </h2>
              <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                Controle o boneco do Lipe! Pegue os tênis e garrafas d'água. <strong>Cuidado com as pedras que caem do céu: se acertarem sua cabeça, você perde vidas e pode perder o jogo!</strong>
              </p>
            </div>

            {/* Key Art Preview */}
            <div className="relative w-44 aspect-[3/4] rounded-xl overflow-hidden border-2 border-cyan-500/40 shadow-xl shadow-cyan-500/20 my-2">
              <img
                src={keyartImg}
                alt="Passo Livre: Corrida nas Nuvens"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Controls instructions */}
            <div className="w-full max-w-xs bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-300 space-y-1 text-left">
              <div className="font-bold text-white flex items-center justify-between">
                <span>Como Jogar:</span>
                <span className="text-rose-400 flex items-center gap-1">
                  <Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> 3 Vidas
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Mover o Lipe:</span>
                <strong className="text-white">Arraste o dedo ou use &larr; &rarr;</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Evitar Obstáculos:</span>
                <strong className="text-rose-400">Desvie ou aperte PULAR</strong>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full max-w-xs py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-xl shadow-orange-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 mb-2"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Start Training &middot; Iniciar Corrida</span>
            </button>
          </div>
        )}

        {/* Game Over / Conversion CTA Overlay */}
        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-md flex flex-col items-center justify-between p-6 text-center z-30">
            <div className="space-y-1.5 mt-2">
              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                {lives <= 0 ? 'Fim de Jogo · Vidas Esgotadas' : 'Treino Concluído · Passo Livre'}
              </div>
              <h2 className="text-2xl font-black text-white font-display">
                {lives <= 0 ? 'Ops! As pedras te acertaram!' : 'Você deu o seu primeiro passo!'}
              </h2>
              <p className="text-xs text-slate-300">
                {lives <= 0
                  ? 'Não desanime! Na corrida o importante é se levantar e tentar de novo com o Lipe.'
                  : 'Parabéns pelo treino! O esporte é para todos e você arrasou com o Lipe.'}
              </p>
            </div>

            {/* Score Stats */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs bg-slate-900/90 border border-slate-800 p-3 rounded-xl text-left">
              <div>
                <div className="text-[10px] uppercase text-slate-400 font-bold">Pontuação Final</div>
                <div className="text-xl font-black font-mono text-cyan-400 tabular-nums">{score} pts</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-slate-400 font-bold">Itens Coletados</div>
                <div className="text-xl font-black font-mono text-orange-400 tabular-nums">{itemsCollected} itens</div>
              </div>
            </div>

            {/* Promotional Voucher Box */}
            <div className="w-full max-w-xs rounded-xl border border-cyan-500/40 bg-cyan-950/40 p-3.5 text-left space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                <Award className="h-4 w-4 text-cyan-400" />
                <span>20% OFF with coupon NUVEM20</span>
              </div>
              <p className="text-[11px] text-slate-200 leading-snug">
                Ganhe 20% de desconto no lançamento do <strong>Passo Livre Nuvem</strong>:
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono font-bold text-cyan-400 flex items-center justify-between">
                  <span>NUVEM20</span>
                  <span className="text-[9px] text-slate-500 font-normal">20% OFF</span>
                </div>
                <button
                  onClick={copyCoupon}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors"
                >
                  {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{isCopied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>

              <a
                href="https://passolivre.com.br"
                target="_blank"
                rel="noreferrer"
                className="block text-center w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-colors shadow-md"
              >
                Guarantee My Cloud Free Pass &rarr;
              </a>

              {/* Mandatory AI and LGPD Footer declaration */}
              <div className="pt-1.5 border-t border-slate-800/80 text-[9px] text-slate-400 text-center leading-tight">
                Advergame acadêmico desenvolvido com apoio de ferramentas de IA para a disciplina MA3D 06 (FMU TECH) &middot; Zero coleta de dados pessoais (LGPD).
              </div>
            </div>

            {/* Play again button */}
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white py-2"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Tentar Novamente</span>
            </button>
          </div>
        )}
      </div>

      {/* On-Screen Touch Controls for Mobile & Quick Play */}
      <div className="max-w-[480px] mx-auto flex items-center justify-between gap-3 pt-2">
        <button
          onClick={moveLeft}
          className="flex-1 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 active:scale-95 text-white font-bold flex items-center justify-center gap-1 text-sm transition-all"
        >
          <ArrowLeft className="h-5 w-5 text-cyan-400" />
          <span>Esquerda</span>
        </button>

        <button
          onClick={jump}
          className="flex-[1.4] py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-black flex items-center justify-center gap-1 text-sm shadow-md shadow-cyan-600/30 transition-all"
        >
          <ArrowUp className="h-5 w-5" />
          <span>PULAR ☁️</span>
        </button>

        <button
          onClick={moveRight}
          className="flex-1 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 active:scale-95 text-white font-bold flex items-center justify-center gap-1 text-sm transition-all"
        >
          <span>Direita</span>
          <ArrowRight className="h-5 w-5 text-cyan-400" />
        </button>
      </div>
    </div>
  );
};
