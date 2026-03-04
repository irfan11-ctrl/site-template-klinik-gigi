/**
 * Ultimate Web Engine v4.0 - Server Template
 * Standard Express.js backend for modular generated sites.
 */

export const SERVER_TEMPLATE = `
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received Contact Form:', { name, email, message });
    
    // Simulate DB Save or Email Send
    res.status(200).json({ 
        success: true, 
        message: 'Message received! Our team will reach out soon.' 
    });
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'Engine v4.0 Online' });
});

// Serve Frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(\`Server is running on http://localhost:\${PORT}\`);
});
`;
