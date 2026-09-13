// Web Audio API noir sound synthesizer & atmospheric soundscape engine
// Zero external assets, pure mathematical audio synthesis

let audioCtx = null;
const SFX_KEY = "monfared_sfx_enabled";
const ATMOSPHERE_VOL_KEY = "monfared_atmosphere_volume";

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// -------------------------------------------------------------
// UI SOUND EFFECTS (Clicks, Blips, Glitches)
// Controlled strictly by isSoundEnabled() / setSoundEnabled()
// Muting this does NOT mute running soundscape music!
// -------------------------------------------------------------

export function isSoundEnabled() {
  if (typeof window === "undefined") return false;
  const val = localStorage.getItem(SFX_KEY);
  return val === null ? true : val === "true";
}

export function setSoundEnabled(enabled) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SFX_KEY, enabled ? "true" : "false");
  window.dispatchEvent(new CustomEvent("sound-toggle", { detail: enabled }));
}

export function playClick(freq = 600, duration = 0.035) {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio errors
  }
}

export function playBlip(freq = 880) {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.11, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Ignore audio errors
  }
}

export function playGlitch() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 800;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch {
    // Ignore audio errors
  }
}

// -------------------------------------------------------------
// NOIR ATMOSPHERIC SOUNDSCAPE ENGINE (Pure Web Audio API)
// Completely independent of UI SFX Mute button!
// -------------------------------------------------------------

// Active tracks state
const activeTracks = new Map(); // id -> { nodes, timers, stop() }
let masterAtmosphereGain = null;

function getMasterAtmosphereGain() {
  const ctx = getAudioContext();
  if (!ctx) return null;
  if (!masterAtmosphereGain) {
    masterAtmosphereGain = ctx.createGain();
    const savedVol = typeof window !== "undefined" ? localStorage.getItem(ATMOSPHERE_VOL_KEY) : null;
    const initialVol = savedVol !== null ? parseFloat(savedVol) : 0.45;
    masterAtmosphereGain.gain.setValueAtTime(initialVol, ctx.currentTime);
    masterAtmosphereGain.connect(ctx.destination);
  }
  return masterAtmosphereGain;
}

export function getMasterAtmosphereVolume() {
  if (typeof window === "undefined") return 0.45;
  const saved = localStorage.getItem(ATMOSPHERE_VOL_KEY);
  return saved !== null ? parseFloat(saved) : 0.45;
}

export function setMasterAtmosphereVolume(volume) {
  const v = Math.max(0, Math.min(1, volume));
  if (typeof window !== "undefined") {
    localStorage.setItem(ATMOSPHERE_VOL_KEY, String(v));
  }
  const gain = getMasterAtmosphereGain();
  const ctx = getAudioContext();
  if (gain && ctx) {
    gain.gain.setValueAtTime(v, ctx.currentTime);
  }
  notifySoundscapeChange();
}

function notifySoundscapeChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("soundscape-update", {
        detail: {
          activeIds: Array.from(activeTracks.keys()),
          volume: getMasterAtmosphereVolume()
        }
      })
    );
  }
}

export function isSoundscapeActive(id) {
  return activeTracks.has(id);
}

export function getActiveSoundscapes() {
  return Array.from(activeTracks.keys());
}

export function hasAnySoundscapeActive() {
  return activeTracks.size > 0;
}

// Soundscape 1: RAIN ON NOIR GLASS
function createRainTrack(ctx, masterNode) {
  // Pink noise generator for gentle rain
  const bufferSize = ctx.sampleRate * 4.0;
  const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;
  noiseSource.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(680, ctx.currentTime);

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 1.2);

  noiseSource.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(masterNode);
  noiseSource.start();

  let dropletTimer = null;
  let running = true;

  const triggerDroplet = () => {
    if (!running) return;
    try {
      const freq = 1300 + Math.random() * 1200;
      const osc = ctx.createOscillator();
      const dropGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.045);
      dropGain.gain.setValueAtTime(0.02 + Math.random() * 0.025, ctx.currentTime);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045);
      osc.connect(dropGain);
      dropGain.connect(masterNode);
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {}
    dropletTimer = setTimeout(triggerDroplet, 300 + Math.random() * 1400);
  };
  dropletTimer = setTimeout(triggerDroplet, 500);

  return {
    stop() {
      running = false;
      if (dropletTimer) clearTimeout(dropletTimer);
      try {
        gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        setTimeout(() => {
          try {
            noiseSource.stop();
            noiseSource.disconnect();
          } catch {}
        }, 700);
      } catch {}
    }
  };
}

// Soundscape 2: MIDNIGHT CATHEDRAL BELLS & SUB-DRONE
function createCathedralTrack(ctx, masterNode) {
  // Low resonant atmospheric drone
  const droneOsc = ctx.createOscillator();
  const droneOsc2 = ctx.createOscillator();
  const droneFilter = ctx.createBiquadFilter();
  const droneGain = ctx.createGain();

  droneOsc.type = "sawtooth";
  droneOsc.frequency.setValueAtTime(55, ctx.currentTime); // A1 note
  droneOsc2.type = "sine";
  droneOsc2.frequency.setValueAtTime(110, ctx.currentTime); // A2 note

  droneFilter.type = "lowpass";
  droneFilter.frequency.setValueAtTime(160, ctx.currentTime);

  droneGain.gain.setValueAtTime(0.001, ctx.currentTime);
  droneGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 2.0);

  droneOsc.connect(droneFilter);
  droneOsc2.connect(droneFilter);
  droneFilter.connect(droneGain);
  droneGain.connect(masterNode);

  droneOsc.start();
  droneOsc2.start();

  let bellTimer = null;
  let running = true;

  // Periodic heavy tolling bell (overtones of a bronze bell)
  const ringBell = () => {
    if (!running) return;
    try {
      const fund = 220; // Fundamental bell frequency
      const harmonics = [1, 2.76, 5.4, 8.9];
      const bellGain = ctx.createGain();
      bellGain.gain.setValueAtTime(0.2, ctx.currentTime);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 5.5);
      bellGain.connect(masterNode);

      harmonics.forEach((h, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(fund * h, ctx.currentTime);
        osc.connect(bellGain);
        osc.start();
        osc.stop(ctx.currentTime + 5.5);
      });
    } catch {}
    bellTimer = setTimeout(ringBell, 7500 + Math.random() * 3000);
  };
  bellTimer = setTimeout(ringBell, 1200);

  return {
    stop() {
      running = false;
      if (bellTimer) clearTimeout(bellTimer);
      try {
        droneGain.gain.setValueAtTime(droneGain.gain.value, ctx.currentTime);
        droneGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        setTimeout(() => {
          try {
            droneOsc.stop();
            droneOsc2.stop();
            droneOsc.disconnect();
            droneOsc2.disconnect();
          } catch {}
        }, 900);
      } catch {}
    }
  };
}

// Soundscape 3: VINYL CRACKLE & TAPE HISS
function createVinylTrack(ctx, masterNode) {
  // Constant warm tape hiss
  const bufferSize = ctx.sampleRate * 3.0;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.015;
  }
  const hissSource = ctx.createBufferSource();
  hissSource.buffer = buffer;
  hissSource.loop = true;

  const hissFilter = ctx.createBiquadFilter();
  hissFilter.type = "bandpass";
  hissFilter.frequency.setValueAtTime(2800, ctx.currentTime);
  hissFilter.Q.setValueAtTime(1.5, ctx.currentTime);

  const hissGain = ctx.createGain();
  hissGain.gain.setValueAtTime(0.001, ctx.currentTime);
  hissGain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 1.0);

  hissSource.connect(hissFilter);
  hissFilter.connect(hissGain);
  hissGain.connect(masterNode);
  hissSource.start();

  let crackleTimer = null;
  let running = true;

  // Intermittent vinyl pops
  const triggerCrackle = () => {
    if (!running) return;
    try {
      const popBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.003), ctx.sampleRate);
      const popData = popBuffer.getChannelData(0);
      for (let i = 0; i < popData.length; i++) {
        popData[i] = (Math.random() * 2 - 1) * (1 - i / popData.length);
      }
      const pop = ctx.createBufferSource();
      pop.buffer = popBuffer;

      const popGain = ctx.createGain();
      popGain.gain.setValueAtTime(0.08 + Math.random() * 0.08, ctx.currentTime);
      pop.connect(popGain);
      popGain.connect(masterNode);
      pop.start();
    } catch {}
    crackleTimer = setTimeout(triggerCrackle, 80 + Math.random() * 450);
  };
  crackleTimer = setTimeout(triggerCrackle, 100);

  return {
    stop() {
      running = false;
      if (crackleTimer) clearTimeout(crackleTimer);
      try {
        hissGain.gain.setValueAtTime(hissGain.gain.value, ctx.currentTime);
        hissGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        setTimeout(() => {
          try {
            hissSource.stop();
            hissSource.disconnect();
          } catch {}
        }, 700);
      } catch {}
    }
  };
}

// Soundscape 4: NOCTURNAL WIND & MIST
function createWindTrack(ctx, masterNode) {
  const bufferSize = ctx.sampleRate * 4.0;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const windSource = ctx.createBufferSource();
  windSource.buffer = buffer;
  windSource.loop = true;

  // Modulated sweep filter
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(320, ctx.currentTime);
  filter.Q.setValueAtTime(3.0, ctx.currentTime);

  // LFO to slowly sweep wind frequency
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.setValueAtTime(0.18, ctx.currentTime);

  const lfoGain = ctx.createGain();
  lfoGain.gain.setValueAtTime(240, ctx.currentTime);

  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);

  const windGain = ctx.createGain();
  windGain.gain.setValueAtTime(0.001, ctx.currentTime);
  windGain.gain.exponentialRampToValueAtTime(0.24, ctx.currentTime + 1.5);

  windSource.connect(filter);
  filter.connect(windGain);
  windGain.connect(masterNode);

  windSource.start();
  lfo.start();

  return {
    stop() {
      try {
        windGain.gain.setValueAtTime(windGain.gain.value, ctx.currentTime);
        windGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7);
        setTimeout(() => {
          try {
            windSource.stop();
            lfo.stop();
            windSource.disconnect();
            lfo.disconnect();
          } catch {}
        }, 800);
      } catch {}
    }
  };
}

// Soundscape 5: DISTANT THUNDER & STORM
function createThunderTrack(ctx, trackNode) {
  const bufferSize = ctx.sampleRate * 4.0;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const rumbleSource = ctx.createBufferSource();
  rumbleSource.buffer = buffer;
  rumbleSource.loop = true;

  const rumbleFilter = ctx.createBiquadFilter();
  rumbleFilter.type = "lowpass";
  rumbleFilter.frequency.setValueAtTime(95, ctx.currentTime);

  const rumbleGain = ctx.createGain();
  rumbleGain.gain.setValueAtTime(0.001, ctx.currentTime);
  rumbleGain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 2.0);

  rumbleSource.connect(rumbleFilter);
  rumbleFilter.connect(rumbleGain);
  rumbleGain.connect(trackNode);
  rumbleSource.start();

  let thunderTimer = null;
  let running = true;

  const triggerThunder = () => {
    if (!running) return;
    try {
      const tLen = 3.5 + Math.random() * 2.5;
      const tBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * tLen), ctx.sampleRate);
      const tData = tBuf.getChannelData(0);
      let lastVal = 0;
      for (let i = 0; i < tData.length; i++) {
        const p = i / tData.length;
        const env = Math.sin(Math.PI * Math.pow(p, 0.45)) * Math.exp(-p * 3.5);
        const white = Math.random() * 2 - 1;
        lastVal = (lastVal + 0.04 * white) / 1.04;
        tData[i] = lastVal * 6.5 * env;
      }
      const tSrc = ctx.createBufferSource();
      tSrc.buffer = tBuf;

      const tFilter = ctx.createBiquadFilter();
      tFilter.type = "lowpass";
      tFilter.frequency.setValueAtTime(140, ctx.currentTime);

      const tGain = ctx.createGain();
      tGain.gain.setValueAtTime(0.35 + Math.random() * 0.25, ctx.currentTime);
      tGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + tLen);

      const sub = ctx.createOscillator();
      sub.type = "sine";
      sub.frequency.setValueAtTime(48, ctx.currentTime);
      sub.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 2.0);
      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.28, ctx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.0);

      sub.connect(subGain);
      subGain.connect(trackNode);
      sub.start();
      sub.stop(ctx.currentTime + 2.0);

      tSrc.connect(tFilter);
      tFilter.connect(tGain);
      tGain.connect(trackNode);
      tSrc.start();
    } catch {}
    thunderTimer = setTimeout(triggerThunder, 8000 + Math.random() * 10000);
  };
  thunderTimer = setTimeout(triggerThunder, 1500);

  return {
    stop() {
      running = false;
      if (thunderTimer) clearTimeout(thunderTimer);
      try {
        rumbleGain.gain.setValueAtTime(rumbleGain.gain.value, ctx.currentTime);
        rumbleGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        setTimeout(() => {
          try {
            rumbleSource.stop();
            rumbleSource.disconnect();
          } catch {}
        }, 900);
      } catch {}
    }
  };
}

// Soundscape 6: FIREPLACE & EMBER CRACKLE
function createFireplaceTrack(ctx, trackNode) {
  const bufferSize = ctx.sampleRate * 3.0;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.04;
  }
  const emberSource = ctx.createBufferSource();
  emberSource.buffer = buffer;
  emberSource.loop = true;

  const emberFilter = ctx.createBiquadFilter();
  emberFilter.type = "bandpass";
  emberFilter.frequency.setValueAtTime(450, ctx.currentTime);
  emberFilter.Q.setValueAtTime(1.0, ctx.currentTime);

  const emberGain = ctx.createGain();
  emberGain.gain.setValueAtTime(0.001, ctx.currentTime);
  emberGain.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + 1.2);

  emberSource.connect(emberFilter);
  emberFilter.connect(emberGain);
  emberGain.connect(trackNode);
  emberSource.start();

  let crackleTimer = null;
  let running = true;

  const triggerPop = () => {
    if (!running) return;
    try {
      const pLen = Math.floor(ctx.sampleRate * (0.004 + Math.random() * 0.015));
      const pBuf = ctx.createBuffer(1, pLen, ctx.sampleRate);
      const pData = pBuf.getChannelData(0);
      for (let i = 0; i < pLen; i++) {
        pData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (pLen * 0.3));
      }
      const pSrc = ctx.createBufferSource();
      pSrc.buffer = pBuf;

      const pFilter = ctx.createBiquadFilter();
      pFilter.type = "highpass";
      pFilter.frequency.setValueAtTime(1800 + Math.random() * 1200, ctx.currentTime);

      const pGain = ctx.createGain();
      pGain.gain.setValueAtTime(0.12 + Math.random() * 0.2, ctx.currentTime);

      pSrc.connect(pFilter);
      pFilter.connect(pGain);
      pGain.connect(trackNode);
      pSrc.start();
    } catch {}
    crackleTimer = setTimeout(triggerPop, 90 + Math.random() * 280);
  };
  crackleTimer = setTimeout(triggerPop, 120);

  return {
    stop() {
      running = false;
      if (crackleTimer) clearTimeout(crackleTimer);
      try {
        emberGain.gain.setValueAtTime(emberGain.gain.value, ctx.currentTime);
        emberGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        setTimeout(() => {
          try {
            emberSource.stop();
            emberSource.disconnect();
          } catch {}
        }, 700);
      } catch {}
    }
  };
}

// Soundscape 7: BUREAU PENDULUM CLOCK
function createClockTrack(ctx, trackNode) {
  let timer = null;
  let running = true;
  let isTick = true;

  const strike = () => {
    if (!running) return;
    try {
      const osc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      const freq = isTick ? 1650 : 1100;
      isTick = !isTick;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.35, ctx.currentTime + 0.035);

      clickGain.gain.setValueAtTime(0.16, ctx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(clickGain);
      clickGain.connect(trackNode);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {}
    timer = setTimeout(strike, 1000);
  };
  timer = setTimeout(strike, 200);

  return {
    stop() {
      running = false;
      if (timer) clearTimeout(timer);
    }
  };
}

// Soundscape 8: NOIR RAIN CAFE
function createCafeTrack(ctx, trackNode) {
  const bufferSize = ctx.sampleRate * 4.0;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.035;
  }
  const cafeSrc = ctx.createBufferSource();
  cafeSrc.buffer = buffer;
  cafeSrc.loop = true;

  const cafeFilter = ctx.createBiquadFilter();
  cafeFilter.type = "bandpass";
  cafeFilter.frequency.setValueAtTime(420, ctx.currentTime);
  cafeFilter.Q.setValueAtTime(1.2, ctx.currentTime);

  const cafeGain = ctx.createGain();
  cafeGain.gain.setValueAtTime(0.001, ctx.currentTime);
  cafeGain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 1.2);

  cafeSrc.connect(cafeFilter);
  cafeFilter.connect(cafeGain);
  cafeGain.connect(trackNode);
  cafeSrc.start();

  let chimeTimer = null;
  let running = true;

  const triggerChime = () => {
    if (!running) return;
    try {
      const osc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      osc.type = "sine";
      const freq = 2100 + Math.random() * 600;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      chimeGain.gain.setValueAtTime(0.015, ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);

      osc.connect(chimeGain);
      chimeGain.connect(trackNode);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {}
    chimeTimer = setTimeout(triggerChime, 6000 + Math.random() * 8000);
  };
  chimeTimer = setTimeout(triggerChime, 3000);

  return {
    stop() {
      running = false;
      if (chimeTimer) clearTimeout(chimeTimer);
      try {
        cafeGain.gain.setValueAtTime(cafeGain.gain.value, ctx.currentTime);
        cafeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        setTimeout(() => {
          try {
            cafeSrc.stop();
            cafeSrc.disconnect();
          } catch {}
        }, 700);
      } catch {}
    }
  };
}

// Track volume getter & setter
export function getTrackVolume(id) {
  if (typeof window === "undefined") return 0.75;
  const saved = localStorage.getItem(`monfared_vol_${id}`);
  return saved !== null ? parseFloat(saved) : 0.75;
}

export function setTrackVolume(id, volume) {
  const v = Math.max(0, Math.min(1, volume));
  if (typeof window !== "undefined") {
    localStorage.setItem(`monfared_vol_${id}`, String(v));
  }
  const track = activeTracks.get(id);
  const ctx = getAudioContext();
  if (track && track.gainNode && ctx) {
    track.gainNode.gain.setValueAtTime(v, ctx.currentTime);
  }
  notifySoundscapeChange();
}

export const SOUNDSCAPE_PRESETS = [
  {
    id: "midnight-desk",
    title: { en: "Midnight Detective Desk", fa: "دفتر کارآگاه در نیمه‌شب" },
    desc: { en: "Rain on glass, warm vinyl & ticking pendulum", fa: "باران پشت شیشه، خش نوار کاست و تیک‌تاک ساعت" },
    tracks: { rain: 0.85, vinyl: 0.65, clock: 0.8 }
  },
  {
    id: "gothic-storm",
    title: { en: "Gothic Night Storm", fa: "توفان و ناقوس گوتیک" },
    desc: { en: "Thunder crashes, howling wind & bronze bells", fa: "رعد و تندر، زوزه باد و طنین ناقوس برنزی" },
    tracks: { thunder: 0.9, wind: 0.75, cathedral: 0.8 }
  },
  {
    id: "ember-sanctuary",
    title: { en: "Ember Sanctuary", fa: "پناهگاه شومینه و باران" },
    desc: { en: "Warm fireplace crackle, soft rain & vinyl tape", fa: "ترق‌ترق شومینه، باران آرام و خش گرامافون" },
    tracks: { fireplace: 0.85, rain: 0.7, vinyl: 0.55 }
  },
  {
    id: "nocturne-cafe",
    title: { en: "Nocturne Rain Cafe", fa: "کافه بارانی نوآر" },
    desc: { en: "Rainy street cafe ambience, wind & distant drops", fa: "همهمه گرم کافه بارانی، وزش باد و قطرات شبانه" },
    tracks: { cafe: 0.85, rain: 0.65, vinyl: 0.5 }
  }
];

export function applySoundscapePreset(presetId) {
  const preset = SOUNDSCAPE_PRESETS.find((p) => p.id === presetId);
  if (!preset) return;
  stopAllSoundscapes();
  Object.entries(preset.tracks).forEach(([trackId, vol]) => {
    setTrackVolume(trackId, vol);
    startSoundscape(trackId);
  });
}

export function startSoundscape(id) {
  if (activeTracks.has(id)) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const master = getMasterAtmosphereGain();
  if (!master) return;

  const trackGain = ctx.createGain();
  const trackVol = getTrackVolume(id);
  trackGain.gain.setValueAtTime(trackVol, ctx.currentTime);
  trackGain.connect(master);

  let track = null;
  if (id === "rain") track = createRainTrack(ctx, trackGain);
  else if (id === "cathedral") track = createCathedralTrack(ctx, trackGain);
  else if (id === "vinyl") track = createVinylTrack(ctx, trackGain);
  else if (id === "wind") track = createWindTrack(ctx, trackGain);
  else if (id === "thunder") track = createThunderTrack(ctx, trackGain);
  else if (id === "fireplace") track = createFireplaceTrack(ctx, trackGain);
  else if (id === "clock") track = createClockTrack(ctx, trackGain);
  else if (id === "cafe") track = createCafeTrack(ctx, trackGain);

  if (track) {
    track.gainNode = trackGain;
    activeTracks.set(id, track);
    notifySoundscapeChange();
  }
}

export function stopSoundscape(id) {
  const track = activeTracks.get(id);
  if (track) {
    track.stop();
    activeTracks.delete(id);
    notifySoundscapeChange();
  }
}

export function toggleSoundscape(id) {
  if (activeTracks.has(id)) {
    stopSoundscape(id);
    return false;
  } else {
    startSoundscape(id);
    return true;
  }
}

export function stopAllSoundscapes() {
  activeTracks.forEach((track) => track.stop());
  activeTracks.clear();
  notifySoundscapeChange();
}

// Backward-compatibility wrappers for rain
export function isRainActive() {
  return isSoundscapeActive("rain");
}

export function startRainAmbience() {
  startSoundscape("rain");
}

export function stopRainAmbience() {
  stopSoundscape("rain");
}

export function toggleRainAmbience() {
  return toggleSoundscape("rain");
}

