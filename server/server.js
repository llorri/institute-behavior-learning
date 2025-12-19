const express = require('express');

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const allowedOrigins = FRONTEND_URL.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;
  const allowAll = allowedOrigins.includes('*');
  const allowOrigin = allowAll
    ? '*'
    : requestOrigin && allowedOrigins.includes(requestOrigin)
      ? requestOrigin
      : allowedOrigins[0];

  res.header('Access-Control-Allow-Origin', allowOrigin);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Institute for Behavior and Learning API is running!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/services', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'CALM Crisis Management',
      description: 'Comprehensive crisis management curriculum for families'
    },
    {
      id: 2,
      title: 'Parent & Caregiver Support',
      description: 'IEP/IPP education and advocacy support'
    },
    {
      id: 3,
      title: 'Behavior & Adaptive Skills Training',
      description: 'Evidence-based behavioral interventions'
    },
    {
      id: 4,
      title: 'Independent Living Skills',
      description: 'Life skills training for teens and adults'
    }
  ]);
});

app.get('/', (req, res) => {
  res.send('🏥 Institute for Behavior and Learning backend is live!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const handler = (req, res) => app(req, res);

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
module.exports.handler = handler;
module.exports.app = app;
