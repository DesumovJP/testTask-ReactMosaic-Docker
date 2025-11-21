import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.use(express.static(join(__dirname, '..', 'dist')));
} else {
  app.use(cors({
    origin: 'http://localhost:5173',
  }));
}

app.use(express.json());

const companiesData = JSON.parse(
  readFileSync(join(__dirname, 'data', 'companies-lookup.json'), 'utf-8')
);

app.get('/api/companies', (req, res) => {
  res.json(companiesData);
});

app.get('/api/companies/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const company = companiesData.find(
    (c: { ticker: string }) => c.ticker === ticker
  );

  if (!company) {
    return res.status(404).json({ error: 'Company not found' });
  }

  res.json(company);
});

if (isProduction) {
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

