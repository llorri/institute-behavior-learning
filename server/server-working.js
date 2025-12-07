const express = require('express');
const app = express();

// ABSOLUTELY MINIMAL - guaranteed to work
app.get('/', (req, res) => {
  res.send('🏥 INSTITUTE FOR BEHAVIOR AND LEARNING - SUCCESSFULLY DEPLOYED! 🚀');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'WORKING!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Working on port ${PORT}`));
