// ============================================================================
// BATTAGLIA NAVALE DUEL (v2.0) - NAVI SVG REALI, DRAG & DROP E MULTIPLAYER
// ============================================================================

const PEER_PREFIX = 'navalduel10-room-';
const CLOUD_RELAY_PREFIX = 'navalduel10_v1_';
const COL_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const FLEET_TEMPLATE = [
  { id: 'carrier', name: 'Portaerei', size: 5 },
  { id: 'battleship', name: 'Corazzata', size: 4 },
  { id: 'cruiser', name: 'Incrociatore', size: 3 },
  { id: 'submarine', name: 'Sottomarino', size: 3 },
  { id: 'destroyer', name: 'Cacciatorpediniere', size: 2 }
];

// --- Grafica SVG Top-Down per le 5 Navi da Guerra ---
function getShipInnerArtwork(shipId) {
  switch (shipId) {
    case 'carrier': // 500 x 100
      return `
        <defs>
          <linearGradient id="hull_carrier" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#64748b"/>
            <stop offset="50%" stop-color="#334155"/>
            <stop offset="100%" stop-color="#1e293b"/>
          </linearGradient>
        </defs>
        <!-- Scafo e Ponte di Volo angolato -->
        <polygon points="14,18 445,12 490,36 490,64 445,88 14,82 6,50" fill="url(#hull_carrier)" stroke="#94a3b8" stroke-width="4" stroke-linejoin="round"/>
        <!-- Pista di decollo -->
        <polygon points="24,26 435,22 474,42 474,58 435,76 24,72" fill="#1e293b" stroke="#475569" stroke-width="2"/>
        <line x1="35" y1="49" x2="460" y2="49" stroke="#facc15" stroke-width="3" stroke-dasharray="18 12"/>
        <line x1="40" y1="34" x2="420" y2="30" stroke="#e2e8f0" stroke-width="1.5" stroke-opacity="0.6"/>
        <line x1="40" y1="64" x2="420" y2="68" stroke="#e2e8f0" stroke-width="1.5" stroke-opacity="0.6"/>
        <!-- Torre di Comando (Isola) -->
        <rect x="150" y="10" width="85" height="20" rx="5" fill="#475569" stroke="#cbd5e1" stroke-width="2.5"/>
        <rect x="172" y="14" width="36" height="12" rx="3" fill="#0f172a"/>
        <circle cx="220" cy="20" r="5" fill="#38bdf8"/>
        <!-- Caccia sul ponte -->
        <polygon points="110,52 88,40 93,52 88,64" fill="#cbd5e1"/>
        <polygon points="310,50 288,38 293,50 288,62" fill="#cbd5e1"/>
      `;

    case 'battleship': // 400 x 100
      return `
        <defs>
          <linearGradient id="hull_bs" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#94a3b8"/>
            <stop offset="50%" stop-color="#475569"/>
            <stop offset="100%" stop-color="#1e293b"/>
          </linearGradient>
        </defs>
        <!-- Scafo Corazzato -->
        <path d="M 18,22 L 295,16 Q 365,20 392,50 Q 365,80 295,84 L 18,78 Q 6,50 18,22 Z" fill="url(#hull_bs)" stroke="#cbd5e1" stroke-width="4"/>
        <path d="M 32,30 L 285,26 Q 345,30 370,50 Q 345,70 285,74 L 32,70 Z" fill="#334155" stroke="#64748b" stroke-width="2"/>
        <!-- Sovrastruttura centrale -->
        <rect x="135" y="28" width="115" height="44" rx="10" fill="#475569" stroke="#94a3b8" stroke-width="2.5"/>
        <rect x="160" y="35" width="60" height="30" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
        <!-- Torretta Tripla Prua -->
        <circle cx="295" cy="50" r="18" fill="#64748b" stroke="#e2e8f0" stroke-width="2.5"/>
        <line x1="305" y1="43" x2="348" y2="43" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round"/>
        <line x1="308" y1="50" x2="352" y2="50" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round"/>
        <line x1="305" y1="57" x2="348" y2="57" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round"/>
        <!-- Torretta Tripla Poppa -->
        <circle cx="75" cy="50" r="18" fill="#64748b" stroke="#e2e8f0" stroke-width="2.5"/>
        <line x1="65" y1="43" x2="25" y2="43" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round"/>
        <line x1="62" y1="50" x2="22" y2="50" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round"/>
        <line x1="65" y1="57" x2="25" y2="57" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round"/>
      `;

    case 'cruiser': // 300 x 100
      return `
        <defs>
          <linearGradient id="hull_cr" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#64748b"/>
            <stop offset="50%" stop-color="#334155"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
        </defs>
        <path d="M 16,24 L 210,18 Q 268,24 292,50 Q 268,76 210,82 L 16,76 Z" fill="url(#hull_cr)" stroke="#94a3b8" stroke-width="4"/>
        <!-- Eliporto a poppa -->
        <rect x="26" y="31" width="46" height="38" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
        <circle cx="49" cy="50" r="13" fill="none" stroke="#facc15" stroke-width="2" stroke-dasharray="6 4"/>
        <!-- Plancia e Radar -->
        <rect x="92" y="28" width="90" height="44" rx="8" fill="#475569" stroke="#cbd5e1" stroke-width="2"/>
        <circle cx="137" cy="50" r="11" fill="#0ea5e9" stroke="#e0f2fe" stroke-width="2"/>
        <!-- Cannone di prua -->
        <circle cx="222" cy="50" r="14" fill="#64748b" stroke="#e2e8f0" stroke-width="2"/>
        <line x1="232" y1="50" x2="268" y2="50" stroke="#e2e8f0" stroke-width="4.5" stroke-linecap="round"/>
      `;

    case 'submarine': // 300 x 100
      return `
        <defs>
          <linearGradient id="hull_sub" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#475569"/>
            <stop offset="50%" stop-color="#1e293b"/>
            <stop offset="100%" stop-color="#090d16"/>
          </linearGradient>
        </defs>
        <!-- Timoni di poppa -->
        <polygon points="8,20 34,36 34,64 8,80" fill="#334155" stroke="#94a3b8" stroke-width="2.5"/>
        <!-- Scafo sigariforme -->
        <rect x="20" y="24" width="268" height="52" rx="26" fill="url(#hull_sub)" stroke="#38bdf8" stroke-width="3.5"/>
        <!-- Falsatorre (Vela) con timoni di prua -->
        <rect x="135" y="14" width="44" height="72" rx="6" fill="#475569" stroke="#94a3b8" stroke-width="2"/>
        <rect x="115" y="34" width="84" height="32" rx="16" fill="#334155" stroke="#cbd5e1" stroke-width="2.5"/>
        <circle cx="165" cy="50" r="6" fill="#38bdf8"/>
        <!-- Cupola Sonar a prua -->
        <path d="M 262,31 Q 284,50 262,69" fill="none" stroke="#38bdf8" stroke-width="3" stroke-opacity="0.8"/>
      `;

    case 'destroyer': // 200 x 100
    default:
      return `
        <defs>
          <linearGradient id="hull_dd" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#94a3b8"/>
            <stop offset="50%" stop-color="#475569"/>
            <stop offset="100%" stop-color="#1e293b"/>
          </linearGradient>
        </defs>
        <path d="M 14,24 L 128,18 Q 174,25 192,50 Q 174,75 128,82 L 14,76 Z" fill="url(#hull_dd)" stroke="#cbd5e1" stroke-width="4"/>
        <rect x="40" y="30" width="68" height="40" rx="7" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
        <circle cx="74" cy="50" r="9" fill="#38bdf8"/>
        <circle cx="136" cy="50" r="13" fill="#64748b" stroke="#e2e8f0" stroke-width="2"/>
        <line x1="145" y1="50" x2="178" y2="50" stroke="#e2e8f0" stroke-width="4.5" stroke-linecap="round"/>
      `;
  }
}

function renderShipSVG(shipId, size, horizontal = true) {
  const w = size * 100;
  const h = 100;
  const artwork = getShipInnerArtwork(shipId);

  if (horizontal) {
    return `<svg class="ship-svg-inner" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${artwork}</svg>`;
  } else {
    return `<svg class="ship-svg-inner" viewBox="0 0 ${h} ${w}" preserveAspectRatio="none">
      <g transform="translate(${h}, 0) rotate(90)">${artwork}</g>
    </svg>`;
  }
}

// --- Effetti Sonori Sintetizzati & Vibrazione Mobile ---
class NavalSoundFX {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch (_) {}
  }

  vibrate(pattern) {
    if (navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (_) {}
    }
  }

  playTone(freq, type = 'sine', duration = 0.14, gainVal = 0.16, delay = 0) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch (_) {}
  }

  sonarPing() {
    this.vibrate(15);
    this.playTone(880, 'sine', 0.16, 0.13, 0);
  }

  waterSplash() {
    this.vibrate(30);
    this.playTone(310, 'sine', 0.14, 0.14, 0);
    this.playTone(220, 'triangle', 0.22, 0.12, 0.08);
  }

  torpedoHit() {
    this.vibrate([45, 30, 65]);
    this.playTone(150, 'sawtooth', 0.2, 0.22, 0);
    this.playTone(110, 'square', 0.26, 0.18, 0.06);
  }

  shipSunk() {
    this.vibrate([70, 40, 90, 40, 120]);
    this.playTone(140, 'sawtooth', 0.22, 0.24, 0);
    this.playTone(95, 'sawtooth', 0.32, 0.24, 0.12);
    this.playTone(520, 'triangle', 0.25, 0.18, 0.26);
  }

  battleStart() {
    this.vibrate([40, 40, 80]);
    this.playTone(440, 'triangle', 0.14, 0.18, 0);
    this.playTone(659.25, 'triangle', 0.22, 0.18, 0.12);
  }

  victory() {
    this.vibrate([100, 50, 100, 50, 180]);
    [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
      this.playTone(f, 'triangle', 0.24, 0.2, idx * 0.11);
    });
  }
}

const sfx = new NavalSoundFX();

// --- Stato Globale Applicazione ---
const app = {
  mode: null, // 'online' | 'cpu'
  role: null, // 'host' (0) | 'guest' (1)
  myIndex: 0,
  roomCode: null,
  opponentConnected: false,
  peer: null,
  conn: null,
  bc: null,
  cloudSse: null,
  retryInterval: null,
  seenMessages: new Set(),

  // Controlli posizionamento e Drag & Drop durante SETUP
  selectedShipId: 'carrier',
  placeHorizontal: true,
  dragState: null,
  mobileActiveTab: 'enemy', // 'enemy' | 'my'

  state: null
};

function createPlayerObject(name) {
  return {
    name,
    ready: false,
    ships: generateRandomFleet(),
    shotsReceived: new Array(100).fill(null), // null | 'miss' | 'hit' | 'sunk'
    shotsFired: 0,
    hitsScored: 0,
    lastShotCell: null
  };
}

function createInitialGameState(p1Name = 'Comandante 1', p2Name = 'Comandante 2') {
  return {
    players: [createPlayerObject(p1Name), createPlayerObject(p2Name)],
    phase: 'SETUP', // 'SETUP' | 'BATTLE' | 'GAME_OVER'
    turn: 0,
    lastActionText: 'Trascina le tue 5 navi sulla mappa (tocca una nave per ruotarla)!',
    winner: null
  };
}

// ============================================================================
// GENERAZIONE, VALIDAZIONE E ROTAZIONE NAVI SULLA GRIGLIA 10x10
// ============================================================================

function generateRandomFleet() {
  const occupied = new Set();
  const ships = [];

  for (const tmpl of FLEET_TEMPLATE) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 200) {
      attempts++;
      const horizontal = Math.random() < 0.5;
      const maxRow = horizontal ? 10 : 10 - tmpl.size + 1;
      const maxCol = horizontal ? 10 - tmpl.size + 1 : 10;
      const r = Math.floor(Math.random() * maxRow);
      const c = Math.floor(Math.random() * maxCol);

      const cells = [];
      let overlap = false;
      for (let i = 0; i < tmpl.size; i++) {
        const nr = horizontal ? r : r + i;
        const nc = horizontal ? c + i : c;
        const idx = nr * 10 + nc;
        if (occupied.has(idx)) {
          overlap = true;
          break;
        }
        cells.push(idx);
      }

      if (!overlap) {
        cells.forEach((idx) => occupied.add(idx));
        ships.push({
          id: tmpl.id,
          name: tmpl.name,
          size: tmpl.size,
          horizontal,
          cells,
          hits: [],
          sunk: false
        });
        placed = true;
      }
    }
  }
  return ships;
}

function computeCandidateCells(shipSize, startCellIdx, horizontal) {
  const r = Math.floor(startCellIdx / 10);
  const c = startCellIdx % 10;
  const adjR = horizontal ? r : Math.max(0, Math.min(r, 10 - shipSize));
  const adjC = horizontal ? Math.max(0, Math.min(c, 10 - shipSize)) : c;

  const cells = [];
  for (let i = 0; i < shipSize; i++) {
    const nr = horizontal ? adjR : adjR + i;
    const nc = horizontal ? adjC + i : adjC;
    cells.push(nr * 10 + nc);
  }
  return cells;
}

function canPlaceShipCells(player, shipId, candidateCells) {
  for (const other of player.ships) {
    if (other.id === shipId) continue;
    if (other.cells.some((c) => candidateCells.includes(c))) {
      return false;
    }
  }
  return true;
}

function tryPlaceShipAt(player, shipId, startCellIdx, horizontal) {
  if (player.ready) return false;
  const ship = player.ships.find((s) => s.id === shipId);
  if (!ship) return false;

  const newCells = computeCandidateCells(ship.size, startCellIdx, horizontal);
  if (!canPlaceShipCells(player, shipId, newCells)) {
    return false;
  }

  ship.cells = newCells;
  ship.horizontal = horizontal;
  return true;
}

function tryRotateShipSmart(player, shipId) {
  if (player.ready) return false;
  const ship = player.ships.find((s) => s.id === shipId);
  if (!ship || ship.cells.length === 0) return false;

  const newHoriz = !ship.horizontal;
  const headCell = ship.cells[0];

  // 1. Prova a ruotare mantenendo la prua/testa della nave
  if (tryPlaceShipAt(player, shipId, headCell, newHoriz)) {
    app.placeHorizontal = newHoriz;
    return true;
  }

  // 2. Se tocca un'altra nave ruotando sul posto, prova i piccoli spostamenti adiacenti
  const baseR = Math.floor(headCell / 10);
  const baseC = headCell % 10;
  const offsets = [
    [0, -1], [0, 1], [-1, 0], [1, 0],
    [0, -2], [0, 2], [-2, 0], [2, 0]
  ];
  for (const [dr, dc] of offsets) {
    const nr = Math.max(0, Math.min(9, baseR + dr));
    const nc = Math.max(0, Math.min(9, baseC + dc));
    if (tryPlaceShipAt(player, shipId, nr * 10 + nc, newHoriz)) {
      app.placeHorizontal = newHoriz;
      return true;
    }
  }
  return false;
}

// ============================================================================
// DRAG & DROP FLUIDO PER LE NAVI (TOUCH MOBILE & MOUSE DESKTOP)
// ============================================================================

function startShipDrag(e, ship, segmentOffset = 0) {
  if (!app.state || app.state.phase !== 'SETUP') return;
  const me = app.state.players[app.myIndex];
  if (me.ready) return;

  e.preventDefault();
  e.stopPropagation();

  app.selectedShipId = ship.id;
  app.placeHorizontal = ship.horizontal;

  const stageEl = document.getElementById('stage-my');
  const stageRect = stageEl.getBoundingClientRect();

  app.dragState = {
    shipId: ship.id,
    size: ship.size,
    horizontal: ship.horizontal,
    segmentOffset,
    startX: e.clientX,
    startY: e.clientY,
    movedEnough: false,
    stageRect,
    lastCandidateStart: ship.cells[0],
    lastValid: true
  };

  const shipDom = document.querySelector(`#ships-layer-my [data-ship-id="${ship.id}"]`);
  if (shipDom) {
    shipDom.classList.add('dragging-now');
  }
}

function handleGlobalPointerMove(e) {
  const ds = app.dragState;
  if (!ds) return;

  const dx = e.clientX - ds.startX;
  const dy = e.clientY - ds.startY;
  if (Math.hypot(dx, dy) > 7) {
    ds.movedEnough = true;
  }

  if (!ds.movedEnough) return;

  const stageEl = document.getElementById('stage-my');
  const rect = stageEl.getBoundingClientRect();
  // Su touch mobile applica un leggero offset verticale così il dito non copre la nave
  const touchOffsetY = e.pointerType === 'touch' ? -14 : 0;
  const relX = e.clientX - rect.left;
  const relY = e.clientY + touchOffsetY - rect.top;

  const cellW = rect.width / 10;
  const cellH = rect.height / 10;

  let hoverCol = Math.floor(relX / cellW);
  let hoverRow = Math.floor(relY / cellH);

  if (ds.horizontal) {
    hoverCol -= ds.segmentOffset;
  } else {
    hoverRow -= ds.segmentOffset;
  }

  const clampedRow = ds.horizontal
    ? Math.max(0, Math.min(9, hoverRow))
    : Math.max(0, Math.min(10 - ds.size, hoverRow));
  const clampedCol = ds.horizontal
    ? Math.max(0, Math.min(10 - ds.size, hoverCol))
    : Math.max(0, Math.min(9, hoverCol));

  const startCellIdx = clampedRow * 10 + clampedCol;
  const candidateCells = computeCandidateCells(ds.size, startCellIdx, ds.horizontal);
  const me = app.state.players[app.myIndex];
  const isValid = canPlaceShipCells(me, ds.shipId, candidateCells);

  ds.lastCandidateStart = startCellIdx;
  ds.lastValid = isValid;

  // Muovi la sagoma SVG della nave in tempo reale mentre trascini
  const shipDom = document.querySelector(`#ships-layer-my [data-ship-id="${ds.shipId}"]`);
  if (shipDom) {
    shipDom.style.left = `${clampedCol * 10}%`;
    shipDom.style.top = `${clampedRow * 10}%`;
  }

  // Evidenzia le caselle sotto la nave (Verde = Valido, Rosso = Collisione)
  const allCells = document.querySelectorAll('#grid-my .naval-cell');
  allCells.forEach((cEl, idx) => {
    cEl.classList.remove('drag-preview-valid', 'drag-preview-invalid');
    if (candidateCells.includes(idx)) {
      cEl.classList.add(isValid ? 'drag-preview-valid' : 'drag-preview-invalid');
    }
  });
}

function handleGlobalPointerUp() {
  const ds = app.dragState;
  if (!ds) return;
  app.dragState = null;

  const me = app.state ? app.state.players[app.myIndex] : null;
  if (!me) return;

  if (!ds.movedEnough) {
    // Era un singolo tocco/clic sulla nave -> Ruotala di 90° sul posto!
    const rotated = tryRotateShipSmart(me, ds.shipId);
    if (rotated) {
      sfx.sonarPing();
    }
  } else if (ds.lastValid && ds.lastCandidateStart !== null) {
    tryPlaceShipAt(me, ds.shipId, ds.lastCandidateStart, ds.horizontal);
    sfx.sonarPing();
  }

  renderAll();
}

// ============================================================================
// MULTIPLAYER A DISTANZA (Cloud Relay HTTPS + PeerJS WebRTC + BroadcastChannel)
// ============================================================================

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function sendNetMessage(type, payload = {}) {
  if (app.mode !== 'online' || !app.roomCode) return;
  const msg = {
    msgId: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    roomCode: app.roomCode,
    senderRole: app.role,
    type,
    payload
  };
  app.seenMessages.add(msg.msgId);

  if (app.conn && app.conn.open) {
    try {
      app.conn.send(msg);
    } catch (_) {}
  }

  try {
    const topic = `${CLOUD_RELAY_PREFIX}${app.roomCode}`;
    fetch(`https://ntfy.sh/${topic}`, {
      method: 'POST',
      body: JSON.stringify(msg)
    }).catch(() => {});
  } catch (_) {}

  if (app.bc) {
    try {
      app.bc.postMessage(msg);
    } catch (_) {}
  }
}

function handleIncomingNetMessage(msg) {
  if (!msg || !msg.msgId || msg.roomCode !== app.roomCode) return;
  if (app.seenMessages.has(msg.msgId)) return;
  app.seenMessages.add(msg.msgId);

  const { type, payload } = msg;

  if (type === 'GUEST_JOINED' && app.role === 'host') {
    const wasConnected = app.opponentConnected;
    app.opponentConnected = true;
    setConnectionStatus(true);

    if (app.state) {
      app.state.players[1].name = payload.guestName || 'Comandante 2';
      if (!wasConnected) {
        sfx.battleStart();
        app.state.lastActionText = `⚓ ${app.state.players[1].name} è entrato! Trascina le navi e premi "Flotta Pronta!"`;
      }
      renderAll();
      broadcastState();
    }
  } else if (type === 'STATE_SYNC') {
    const prevPhase = app.state ? app.state.phase : null;
    const myLocalShips = app.state ? app.state.players[app.myIndex].ships : null;
    const myLocalReady = app.state ? app.state.players[app.myIndex].ready : false;

    app.state = payload.state;
    app.opponentConnected = true;
    setConnectionStatus(true);

    if (app.state.phase === 'SETUP' && !myLocalReady && myLocalShips) {
      app.state.players[app.myIndex].ships = myLocalShips;
    }

    if (prevPhase === 'SETUP' && app.state.phase === 'BATTLE') {
      sfx.battleStart();
      app.mobileActiveTab = app.state.turn === app.myIndex ? 'enemy' : 'my';
    } else if (app.state.phase === 'BATTLE') {
      // Cambio vista automatico fluido su mobile dopo il colpo
      const targetTab = app.state.turn === app.myIndex ? 'enemy' : 'my';
      if (app.mobileActiveTab !== targetTab) {
        setTimeout(() => {
          if (app.state && app.state.phase === 'BATTLE') {
            app.mobileActiveTab = app.state.turn === app.myIndex ? 'enemy' : 'my';
            renderAll();
          }
        }, 950);
      }
    } else if (prevPhase !== 'GAME_OVER' && app.state.phase === 'GAME_OVER') {
      sfx.victory();
    }

    renderAll();
  } else if (type === 'FLEET_READY' && app.role === 'host') {
    app.opponentConnected = true;
    setConnectionStatus(true);
    const guestPlayer = app.state.players[1];
    guestPlayer.name = payload.playerName || guestPlayer.name;
    guestPlayer.ships = payload.ships;
    guestPlayer.ready = true;
    checkAndStartBattleIfBothReady();
  } else if (type === 'FIRE_SHOT' && app.role === 'host') {
    executeFireShot(1, payload.cellIndex);
  } else if (type === 'REMATCH' && app.role === 'host') {
    executeRematch();
  } else if (type === 'EMOJI_REACTION') {
    spawnFloatingEmoji(payload.emoji);
  }
}

function broadcastState() {
  if (app.mode === 'online' && app.role === 'host') {
    sendNetMessage('STATE_SYNC', { state: app.state });
  }
}

function setupAuxiliaryChannels(roomCode) {
  try {
    if ('BroadcastChannel' in window) {
      if (app.bc) app.bc.close();
      app.bc = new BroadcastChannel(`naval_duel_${roomCode}`);
      app.bc.onmessage = (ev) => handleIncomingNetMessage(ev.data);
    }
  } catch (_) {}

  connectCloudRelay(roomCode);
}

function connectCloudRelay(roomCode) {
  if (app.cloudSse) {
    try {
      app.cloudSse.close();
    } catch (_) {}
  }
  try {
    const topic = `${CLOUD_RELAY_PREFIX}${roomCode}`;
    const cloudSse = new EventSource(`https://ntfy.sh/${topic}/sse?since=3m`);
    cloudSse.onmessage = (ev) => {
      try {
        const wrapper = JSON.parse(ev.data);
        if (wrapper && wrapper.message) {
          handleIncomingNetMessage(JSON.parse(wrapper.message));
        }
      } catch (_) {}
    };
    app.cloudSse = cloudSse;
  } catch (_) {}
}

async function pollCloudRelayOnce(roomCode) {
  try {
    const topic = `${CLOUD_RELAY_PREFIX}${roomCode}`;
    const res = await fetch(`https://ntfy.sh/${topic}/json?poll=1&since=3m`);
    const text = await res.text();
    const lines = text.trim().split('\n');
    for (const line of lines) {
      if (!line) continue;
      try {
        const wrapper = JSON.parse(line);
        if (wrapper && wrapper.message) {
          handleIncomingNetMessage(JSON.parse(wrapper.message));
        }
      } catch (_) {}
    }
  } catch (_) {}
}

function getPeerConfig() {
  return {
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun.cloudflare.com:3478' }
      ]
    }
  };
}

function hostOnlineRoom() {
  const code = generateRoomCode();
  app.mode = 'online';
  app.role = 'host';
  app.myIndex = 0;
  app.roomCode = code;
  app.opponentConnected = false;

  const p1Name = getPlayerNameInput();
  app.state = createInitialGameState(p1Name, 'In attesa... 📲');
  app.state.lastActionText = `Stanza ${code} pronta! Trascina le tue navi mentre inviti l'amico.`;

  setConnectionStatus(false);
  enterGameScreen();

  try {
    setupAuxiliaryChannels(code);
    initHostPeer(code);
  } catch (_) {}
}

function initHostPeer(code) {
  if (!window.Peer) return;
  try {
    if (app.peer) app.peer.destroy();
    const peer = new Peer(`${PEER_PREFIX}${code}`, getPeerConfig());
    app.peer = peer;

    peer.on('connection', (conn) => {
      app.conn = conn;
      conn.on('data', (data) => handleIncomingNetMessage(data));
      conn.on('open', () => {
        setConnectionStatus(true);
        if (app.state) broadcastState();
      });
    });

    peer.on('disconnected', () => {
      try {
        peer.reconnect();
      } catch (_) {}
    });
  } catch (_) {}
}

function joinOnlineRoom(rawCode) {
  const code = (rawCode || '').trim().toUpperCase();
  if (!code || code.length < 3) {
    showLobbyError('Inserisci un codice stanza valido.');
    return;
  }

  app.mode = 'online';
  app.role = 'guest';
  app.myIndex = 1;
  app.roomCode = code;
  app.opponentConnected = false;
  hideLobbyError();

  const guestName = getPlayerNameInput();
  app.state = createInitialGameState('Comandante 1', guestName);
  app.state.lastActionText = `Trascina le tue navi e premi "Flotta Pronta!"`;

  setConnectionStatus(false);
  enterGameScreen();

  try {
    setupAuxiliaryChannels(code);
    sendNetMessage('GUEST_JOINED', { guestName });
    pollCloudRelayOnce(code);
  } catch (_) {}

  if (app.retryInterval) clearInterval(app.retryInterval);
  app.retryInterval = setInterval(() => {
    if (app.opponentConnected) {
      clearInterval(app.retryInterval);
      return;
    }
    sendNetMessage('GUEST_JOINED', { guestName });
    pollCloudRelayOnce(code);
  }, 2200);

  if (window.Peer) {
    try {
      if (app.peer) app.peer.destroy();
      const peer = new Peer(getPeerConfig());
      app.peer = peer;

      peer.on('open', () => {
        const conn = peer.connect(`${PEER_PREFIX}${code}`, { reliable: true });
        app.conn = conn;
        conn.on('open', () => {
          setConnectionStatus(true);
          sendNetMessage('GUEST_JOINED', { guestName });
        });
        conn.on('data', (data) => handleIncomingNetMessage(data));
      });
    } catch (_) {}
  }
}

// ============================================================================
// LOGICA BATTAGLIA NAVALE (CONFERMA FLOTTA, SPARO, AFFONDAMENTO, VITTORIA)
// ============================================================================

function confirmMyFleetReady() {
  if (!app.state || app.state.phase !== 'SETUP') return;
  const me = app.state.players[app.myIndex];
  me.ready = true;
  sfx.sonarPing();

  if (app.mode === 'cpu') {
    const cpu = app.state.players[1];
    cpu.ready = true;
    checkAndStartBattleIfBothReady();
    return;
  }

  if (app.role === 'guest') {
    app.state.lastActionText = '✅ Flotta pronta! In attesa che il Comandante 1 sia pronto...';
    renderAll();
    sendNetMessage('FLEET_READY', {
      playerName: me.name,
      ships: me.ships
    });
  } else {
    checkAndStartBattleIfBothReady();
  }
}

function checkAndStartBattleIfBothReady() {
  const st = app.state;
  if (!st) return;
  const p0 = st.players[0];
  const p1 = st.players[1];

  if (p0.ready && p1.ready) {
    st.phase = 'BATTLE';
    st.turn = 0;
    st.lastActionText = `🔥 Battaglia iniziata! Tocca a ${p0.name} sparare sul Radar Nemico!`;
    app.mobileActiveTab = app.myIndex === 0 ? 'enemy' : 'my';
    sfx.battleStart();
  } else if (p0.ready && !p1.ready) {
    st.lastActionText = `✅ Tua flotta pronta! In attesa che ${p1.name} schieri la flotta...`;
  } else if (!p0.ready && p1.ready) {
    st.lastActionText = `⚓ ${p1.name} è già pronto! Premi "Flotta Pronta!" per iniziare.`;
  }

  renderAll();
  broadcastState();
}

function handleEnemyGridClick(cellIndex) {
  const st = app.state;
  if (!st || st.phase !== 'BATTLE') return;
  if (st.turn !== app.myIndex) return;

  const enemyIdx = 1 - app.myIndex;
  const enemy = st.players[enemyIdx];
  if (enemy.shotsReceived[cellIndex] !== null) return;

  if (app.mode === 'online' && app.role === 'guest') {
    sendNetMessage('FIRE_SHOT', { cellIndex });
  } else {
    executeFireShot(app.myIndex, cellIndex);
  }
}

function executeFireShot(attackerIdx, cellIndex) {
  const st = app.state;
  if (!st || st.phase !== 'BATTLE' || st.turn !== attackerIdx) return;

  const defenderIdx = 1 - attackerIdx;
  const attacker = st.players[attackerIdx];
  const defender = st.players[defenderIdx];

  if (defender.shotsReceived[cellIndex] !== null) return;

  attacker.shotsFired += 1;
  defender.lastShotCell = cellIndex;

  const coordName = `${COL_LETTERS[cellIndex % 10]}${Math.floor(cellIndex / 10) + 1}`;
  const hitShip = defender.ships.find((s) => s.cells.includes(cellIndex));

  if (hitShip) {
    attacker.hitsScored += 1;
    if (!hitShip.hits.includes(cellIndex)) {
      hitShip.hits.push(cellIndex);
    }

    if (hitShip.hits.length >= hitShip.size) {
      hitShip.sunk = true;
      hitShip.cells.forEach((cIdx) => {
        defender.shotsReceived[cIdx] = 'sunk';
      });
      sfx.shipSunk();

      const allSunk = defender.ships.every((s) => s.sunk);
      if (allSunk) {
        st.phase = 'GAME_OVER';
        st.winner = attackerIdx;
        st.lastActionText = `🏆 ${attacker.name} ha affondato l'intera flotta nemica!`;
        sfx.victory();
      } else {
        st.lastActionText = `🔥 ${coordName}: AFFONDATA ${hitShip.name.toUpperCase()}! Spara ancora, ${attacker.name}!`;
      }
    } else {
      defender.shotsReceived[cellIndex] = 'hit';
      sfx.torpedoHit();
      st.lastActionText = `💥 ${coordName}: COLPITO! Hai diritto a un altro colpo, ${attacker.name}!`;
    }
  } else {
    defender.shotsReceived[cellIndex] = 'miss';
    sfx.waterSplash();
    st.turn = defenderIdx;
    st.lastActionText = `🌊 ${coordName}: Acqua! Il turno passa a ${defender.name}.`;

    // Su mobile, dopo 950ms mostra automaticamente la scheda del giocatore che subisce/attacca
    setTimeout(() => {
      if (app.state && app.state.phase === 'BATTLE') {
        app.mobileActiveTab = app.state.turn === app.myIndex ? 'enemy' : 'my';
        renderAll();
      }
    }, 950);
  }

  renderAll();
  broadcastState();

  if (app.mode === 'cpu' && st.phase === 'BATTLE' && st.turn === 1) {
    setTimeout(cpuTakeTurn, 850);
  }
}

function cpuTakeTurn() {
  const st = app.state;
  if (!st || st.phase !== 'BATTLE' || st.turn !== 1) return;

  const human = st.players[0];
  const hitCells = [];
  for (let i = 0; i < 100; i++) {
    if (human.shotsReceived[i] === 'hit') hitCells.push(i);
  }

  let targetCell = null;
  if (hitCells.length > 0) {
    const candidates = [];
    for (const hc of hitCells) {
      const r = Math.floor(hc / 10);
      const c = hc % 10;
      const neighbors = [];
      if (r > 0) neighbors.push((r - 1) * 10 + c);
      if (r < 9) neighbors.push((r + 1) * 10 + c);
      if (c > 0) neighbors.push(r * 10 + (c - 1));
      if (c < 9) neighbors.push(r * 10 + (c + 1));
      for (const n of neighbors) {
        if (human.shotsReceived[n] === null) candidates.push(n);
      }
    }
    if (candidates.length > 0) {
      targetCell = candidates[Math.floor(Math.random() * candidates.length)];
    }
  }

  if (targetCell === null) {
    const available = [];
    for (let i = 0; i < 100; i++) {
      if (human.shotsReceived[i] === null) available.push(i);
    }
    if (available.length === 0) return;
    targetCell = available[Math.floor(Math.random() * available.length)];
  }

  executeFireShot(1, targetCell);
}

function executeRematch() {
  if (!app.state) return;
  const p1Name = app.state.players[0].name;
  const p2Name = app.state.players[1].name;
  app.state = createInitialGameState(p1Name, p2Name);
  app.selectedShipId = 'carrier';
  renderAll();
  broadcastState();
}

// ============================================================================
// RENDERING INTERFACCIA GRAFICA CON NAVI SVG REALI
// ============================================================================

function initCoordinateHeaders() {
  ['enemy-cols', 'my-cols'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = COL_LETTERS.map((l) => `<span>${l}</span>`).join('');
  });

  ['enemy-rows', 'my-rows'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = Array.from({ length: 10 }, (_, i) => `<span>${i + 1}</span>`).join('');
  });
}

function renderAll() {
  const st = app.state;
  if (!st) return;

  const me = st.players[app.myIndex];
  const enemy = st.players[1 - app.myIndex];

  const banner = document.getElementById('in-game-invite-banner');
  if (banner) {
    if (app.mode === 'online' && !app.opponentConnected) {
      banner.style.display = 'flex';
      const msgEl = document.getElementById('banner-wait-msg');
      if (msgEl) {
        msgEl.textContent =
          app.role === 'host'
            ? `Stanza ${app.roomCode} • Invita l'amico mentre schieri le navi!`
            : `Connessione alla stanza ${app.roomCode}...`;
      }
    } else {
      banner.style.display = 'none';
    }
  }

  const turnHud = document.getElementById('turn-hud');
  const turnBadge = document.getElementById('turn-badge');
  const turnPrompt = document.getElementById('turn-prompt');
  const myTurn = st.phase === 'BATTLE' && st.turn === app.myIndex;

  turnHud.classList.toggle('my-turn', myTurn || (st.phase === 'SETUP' && !me.ready));

  if (st.phase === 'SETUP') {
    turnBadge.textContent = me.ready ? 'IN ATTESA' : 'SCHIERAMENTO';
    turnBadge.className = `turn-indicator-badge ${me.ready ? 'opponent' : ''}`;
  } else if (myTurn) {
    turnBadge.textContent = 'TUO TURNO • SPARA!';
    turnBadge.className = 'turn-indicator-badge';
  } else {
    turnBadge.textContent = `TURNO DI ${enemy.name.toUpperCase()}`;
    turnBadge.className = 'turn-indicator-badge opponent';
  }

  turnPrompt.textContent = st.lastActionText;
  document.getElementById('streak-pill').textContent = `🎯 ${me.shotsFired}`;

  const setupPanel = document.getElementById('setup-panel');
  const battleBottomBar = document.getElementById('battle-bottom-bar');
  const boardsContainer = document.getElementById('boards-container');
  const cardEnemy = document.getElementById('card-enemy-radar');
  const cardMy = document.getElementById('card-my-fleet');
  const mobileTabs = document.getElementById('mobile-view-tabs');

  if (st.phase === 'SETUP') {
    setupPanel.style.display = 'flex';
    if (battleBottomBar) battleBottomBar.style.display = 'none';
    boardsContainer.classList.add('single-setup-mode');
    cardEnemy.style.display = 'none';
    cardMy.style.display = 'flex';
    cardMy.classList.remove('hidden-on-mobile');
    mobileTabs.classList.remove('visible-mobile');
    renderSetupDock(me);
  } else {
    setupPanel.style.display = 'none';
    if (battleBottomBar) battleBottomBar.style.display = 'flex';
    boardsContainer.classList.remove('single-setup-mode');
    cardEnemy.style.display = 'flex';
    cardMy.style.display = 'flex';
    mobileTabs.classList.add('visible-mobile');

    const tabEnemyBtn = document.getElementById('tab-enemy-radar');
    const tabMyBtn = document.getElementById('tab-my-fleet');
    tabEnemyBtn.classList.toggle('active', app.mobileActiveTab === 'enemy');
    tabMyBtn.classList.toggle('active', app.mobileActiveTab === 'my');

    cardEnemy.classList.toggle('hidden-on-mobile', app.mobileActiveTab !== 'enemy');
    cardMy.classList.toggle('hidden-on-mobile', app.mobileActiveTab !== 'my');
  }

  document.getElementById('my-name-label').textContent = me.name;
  document.getElementById('enemy-name-label').textContent = enemy.name;

  const myAlive = me.ships.filter((s) => !s.sunk).length;
  const enemyAlive = enemy.ships.filter((s) => !s.sunk).length;
  document.getElementById('my-ships-badge').textContent =
    st.phase === 'SETUP' ? '✋ Trascina / Tocca=Ruota' : `${myAlive}/5 attive`;
  document.getElementById('enemy-ships-badge').textContent = `${enemyAlive}/5 attive`;

  cardEnemy.classList.toggle('active-target', myTurn);

  renderMyBoard(me);
  if (st.phase !== 'SETUP') {
    renderEnemyBoard(enemy, st.phase === 'GAME_OVER');
  }

  renderFleetStatusStrip('my-fleet-status', me.ships);
  renderFleetStatusStrip('enemy-fleet-status', enemy.ships);

  const victoryModal = document.getElementById('victory-modal');
  if (st.phase === 'GAME_OVER' && st.winner !== null) {
    const winnerPlayer = st.players[st.winner];
    const iWon = st.winner === app.myIndex;
    document.getElementById('victory-title').textContent = iWon
      ? '🏆 Hai Vinto!'
      : `Ha vinto ${winnerPlayer.name}!`;
    document.getElementById('victory-subtitle').textContent =
      `${winnerPlayer.name} ha affondato tutte le 5 navi da guerra avversarie!`;
    document.getElementById('stat-shots').textContent = me.shotsFired;
    const acc = me.shotsFired > 0 ? Math.round((me.hitsScored / me.shotsFired) * 100) : 0;
    document.getElementById('stat-accuracy').textContent = `${acc}%`;
    victoryModal.classList.add('open');
  } else {
    victoryModal.classList.remove('open');
  }
}

function renderSetupDock(me) {
  const dock = document.getElementById('ship-dock');
  const btnReady = document.getElementById('btn-ready-fleet');

  btnReady.textContent = me.ready ? '⏳ Flotta Confermata' : '✅ Flotta Pronta!';
  btnReady.disabled = me.ready;

  dock.innerHTML = '';
  for (const ship of me.ships) {
    const btn = document.createElement('button');
    btn.className = `ship-selector-btn ${app.selectedShipId === ship.id ? 'selected' : ''}`;
    btn.innerHTML = `
      <span>${ship.name} (${ship.size})</span>
      <div class="dock-ship-svg-wrap">${renderShipSVG(ship.id, ship.size, true)}</div>
    `;
    btn.addEventListener('pointerdown', (e) => {
      if (me.ready) return;
      app.selectedShipId = ship.id;
      app.placeHorizontal = ship.horizontal;
      startShipDrag(e, ship, Math.floor(ship.size / 2));
      renderSetupDock(me);
    });
    dock.appendChild(btn);
  }
}

function renderMyBoard(me) {
  const gridEl = document.getElementById('grid-my');
  const shipsLayerEl = document.getElementById('ships-layer-my');
  const shotsLayerEl = document.getElementById('shots-layer-my');

  gridEl.innerHTML = '';
  shipsLayerEl.innerHTML = '';
  shotsLayerEl.innerHTML = '';

  const isSetupEditable = app.state.phase === 'SETUP' && !me.ready;

  // 1. Celle della griglia 10x10 (cliccabili anche per spostare rapidamente la nave selezionata)
  for (let idx = 0; idx < 100; idx++) {
    const cell = document.createElement('div');
    cell.className = 'naval-cell';
    if (isSetupEditable) {
      cell.addEventListener('click', () => {
        const ok = tryPlaceShipAt(me, app.selectedShipId, idx, app.placeHorizontal);
        if (ok) {
          sfx.sonarPing();
          renderAll();
        }
      });
    }
    gridEl.appendChild(cell);
  }

  // 2. Layer Navi SVG Reali (con Drag & Drop e Tocco per Ruotare)
  for (const ship of me.ships) {
    if (!ship.cells || ship.cells.length === 0) continue;
    const headIdx = ship.cells[0];
    const row = Math.floor(headIdx / 10);
    const col = headIdx % 10;

    const shipDiv = document.createElement('div');
    shipDiv.className = 'ship-entity';
    shipDiv.setAttribute('data-ship-id', ship.id);
    if (isSetupEditable) shipDiv.classList.add('draggable-ship');
    if (isSetupEditable && app.selectedShipId === ship.id) shipDiv.classList.add('selected-ship');
    if (ship.sunk) shipDiv.classList.add('sunk-ship');

    shipDiv.style.left = `${col * 10}%`;
    shipDiv.style.top = `${row * 10}%`;
    shipDiv.style.width = `${(ship.horizontal ? ship.size : 1) * 10}%`;
    shipDiv.style.height = `${(ship.horizontal ? 1 : ship.size) * 10}%`;

    shipDiv.innerHTML = renderShipSVG(ship.id, ship.size, ship.horizontal);

    if (isSetupEditable) {
      shipDiv.addEventListener('pointerdown', (e) => {
        const rect = shipDiv.getBoundingClientRect();
        let segOffset = 0;
        if (ship.horizontal) {
          segOffset = Math.floor(((e.clientX - rect.left) / rect.width) * ship.size);
        } else {
          segOffset = Math.floor(((e.clientY - rect.top) / rect.height) * ship.size);
        }
        segOffset = Math.max(0, Math.min(ship.size - 1, segOffset));
        startShipDrag(e, ship, segOffset);
      });
    }

    shipsLayerEl.appendChild(shipDiv);
  }

  // 3. Layer Colpi Subiti (Acqua / Esplosioni sopra le navi)
  for (let idx = 0; idx < 100; idx++) {
    const markerCell = document.createElement('div');
    markerCell.className = 'shot-marker-cell';
    if (me.lastShotCell === idx) markerCell.classList.add('last-shot');

    const shotState = me.shotsReceived[idx];
    if (shotState === 'miss') {
      markerCell.innerHTML = `<div class="marker-miss"></div>`;
    } else if (shotState === 'hit') {
      markerCell.innerHTML = `<div class="marker-hit">💥</div>`;
    } else if (shotState === 'sunk') {
      markerCell.innerHTML = `<div class="marker-sunk">🔥</div>`;
    }

    shotsLayerEl.appendChild(markerCell);
  }
}

function renderEnemyBoard(enemy, revealAll = false) {
  const gridEl = document.getElementById('grid-enemy');
  const shipsLayerEl = document.getElementById('ships-layer-enemy');
  const shotsLayerEl = document.getElementById('shots-layer-enemy');

  gridEl.innerHTML = '';
  shipsLayerEl.innerHTML = '';
  shotsLayerEl.innerHTML = '';

  // 1. Celle 10x10 per mirare e sparare
  for (let idx = 0; idx < 100; idx++) {
    const cell = document.createElement('div');
    cell.className = 'naval-cell';
    const shotState = enemy.shotsReceived[idx];
    if (app.state.phase === 'BATTLE' && shotState === null) {
      cell.addEventListener('click', () => handleEnemyGridClick(idx));
    }
    gridEl.appendChild(cell);
  }

  // 2. Rivela la sagoma SVG delle navi nemiche affondate (o tutte a fine partita)
  for (const ship of enemy.ships) {
    if (!ship.sunk && !revealAll) continue;
    if (!ship.cells || ship.cells.length === 0) continue;

    const headIdx = ship.cells[0];
    const row = Math.floor(headIdx / 10);
    const col = headIdx % 10;

    const shipDiv = document.createElement('div');
    shipDiv.className = `ship-entity ${ship.sunk ? 'sunk-ship' : ''}`;
    shipDiv.style.left = `${col * 10}%`;
    shipDiv.style.top = `${row * 10}%`;
    shipDiv.style.width = `${(ship.horizontal ? ship.size : 1) * 10}%`;
    shipDiv.style.height = `${(ship.horizontal ? 1 : ship.size) * 10}%`;
    shipDiv.innerHTML = renderShipSVG(ship.id, ship.size, ship.horizontal);
    shipsLayerEl.appendChild(shipDiv);
  }

  // 3. Layer Colpi Sparati (Splash Acqua / Esplosioni)
  for (let idx = 0; idx < 100; idx++) {
    const markerCell = document.createElement('div');
    markerCell.className = 'shot-marker-cell';
    if (enemy.lastShotCell === idx) markerCell.classList.add('last-shot');

    const shotState = enemy.shotsReceived[idx];
    if (shotState === 'miss') {
      markerCell.innerHTML = `<div class="marker-miss"></div>`;
    } else if (shotState === 'hit') {
      markerCell.innerHTML = `<div class="marker-hit">💥</div>`;
    } else if (shotState === 'sunk') {
      markerCell.innerHTML = `<div class="marker-sunk">🔥</div>`;
    }

    shotsLayerEl.appendChild(markerCell);
  }
}

function renderFleetStatusStrip(containerId, ships) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = ships
    .map(
      (s) =>
        `<span class="fleet-chip ${s.sunk ? 'sunk' : ''}">${s.sunk ? '💀' : '🚢'} ${s.name} (${s.size})</span>`
    )
    .join('');
}

// ============================================================================
// CONDIVISIONE MOBILE & EVENT LISTENERS
// ============================================================================

function getShareableInviteUrl() {
  const base = window.location.href.split('?')[0].split('#')[0];
  return `${base}?room=${app.roomCode}`;
}

async function shareInviteMobile() {
  if (!app.roomCode) return;
  const url = getShareableInviteUrl();
  const shareText = `⚓ Giochiamo a Battaglia Navale! Entra nella mia stanza (Codice: ${app.roomCode}):`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Battaglia Navale Duel',
        text: shareText,
        url
      });
      return;
    } catch (_) {}
  }

  const waUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`;
  window.open(waUrl, '_blank');
}

function getPlayerNameInput() {
  const el = document.getElementById('player-name-input');
  const val = el ? el.value.trim() : '';
  return val || 'Comandante 1';
}

function showLobbyError(msg) {
  const el = document.getElementById('lobby-error');
  if (el) {
    el.textContent = msg;
    el.style.display = 'block';
  }
}

function hideLobbyError() {
  const el = document.getElementById('lobby-error');
  if (el) el.style.display = 'none';
}

function setConnectionStatus(connected) {
  const dot = document.getElementById('conn-dot');
  if (!dot) return;
  if (connected) {
    dot.classList.remove('waiting');
  } else {
    dot.classList.add('waiting');
  }
}

function enterGameScreen() {
  document.getElementById('lobby-screen').classList.remove('active');
  document.getElementById('game-screen').classList.add('active');
  document.getElementById('btn-leave').style.display = 'inline-flex';

  const pill = document.getElementById('room-pill');
  if (app.mode === 'online' && app.roomCode) {
    pill.style.display = 'inline-flex';
    document.getElementById('room-code-header').textContent = app.roomCode;
  } else {
    pill.style.display = 'none';
  }

  renderAll();
}

function spawnFloatingEmoji(emoji) {
  const el = document.createElement('div');
  el.className = 'floating-emoji';
  el.textContent = emoji;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

window.addEventListener('DOMContentLoaded', () => {
  initCoordinateHeaders();

  // Listeners globali per Drag & Drop fluido su mobile e PC
  window.addEventListener('pointermove', handleGlobalPointerMove, { passive: false });
  window.addEventListener('pointerup', handleGlobalPointerUp);
  window.addEventListener('pointercancel', handleGlobalPointerUp);

  document.getElementById('btn-create-room').addEventListener('click', () => {
    sfx.init();
    hostOnlineRoom();
  });

  document.getElementById('btn-join-room').addEventListener('click', () => {
    sfx.init();
    const code = document.getElementById('join-code-input').value;
    joinOnlineRoom(code);
  });

  document.getElementById('join-code-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sfx.init();
      joinOnlineRoom(e.target.value);
    }
  });

  document.getElementById('btn-cpu-mode').addEventListener('click', () => {
    sfx.init();
    app.mode = 'cpu';
    app.role = 'host';
    app.myIndex = 0;
    app.opponentConnected = true;
    const p1 = getPlayerNameInput();
    app.state = createInitialGameState(p1, 'Ammiraglio CPU 🤖');
    enterGameScreen();
  });

  // Controlli Setup Flotta
  document.getElementById('btn-rotate-ship').addEventListener('click', () => {
    if (!app.state || app.state.phase !== 'SETUP') return;
    const me = app.state.players[app.myIndex];
    if (me.ready) return;
    const ok = tryRotateShipSmart(me, app.selectedShipId);
    if (ok) {
      sfx.sonarPing();
      renderAll();
    }
  });

  document.getElementById('btn-random-fleet').addEventListener('click', () => {
    if (!app.state || app.state.phase !== 'SETUP') return;
    const me = app.state.players[app.myIndex];
    if (me.ready) return;
    me.ships = generateRandomFleet();
    sfx.sonarPing();
    renderAll();
  });

  document.getElementById('btn-ready-fleet').addEventListener('click', confirmMyFleetReady);

  // Tab Mobile Radar Nemico / La Mia Flotta
  document.getElementById('tab-enemy-radar').addEventListener('click', () => {
    app.mobileActiveTab = 'enemy';
    renderAll();
  });
  document.getElementById('tab-my-fleet').addEventListener('click', () => {
    app.mobileActiveTab = 'my';
    renderAll();
  });

  // Condivisione
  document.getElementById('room-pill').addEventListener('click', shareInviteMobile);
  document.getElementById('btn-banner-share').addEventListener('click', shareInviteMobile);

  // Rivincita
  document.getElementById('btn-rematch').addEventListener('click', () => {
    if (app.mode === 'online' && app.role === 'guest') {
      sendNetMessage('REMATCH');
    } else {
      executeRematch();
    }
  });

  // Regole & Audio
  document.getElementById('btn-rules').addEventListener('click', () => {
    document.getElementById('rules-modal').classList.add('open');
  });
  document.getElementById('btn-close-rules').addEventListener('click', () => {
    document.getElementById('rules-modal').classList.remove('open');
  });
  document.getElementById('btn-sound').addEventListener('click', (e) => {
    sfx.enabled = !sfx.enabled;
    e.currentTarget.textContent = sfx.enabled ? '🔊' : '🔇';
  });
  document.getElementById('btn-leave').addEventListener('click', () => {
    window.location.href = window.location.pathname;
  });

  document.querySelectorAll('.emoji-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const emoji = btn.getAttribute('data-emoji');
      spawnFloatingEmoji(emoji);
      sendNetMessage('EMOJI_REACTION', { emoji });
    });
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && app.mode === 'online' && app.roomCode) {
      pollCloudRelayOnce(app.roomCode);
      connectCloudRelay(app.roomCode);
      if (app.role === 'host') {
        if (!app.peer || app.peer.destroyed) {
          initHostPeer(app.roomCode);
        } else if (app.peer.disconnected) {
          try {
            app.peer.reconnect();
          } catch (_) {
            initHostPeer(app.roomCode);
          }
        }
        if (app.opponentConnected) {
          broadcastState();
        }
      } else if (app.role === 'guest' && !app.opponentConnected) {
        sendNetMessage('GUEST_JOINED', { guestName: getPlayerNameInput() });
      }
    }
  });

  const params = new URLSearchParams(window.location.search);
  const roomParam = params.get('room');
  if (roomParam) {
    document.getElementById('join-code-input').value = roomParam.toUpperCase();
    document.getElementById('player-name-input').value = 'Comandante 2';
  }
});
