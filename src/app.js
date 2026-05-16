const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');

const { port, frontendUrl } = require('./config/env');
const { initDB } = require('./config/database');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

const app = express();

// Security Middlewares
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}));

app.use(cors({
    origin: true,
    credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 500 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

// Parsing Middlewares
app.use(express.json({ limit: '20mb' })); // Body parser
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser());

// Logging Middleware
app.use(morgan('dev'));

// Static Files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Health check (for Render)
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// API Routes
app.use('/api', routes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Initialize DB and Start Server
initDB().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Secure API Server running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to initialize database', err);
    process.exit(1);
});

module.exports = app;
