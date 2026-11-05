/* =========================================================
   media.js — voice to text (dictation) and audio recording
   - Dictation uses the browser's speech recognition (Chrome, Edge,
     Safari 14.5+). Text is appended to the field the button belongs to.
   - Recordings use MediaRecorder and are stored in IndexedDB on this
     device under a key like  <studentId>/<course>/<unit>/<lesson>/<slot>.
     Teachers play them back from the Students panel.
   Both are wired by data attributes, so any page can add them:
     <button data-dictate="#fieldId">🎤</button>
     <div data-recorder="key" data-label="Record your answer"></div>
   ========================================================= */
(function () {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const canDictate = !!SR;
  const canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);

  /* ---------- dictation ---------- */
  let rec = null, activeBtn = null;
  function stopDictation() { if (rec) { try { rec.stop(); } catch (e) {} } rec = null; if (activeBtn) { activeBtn.classList.remove('on'); activeBtn.textContent = '🎤'; activeBtn.title = 'Dictate'; } activeBtn = null; }
  function startDictation(btn, field) {
    stopDictation();
    rec = new SR(); rec.lang = 'en-CA'; rec.continuous = true; rec.interimResults = true;
    activeBtn = btn; btn.classList.add('on'); btn.textContent = '⏹️'; btn.title = 'Stop dictating';
    const base = field.value; let finalText = '';
    rec.onresult = e => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) finalText += t + ' '; else interim += t; }
      field.value = (base + (base && !/\s$/.test(base) ? ' ' : '') + finalText + interim).replace(/\s+([.,!?])/g, '$1');
      field.dispatchEvent(new Event('input', { bubbles: true }));
    };
    rec.onend = () => { if (rec) stopDictation(); };
    rec.onerror = () => stopDictation();
    try { rec.start(); } catch (e) { stopDictation(); }
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-dictate]'); if (!b) return;
    const field = document.querySelector(b.dataset.dictate); if (!field) return;
    if (activeBtn === b) stopDictation(); else startDictation(b, field);
  });
  /** Button HTML for a text field (empty string when the browser cannot dictate or the student turned it off). */
  function dictateBtn(selector) {
    if (!canDictate || Settings.get('dictation') === false) return '';
    return '<button type="button" class="dictate-btn" data-dictate="' + selector + '" title="Dictate" aria-label="Dictate — speak instead of typing">🎤</button>';
  }

  /* ---------- recordings in IndexedDB ---------- */
  const DB = 'learnhub-media', STORE = 'audio', FILES = 'files';
  function db() {
    return new Promise((res, rej) => {
      const r = indexedDB.open(DB, 2);
      r.onupgradeneeded = () => { const d = r.result; if (!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE); if (!d.objectStoreNames.contains(FILES)) d.createObjectStore(FILES); };
      r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
    });
  }
  /* ---------- uploaded media files (pictures, audio, video) for the classroom shell ----------
     Stored on this device; referenced from a slide's media as src 'idb:<id>'. */
  const MAX_FILE = 25 * 1024 * 1024;
  async function putFile(file, meta) {
    if (file.size > MAX_FILE) throw new Error('That file is ' + Math.round(file.size / 1048576) + ' MB — the limit is 25 MB. Try a smaller file or paste a link instead.');
    const id = 'f' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const d = await db();
    await new Promise((res, rej) => { const tx = d.transaction(FILES, 'readwrite'); tx.objectStore(FILES).put({ blob: file, type: file.type, name: file.name, size: file.size, at: new Date().toISOString(), meta: meta || {} }, id); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); });
    return id;
  }
  async function getFile(id) { const d = await db(); return new Promise((res, rej) => { const r = d.transaction(FILES).objectStore(FILES).get(id); r.onsuccess = () => res(r.result || null); r.onerror = () => rej(r.error); }); }
  async function delFile(id) { const d = await db(); return new Promise((res, rej) => { const tx = d.transaction(FILES, 'readwrite'); tx.objectStore(FILES).delete(id); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); }); }
  const urlCache = {};
  /** Object URL for an uploaded file id (cached). */
  async function fileUrl(id) { if (urlCache[id]) return urlCache[id]; const f = await getFile(id); if (!f) return null; return urlCache[id] = URL.createObjectURL(f.blob); }
  /** Fill in <img|video|audio data-idb="id"> elements with their object URLs. */
  async function mountIdb(root) {
    for (const el of (root || document).querySelectorAll('[data-idb]:not([data-idb-ready])')) {
      el.dataset.idbReady = '1';
      const f = await getFile(el.dataset.idb); if (!f) { el.replaceWith(Object.assign(document.createElement('div'), { className: 'muted small', textContent: '(uploaded file not on this device)' })); continue; }
      const url = urlCache[el.dataset.idb] || (urlCache[el.dataset.idb] = URL.createObjectURL(f.blob));
      if (el.tagName === 'IMG' || el.tagName === 'VIDEO' || el.tagName === 'AUDIO') el.src = url; else el.href = url;
    }
  }
  async function put(key, blob, meta) { const d = await db(); return new Promise((res, rej) => { const tx = d.transaction(STORE, 'readwrite'); tx.objectStore(STORE).put({ blob, type: blob.type, at: new Date().toISOString(), meta: meta || {} }, key); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); }); }
  async function get(key) { const d = await db(); return new Promise((res, rej) => { const r = d.transaction(STORE).objectStore(STORE).get(key); r.onsuccess = () => res(r.result || null); r.onerror = () => rej(r.error); }); }
  async function del(key) { const d = await db(); return new Promise((res, rej) => { const tx = d.transaction(STORE, 'readwrite'); tx.objectStore(STORE).delete(key); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); }); }
  async function keys(prefix) { const d = await db(); return new Promise((res, rej) => { const r = d.transaction(STORE).objectStore(STORE).getAllKeys(); r.onsuccess = () => res(r.result.filter(k => !prefix || String(k).startsWith(prefix))); r.onerror = () => rej(r.error); }); }

  /* ---------- recorder widget ---------- */
  async function mountRecorders(root) {
    root = root || document;
    for (const host of root.querySelectorAll('[data-recorder]:not([data-ready])')) {
      host.dataset.ready = '1';
      const key = host.dataset.recorder, label = host.dataset.label || 'Record';
      const readOnly = host.dataset.readonly === '1';
      let existing = null; try { existing = await get(key); } catch (e) {}
      const draw = () => {
        host.innerHTML = '<div class="recorder">' +
          (existing ? '<audio controls src="' + URL.createObjectURL(existing.blob) + '"></audio><span class="small muted">Recorded ' + new Date(existing.at).toLocaleString() + '</span>' + (readOnly ? '' : '<button type="button" class="btn ghost sm" data-rec-del>Delete</button>') : (readOnly && host.dataset.showEmpty === '1' ? '<span class="small muted">No recording.</span>' : '')) +
          (!readOnly && canRecord ? '<button type="button" class="btn secondary sm" data-rec-start>🎙️ ' + (existing ? 'Record again' : label) + '</button><span class="rec-status small muted"></span>' : (!readOnly && !canRecord ? '<span class="small muted">Recording is not available in this browser.</span>' : '')) + '</div>';
        const st = host.querySelector('.rec-status');
        const b = host.querySelector('[data-rec-start]');
        if (b) b.addEventListener('click', async () => {
          let stream; try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch (e) { st.textContent = 'Microphone not allowed.'; return; }
          const mr = new MediaRecorder(stream); const chunks = [];
          mr.ondataavailable = e => chunks.push(e.data);
          mr.onstop = async () => { stream.getTracks().forEach(t => t.stop()); const blob = new Blob(chunks, { type: mr.mimeType || 'audio/webm' }); await put(key, blob, { label }); existing = await get(key); draw(); };
          mr.start();
          let secs = 0; const tick = setInterval(() => { secs++; st.textContent = '● Recording ' + secs + 's'; if (secs >= 300) stopBtn.click(); }, 1000);
          b.hidden = true;
          const stopBtn = document.createElement('button'); stopBtn.type = 'button'; stopBtn.className = 'btn sm'; stopBtn.textContent = '⏹️ Stop'; b.after(stopBtn);
          stopBtn.addEventListener('click', () => { clearInterval(tick); mr.stop(); stopBtn.remove(); });
          st.textContent = '● Recording…';
        });
        const d = host.querySelector('[data-rec-del]');
        if (d) d.addEventListener('click', async () => { if (confirm('Delete this recording?')) { await del(key); existing = null; draw(); } });
      };
      draw();
    }
  }
  // mount whenever the app re-renders
  const mo = new MutationObserver(() => { if (document.querySelector('[data-recorder]:not([data-ready])')) mountRecorders(); if (document.querySelector('[data-idb]:not([data-idb-ready])')) mountIdb(); });
  mo.observe(document.getElementById('app') || document.body, { childList: true, subtree: true });

  window.Media = { canDictate, canRecord, dictateBtn, stopDictation, put, get, del, keys, mountRecorders, putFile, getFile, delFile, fileUrl, mountIdb, MAX_FILE };
})();
