const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'SmartRestaurant Backend API', timestamp: new Date() });
});

// RESTful Route Placeholders (Mapped from Section 8 API Contracts)
// app.use('/api/v1/auth', require('./routes/auth.routes'));
// app.use('/api/v1/tables', require('./routes/table.routes'));
// app.use('/api/v1/reservations', require('./routes/reservation.routes'));
// app.use('/api/v1/orders', require('./routes/order.routes'));
// app.use('/api/v1/invoices', require('./routes/invoice.routes'));
// app.use('/api/v1/menu', require('./routes/menu.routes'));
// app.use('/api/v1/dashboard', require('./routes/dashboard.routes'));
// app.use('/api/v1/audit', require('./routes/audit.routes'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

module.exports = app;
