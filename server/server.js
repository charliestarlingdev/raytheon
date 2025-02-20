const express = require('express');
const axios = require('axios');
const cors = require('cors');
const https = require('https');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/fetch-products', async (req, res) => {
    const { accessToken } = req.body;

    if (!accessToken) {
        return res.status(400).json({ error: 'Access token is required' });
    }

    try {
        const response = await axios.post(
            'https://hallam.sci-toolset.com/discover/api/v1/products/search',
            { size: 150, keywords: '' },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false })
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
});

app.post('/fetch-product-info', async (req, res) => {
    const { accessToken, productIds } = req.body;

    if (!accessToken || !Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ error: "Invalid request parameters" });
    }

    try {
        const productRequests = productIds.map(productId =>
            axios.get(`https://hallam.sci-toolset.com/discover/api/v1/products/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false })
            }).then(response => ({
                productId,
                centre: response.data.product?.result?.centre || null,
                footprint: response.data.product?.result?.footprint || null
            })).catch(error => ({
                productId,
                error: error.response?.data || "Failed to fetch"
            }))
        );

        const results = await Promise.all(productRequests);
        res.json(results);

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch product info", details: error.message });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend API running on http://localhost:${PORT}`));
