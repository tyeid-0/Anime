// ── BOTTOM NAV ──
function toggleMore(){
  document.getElementById('more-popup').classList.toggle('open');
  document.getElementById('more-overlay').classList.toggle('open');
}

function closeMore(){
  document.getElementById('more-popup').classList.remove('open');
  document.getElementById('more-overlay').classList.remove('open');
}

function navTo(id, el){
  // Atualiza item ativo no bottom nav
  document.querySelectorAll('.bnav-item').forEach(b=>b.classList.remove('on'));
  if(el && el.classList.contains('bnav-item')) el.classList.add('on');
  // Atualiza título no header
  const label = el?.dataset?.label || '';
  if(label) document.getElementById('page-title').textContent = label;
  show(id);
  closeMore();
  if(id==='assistindo'){
    if(!watchLoaded) loadWatching();
    if(!topLoaded)   loadTopScores();
  }
}

// ── TOP DATA ──
const TOP=[
  {n:"Made in Abyss",g:"Aventura · Dark Fantasy",c:"#e63946",up:0,img:"https://m.media-amazon.com/images/S/pv-target-images/acf77e7193251c237654b4ab7a3f83720d8703a416927e8d38a5c55ca0883898._SX1080_FMjpg_.jpg"},
  {n:"Seto no Hanayome",g:"Comédia · Romance",c:"#4cc9f0",up:0,img:"https://m.media-amazon.com/images/M/MV5BY2NmYjk1Y2EtMjNhZi00ZDVjLTg4YzAtZDA5MGY1NGYxMDIxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"},
  {n:"Vinland Saga",g:"Ação · Histórico",c:"#f4c542",up:0,img:"https://m.media-amazon.com/images/M/MV5BNDA3MGNmZTEtMzFiMy00ZmViLThhNmQtMjQ4ZDc5MDEyN2U1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"},
  {n:"Clannad: After Story",g:"Romance · Drama",c:"#ff7eb3",up:0,img:"https://m.media-amazon.com/images/I/81R8HeREVwL._AC_UF894,1000_QL80_.jpg"},
  {n:"Re:Zero",g:"Isekai · Fantasia",c:"#39ff14",up:0,img:"https://cdn.myanimelist.net/images/anime/11/79410.jpg"},
  {n:"Angel Beats!",g:"Drama · Sobrenatural",c:"#ff7eb3",up:0,img:"https://m.media-amazon.com/images/M/MV5BN2NlOWI5OTMtODRhZi00NjY3LTljZTUtYTQwZTMxOTBjNzE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"},
  {n:"Frieren: Beyond Journey's End",g:"Fantasia · Slice of Life",c:"#a07fff",up:0,img:"https://myanimelist.net/images/anime/1015/138006.jpg"},
  {n:"Shigatsu wa Kimi no Uso",g:"Música · Romance",c:"#ff7eb3",up:0,img:"https://myanimelist.net/images/anime/1405/143284.jpg"},
  {n:"Bocchi the Rock!",g:"Música · Slice of Life",c:"#39ff14",up:0,img:"https://m.media-amazon.com/images/I/81ScRXWN6DL._AC_UF1000,1000_QL80_.jpg"},
  {n:"Steins;Gate",g:"Sci-Fi · Thriller",c:"#f4c542",up:0,img:"https://m.media-amazon.com/images/M/MV5BZjI1YjZiMDUtZTI3MC00YTA5LWIzMmMtZmQ0NTZiYWM4NTYwXkEyXkFqcGc@._V1_QL75_UX190_CR0,2,190,281_.jpg"},
  {n:"Arknights: Perish in Frost",g:"Ação · Dark Fantasy",c:"#e63946",up:0,img:"https://myanimelist.net/images/anime/1644/128406.jpg"},
  {n:"Vivy: Fluorite Eye's Song",g:"Sci-Fi · Musical",c:"#4cc9f0",up:0,img:"https://m.media-amazon.com/images/M/MV5BNjA1MzlhOWEtYmQ1OC00MTUwLTliZDQtNGRlYmE4ZTVmMWQxXkEyXkFqcGc@._V1_.jpg"},
  {n:"Sayonara no Asa ni Yakusoku no Hana wo Kazarou",g:"Drama · Fantasia",c:"#4cc9f0",up:0,img:"https://myanimelist.net/images/anime/11/89556.jpg"},
  {n:"Dororo",g:"Ação · Histórico",c:"#e63946",up:0,img:"https://m.media-amazon.com/images/M/MV5BYzk2ODAyZjctNjExNS00ZDk0LWE1ZDMtZmIyNzI2NjNjNjllXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"},
  {n:"To Be Hero X",g:"Ação · Super-herói",c:"#f4c542",up:0,img:"https://preview.redd.it/to-be-hero-x-v0-mmibd27ecwue1.jpeg?auto=webp&s=bff6029e1f619c57ea605fdc23b0e7131188335a"},
  {n:"Hunter x Hunter",g:"Aventura · Combate",c:"#f4c542",up:0,img:"https://m.media-amazon.com/images/M/MV5BYzYxOTlkYzctNGY2MC00MjNjLWIxOWMtY2QwYjcxZWIwMmEwXkEyXkFqcGc@._V1_QL75_UY281_CR4,0,190,281_.jpg"},
  {n:"Guimi Zhi Zhu",g:"Ação · Fantasia",c:"#a07fff",up:0,img:"https://m.media-amazon.com/images/M/MV5BMWE1ZWYwZGUtZjRmOS00NzUzLTlkZmUtMTEwMjNhNTVmNDIwXkEyXkFqcGc@._V1_QL75_UX190_CR0,2,190,281_.jpg"},
  {n:"Fate/Stay Night: Heaven's Feel",g:"Ação · Sobrenatural",c:"#a07fff",up:0,img:"https://upload.wikimedia.org/wikipedia/en/7/7c/Fate-stay_night_Heaven%27s_Feel_Trilogy_Poster.jpg"},
  {n:"Majo no Tabitabi",g:"Fantasia · Aventura",c:"#39ff14",up:0,img:"https://myanimelist.net/images/anime/1802/108501.jpg"},
  {n:"Uma Musume: Cinderella Gray",g:"Esportes · Drama",c:"#f4c542",up:0,img:"https://myanimelist.net/images/anime/1626/148097.jpg"},
  {n:"Maoujou de Oyasumi",g:"Comédia · Fantasia",c:"#ff7eb3",up:0,img:"https://static.wikia.nocookie.net/sleepy-princess/images/3/3b/Anime_Key_Visual.png/revision/latest/smart/width/250/height/250?cb=20200903041445"},
  {n:"Fullmetal Alchemist: Brotherhood",g:"Ação · Fantasia",c:"#e63946",up:0,img:"https://cdn.myanimelist.net/images/anime/1223/96541.jpg"},
  {n:"Somali to Mori no Kamisama",g:"Aventura · Slice of Life",c:"#39ff14",up:0,img:"https://m.media-amazon.com/images/M/MV5BMGI5NzcyYmItNjI1ZS00YWU4LWE1ODYtYmZhN2E1YmU1MTk4XkEyXkFqcGc@._V1_.jpg"},
  {n:"Tengen Toppa Gurren Lagann",g:"Mecha · Ação",c:"#e63946",up:0,img:"https://m.media-amazon.com/images/M/MV5BMGJlODA2ZmItOTRiZS00NWM5LWJlNTQtYzI5MTNiZjA2MGFjXkEyXkFqcGc@._V1_.jpg"},
  {n:"Fumetsu no Anata e",g:"Drama · Aventura",c:"#4cc9f0",up:0,img:"https://myanimelist.net/images/anime/1880/118484.jpg"},
  {n:"86 -Eighty Six-",g:"Sci-Fi · Guerra",c:"#e63946",up:0,img:"https://m.media-amazon.com/images/M/MV5BOWNmY2IzOGItMmQyNy00ZTM0LThiNjItODM3YzdkYjRlNWU1XkEyXkFqcGc@._V1_.jpg"},
  {n:"BNA: Brand New Animal",g:"Ação · Kemono",c:"#f4c542",up:0,img:"https://m.media-amazon.com/images/M/MV5BMzUxMzAxYTMtMmYzOS00YzYyLWE2ZDUtYmQxZDhiNWIxNDNiXkEyXkFqcGc@._V1_.jpg"},
  {n:"Engage Kiss",g:"Ação · Comédia",c:"#ff7eb3",up:0,img:"https://myanimelist.net/images/anime/1464/111943.jpg"},
  {n:"Grimgar of Fantasy and Ash",g:"Isekai · Drama",c:"#a07fff",up:0,img:"https://m.media-amazon.com/images/M/MV5BMmUyNzNmMDEtNjYzYi00ZDcwLTg4NTQtZTUzYzBiZTYwNzYyXkEyXkFqcGc@._V1_.jpg"},
  {n:"Akiba Meido Sensou",g:"Comédia · Ação",c:"#e63946",up:0,img:"https://m.media-amazon.com/images/M/MV5BYzA5YmZlNzMtYjdlZC00ZDg0LTgyMjEtNTZhYTFmYzJkNTg1XkEyXkFqcGc@._V1_.jpg"},
];

(function buildTop(){
  const l=document.getElementById('tlist');
  TOP.forEach((a,i)=>{
    const r=i+1,rc=r===1?'gold':r===2?'silver':r===3?'bronze':'';
    const d=document.createElement('div');
    d.className='ti';d.style.setProperty('--ic',a.c);
    d.innerHTML=`
    <img src="${a.img}" style="width:52px;height:70px;object-fit:cover;border-radius:4px;flex-shrink:0;border:1px solid rgba(255,255,255,.08)" loading="lazy">
    <div class="ti-rank ${rc}">${r}</div>
    <div class="ti-info">
      <div class="ti-name">${a.n}${a.up?'<span class="ti-up">⬆ Subindo</span>':''}</div>
      <div class="ti-genre">${a.g}</div>
    </div>
    <div class="ti-num">${String(r).padStart(2,'0')}</div>`;
    l.appendChild(d);
  });
})();

// ── TABS ──
function show(id,el){
  document.querySelectorAll('.tab').forEach(t=>{
    t.classList.remove('on');
    t.style.display='none';
  });
  const t = document.getElementById('tab-'+id);
  if(!t) return;
  t.style.display = 'block';
  t.classList.add('on');
  window.scrollTo({top:0,behavior:'smooth'});
}

// ── SEARCH & FILTER ──
let activeChip='todos';

function doSearch(v){
  v=v.toLowerCase().trim();
  document.getElementById('srch').value=v;
  applyFilter(v,activeChip);
}
function clearSrch(){
  document.getElementById('srch').value='';
  applyFilter('',activeChip);
}
function filterChip(g,el){
  activeChip=g;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('on'));
  el.classList.add('on');
  applyFilter(document.getElementById('srch').value.toLowerCase().trim(),g);
}
function applyFilter(txt,genre){
  let any=false;
  document.querySelectorAll('#gbox .gblock').forEach(block=>{
    const bg=block.dataset.g||'';
    const matchGenre=genre==='todos'||bg.includes(genre);
    let blockVisible=false;
    block.querySelectorAll('.ac').forEach(card=>{
      const name=(card.dataset.name||'').toLowerCase();
      const tags=(card.dataset.tags||'').toLowerCase();
      const matchTxt=!txt||name.includes(txt)||tags.includes(txt);
      const matchCardGenre=genre==='todos'||tags.includes(genre);
      const show=matchTxt&&matchCardGenre&&matchGenre;
      card.style.display=show?'':'none';
      if(show)blockVisible=true;
    });
    block.style.display=blockVisible?'':'none';
    if(blockVisible)any=true;
  });
  document.getElementById('no-res').style.display=any?'none':'block';
}

// ── MAL STATS ──
(async()=>{
  try{
    const r=await fetch('https://api.jikan.moe/v4/users/XxT0DDyxX/statistics');
    const d=await r.json();
    document.getElementById('hc').textContent=d.data.anime.completed.toLocaleString('pt-BR');
    document.getElementById('hw').textContent=d.data.anime.watching.toLocaleString('pt-BR');
  }catch(e){}
})();

// ── ASSISTINDO ──
let watchData=[];
let watchLoaded=false;

const MAL_USER = 'XxT0DDyxX';

const PROXIES = [
  u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  u => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
  u => `https://proxy.cors.sh/${u}`,
];
let workingProxy = null; // guarda o proxy que funcionou

async function tryFetch(url){
  // Se já temos um proxy funcionando, tenta ele primeiro
  const ordered = workingProxy
    ? [workingProxy, ...PROXIES.filter(p=>p!==workingProxy)]
    : PROXIES;

  for(const proxy of ordered){
    try{
      const ctrl = new AbortController();
      const tid  = setTimeout(()=>ctrl.abort(), 12000);
      const r = await fetch(proxy(url), { signal: ctrl.signal });
      clearTimeout(tid);
      if(r.ok){
        const text = await r.text();
        const trimmed = text.trim();
        if(trimmed.startsWith('{') || trimmed.startsWith('[')){
          workingProxy = proxy; // salva o que funcionou
          return JSON.parse(trimmed);
        }
      }
    }catch(e){ /* tenta próximo */ }
    await new Promise(res=>setTimeout(res,400));
  }
  throw new Error('Todos os proxies falharam');
}

async function fetchAllWatching(){
  let all=[];

  // Tenta Jikan primeiro (pagina de 25 em 25)
  try{
    let page=1, hasNext=true;
    while(hasNext){
      const d = await tryFetch(
        `https://api.jikan.moe/v4/users/${MAL_USER}/animelist?status=watching&page=${page}`
      );
      if(!d || !Array.isArray(d.data)) throw new Error('formato inválido');
      all = all.concat(d.data);
      hasNext = !!(d.pagination?.has_next_page);
      page++;
      if(hasNext) await new Promise(res=>setTimeout(res,600));
    }
    if(all.length) return all;
  }catch(e){ all=[]; workingProxy=null; }

  // Fallback: endpoint público do MAL (pagina de 300 em 300)
  let offset=0, hasNext=true;
  while(hasNext){
    const d = await tryFetch(
      `https://myanimelist.net/animelist/${MAL_USER}/load.json?status=1&offset=${offset}`
    );
    const items = Array.isArray(d) ? d : [];
    all = all.concat(items.map(x=>({
      anime:{
        mal_id:       x.anime_id,
        title:        x.anime_title,
        num_episodes: x.anime_num_episodes,
        type:         x.anime_media_type_string,
        images:{ jpg:{ image_url: x.anime_image_path } }
      },
      list_status:{
        score:                x.score,
        num_episodes_watched: x.num_watched_episodes,
        is_rewatching:        !!x.is_rewatching,
        updated_at:           x.last_updated ? new Date(x.last_updated*1000).toISOString() : null
      }
    })));
    hasNext = items.length === 300;
    offset += 300;
    if(hasNext) await new Promise(res=>setTimeout(res,500));
  }
  return all;
}

async function loadMalOverview(){
  const ovEl   = document.getElementById('mal-overview');
  const ovLoad = document.getElementById('mal-ov-loading');
  try{
    // Busca perfil e stats em paralelo (endpoints separados no Jikan v4)
    const [profileData, statsData] = await Promise.all([
      tryFetch(`https://api.jikan.moe/v4/users/${MAL_USER}`),
      tryFetch(`https://api.jikan.moe/v4/users/${MAL_USER}/statistics`)
    ]);

    const u     = profileData.data || profileData;
    const stats = (statsData.data || statsData)?.anime || {};

    // Avatar e info
    const avatar = u.images?.jpg?.image_url || u.images?.webp?.image_url || '';
    if(avatar) document.getElementById('mal-avatar').src = avatar;
    if(u.joined){
      const joined = new Date(u.joined).toLocaleDateString('pt-BR',{month:'long',year:'numeric'});
      document.getElementById('mal-joined').textContent = 'No MAL desde ' + joined;
    }

    // Cards de stats — campos corretos da API Jikan v4 /statistics
    const watching   = stats.watching    || 0;
    const completed  = stats.completed   || 0;
    const on_hold    = stats.on_hold     || 0;
    const dropped    = stats.dropped     || 0;
    const ptw        = stats.plan_to_watch || 0;
    const mean_score = stats.mean_score  || 0;
    const episodes   = stats.episodes_watched || 0;
    const days       = stats.days_watched || 0;

    document.getElementById('ov-watching').textContent  = watching.toLocaleString('pt-BR');
    document.getElementById('ov-completed').textContent = completed.toLocaleString('pt-BR');
    document.getElementById('ov-hold').textContent      = on_hold.toLocaleString('pt-BR');
    document.getElementById('ov-dropped').textContent   = dropped.toLocaleString('pt-BR');
    document.getElementById('ov-ptw').textContent       = ptw.toLocaleString('pt-BR');
    document.getElementById('ov-score').textContent     = mean_score.toFixed(2);
    document.getElementById('ov-eps').textContent       = episodes.toLocaleString('pt-BR');
    document.getElementById('ov-days').textContent      = days.toFixed(1);

    // Barra proporcional
    const total = watching + completed + on_hold + dropped + ptw;
    if(total > 0){
      const bar = document.getElementById('ov-bar');
      bar.innerHTML = [
        ['#4caf50',               watching],
        ['#2196f3',               completed],
        ['var(--gold)',            on_hold],
        ['#f44336',               dropped],
        ['rgba(255,255,255,.2)',   ptw],
      ].map(([c,v])=>`<div style="width:${(v/total*100).toFixed(2)}%;background:${c}"></div>`).join('');
    }

    ovLoad.style.display = 'none';
    ovEl.style.display   = 'block';
  }catch(e){
    console.error('Overview error:', e);
    ovLoad.style.display = 'none';
  }
}

async function loadWatching(force=false){
  if(!force&&watchLoaded) return;
  const loading=document.getElementById('w-loading');
  const error=document.getElementById('w-error');
  const wrap=document.getElementById('w-table-wrap');
  const stats=document.getElementById('w-stats');
  loading.style.display='block';
  error.style.display='none';
  wrap.style.display='none';
  stats.style.display='none';

  // Carrega overview e lista em paralelo
  loadMalOverview();

  try{
    watchData=await fetchAllWatching();
    watchLoaded=true;
    renderWatchTable(watchData);
    updateWatchStats(watchData);
    loading.style.display='none';
    wrap.style.display='block';
    stats.style.display='flex';
  }catch(e){
    console.error('Watch error:',e);
    loading.style.display='none';
    error.style.display='block';
  }
}

function updateWatchStats(data){
  const total  = data.length;
  // Jikan v4: list_status.num_episodes_watched
  const eps    = data.reduce((s,a)=>s+(a.list_status?.num_episodes_watched||0),0);
  const scored = data.filter(a=>(a.list_status?.score||0)>0);
  const avg    = scored.length
    ? (scored.reduce((s,a)=>s+a.list_status.score,0)/scored.length).toFixed(1)
    : '—';
  document.getElementById('ws-total').textContent = total;
  document.getElementById('ws-eps').textContent   = eps.toLocaleString('pt-BR');
  document.getElementById('ws-avg').textContent   = avg;
}

function renderWatchTable(data){
  const tbody = document.getElementById('w-tbody');
  tbody.innerHTML = '';
  if(!data.length){
    document.getElementById('w-empty').style.display='block';
    document.getElementById('w-table-wrap').style.display='none';
    return;
  }
  document.getElementById('w-empty').style.display='none';
  document.getElementById('w-table-wrap').style.display='block';

  data.forEach((a,i)=>{
    // Jikan v4 animelist: { anime:{mal_id,title,images,num_episodes,type}, list_status:{score,num_episodes_watched,...} }
    const anime   = a.anime || {};
    const ls      = a.list_status || {};
    const title   = anime.title || '—';
    const malId   = anime.mal_id || '';
    const img     = anime.images?.jpg?.image_url || anime.images?.webp?.image_url || '';
    const url     = malId ? `https://myanimelist.net/anime/${malId}` : '#';
    const watched = ls.num_episodes_watched || 0;
    const totalEp = anime.num_episodes || 0;
    const pct     = totalEp > 0 ? Math.round((watched/totalEp)*100) : 0;
    const score   = ls.score || 0;
    const type    = anime.type || '—';
    const scoreClass = score>=8?'s-high':score>=6?'s-mid':score>0?'s-low':'s-none';
    const scoreDisp  = score > 0 ? score : '—';

    const tr = document.createElement('tr');
    tr.dataset.title   = title.toLowerCase();
    tr.dataset.updated = ls.updated_at || '';
    tr.innerHTML = `
      <td class="wt-num">${i+1}</td>
      <td class="wt-img"><a href="${url}" target="_blank"><img src="${img}" alt="${title}" loading="lazy" onerror="this.style.opacity='.15'"></a></td>
      <td class="wt-name">
        <a href="${url}" target="_blank">${title}</a>
        ${ls.is_rewatching?'<small>🔁 Reassistindo</small>':''}
      </td>
      <td class="wt-prog">
        <span class="prog-txt">${watched} / ${totalEp||'?'} ep</span>
        <div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div>
      </td>
      <td class="wt-score ${scoreClass}">${scoreDisp}</td>
      <td><span class="wt-type">${type}</span></td>`;
    tbody.appendChild(tr);
  });

  renderRecent(data);
}

function renderRecent(data){
  const wrap = document.getElementById('w-recent');
  if(!wrap) return;
  const sorted = [...data]
    .filter(a=>a.list_status?.updated_at)
    .sort((a,b)=>new Date(b.list_status.updated_at)-new Date(a.list_status.updated_at))
    .slice(0,5);
  if(!sorted.length){ wrap.style.display='none'; return; }
  wrap.style.display='block';
  document.getElementById('w-recent-cards').innerHTML = sorted.map(a=>{
    const anime   = a.anime || {};
    const ls      = a.list_status || {};
    const img     = anime.images?.jpg?.image_url || '';
    const url     = `https://myanimelist.net/anime/${anime.mal_id}`;
    const watched = ls.num_episodes_watched||0;
    const totalEp = anime.num_episodes||0;
    const pct     = totalEp>0?Math.round((watched/totalEp)*100):0;
    const date    = ls.updated_at
      ? new Date(ls.updated_at).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'})
      : '';
    const score   = ls.score>0
      ? `<span class="rc-score ${ls.score>=8?'s-high':ls.score>=6?'s-mid':'s-low'}">${ls.score}</span>`
      : '';
    return `<div class="rc-card">
      <a href="${url}" target="_blank">
        <img src="${img}" alt="${anime.title}" onerror="this.style.opacity='.15'">
        <div class="rc-info">
          <div class="rc-title">${anime.title}</div>
          <div class="rc-meta">${watched}/${totalEp||'?'} ep · ${date} ${score}</div>
          <div class="prog-bar" style="margin-top:6px"><div class="prog-fill" style="width:${pct}%"></div></div>
        </div>
      </a>
    </div>`;
  }).join('');
}

function filterWatch(v){
  v=v.toLowerCase().trim();
  let visible=0;
  document.querySelectorAll('#w-tbody tr').forEach(tr=>{
    const match=!v||tr.dataset.title.includes(v);
    tr.style.display=match?'':'none';
    if(match)visible++;
  });
  document.getElementById('w-empty').style.display=visible?'none':'block';
}

function sortWatch(by){
  if(!watchData.length) return;
  const sorted=[...watchData];
  if(by==='alpha')       sorted.sort((a,b)=>(a.anime?.title||'').localeCompare(b.anime?.title||''));
  else if(by==='score')  sorted.sort((a,b)=>(b.list_status?.score||0)-(a.list_status?.score||0));
  else if(by==='ep')     sorted.sort((a,b)=>(b.list_status?.num_episodes_watched||0)-(a.list_status?.num_episodes_watched||0));
  else if(by==='recent') sorted.sort((a,b)=>new Date(b.list_status?.updated_at||0)-new Date(a.list_status?.updated_at||0));
  renderWatchTable(sorted);
  const v=document.getElementById('w-srch').value;
  if(v) filterWatch(v);
}

// ── TOP SCORES ──
let topData     = [];
let topLoaded   = false;
let topShowing  = 12;

async function loadTopScores(){
  if(topLoaded) return;
  const tl = document.getElementById('top-loading');
  const tw = document.getElementById('top-scores-wrap');
  tl.style.display = 'block';
  try{
    let all=[], offset=0, hasNext=true;
    // Busca lista completa (completed) via MAL load.json — mais rápido e sem paginação do Jikan
    while(hasNext){
      const d = await tryFetch(
        `https://myanimelist.net/animelist/${MAL_USER}/load.json?status=2&order=4&sort=desc&offset=${offset}`
      );
      const items = Array.isArray(d) ? d : [];
      all = all.concat(items.map(x=>({
        id:    x.anime_id,
        title: x.anime_title,
        img:   x.anime_image_path,
        score: x.score,
        type:  x.anime_media_type_string,
        eps:   x.anime_num_episodes,
        year:  x.anime_start_date_string ? x.anime_start_date_string.slice(-4) : ''
      })));
      hasNext = items.length === 300;
      offset += 300;
      if(hasNext) await new Promise(res=>setTimeout(res,400));
    }
    // Ordena por score desc, filtra só com score > 0
    topData = all
      .filter(a=>a.score>0)
      .sort((a,b)=>b.score-a.score);
    topLoaded = true;
    tl.style.display = 'none';
    tw.style.display = 'block';
    renderTopGrid();
    renderScoreChart(topData);
  }catch(e){
    tl.style.display = 'none';
    console.error('Top scores error:', e);
  }
}

function scoreClass(s){
  if(s===10) return 's10';
  if(s>=9)   return 's9';
  if(s>=8)   return 's8';
  if(s>=7)   return 's7';
  return 's6';
}

function renderTopGrid(){
  const grid = document.getElementById('top-scores-grid');
  const btn  = document.getElementById('top-show-more');
  const slice = topData.slice(0, topShowing);
  grid.innerHTML = slice.map((a,i)=>`
    <a class="top-card" href="https://myanimelist.net/anime/${a.id}" target="_blank">
      <img src="${a.img}" alt="${a.title}" loading="lazy" onerror="this.style.opacity='.1'">
      <div class="top-card-rank">${i+1}</div>
      <div class="top-card-score ${scoreClass(a.score)}">${a.score}</div>
      <div class="top-card-body">
        <div class="top-card-title">${a.title}</div>
        <div class="top-card-meta">${a.type||''}${a.year?' · '+a.year:''}</div>
      </div>
    </a>`).join('');
  btn.style.display = topShowing >= topData.length ? 'none' : 'inline-block';
}

function topShowMore(){
  topShowing += 12;
  renderTopGrid();
}

// ── GRÁFICO DE SCORES ──
function renderScoreChart(data){
  const wrap = document.getElementById('score-chart-wrap');
  if(!wrap || !data.length) return;

  // Conta quantos animes têm cada score (1-10)
  const counts = Array(11).fill(0); // índice 0 ignorado
  data.forEach(a=>{ if(a.score>=1&&a.score<=10) counts[a.score]++; });

  const max    = Math.max(...counts.slice(1));
  const total  = counts.slice(1).reduce((s,v)=>s+v,0);
  const scored = data.filter(a=>a.score>0);
  const avg    = scored.length
    ? (scored.reduce((s,a)=>s+a.score,0)/scored.length).toFixed(2)
    : '—';
  const mode   = counts.indexOf(Math.max(...counts.slice(1)));
  const pct10  = total>0?(counts[10]/total*100).toFixed(1):'0';

  // Gradiente de cor por score
  const barColor = s => {
    if(s<=3)  return '#f44336';
    if(s<=5)  return '#ff9800';
    if(s<=6)  return 'var(--muted)';
    if(s<=7)  return 'var(--cyan)';
    if(s<=8)  return '#4caf50';
    if(s<=9)  return 'var(--gold)';
    return '#ff6bcb';
  };

  const barsEl = document.getElementById('chart-bars');
  barsEl.innerHTML = Array.from({length:10},(_,i)=>{
    const s   = i+1;
    const cnt = counts[s];
    const h   = max>0 ? Math.max((cnt/max)*100,cnt>0?4:0) : 0;
    return `<div class="chart-bar-wrap">
      <div class="chart-bar-count">${cnt||''}</div>
      <div class="chart-bar" style="height:${h}%;background:${barColor(s)}"
           data-tip="Score ${s}: ${cnt} anime${cnt!==1?'s':''}"></div>
    </div>`;
  }).join('');

  // Summary
  document.getElementById('chart-summary').innerHTML = `
    <div class="chart-sum-item"><span>${total.toLocaleString('pt-BR')}</span><small>Com score</small></div>
    <div class="chart-sum-item"><span>${avg}</span><small>Média</small></div>
    <div class="chart-sum-item"><span>${mode}</span><small>Score mais dado</small></div>
    <div class="chart-sum-item"><span>${pct10}%</span><small>Notas 10</small></div>
  `;

  wrap.style.display = 'block';
}

// ── SURPRESA ──
let surprisePool = []; // cache da lista completa

async function surpriseMe(){
  const btn  = document.getElementById('surprise-btn');
  const card = document.getElementById('surprise-card');

  btn.classList.add('spinning');
  btn.disabled = true;

  try{
    // Monta pool na primeira vez (usa topData se já carregado, senão busca)
    if(surprisePool.length === 0){
      if(topData.length > 0){
        surprisePool = topData;
      } else {
        // Busca lista completa de completados
        let all=[], offset=0, hasNext=true;
        while(hasNext){
          const d = await tryFetch(
            `https://myanimelist.net/animelist/${MAL_USER}/load.json?status=2&offset=${offset}`
          );
          const items = Array.isArray(d) ? d : [];
          all = all.concat(items.map(x=>({
            id:    x.anime_id,
            title: x.anime_title,
            img:   x.anime_image_path,
            score: x.score,
            type:  x.anime_media_type_string,
            eps:   x.anime_num_episodes,
            year:  x.anime_start_date_string ? x.anime_start_date_string.slice(-4) : ''
          })));
          hasNext = items.length === 300;
          offset += 300;
          if(hasNext) await new Promise(res=>setTimeout(res,400));
        }
        surprisePool = all;
      }
    }

    if(!surprisePool.length) throw new Error('lista vazia');

    // Sorteia aleatório
    const pick = surprisePool[Math.floor(Math.random() * surprisePool.length)];

    // Busca sinopse via Jikan
    let synopsis = '';
    try{
      const det = await tryFetch(`https://api.jikan.moe/v4/anime/${pick.id}`);
      synopsis = det.data?.synopsis || '';
      // Remove "(Source...)" do fim
      synopsis = synopsis.replace(/\(Source:.*?\)/gi,'').trim();
    }catch(e){}

    // Preenche card
    document.getElementById('sp-img').src       = pick.img || '';
    document.getElementById('sp-title').textContent = pick.title;
    document.getElementById('sp-badge').textContent = '🎲 Sorteado da sua lista';
    document.getElementById('sp-meta').textContent  =
      [pick.type, pick.eps ? pick.eps+' eps' : '', pick.year].filter(Boolean).join(' · ');
    document.getElementById('sp-link').href      = `https://myanimelist.net/anime/${pick.id}`;
    document.getElementById('sp-synopsis').textContent = synopsis || 'Sem sinopse disponível.';

    const scoreEl = document.getElementById('sp-score');
    if(pick.score > 0){
      scoreEl.textContent = '★ ' + pick.score;
      scoreEl.className   = 'sp-score';
    } else {
      scoreEl.textContent = 'Sem score';
      scoreEl.className   = 'sp-score none';
    }

    card.style.display = 'flex';

  }catch(e){
    console.error('Surpresa error:', e);
  }

  btn.classList.remove('spinning');
  btn.disabled = false;
}

// Auto-carrega aba inicial
loadWatching();
loadTopScores();