import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Load environment variables
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const app = express();
const prisma = new PrismaClient({ adapter, log: ['error', 'warn'] });
const PORT = process.env.PORT || 5000;

// Middleware (Security, CORS, Parsing, Logging)
app.use(helmet()); 
app.use(cors()); 
app.use(express.json()); 
app.use(morgan('dev')); 

// Base Routes
app.get('/api/health', async (req, res) => {
  try {
    // Quick DB ping to ensure connection is alive
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'success', message: 'MovieVerse API and Database are running securely.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed.' });
  }
});

// ==========================================
// 🧑‍💻 USER ROUTES
// ==========================================

// Daftar atau Dapatkan Pengguna
app.post('/api/users', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ status: 'error', message: 'Sila masukkan e-mel.' });
  }

  try {
    // Cari pengguna dalam database. Jika tiada, cipta pengguna baharu.
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email } });
    }
    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});


// ==========================================
// 🎬 WATCHLIST ROUTES
// ==========================================

// 1. Dapatkan senarai Watchlist pengguna
app.get('/api/watchlist/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const watchlist = await prisma.watchlist.findMany({
      where: { user_id },
      orderBy: { added_at: 'desc' } // Filem terbaru di atas
    });
    res.status(200).json({ status: 'success', data: watchlist });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// 2. Tambah filem ke dalam Watchlist
app.post('/api/watchlist', async (req, res) => {
  const { user_id, movie_id, title, poster_path } = req.body;

  if (!user_id || !movie_id || !title) {
    return res.status(400).json({ status: 'error', message: 'Maklumat tidak lengkap.' });
  }

  try {
    const watchlistItem = await prisma.watchlist.create({
      data: {
        user_id,
        movie_id,
        title,
        poster_path
      }
    });
    res.status(201).json({ status: 'success', data: watchlistItem });
  } catch (error) {
    // Kod P2002 dari Prisma bermaksud 'Unique constraint failed' (Filem dah ada)
    if (error.code === 'P2002') {
      return res.status(400).json({ status: 'error', message: 'Filem ini sudah ada di dalam Watchlist anda.' });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// 3. Buang filem dari Watchlist
app.delete('/api/watchlist/:user_id/:movie_id', async (req, res) => {
  const { user_id, movie_id } = req.params;

  try {
    await prisma.watchlist.deleteMany({
      where: {
        user_id,
        movie_id: parseInt(movie_id)
      }
    });
    res.status(200).json({ status: 'success', message: 'Filem berjaya dibuang dari Watchlist.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running securely on http://localhost:${PORT}`);
});