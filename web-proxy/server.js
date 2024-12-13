const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the static HTML file
app.use(express.static(path.join(__dirname)));

// Proxy endpoint
app.use('/proxy', createProxyMiddleware({
  target: '', // Proxy target set dynamically
  changeOrigin: true,
  router: (req) => req.query.url, // Use the 'url' query parameter
  onError: (err, req, res) => {
    res.status(500).send(`Proxy Error: ${err.message}`);
  },
}));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
