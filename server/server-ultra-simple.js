const express = require('express');
const app = express();

// ULTRA SIMPLE - no dependencies, no database, just works
app.get('/', (req, res) => {
  res.send('🏥 Institute for Behavior and Learning - Successfully Deployed! 🚀');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Ultra-simple server is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Ultra-simple server running on port ${PORT}`);
});
