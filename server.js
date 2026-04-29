// server.js — Main Entry Point
require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const path    = require('path');
const db      = require('./config/db');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// ── API Routes ────────────────────────────────────────
app.use('/api/users', require('./routes/users'));
app.use('/api',       require('./routes/meta'));

// ── SPA fallback ──────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Global error handler ──────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: err.message });
});

// ── Start ─────────────────────────────────────────────
async function start() {
  try {
    await db.initialize();
    app.listen(PORT, () => {
      console.log(`\n🚀 RLS Manager running at http://localhost:${PORT}`);
      console.log(`📊 Dashboard: http://localhost:${PORT}`);
      console.log(`🔌 API:       http://localhost:${PORT}/api/health\n`);
    });
  } catch (err) {
    console.error('❌ Failed to start:', err.message);
    process.exit(1);
  }
}

process.on('SIGINT',  async () => { await db.close(); process.exit(0); });
process.on('SIGTERM', async () => { await db.close(); process.exit(0); });

start();
