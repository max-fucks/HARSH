// =====================================================================
// HARSH - CHERRY BLOSSOM & CELESTIAL ROMANCE ENGINE
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Deep Cosmic Galaxy & Stars VFX (Minimal Visibility)
  initGalaxyVFX();

  // 2. Realistic Falling Cherry Blossom (Sakura) Engine
  initSakuraEngine();

  // 3. Romantic Audio Player Controller
  initAudioPlayer();

  // 4. Side Navigation & Active Section Tracker
  initSectionObserver();

  // 5. Chapters Drawer Menu
  initChaptersDrawer();

  // 6. Subtle 3D Tilt Effect on Hero Images
  initTiltEffect();

  // 7. Interactive Lightbox Modal for Photo Gallery
  initLightbox();
});

/* ---------------------------------------------------------------------
   DEEP COSMIC GALAXY & TWINKLING STARS VFX (MINIMAL VISIBILITY)
   --------------------------------------------------------------------- */
function initGalaxyVFX() {
  const canvas = document.getElementById('galaxy-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
  });

  // Micro Stars Array
  const stars = [];
  const starCount = 140;

  function initStars() {
    stars.length = 0;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.5,
        baseAlpha: Math.random() * 0.32 + 0.14,
        twinkleSpeed: Math.random() * 0.002 + 0.001,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.4 ? '255, 255, 255' : (Math.random() > 0.5 ? '255, 215, 140' : '255, 190, 205'),
      });
    }
  }
  initStars();

  // Shooting Star System
  let meteor = null;
  let nextMeteorTime = Date.now() + Math.random() * 5000 + 4000;

  function spawnMeteor() {
    const startX = Math.random() * (width * 0.7);
    const startY = Math.random() * (height * 0.35);
    const angle = (Math.PI / 180) * (Math.random() * 20 + 25); // 25-45 degrees
    const speed = Math.random() * 7 + 10;
    meteor = {
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: Math.random() * 100 + 80,
      life: 1.0,
      decay: Math.random() * 0.015 + 0.015,
    };
  }

  // Nebula Cloud Centers
  let nebulaAngle = 0;

  function drawNebula() {
    nebulaAngle += 0.0003;
    const cx1 = width * 0.3 + Math.cos(nebulaAngle) * 60;
    const cy1 = height * 0.25 + Math.sin(nebulaAngle) * 40;
    const rad1 = Math.max(width, height) * 0.45;
    const g1 = ctx.createRadialGradient(cx1, cy1, 10, cx1, cy1, rad1);
    g1.addColorStop(0, 'rgba(180, 80, 140, 0.038)');
    g1.addColorStop(0.5, 'rgba(120, 50, 130, 0.018)');
    g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, width, height);

    const cx2 = width * 0.75 + Math.sin(nebulaAngle * 1.2) * 50;
    const cy2 = height * 0.65 + Math.cos(nebulaAngle * 1.2) * 40;
    const rad2 = Math.max(width, height) * 0.5;
    const g2 = ctx.createRadialGradient(cx2, cy2, 10, cx2, cy2, rad2);
    g2.addColorStop(0, 'rgba(60, 90, 180, 0.035)');
    g2.addColorStop(0.5, 'rgba(40, 50, 120, 0.014)');
    g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, width, height);
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // 1. Subtle Nebula Ambient Clouds
    drawNebula();

    // 2. Twinkling Stars
    const now = Date.now();
    for (let s of stars) {
      const alpha = s.baseAlpha + Math.sin(now * s.twinkleSpeed + s.phase) * 0.22;
      const finalAlpha = Math.max(0.08, Math.min(0.72, alpha));

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.color}, ${finalAlpha})`;
      if (s.radius > 1.2) {
        ctx.shadowBlur = 5;
        ctx.shadowColor = `rgba(${s.color}, ${finalAlpha})`;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fill();
    }

    // 3. Rare Shooting Star
    if (!meteor && now > nextMeteorTime) {
      spawnMeteor();
      nextMeteorTime = now + Math.random() * 10000 + 8000;
    }

    if (meteor) {
      meteor.x += meteor.vx;
      meteor.y += meteor.vy;
      meteor.life -= meteor.decay;

      const dist = Math.hypot(meteor.vx, meteor.vy);
      const tailX = meteor.x - (meteor.vx / dist) * meteor.length;
      const tailY = meteor.y - (meteor.vy / dist) * meteor.length;

      const grad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
      grad.addColorStop(0, 'rgba(255, 220, 230, 0)');
      grad.addColorStop(0.7, `rgba(255, 190, 210, ${Math.max(0, meteor.life * 0.35)})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${Math.max(0, meteor.life * 0.85)})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(meteor.x, meteor.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(255, 200, 220, 0.7)';
      ctx.stroke();

      if (meteor.life <= 0 || meteor.x > width + 100 || meteor.y > height + 100) {
        meteor = null;
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* ---------------------------------------------------------------------
   REALISTIC CHERRY BLOSSOM (SAKURA) PHYSICS SIMULATOR
   --------------------------------------------------------------------- */
function initSakuraEngine() {
  const canvas = document.getElementById('sakura-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Petal Configuration
  let petalCount = 65;
  let windSpeed = 0.8;
  let windTarget = 0.8;
  const petals = [];

  // Interactive mouse wind
  let mouseX = width / 2;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    const norm = (mouseX / width - 0.5) * 2;
    windTarget = 0.8 + norm * 1.5;
  });

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * (width + 200) - 100;
      this.y = initial ? Math.random() * height : -30;
      this.size = Math.random() * 11 + 9; // 9px to 20px
      this.speedY = Math.random() * 1.6 + 1.0;
      this.speedX = Math.random() * 0.8 + 0.3;
      
      // 3D angles & rotations
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = (Math.random() - 0.5) * 0.03;
      this.flip = Math.random() * Math.PI;
      this.flipSpeed = Math.random() * 0.03 + 0.015;
      
      // Color & Opacity
      this.opacity = Math.random() * 0.45 + 0.5; // 0.5 to 0.95
      this.hue = Math.random() > 0.3 ? 345 : 352; // Soft pink to rose petal
      this.swaySpeed = Math.random() * 0.02 + 0.01;
      this.swayOffset = Math.random() * 100;
    }

    update() {
      // Smooth wind interpolation
      windSpeed += (windTarget - windSpeed) * 0.03;

      this.y += this.speedY;
      this.x += Math.sin(Date.now() * this.swaySpeed + this.swayOffset) * 0.9 + windSpeed;
      this.angle += this.angleSpeed;
      this.flip += this.flipSpeed;

      // Wrap around when falling off bottom or right
      if (this.y > height + 30 || this.x > width + 120 || this.x < -120) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      
      // 3D flip effect using scaleY
      const scaleY = Math.sin(this.flip);
      ctx.scale(1, scaleY);

      // Draw authentic cherry blossom petal shape (with cleft / notch)
      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.8, this.size * 0.9, this.size * 0.4, 0, this.size);
      ctx.bezierCurveTo(-this.size * 0.9, this.size * 0.4, -this.size * 0.8, -this.size * 0.8, 0, -this.size);
      
      // Radiant Rose Petal Gradient
      const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, this.size);
      grad.addColorStop(0, `hsla(${this.hue}, 100%, 93%, ${this.opacity})`);
      grad.addColorStop(0.65, `hsla(${this.hue}, 92%, 84%, ${this.opacity * 0.9})`);
      grad.addColorStop(1, `hsla(${this.hue}, 80%, 75%, ${this.opacity * 0.8})`);

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(255, 183, 197, 0.4)';
      ctx.shadowBlur = 6;
      ctx.fill();

      // Delicate center petal vein
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.6);
      ctx.lineTo(0, this.size * 0.7);
      ctx.strokeStyle = `hsla(${this.hue}, 75%, 68%, ${this.opacity * 0.35})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    }
  }

  // Populate petals
  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    for (let p of petals) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(render);
  }

  render();

  // Blossom Toggle Button (Drift vs Petal Storm)
  const sakuraBtn = document.getElementById('sakura-toggle');
  const sakuraLabel = document.getElementById('sakura-label');
  let isStorm = false;

  sakuraBtn?.addEventListener('click', () => {
    isStorm = !isStorm;
    if (isStorm) {
      sakuraLabel.textContent = 'Blossom Storm';
      for (let i = 0; i < 45; i++) {
        petals.push(new Petal());
      }
      windTarget = 2.4;
    } else {
      sakuraLabel.textContent = 'Blossom Drift';
      petals.splice(65);
      windTarget = 0.8;
    }
  });
}

/* ---------------------------------------------------------------------
   ROMANTIC SOUNDTRACK CONTROLLER (Local Farben.mp3)
   --------------------------------------------------------------------- */
function initAudioPlayer() {
  const audio = document.getElementById('ambient-audio');
  const btn = document.getElementById('music-toggle');
  const label = document.getElementById('music-label');
  if (!audio || !btn) return;

  audio.volume = 0.5;
  let isPlaying = false;

  btn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      btn.classList.remove('music-playing');
      label.textContent = 'Play Soundtrack';
      isPlaying = false;
    } else {
      audio.play().then(() => {
        btn.classList.add('music-playing');
        label.textContent = 'Farben Romance';
        isPlaying = true;
      }).catch(err => {
        console.warn('Audio play restricted by browser policy:', err);
      });
    }
  });
}

/* ---------------------------------------------------------------------
   INTERSECTION OBSERVER FOR ACTIVE CHAPTERS
   --------------------------------------------------------------------- */
function initSectionObserver() {
  const scenes = document.querySelectorAll('.scene');
  const dots = document.querySelectorAll('.nav-dot');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        dots.forEach(dot => {
          if (dot.getAttribute('href') === `#${id}`) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -30% 0px',
    threshold: 0.1
  });

  scenes.forEach(scene => observer.observe(scene));
}

/* ---------------------------------------------------------------------
   CHAPTERS DRAWER TOGGLE
   --------------------------------------------------------------------- */
function initChaptersDrawer() {
  const menuToggle = document.getElementById('menu-toggle');
  const closeDrawer = document.getElementById('close-drawer');
  const drawer = document.getElementById('chapters-drawer');
  const chapterLinks = document.querySelectorAll('.chapter-link');

  if (!drawer) return;

  menuToggle?.addEventListener('click', () => drawer.classList.add('open'));
  closeDrawer?.addEventListener('click', () => drawer.classList.remove('open'));

  chapterLinks.forEach(link => {
    link.addEventListener('click', () => drawer.classList.remove('open'));
  });

  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && 
        !drawer.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      drawer.classList.remove('open');
    }
  });
}

/* ---------------------------------------------------------------------
   SUBTLE 3D TILT EFFECT
   --------------------------------------------------------------------- */
function initTiltEffect() {
  const containers = document.querySelectorAll('.image-container');

  containers.forEach(container => {
    const img = container.querySelector('.hero-image');
    if (!img) return;

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (-y / rect.height) * 7;
      const rotateY = (x / rect.width) * 7;

      img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.99)`;
    });

    container.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(0.96)';
    });
  });
}

/* ---------------------------------------------------------------------
   INTERACTIVE LIGHTBOX MODAL
   --------------------------------------------------------------------- */
function initLightbox() {
  const cards = document.querySelectorAll('.memory-card');
  const modal = document.getElementById('lightbox');
  const modalImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');

  if (!modal || !modalImg) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img) {
        modalImg.src = img.src;
        modal.classList.add('active');
      }
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}
