// ---- Shared config & helpers used by every page ----

// Change this if your backend runs on a different host/port.
// Your app.js mounts the router at: app.use('/api/v3/auth', Router)
const DEFAULT_API_BASE = '/api/v3/auth';

// function apiBase() {
//   return (localStorage.getItem('api_base') || DEFAULT_API_BASE).replace(/\/$/, '');
// }

function apiBase() {
  return DEFAULT_API_BASE;
}

// function setApiBase(value) {
//   localStorage.setItem('api_base', value.trim());
// }

async function apiRequest(path, options = {}) {
  const res = await fetch(apiBase() + path, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  let data = {};
  try { data = await res.json(); } catch (e) { /* no body */ }
  if (!res.ok) {
    const message = data.msg || data.message || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

function getToken() {
  return localStorage.getItem('token');
}
function setToken(token) {
  localStorage.setItem('token', token);
}
function clearToken() {
  localStorage.removeItem('token');
}

function showMsg(el, text, type) {
  el.textContent = text;
  el.className = 'msg ' + type;
}
function clearMsg(el) {
  el.textContent = '';
  el.className = 'msg';
}
function setLoading(form, loading) {
  const btn = form.querySelector('button');
  btn.dataset.original = btn.dataset.original || btn.textContent;
  btn.disabled = loading;
  btn.textContent = loading ? 'Please wait…' : btn.dataset.original;
}

// Fills the "API base URL" config input on pages that have one, and keeps it in sync.
function wireApiBaseInput() {
  const input = document.getElementById('api-base');
  if (!input) return;
  input.value = apiBase();
  input.addEventListener('change', () => setApiBase(input.value));
}
