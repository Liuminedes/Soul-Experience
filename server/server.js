const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'soul2026';
const JWT_SECRET = process.env.JWT_SECRET || 'soul-super-secret-key-change-in-dokploy';

// Data directory & file
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'menu.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize menu.json if not present
if (!fs.existsSync(DATA_FILE)) {
  const initialDataPath = path.join(__dirname, 'initial_menu.json');
  if (fs.existsSync(initialDataPath)) {
    fs.copyFileSync(initialDataPath, DATA_FILE);
  } else {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  }
}

// Helpers
function getMenu() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading menu:', err);
    return [];
  }
}

function saveMenu(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

// Serve Admin UI static files
app.use('/admin', express.static(path.join(__dirname, 'public')));

// Auth middleware for protected routes
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

// ──────────────── PUBLIC ENDPOINTS ────────────────
// 1. Get entire menu (consumed by Vercel frontend)
app.get('/api/menu', (req, res) => {
  const menu = getMenu();
  res.json(menu);
});

// 2. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 3. Admin login
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, message: 'Autenticado correctamente' });
});

// 4. Club Soul: registro de miembros
// shortcut: members.json (sin DB), migrar a SQLite si pasa de ~5.000 miembros
const MEMBERS_FILE = path.join(DATA_DIR, 'members.json');
const getMembers = () => {
  try { return JSON.parse(fs.readFileSync(MEMBERS_FILE, 'utf8')); } catch (e) { return []; }
};
const clean = (v, n) => String(v || '').trim().slice(0, n);

app.post('/api/club/join', (req, res) => {
  const b = req.body || {};
  const whatsapp = clean(b.whatsapp, 20).replace(/\D/g, '');
  const nick = clean(b.nick, 40);
  if (!nick || !/^(57)?3\d{9}$/.test(whatsapp) || b.consent !== true) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }
  const members = getMembers();
  if (members.length >= 20000) return res.status(503).json({ error: 'Club lleno' });
  const data = {
    nick,
    whatsapp: whatsapp.length === 10 ? '57' + whatsapp : whatsapp,
    birthday: /^\d{4}-\d{2}-\d{2}$/.test(b.birthday || '') ? b.birthday : '',
    profile: clean(b.profile, 20),
    consentAt: new Date().toISOString()
  };
  const i = members.findIndex(m => m.whatsapp === data.whatsapp);
  if (i >= 0) members[i] = { ...members[i], ...data, profile: data.profile || members[i].profile };
  else members.push({ ...data, joinedAt: data.consentAt });
  fs.writeFileSync(MEMBERS_FILE, JSON.stringify(members, null, 2), 'utf8');
  res.json({ success: true });
});

// ──────────────── PROTECTED ADMIN ENDPOINTS ────────────────
app.get('/api/admin/members', authMiddleware, (req, res) => res.json(getMembers()));

// Save entire menu
app.put('/api/admin/menu', authMiddleware, (req, res) => {
  const menu = req.body;
  if (!Array.isArray(menu)) {
    return res.status(400).json({ error: 'El formato del menú debe ser un arreglo' });
  }
  saveMenu(menu);
  res.json({ success: true, message: 'Menú actualizado con éxito' });
});

// Reset menu to defaults
app.post('/api/admin/menu/reset', authMiddleware, (req, res) => {
  const initialDataPath = path.join(__dirname, 'initial_menu.json');
  if (fs.existsSync(initialDataPath)) {
    fs.copyFileSync(initialDataPath, DATA_FILE);
    res.json({ success: true, message: 'Menú restaurado a valores por defecto' });
  } else {
    res.status(500).json({ error: 'Archivo inicial no encontrado' });
  }
});

// Fallback redirect / -> /admin
app.get('/', (req, res) => {
  res.redirect('/admin');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Soul Experience Backend escuchando en puerto ${PORT}`);
});
