const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Use secure environment variables
const JWT_SECRET = process.env.JWT_SECRET_NEW || process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI_NEW || process.env.MONGODB_URI;
const FRONTEND_URL = process.env.FRONTEND_URL_SECURE || process.env.FRONTEND_URL;

console.log('🔒 Using secure environment variables');
console.log('🌐 Frontend URL:', FRONTEND_URL);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes with secure variables
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Institute for Behavior and Learning API is running securely!',
    timestamp: new Date().toISOString(),
    security: 'enhanced'
  });
});

app.get('/api/services', (req, res) => {
  res.json([
    {
      id: 1,
      title: "CALM Crisis Management",
      description: "Comprehensive crisis management curriculum for families"
    },
    {
      id: 2,
      title: "Parent & Caregiver Support", 
      description: "IEP/IPP education and advocacy support"
    },
    {
      id: 3,
      title: "Behavior & Adaptive Skills Training",
      description: "Evidence-based behavioral interventions"
    },
    {
      id: 4,
      title: "Independent Living Skills",
      description: "Life skills training for teens and adults"
    }
  ]);
});

// Database connection with new secure URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected with secure credentials'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔒 Secure Institute server running on port ${PORT}`);
  console.log(`🌐 Website: ${FRONTEND_URL}`);
  console.log(`🔍 Health check: ${FRONTEND_URL}/api/health`);
});
