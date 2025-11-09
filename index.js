const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

// Your original server IP (hidden)
const ORIGINAL_SERVER = 'http://159.69.3.189';

// Middleware to handle all requests
app.use('*', (req, res) => {
    const targetUrl = ORIGINAL_SERVER + req.originalUrl;
    
    console.log('Proxying request to:', targetUrl);
    
    // Forward request and pipe response
    req.pipe(request(targetUrl)).pipe(res);
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Proxy Server Error');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Proxy server running on port ${PORT}`);
    console.log(`📡 Forwarding to: ${ORIGINAL_SERVER}`);
});
