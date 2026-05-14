/* ═══════════════════════════════════════════════
   TODDY · ANIME WORLD — js.js
   Organizado e otimizado
═══════════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────────
// DRAWER (MENU HAMBÚRGUER)
// ─────────────────────────────────────────────

function toggleDrawer() {
  const drawer = document.getElementById('drawer');
  drawer.classList.contains('open') ? closeDrawer() : openDrawer();
}

function openDrawer() {
  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawer-overlay').classList.add('open');
  document.getElementById('hamburger-btn').classList.add('open');
}

function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
  document.getElementById('hamburger-btn').classList.remove('open');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDrawer();
});

function navFromDrawer(id, label) {
  if (label) document.getElementById('page-title').textContent = label;
  closeDrawer();
  show(id);

  // Marca item ativo no drawer
  document.querySelectorAll('.drawer-item').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.drawer-item[onclick*="'${id}'"]`);
  if (btn) btn.classList.add('active');

  if (id === 'assistindo') {
    if (!watchLoaded) loadWatching();
    if (!topLoaded)   loadTopScores();
  }
}

// ─────────────────────────────────────────────
// BOTTOM NAV
// ─────────────────────────────────────────────

function toggleMore() {
  document.getElementById('more-popup').classList.toggle('open');
  document.getElementById('more-overlay').classList.toggle('open');
}

function closeMore() {
  document.getElementById('more-popup').classList.remove('open');
  document.getElementById('more-overlay').classList.remove('open');
}

function navTo(id, el) {
  // Atualiza botão ativo
  document.querySelectorAll('.bnav-item').forEach(b => b.classList.remove('on'));
  if (el && el.classList.contains('bnav-item')) el.classList.add('on');

  const label = el?.dataset?.label || '';
  if (label) document.getElementById('page-title').textContent = label;

  show(id);
  closeMore();

  if (id === 'assistindo') {
    if (!watchLoaded) loadWatching();
    if (!topLoaded)   loadTopScores();
  }
}

// ─────────────────────────────────────────────
// TABS
// ─────────────────────────────────────────────

function show(id) {
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.remove('on');
    t.style.display = 'none';
  });

  const tab = document.getElementById('tab-' + id);
  if (!tab) return;

  tab.style.display = 'block';
  tab.classList.add('on');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─────────────────────────────────────────────
// TOP 30 DATA
// ─────────────────────────────────────────────

const TOP = [
  { n: 'Made in Abyss',                          g: 'Aventura · Dark Fantasy',   c: '#e63946', tags: 'aventura dark fantasia drama',       img: 'https://m.media-amazon.com/images/S/pv-target-images/acf77e7193251c237654b4ab7a3f83720d8703a416927e8d38a5c55ca0883898._SX1080_FMjpg_.jpg' },
  { n: 'Vinland Saga',                            g: 'Ação · Histórico',           c: '#f4c542', tags: 'acao drama aventura',                 img: 'https://m.media-amazon.com/images/M/MV5BNDA3MGNmZTEtMzFiMy00ZmViLThhNmQtMjQ4ZDc5MDEyN2U1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { n: 'Seto no Hanayome',                        g: 'Comédia · Romance',         c: '#4cc9f0', tags: 'comedia romance',                     img: 'https://m.media-amazon.com/images/M/MV5BY2NmYjk1Y2EtMjNhZi00ZDVjLTg4YzAtZDA5MGY1NGYxMDIxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { n: 'Clannad: After Story',                    g: 'Romance · Drama',            c: '#ff7eb3', tags: 'romance drama slice',                 img: 'https://m.media-amazon.com/images/I/81R8HeREVwL._AC_UF894,1000_QL80_.jpg' },
  { n: 'Re:Zero',                                 g: 'Isekai · Fantasia',          c: '#39ff14', tags: 'isekai fantasia drama',               img: 'https://cdn.myanimelist.net/images/anime/11/79410.jpg' },
  { n: 'Angel Beats!',                            g: 'Drama · Sobrenatural',       c: '#ff7eb3', tags: 'drama musical romance',               img: 'https://m.media-amazon.com/images/M/MV5BN2NlOWI5OTMtODRhZi00NjY3LTljZTUtYTQwZTMxOTBjNzE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { n: 'Fullmetal Alchemist: Brotherhood',        g: 'Ação · Fantasia',            c: '#e63946', tags: 'acao fantasia aventura drama',         img: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg' },
  { n: 'Shigatsu wa Kimi no Uso',                 g: 'Música · Romance',           c: '#ff7eb3', tags: 'musical romance drama',               img: 'https://myanimelist.net/images/anime/1405/143284.jpg' },
  { n: 'Bocchi the Rock!',                        g: 'Música · Slice of Life',     c: '#39ff14', tags: 'musical comedia slice',               img: 'https://m.media-amazon.com/images/I/81ScRXWN6DL._AC_UF1000,1000_QL80_.jpg' },
  { n: 'Steins;Gate',                             g: 'Sci-Fi · Thriller',          c: '#f4c542', tags: 'scifi drama',                         img: 'https://m.media-amazon.com/images/M/MV5BZjI1YjZiMDUtZTI3MC00YTA5LWIzMmMtZmQ0NTZiYWM4NTYwXkEyXkFqcGc@._V1_QL75_UX190_CR0,2,190,281_.jpg' },
  { n: 'Arknights: Perish in Frost',              g: 'Ação · Dark Fantasy',        c: '#e63946', tags: 'acao dark fantasia drama',             img: 'https://myanimelist.net/images/anime/1644/128406.jpg' },
  { n: "Frieren: Beyond Journey's End",           g: 'Fantasia · Slice of Life',   c: '#a07fff', tags: 'fantasia slice drama aventura',        img: 'https://myanimelist.net/images/anime/1015/138006.jpg' },
  { n: "Vivy: Fluorite Eye's Song",               g: 'Sci-Fi · Musical',           c: '#4cc9f0', tags: 'scifi musical drama',                  img: 'https://m.media-amazon.com/images/M/MV5BNjA1MzlhOWEtYmQ1OC00MTUwLTliZDQtNGRlYmE4ZTVmMWQxXkEyXkFqcGc@._V1_.jpg' },
  { n: 'Sayonara no Asa ni Yakusoku no Hana wo Kazarou', g: 'Drama · Fantasia',   c: '#4cc9f0', tags: 'drama fantasia romance',               img: 'https://myanimelist.net/images/anime/11/89556.jpg' },
  { n: 'Dororo',                                  g: 'Ação · Histórico',           c: '#e63946', tags: 'acao dark aventura drama',             img: 'https://m.media-amazon.com/images/M/MV5BYzk2ODAyZjctNjExNS00ZDk0LWE1ZDMtZmIyNzI2NjNjNjllXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
  { n: 'To Be Hero X',                            g: 'Ação · Super-herói',         c: '#f4c542', tags: 'acao comedia drama',                   img: 'https://preview.redd.it/to-be-hero-x-v0-mmibd27ecwue1.jpeg?auto=webp&s=bff6029e1f619c57ea605fdc23b0e7131188335a' },
  { n: 'Hunter x Hunter',                         g: 'Aventura · Combate',         c: '#f4c542', tags: 'acao aventura fantasia',               img: 'https://m.media-amazon.com/images/M/MV5BYzYxOTlkYzctNGY2MC00MjNjLWIxOWMtY2QwYjcxZWIwMmEwXkEyXkFqcGc@._V1_QL75_UY281_CR4,0,190,281_.jpg' },
  { n: 'Guimi Zhi Zhu',                           g: 'Ação · Fantasia',            c: '#a07fff', tags: 'acao fantasia aventura dark',           img: 'https://m.media-amazon.com/images/M/MV5BMWE1ZWYwZGUtZjRmOS00NzUzLTlkZmUtMTEwMjNhNTVmNDIwXkEyXkFqcGc@._V1_QL75_UX190_CR0,2,190,281_.jpg' },
  { n: "Fate/Stay Night: Heaven's Feel",          g: 'Ação · Sobrenatural',        c: '#a07fff', tags: 'acao fantasia drama romance',           img: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Fate-stay_night_Heaven%27s_Feel_Trilogy_Poster.jpg' },
  { n: 'Majo no Tabitabi',                        g: 'Fantasia · Aventura',        c: '#39ff14', tags: 'fantasia aventura isekai slice',        img: 'https://myanimelist.net/images/anime/1802/108501.jpg' },
  { n: 'Uma Musume: Cinderella Gray',             g: 'Esportes · Drama',           c: '#f4c542', tags: 'drama aventura slice',                  img: 'https://myanimelist.net/images/anime/1626/148097.jpg' },
  { n: 'Maoujou de Oyasumi',                      g: 'Comédia · Fantasia',         c: '#ff7eb3', tags: 'comedia fantasia slice',                img: 'https://static.wikia.nocookie.net/sleepy-princess/images/3/3b/Anime_Key_Visual.png/revision/latest/smart/width/250/height/250?cb=20200903041445' },
  { n: 'Somali to Mori no Kamisama',              g: 'Aventura · Slice of Life',   c: '#39ff14', tags: 'aventura fantasia drama slice',         img: 'https://m.media-amazon.com/images/M/MV5BMGI5NzcyYmItNjI1ZS00YWU4LWE1ODYtYmZhN2E1YmU1MTk4XkEyXkFqcGc@._V1_.jpg' },
  { n: 'Tengen Toppa Gurren Lagann',              g: 'Mecha · Ação',               c: '#e63946', tags: 'acao fantasia aventura drama',           img: 'https://m.media-amazon.com/images/M/MV5BMGJlODA2ZmItOTRiZS00NWM5LWJlNTQtYzI5MTNiZjA2MGFjXkEyXkFqcGc@._V1_.jpg' },
  { n: 'Fumetsu no Anata e',                      g: 'Drama · Aventura',           c: '#4cc9f0', tags: 'drama aventura fantasia',               img: 'https://myanimelist.net/images/anime/1880/118484.jpg' },
  { n: '86 -Eighty Six-',                         g: 'Sci-Fi · Guerra',            c: '#e63946', tags: 'scifi acao drama',                      img: 'https://m.media-amazon.com/images/M/MV5BOWNmY2IzOGItMmQyNy00ZTM0LThiNjItODM3YzdkYjRlNWU1XkEyXkFqcGc@._V1_.jpg' },
  { n: 'BNA: Brand New Animal',                   g: 'Ação · Kemono',              c: '#f4c542', tags: 'acao fantasia aventura',                 img: 'https://m.media-amazon.com/images/M/MV5BMzUxMzAxYTMtMmYzOS00YzYyLWE2ZDUtYmQxZDhiNWIxNDNiXkEyXkFqcGc@._V1_.jpg' },
  { n: 'Engage Kiss',                             g: 'Ação · Comédia',             c: '#ff7eb3', tags: 'acao comedia romance',                   img: 'https://myanimelist.net/images/anime/1464/111943.jpg' },
  { n: 'Grimgar of Fantasy and Ash',              g: 'Isekai · Drama',             c: '#a07fff', tags: 'isekai drama fantasia aventura',         img: 'https://m.media-amazon.com/images/M/MV5BMmUyNzNmMDEtNjYzYi00ZDcwLTg4NTQtZTUzYzBiZTYwNzYyXkEyXkFqcGc@._V1_.jpg' },
  { n: 'Akiba Meido Sensou',                      g: 'Comédia · Ação',             c: '#e63946', tags: 'comedia acao',                           img: 'https://m.media-amazon.com/images/M/MV5BYzA5YmZlNzMtYjdlZC00ZDg0LTgyMjEtNTZhYTFmYzJkNTg1XkEyXkFqcGc@._V1_.jpg' },
];

// ── PÓDIO TOP 3 ──
function buildPodium() {
  const wrap = document.getElementById('podium');
  if (!wrap) return;

  const medals = [
    { rank: 1, label: '🥇',  cls: 'gold',   height: '220px', delay: '.1s' },
    { rank: 2, label: '🥈',  cls: 'silver', height: '180px', delay: '.25s' },
    { rank: 3, label: '🥉',  cls: 'bronze', height: '150px', delay: '.4s' },
  ];

  // Ordem de exibição: 2 — 1 — 3 (pódio clássico)
  const order = [1, 0, 2];

  wrap.innerHTML = order.map(idx => {
    const m = medals[idx];
    const a = TOP[idx];
    return `
      <div class="podium-slot p-${m.cls}" style="animation-delay:${m.delay}">
        <div class="podium-img-wrap">
          <img src="${a.img}" alt="${a.n}" loading="lazy">
          <div class="podium-medal">${m.label}</div>
        </div>
        <div class="podium-name">${a.n}</div>
        <div class="podium-genre">${a.g}</div>
        <div class="podium-base" style="height:${m.height}">
          <div class="podium-rank">${m.rank}</div>
        </div>
      </div>`;
  }).join('');
}

// ── LISTA DO TOP 30 ──
let activeTopFilter = 'todos';

function buildTopList(filter) {
  const list  = document.getElementById('tlist');
  const empty = document.getElementById('top-empty');
  const count = document.getElementById('top-count');
  if (!list) return;

  list.innerHTML = '';
  let shown = 0;

  TOP.forEach((anime, i) => {
    const rank = i + 1;
    if (rank <= 3) return; // pódio cuida dos 3 primeiros

    const tags = anime.tags || '';
    if (filter !== 'todos' && !tags.includes(filter)) return;

    const medalClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
    const el = document.createElement('div');
    el.className = 'ti';
    el.style.setProperty('--ic', anime.c);
    el.dataset.tags = tags;
    el.style.animationDelay = `${shown * 0.04}s`;
    el.innerHTML = `
      <img src="${anime.img}"
           style="width:52px;height:70px;object-fit:cover;border-radius:4px;flex-shrink:0;border:1px solid rgba(255,255,255,.08)"
           loading="lazy">
      <div class="ti-rank ${medalClass}">${rank}</div>
      <div class="ti-info">
        <div class="ti-name">${anime.n}</div>
        <div class="ti-genre">${anime.g}</div>
      </div>
      <div class="ti-num">${String(rank).padStart(2, '0')}</div>`;

    list.appendChild(el);
    shown++;
  });

  if (empty) empty.style.display = shown === 0 ? 'block' : 'none';
  if (count) count.textContent   = shown > 0 ? `${shown} anime${shown !== 1 ? 's' : ''}` : '';
}

function filterTop(genre, el) {
  activeTopFilter = genre;
  document.querySelectorAll('#top-chips .chip').forEach(c => c.classList.remove('on'));
  if (el) el.classList.add('on');

  // Pódio: esconde se não for "todos" ou se o anime do pódio não bater
  const podium = document.getElementById('podium');
  if (podium) {
    podium.style.display = genre === 'todos' ? '' : 'none';
  }

  buildTopList(genre);
}

// Constrói tudo ao carregar
(function initTop() {
  buildPodium();
  buildTopList('todos');
})();

// ─────────────────────────────────────────────
// MARCOS — SINCRONIZA COM MAL
// ─────────────────────────────────────────────

function syncMarcosStats({ completed, episodes, days }) {
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  // Anos desde o primeiro anime (Ponyo ~2019)
  const anosJornada = new Date().getFullYear() - 2019;

  // Stats cards
  set('ms-total', completed.toLocaleString('pt-BR'));
  set('ms-anos',  '~' + anosJornada);
  set('ms-eps',   '~' + episodes.toLocaleString('pt-BR'));
  set('ms-dias',  '~' + Math.round(days));

  // Próximo marco: próximo múltiplo de 100 acima do completed
  const proximo  = Math.ceil((completed + 1) / 100) * 100;
  const anterior = proximo - 100;
  const falta    = proximo - completed;
  const pct      = Math.min(((completed - anterior) / 100 * 100), 100).toFixed(1);

  // Atualiza badge "#500", meta "500" e campos de progresso
  const pmNum  = document.querySelector('.pm-num');
  const pmMeta = document.querySelector('.pm-meta');
  if (pmNum)  pmNum.textContent  = '#' + proximo;
  if (pmMeta) pmMeta.textContent = proximo;

  set('pm-atual', completed.toLocaleString('pt-BR'));
  set('pm-falta', falta);
  set('pm-pct',   pct + '%');

  const fill = document.getElementById('pm-fill');
  if (fill) {
    // Pequeno delay para a animação da barra ser visível
    setTimeout(() => { fill.style.width = pct + '%'; }, 300);
  }
}

// ─────────────────────────────────────────────
// SEARCH & FILTER (GÊNEROS)
// ─────────────────────────────────────────────

let activeChip = 'todos';

function doSearch(value) {
  applyFilter(value.toLowerCase().trim(), activeChip);
}

function clearSrch() {
  document.getElementById('srch').value = '';
  applyFilter('', activeChip);
}

function filterChip(genre, el) {
  activeChip = genre;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  applyFilter(document.getElementById('srch').value.toLowerCase().trim(), genre);
}

function applyFilter(text, genre) {
  let anyVisible = false;

  document.querySelectorAll('#gbox .gblock').forEach(block => {
    const blockGenres = block.dataset.g || '';
    const genreMatch  = genre === 'todos' || blockGenres.includes(genre);
    let blockVisible  = false;

    block.querySelectorAll('.ac').forEach(card => {
      const name      = (card.dataset.name || '').toLowerCase();
      const tags      = (card.dataset.tags || '').toLowerCase();
      const textMatch = !text || name.includes(text) || tags.includes(text);
      const cardMatch = genre === 'todos' || tags.includes(genre);
      const visible   = textMatch && cardMatch && genreMatch;

      card.style.display = visible ? '' : 'none';
      if (visible) blockVisible = true;
    });

    block.style.display = blockVisible ? '' : 'none';
    if (blockVisible) anyVisible = true;
  });

  document.getElementById('no-res').style.display = anyVisible ? 'none' : 'block';
}

// ─────────────────────────────────────────────
// MAL — CONFIGURAÇÃO E PROXY
// ─────────────────────────────────────────────

const MAL_USER = 'XxT0DDyxX';

const PROXIES = [
  u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  u => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
  u => `https://proxy.cors.sh/${u}`,
];

let workingProxy = null;

async function tryFetch(url) {
  const ordered = workingProxy
    ? [workingProxy, ...PROXIES.filter(p => p !== workingProxy)]
    : PROXIES;

  for (const proxy of ordered) {
    try {
      const ctrl = new AbortController();
      const tid  = setTimeout(() => ctrl.abort(), 12000);
      const res  = await fetch(proxy(url), { signal: ctrl.signal });
      clearTimeout(tid);

      if (res.ok) {
        const text    = await res.text();
        const trimmed = text.trim();
        if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
          workingProxy = proxy;
          return JSON.parse(trimmed);
        }
      }
    } catch (_) { /* tenta próximo proxy */ }

    await delay(400);
  }

  throw new Error('Todos os proxies falharam');
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// ─────────────────────────────────────────────
// ASSISTINDO — CARREGA LISTA
// ─────────────────────────────────────────────

let watchData   = [];
let watchLoaded = false;

async function fetchAllWatching() {
  let all = [];

  // Tenta Jikan API
  try {
    let page = 1, hasNext = true;
    while (hasNext) {
      const data = await tryFetch(
        `https://api.jikan.moe/v4/users/${MAL_USER}/animelist?status=watching&page=${page}`
      );
      if (!data || !Array.isArray(data.data)) throw new Error('formato inválido');
      all = all.concat(data.data);
      hasNext = !!(data.pagination?.has_next_page);
      page++;
      if (hasNext) await delay(600);
    }
    if (all.length) return all;
  } catch (_) {
    all = [];
    workingProxy = null;
  }

  // Fallback: MAL load.json
  let offset = 0, hasNext = true;
  while (hasNext) {
    const data  = await tryFetch(
      `https://myanimelist.net/animelist/${MAL_USER}/load.json?status=1&offset=${offset}`
    );
    const items = Array.isArray(data) ? data : [];

    all = all.concat(items.map(x => ({
      anime: {
        mal_id:       x.anime_id,
        title:        x.anime_title,
        num_episodes: x.anime_num_episodes,
        type:         x.anime_media_type_string,
        images:       { jpg: { image_url: x.anime_image_path } },
      },
      list_status: {
        score:                x.score,
        num_episodes_watched: x.num_watched_episodes,
        is_rewatching:        !!x.is_rewatching,
        updated_at:           x.last_updated
          ? new Date(x.last_updated * 1000).toISOString()
          : null,
      },
    })));

    hasNext  = items.length === 300;
    offset  += 300;
    if (hasNext) await delay(500);
  }

  return all;
}

async function loadWatching(force = false) {
  if (!force && watchLoaded) return;

  const loading = document.getElementById('w-loading');
  const error   = document.getElementById('w-error');
  const wrap    = document.getElementById('w-table-wrap');
  const stats   = document.getElementById('w-stats');

  loading.style.display = 'block';
  error.style.display   = 'none';
  wrap.style.display    = 'none';
  stats.style.display   = 'none';

  // Carrega o overview do perfil em paralelo
  loadMalOverview();

  try {
    watchData   = await fetchAllWatching();
    watchLoaded = true;
    renderWatchTable(watchData);
    updateWatchStats(watchData);
    loading.style.display = 'none';
    wrap.style.display    = 'block';
    stats.style.display   = 'flex';
  } catch (e) {
    console.error('Watch error:', e);
    loading.style.display = 'none';
    error.style.display   = 'block';
  }
}

function updateWatchStats(data) {
  const total  = data.length;
  const eps    = data.reduce((s, a) => s + (a.list_status?.num_episodes_watched || 0), 0);
  const scored = data.filter(a => (a.list_status?.score || 0) > 0);
  const avg    = scored.length
    ? (scored.reduce((s, a) => s + a.list_status.score, 0) / scored.length).toFixed(1)
    : '—';

  document.getElementById('ws-total').textContent = total;
  document.getElementById('ws-eps').textContent   = eps.toLocaleString('pt-BR');
  document.getElementById('ws-avg').textContent   = avg;
}

function renderWatchTable(data) {
  const tbody = document.getElementById('w-tbody');
  tbody.innerHTML = '';

  const empty = document.getElementById('w-empty');
  const wrap  = document.getElementById('w-table-wrap');

  if (!data.length) {
    empty.style.display = 'block';
    wrap.style.display  = 'none';
    return;
  }

  empty.style.display = 'none';
  wrap.style.display  = 'block';

  data.forEach((a, i) => {
    const anime   = a.anime || {};
    const ls      = a.list_status || {};
    const title   = anime.title || '—';
    const malId   = anime.mal_id || '';
    const img     = anime.images?.jpg?.image_url || anime.images?.webp?.image_url || '';
    const url     = malId ? `https://myanimelist.net/anime/${malId}` : '#';
    const watched = ls.num_episodes_watched || 0;
    const totalEp = anime.num_episodes || 0;
    const pct     = totalEp > 0 ? Math.round((watched / totalEp) * 100) : 0;
    const score   = ls.score || 0;
    const type    = anime.type || '—';
    const sClass  = score >= 8 ? 's-high' : score >= 6 ? 's-mid' : score > 0 ? 's-low' : 's-none';
    const sDisp   = score > 0 ? score : '—';

    const tr = document.createElement('tr');
    tr.dataset.title   = title.toLowerCase();
    tr.dataset.updated = ls.updated_at || '';
    tr.innerHTML = `
      <td class="wt-num">${i + 1}</td>
      <td class="wt-img">
        <a href="${url}" target="_blank">
          <img src="${img}" alt="${title}" loading="lazy" onerror="this.style.opacity='.15'">
        </a>
      </td>
      <td class="wt-name">
        <a href="${url}" target="_blank">${title}</a>
        ${ls.is_rewatching ? '<small>🔁 Reassistindo</small>' : ''}
      </td>
      <td class="wt-prog">
        <span class="prog-txt">${watched} / ${totalEp || '?'} ep</span>
        <div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div>
      </td>
      <td class="wt-score ${sClass}">${sDisp}</td>
      <td><span class="wt-type">${type}</span></td>`;

    tbody.appendChild(tr);
  });

  renderRecent(data);
}

function renderRecent(data) {
  const wrap = document.getElementById('w-recent');
  if (!wrap) return;

  const sorted = [...data]
    .filter(a => a.list_status?.updated_at)
    .sort((a, b) => new Date(b.list_status.updated_at) - new Date(a.list_status.updated_at))
    .slice(0, 5);

  if (!sorted.length) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';

  document.getElementById('w-recent-cards').innerHTML = sorted.map(a => {
    const anime   = a.anime || {};
    const ls      = a.list_status || {};
    const img     = anime.images?.jpg?.image_url || '';
    const url     = `https://myanimelist.net/anime/${anime.mal_id}`;
    const watched = ls.num_episodes_watched || 0;
    const totalEp = anime.num_episodes || 0;
    const pct     = totalEp > 0 ? Math.round((watched / totalEp) * 100) : 0;
    const date    = ls.updated_at
      ? new Date(ls.updated_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
      : '';
    const sClass  = ls.score >= 8 ? 's-high' : ls.score >= 6 ? 's-mid' : 's-low';
    const score   = ls.score > 0 ? `<span class="rc-score ${sClass}">${ls.score}</span>` : '';

    return `<div class="rc-card">
      <a href="${url}" target="_blank">
        <img src="${img}" alt="${anime.title}" onerror="this.style.opacity='.15'">
        <div class="rc-info">
          <div class="rc-title">${anime.title}</div>
          <div class="rc-meta">${watched}/${totalEp || '?'} ep · ${date} ${score}</div>
          <div class="prog-bar" style="margin-top:6px">
            <div class="prog-fill" style="width:${pct}%"></div>
          </div>
        </div>
      </a>
    </div>`;
  }).join('');
}

function filterWatch(value) {
  const v = value.toLowerCase().trim();
  let visible = 0;

  document.querySelectorAll('#w-tbody tr').forEach(tr => {
    const match = !v || tr.dataset.title.includes(v);
    tr.style.display = match ? '' : 'none';
    if (match) visible++;
  });

  document.getElementById('w-empty').style.display = visible ? 'none' : 'block';
}

function sortWatch(by) {
  if (!watchData.length) return;
  const sorted = [...watchData];

  const sorters = {
    alpha:  (a, b) => (a.anime?.title || '').localeCompare(b.anime?.title || ''),
    score:  (a, b) => (b.list_status?.score || 0) - (a.list_status?.score || 0),
    ep:     (a, b) => (b.list_status?.num_episodes_watched || 0) - (a.list_status?.num_episodes_watched || 0),
    recent: (a, b) => new Date(b.list_status?.updated_at || 0) - new Date(a.list_status?.updated_at || 0),
  };

  if (sorters[by]) sorted.sort(sorters[by]);

  renderWatchTable(sorted);
  const v = document.getElementById('w-srch').value;
  if (v) filterWatch(v);
}

// ─────────────────────────────────────────────
// MAL OVERVIEW (PERFIL)
// ─────────────────────────────────────────────

async function loadMalOverview() {
  const ovEl   = document.getElementById('mal-overview');
  const ovLoad = document.getElementById('mal-ov-loading');

  try {
    const [profileData, statsData] = await Promise.all([
      tryFetch(`https://api.jikan.moe/v4/users/${MAL_USER}`),
      tryFetch(`https://api.jikan.moe/v4/users/${MAL_USER}/statistics`),
    ]);

    const user  = profileData.data  || profileData;
    const stats = (statsData.data   || statsData)?.anime || {};

    // Avatar
    const avatar = user.images?.jpg?.image_url || user.images?.webp?.image_url || '';
    if (avatar) document.getElementById('mal-avatar').src = avatar;

    // Data de entrada
    if (user.joined) {
      const joined = new Date(user.joined).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
      document.getElementById('mal-joined').textContent = 'No MAL desde ' + joined;
    }

    // Estatísticas
    const { watching = 0, completed = 0, on_hold = 0, dropped = 0,
            plan_to_watch: ptw = 0, mean_score = 0,
            episodes_watched: episodes = 0, days_watched: days = 0 } = stats;

    const setEl = (id, val) => { document.getElementById(id).textContent = val; };
    setEl('ov-watching',  watching.toLocaleString('pt-BR'));
    setEl('ov-completed', completed.toLocaleString('pt-BR'));
    setEl('ov-hold',      on_hold.toLocaleString('pt-BR'));
    setEl('ov-dropped',   dropped.toLocaleString('pt-BR'));
    setEl('ov-ptw',       ptw.toLocaleString('pt-BR'));
    setEl('ov-score',     mean_score.toFixed(2));
    setEl('ov-eps',       episodes.toLocaleString('pt-BR'));
    setEl('ov-days',      days.toFixed(1));

    // Sincroniza aba Marcos com dados reais do MAL
    syncMarcosStats({ completed, episodes, days });

    // Barra proporcional
    const total = watching + completed + on_hold + dropped + ptw;
    if (total > 0) {
      const bar = document.getElementById('ov-bar');
      bar.innerHTML = [
        ['#4caf50',                  watching],
        ['#2196f3',                  completed],
        ['var(--gold)',              on_hold],
        ['#f44336',                  dropped],
        ['rgba(255,255,255,.2)',     ptw],
      ].map(([color, val]) =>
        `<div style="width:${(val / total * 100).toFixed(2)}%;background:${color}"></div>`
      ).join('');
    }

    ovLoad.style.display = 'none';
    ovEl.style.display   = 'block';
  } catch (e) {
    console.error('Overview error:', e);
    ovLoad.style.display = 'none';
  }
}

// ─────────────────────────────────────────────
// TOP SCORES
// ─────────────────────────────────────────────

let topData     = [];
let topLoaded   = false;
let topShowing  = 12;

async function loadTopScores() {
  if (topLoaded) return;

  const tl = document.getElementById('top-loading');
  const tw = document.getElementById('top-scores-wrap');
  tl.style.display = 'block';

  try {
    let all = [], offset = 0, hasNext = true;

    while (hasNext) {
      const data  = await tryFetch(
        `https://myanimelist.net/animelist/${MAL_USER}/load.json?status=2&order=4&sort=desc&offset=${offset}`
      );
      const items = Array.isArray(data) ? data : [];

      all = all.concat(items.map(x => ({
        id:    x.anime_id,
        title: x.anime_title,
        img:   x.anime_image_path,
        score: x.score,
        type:  x.anime_media_type_string,
        eps:   x.anime_num_episodes,
        year:  x.anime_start_date_string ? x.anime_start_date_string.slice(-4) : '',
      })));

      hasNext  = items.length === 300;
      offset  += 300;
      if (hasNext) await delay(400);
    }

    topData   = all.filter(a => a.score > 0).sort((a, b) => b.score - a.score);
    topLoaded = true;

    tl.style.display = 'none';
    tw.style.display = 'block';

    renderTopGrid();
    renderScoreChart(topData);
  } catch (e) {
    tl.style.display = 'none';
    console.error('Top scores error:', e);
  }
}

function scoreColorClass(s) {
  if (s === 10) return 's10';
  if (s >= 9)   return 's9';
  if (s >= 8)   return 's8';
  if (s >= 7)   return 's7';
  return 's6';
}

function renderTopGrid() {
  const grid = document.getElementById('top-scores-grid');
  const btn  = document.getElementById('top-show-more');
  const slice = topData.slice(0, topShowing);

  grid.innerHTML = slice.map((a, i) => `
    <a class="top-card" href="https://myanimelist.net/anime/${a.id}" target="_blank">
      <img src="${a.img}" alt="${a.title}" loading="lazy" onerror="this.style.opacity='.1'">
      <div class="top-card-rank">${i + 1}</div>
      <div class="top-card-score ${scoreColorClass(a.score)}">${a.score}</div>
      <div class="top-card-body">
        <div class="top-card-title">${a.title}</div>
        <div class="top-card-meta">${a.type || ''}${a.year ? ' · ' + a.year : ''}</div>
      </div>
    </a>`).join('');

  btn.style.display = topShowing >= topData.length ? 'none' : 'inline-block';
}

function topShowMore() {
  topShowing += 12;
  renderTopGrid();
}

// ─────────────────────────────────────────────
// GRÁFICO DE SCORES
// ─────────────────────────────────────────────

function renderScoreChart(data) {
  const wrap = document.getElementById('score-chart-wrap');
  if (!wrap || !data.length) return;

  const counts = Array(11).fill(0);
  data.forEach(a => { if (a.score >= 1 && a.score <= 10) counts[a.score]++; });

  const max    = Math.max(...counts.slice(1));
  const total  = counts.slice(1).reduce((s, v) => s + v, 0);
  const scored = data.filter(a => a.score > 0);
  const avg    = scored.length
    ? (scored.reduce((s, a) => s + a.score, 0) / scored.length).toFixed(2)
    : '—';
  const mode   = counts.indexOf(Math.max(...counts.slice(1)));
  const pct10  = total > 0 ? (counts[10] / total * 100).toFixed(1) : '0';

  const barColor = s => {
    if (s <= 3) return '#f44336';
    if (s <= 5) return '#ff9800';
    if (s <= 6) return 'var(--muted)';
    if (s <= 7) return 'var(--cyan)';
    if (s <= 8) return '#4caf50';
    if (s <= 9) return 'var(--gold)';
    return '#ff6bcb';
  };

  document.getElementById('chart-bars').innerHTML = Array.from({ length: 10 }, (_, i) => {
    const s   = i + 1;
    const cnt = counts[s];
    const h   = max > 0 ? Math.max((cnt / max) * 100, cnt > 0 ? 4 : 0) : 0;
    return `<div class="chart-bar-wrap">
      <div class="chart-bar-count">${cnt || ''}</div>
      <div class="chart-bar" style="height:${h}%;background:${barColor(s)}"
           data-tip="Score ${s}: ${cnt} anime${cnt !== 1 ? 's' : ''}"></div>
    </div>`;
  }).join('');

  document.getElementById('chart-summary').innerHTML = `
    <div class="chart-sum-item"><span>${total.toLocaleString('pt-BR')}</span><small>Com score</small></div>
    <div class="chart-sum-item"><span>${avg}</span><small>Média</small></div>
    <div class="chart-sum-item"><span>${mode}</span><small>Score mais dado</small></div>
    <div class="chart-sum-item"><span>${pct10}%</span><small>Notas 10</small></div>`;

  wrap.style.display = 'block';
}

// ─────────────────────────────────────────────
// ANIME SURPRESA
// ─────────────────────────────────────────────

let surprisePool = [];

async function surpriseMe() {
  const btn  = document.getElementById('surprise-btn');
  const card = document.getElementById('surprise-card');

  btn.classList.add('spinning');
  btn.disabled = true;

  try {
    // Preenche o pool se vazio
    if (!surprisePool.length) {
      if (topData.length > 0) {
        surprisePool = topData;
      } else {
        let all = [], offset = 0, hasNext = true;
        while (hasNext) {
          const data  = await tryFetch(
            `https://myanimelist.net/animelist/${MAL_USER}/load.json?status=2&offset=${offset}`
          );
          const items = Array.isArray(data) ? data : [];
          all = all.concat(items.map(x => ({
            id:    x.anime_id,
            title: x.anime_title,
            img:   x.anime_image_path,
            score: x.score,
            type:  x.anime_media_type_string,
            eps:   x.anime_num_episodes,
            year:  x.anime_start_date_string ? x.anime_start_date_string.slice(-4) : '',
          })));
          hasNext  = items.length === 300;
          offset  += 300;
          if (hasNext) await delay(400);
        }
        surprisePool = all;
      }
    }

    if (!surprisePool.length) throw new Error('lista vazia');

    const pick = surprisePool[Math.floor(Math.random() * surprisePool.length)];

    // Busca sinopse
    let synopsis = '';
    try {
      const det = await tryFetch(`https://api.jikan.moe/v4/anime/${pick.id}`);
      synopsis  = (det.data?.synopsis || '').replace(/\(Source:.*?\)/gi, '').trim();
    } catch (_) {}

    // Preenche o card
    document.getElementById('sp-img').src      = pick.img || '';
    document.getElementById('sp-title').textContent = pick.title;
    document.getElementById('sp-badge').textContent = '🎲 Sorteado da sua lista';
    document.getElementById('sp-meta').textContent  =
      [pick.type, pick.eps ? pick.eps + ' eps' : '', pick.year].filter(Boolean).join(' · ');
    document.getElementById('sp-link').href    = `https://myanimelist.net/anime/${pick.id}`;
    document.getElementById('sp-synopsis').textContent = synopsis || 'Sem sinopse disponível.';

    const scoreEl = document.getElementById('sp-score');
    if (pick.score > 0) {
      scoreEl.textContent = '★ ' + pick.score;
      scoreEl.className   = 'sp-score';
    } else {
      scoreEl.textContent = 'Sem score';
      scoreEl.className   = 'sp-score none';
    }

    card.style.display = 'flex';
  } catch (e) {
    console.error('Surpresa error:', e);
  }

  btn.classList.remove('spinning');
  btn.disabled = false;
}

// ─────────────────────────────────────────────
// VISUAL NOVEL
// ─────────────────────────────────────────────

let vnGenre = 'todos';

function vnChip(genre, el) {
  vnGenre = genre;
  document.querySelectorAll('#vn-chips .chip').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  vnApply();
}

function vnFilter(value) {
  vnApply(value);
}

function vnApply(text) {
  text = (text !== undefined
    ? text
    : document.getElementById('vn-srch').value
  ).toLowerCase().trim();

  let anyVisible = false;

  document.querySelectorAll('#vn-grid .vn-card').forEach(card => {
    const tags = (card.dataset.tags || '').toLowerCase();
    const name = (card.dataset.name || '').toLowerCase();
    const ok   = (vnGenre === 'todos' || tags.includes(vnGenre))
              && (!text || name.includes(text) || tags.includes(text));

    card.style.display = ok ? '' : 'none';
    if (ok) anyVisible = true;
  });

  document.getElementById('vn-no-res').style.display = anyVisible ? 'none' : 'block';
}

// ─────────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────────

// Carrega dados da aba inicial (assistindo) automaticamente
loadWatching();
loadTopScores();