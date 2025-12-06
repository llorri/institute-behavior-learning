const express = require('express');
const app = express();

// Simple health check - no dependencies
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Institute for Behavior and Learning is live!',
    timestamp: new Date().toISOString()
  });
});

// Simple home route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Institute for Behavior and Learning</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        h1 { color: #2563eb; }
      </style>
    </head>
    <body>
      <h1>🏥 Institute for Behavior and Learning</h1>
      <h2>✅ Successfully Deployed!</h2>
      <p>Your website is now live on the internet!</p>
      <p>API Status: <a href="/api/health">Check Health</a></p>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Website: https://institute-behavior-learning.vercel.app`);
});
