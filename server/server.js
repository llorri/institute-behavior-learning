const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined'));

// Simple routes for deployment
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Institute for Behavior and Learning API is running!'
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

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error
