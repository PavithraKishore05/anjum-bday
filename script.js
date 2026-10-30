/* ========================================================
   ANJUM'S BIRTHDAY WISH & TEDDY BLOWING ANIMATION SCRIPT
   Sweet Music Box Edition
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure page starts at top
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  // Elements
  const displayNameEl = document.getElementById('display-name');
  const letterNameEl = document.getElementById('letter-name');
  const footerNameEl = document.getElementById('footer-name');
  const countdownTitle = document.getElementById('countdown-title');
  const targetHintEl = document.getElementById('target-hint');
  const previewMidnightBtn = document.getElementById('preview-midnight-btn');
  const midnightBanner = document.getElementById('midnight-banner');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const musicToggleIcon = document.getElementById('music-toggle-icon');
  const musicToggleText = document.getElementById('music-toggle-text');

  // Countdown Elements
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  // Teddy & Candle Elements
  const teddyCharacter = document.getElementById('teddy-character');
  const teddyBubble = document.getElementById('teddy-bubble');
  const blowWind = document.getElementById('blow-wind');
  const flameWrapper = document.getElementById('flame-wrapper');
  const smokeTrail = document.getElementById('smoke-trail');
  const blowBtn = document.getElementById('blow-btn');
  const relightBtn = document.getElementById('relight-btn');
  const wishToast = document.getElementById('wish-toast');
  const candleEl = document.getElementById('candle');

  // Letter & Envelope
  const envelope = document.getElementById('envelope');

  // State
  let isCandleLit = true;
  let isBlowing = false;
  let countdownTimerId = null;
  let isPlayingMusic = false;
  let audioCtx = null;
  let musicInterval = null;
  let currentNoteIdx = 0;

  const appData = {
    name: 'Anjum'
  };

  function applyDataToUI() {
    if (displayNameEl) displayNameEl.textContent = appData.name;
    if (letterNameEl) letterNameEl.textContent = appData.name;
    if (footerNameEl) footerNameEl.textContent = appData.name;
    document.title = `Happy Birthday Anjumiee✨`;

    if (teddyBubble && isCandleLit) {
      teddyBubble.innerHTML = `<span>Make a wish, ${appData.name}! 🎂✨</span>`;
    }
  }

  applyDataToUI();

  // ========================================================
  // 1. COUNTDOWN TIMER LOGIC (Till 12:00 AM Midnight)
  // ========================================================
  function getTargetMidnight() {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    return midnight;
  }

  let targetTime = getTargetMidnight();
  if (targetHintEl) {
    targetHintEl.textContent = `Target: ${targetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, ${targetTime.toLocaleDateString([], { month: 'short', day: 'numeric' })} 🌙`;
  }

  function updateCountdown() {
    const now = new Date();
    const diff = targetTime - now;

    if (diff <= 0) {
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      triggerMidnightCelebration();
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hoursEl) hoursEl.textContent = String(hrs).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(mins).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  countdownTimerId = setInterval(updateCountdown, 1000);

  // ========================================================
  // 2. MIDNIGHT CELEBRATION TRIGGER
  // ========================================================
  function triggerMidnightCelebration() {
    if (countdownTitle) {
      countdownTitle.textContent = "🎉 It's 12:00 AM! Happy Birthday! 🎉";
    }
    if (midnightBanner) {
      midnightBanner.classList.remove('hidden');
    }

    // Fire hearty confetti burst in celebratory waves
    launchCelebrationConfetti();

    // Start that sweet music box song automatically!
    startMusic();

    // Change bubble
    if (teddyBubble) {
      teddyBubble.innerHTML = `<span>IT'S YOUR BIRTHDAY, ${appData.name.toUpperCase()}! 🥳🎈</span>`;
    }
  }

  // 12 AM Celebration Button Click
  if (previewMidnightBtn) {
    previewMidnightBtn.addEventListener('click', () => {
      triggerMidnightCelebration();
    });
  }

  // Music Toggle Button on Midnight Banner
  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      toggleMusic();
    });
  }

  // ========================================================
  // 3. TEDDY & CANDLE BLOWING ANIMATION
  // ========================================================
  function blowOutCandle() {
    if (!isCandleLit || isBlowing) return;
    isBlowing = true;

    // 1. Teddy puffs cheeks and leans in
    if (teddyCharacter) teddyCharacter.classList.add('blowing');
    if (blowWind) blowWind.classList.add('active');

    // 2. Cute gentle wind blow sound
    playBlowSound();

    // 3. Extinguish candle flame
    setTimeout(() => {
      if (flameWrapper) flameWrapper.classList.add('blown-out');
      if (smokeTrail) smokeTrail.classList.add('active');
      isCandleLit = false;

      // Confetti & Toast
      launchConfetti();
      if (wishToast) wishToast.classList.add('show');

      // Update Speech Bubble
      if (teddyBubble) {
        teddyBubble.innerHTML = `<span>Yay! Happy Birthday ${appData.name}! ✨🎂</span>`;
      }

      // Switch buttons
      if (blowBtn) blowBtn.classList.add('hidden');
      if (relightBtn) relightBtn.classList.remove('hidden');

      setTimeout(() => {
        if (teddyCharacter) teddyCharacter.classList.remove('blowing');
        if (blowWind) blowWind.classList.remove('active');
        isBlowing = false;
      }, 700);

      // Hide smoke after animation
      setTimeout(() => {
        if (smokeTrail) smokeTrail.classList.remove('active');
      }, 2500);

    }, 500);
  }

  function relightCandle() {
    if (isCandleLit) return;

    playSparkSound();

    if (flameWrapper) flameWrapper.classList.remove('blown-out');
    if (smokeTrail) smokeTrail.classList.remove('active');
    isCandleLit = true;

    if (blowBtn) blowBtn.classList.remove('hidden');
    if (relightBtn) relightBtn.classList.add('hidden');
    if (wishToast) wishToast.classList.remove('show');

    if (teddyBubble) {
      teddyBubble.innerHTML = `<span>Make another wish, ${appData.name}! 🕯️💖</span>`;
    }
  }

  if (blowBtn) blowBtn.addEventListener('click', blowOutCandle);
  if (candleEl) {
    candleEl.addEventListener('click', () => {
      if (isCandleLit) blowOutCandle();
      else relightCandle();
    });
  }
  if (relightBtn) relightBtn.addEventListener('click', relightCandle);

  // ========================================================
  // 4. ENVELOPE & LETTER UNFOLDING
  // ========================================================
  if (envelope) {
    envelope.addEventListener('click', () => {
      const isOpen = envelope.classList.toggle('open');
      if (isOpen) {
        playPopSound(659.25);
        launchMiniConfetti();
      }
    });
  }

  // ========================================================
  // 5. SWEET MUSIC BOX & SOUND SYNTHESIZER (Original Favorite)
  // Gentle, charming, and nostalgic celesta chimes!
  // ========================================================
  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Sweet gentle celesta music-box chime
  function playMusicBoxChime(freq, duration) {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      // Soft octave sparkle
      osc2.type = 'triangle';
      osc2.frequency.value = freq * 2;

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc2.start();
      osc.stop(ctx.currentTime + duration);
      osc2.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  // The beloved gentle Happy Birthday Music Box notes
  const bdayNotes = [
    { f: 261.63, d: 0.35 }, // Hap-
    { f: 261.63, d: 0.25 }, // py
    { f: 293.66, d: 0.5 },  // birth-
    { f: 261.63, d: 0.5 },  // day
    { f: 349.23, d: 0.5 },  // to
    { f: 329.63, d: 0.9 },  // you
    { f: 0,      d: 0.25 }, // rest

    { f: 261.63, d: 0.35 }, // Hap-
    { f: 261.63, d: 0.25 }, // py
    { f: 293.66, d: 0.5 },  // birth-
    { f: 261.63, d: 0.5 },  // day
    { f: 392.00, d: 0.5 },  // to
    { f: 349.23, d: 0.9 },  // you
    { f: 0,      d: 0.25 }, // rest

    { f: 261.63, d: 0.35 }, // Hap-
    { f: 261.63, d: 0.25 }, // py
    { f: 523.25, d: 0.5 },  // birth-
    { f: 440.00, d: 0.5 },  // day
    { f: 349.23, d: 0.5 },  // dear
    { f: 329.63, d: 0.5 },  // An-
    { f: 293.66, d: 0.8 },  // jum
    { f: 0,      d: 0.25 }, // rest

    { f: 466.16, d: 0.35 }, // Hap-
    { f: 466.16, d: 0.25 }, // py
    { f: 440.00, d: 0.5 },  // birth-
    { f: 349.23, d: 0.5 },  // day
    { f: 392.00, d: 0.5 },  // to
    { f: 349.23, d: 1.2 },  // you
    { f: 0,      d: 0.8 }   // rest before loop
  ];

  function startMusic() {
    getAudioContext();
    isPlayingMusic = true;
    updateMusicButtonUI(true);
    currentNoteIdx = 0;
    playNextMusicBoxNote();
  }

  function stopMusic() {
    isPlayingMusic = false;
    updateMusicButtonUI(false);
    if (musicInterval) {
      clearTimeout(musicInterval);
      musicInterval = null;
    }
  }

  function toggleMusic() {
    if (isPlayingMusic) {
      stopMusic();
    } else {
      startMusic();
    }
  }

  function playNextMusicBoxNote() {
    if (!isPlayingMusic) return;

    const note = bdayNotes[currentNoteIdx];
    if (note.f > 0) {
      playMusicBoxChime(note.f, note.d * 1.2);
    }

    currentNoteIdx = (currentNoteIdx + 1) % bdayNotes.length;
    const stepDuration = note.d * 1000;
    musicInterval = setTimeout(playNextMusicBoxNote, stepDuration);
  }

  function updateMusicButtonUI(playing) {
    if (musicToggleText) {
      musicToggleText.textContent = playing ? "Pause Music" : "Play Music Box";
    }
    if (musicToggleIcon) {
      musicToggleIcon.textContent = playing ? "⏸️" : "🎵";
    }
  }

  // Cute pop sound for letter
  function playPopSound(freq = 520) {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  }

  // Soft candle blowing wind puff
  function playBlowSound() {
    try {
      const ctx = getAudioContext();
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.25);
      filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.5);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();

      // Soft fairy sparkle after blow
      setTimeout(() => {
        [523.25, 659.25, 783.99, 1046.50].forEach((f, idx) => {
          setTimeout(() => playMusicBoxChime(f, 0.4), idx * 100);
        });
      }, 350);
    } catch (e) {}
  }

  // Spark sound for relighting
  function playSparkSound() {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch (e) {}
  }

  // ========================================================
  // 6. CONFETTI EFFECTS (via canvas-confetti)
  // ========================================================
  function launchConfetti() {
    if (typeof confetti !== 'function') return;

    const colors = ['#FF6B8B', '#FFD166', '#FF8BA7', '#FFCCD5', '#6C5CE7', '#FFF0F5'];

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: colors,
      disableForReducedMotion: true
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
    }, 250);
  }

  function launchMiniConfetti() {
    if (typeof confetti !== 'function') return;
    confetti({
      particleCount: 35,
      spread: 45,
      origin: { y: 0.75 },
      colors: ['#FF6B8B', '#FFCCD5', '#FFD166']
    });
  }

  function launchCelebrationConfetti() {
    launchConfetti();
    setTimeout(() => {
      launchConfetti();
    }, 500);
    setTimeout(() => {
      launchMiniConfetti();
    }, 1000);
  }

  // ========================================================
  // 7. BACKGROUND STARS & BALLOONS
  // ========================================================
  function initBackground() {
    const starsContainer = document.getElementById('stars-container');
    if (starsContainer) {
      const starCount = 35;
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = ['✦', '★', '⋆', '✨'][Math.floor(Math.random() * 4)];
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.fontSize = `${10 + Math.random() * 14}px`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        starsContainer.appendChild(star);
      }
    }

    const balloonsContainer = document.getElementById('balloons-container');
    if (balloonsContainer) {
      const balloonEmojis = ['🎈', '💖', '✨', '🎈', '🌸'];
      for (let i = 0; i < 7; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.textContent = balloonEmojis[i % balloonEmojis.length];
        balloon.style.left = `${10 + i * 14}%`;
        balloon.style.animationDelay = `${i * 2 + Math.random() * 2}s`;
        balloon.style.animationDuration = `${12 + Math.random() * 6}s`;
        balloonsContainer.appendChild(balloon);
      }
    }
  }

  initBackground();
});
