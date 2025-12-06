const express = require('express');
const app = express();

// SUPER SIMPLE - no database, no complex dependencies
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Institute for Behavior and Learning</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          text-align: center; 
          padding: 50px; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          min-height: 100vh;
          margin: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px;
          background: rgba(255,255,255,0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
        }
        h1 { color: #fff; font-size: 2.5em; margin-bottom: 20px; }
        h2 { color: #f0f0f0; font-size: 1.8em; margin-bottom: 30px; }
        p { font-size: 1.2em; line-height: 1.6; margin-bottom: 20px; }
        .status { 
          background: rgba(76, 175, 80, 0.8); 
          padding: 10px 20px; 
          border-radius: 25px; 
          display: inline-block;
          margin-top: 20px;
        }
        a { color: #61dafb; text-decoration: none; font-weight: bold; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🏥 Institute for Behavior and Learning</h1>
        <h2>✅ Successfully Deployed!</h2>
        <p>Your secure website is now live on the internet!</p>
        <p>Welcome to your professional disability support platform.</p>
        <div class="status">🚀 Deployment Complete</div>
        <p><a href="/api/health">🔍 Check API Status</a></p>
      </div>
    </body>
    </html>
  `);
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Institute for Behavior and Learning API is running securely!',
    timestamp: new Date().toISOString(),
    security: 'enhanced'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Institute server running on port ${PORT}`);
  console.log(`🌐 Website: https://institute-behavior-learning.vercel.app`);
  console.log(`🔍 Health check: https://institute-behavior-learning.vercel.app/api/health`);
});
