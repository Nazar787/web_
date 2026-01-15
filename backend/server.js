const express = require('express');
const cors = require('cors');
const fs = require('fs').promises; 

const app = express();
const PORT = 3000;
const REACT_ORIGIN = 'http://localhost:5173';

async function loadProducts() {
    try {
        const rawData = await fs.readFile('./db.json', 'utf8');
        const data = JSON.parse(rawData);
        return data.products || [];
    } catch (err) {
        console.error('Помилка при читанні db.json:', err.message);
        throw err; 
    }
}

async function main() {
    const products = await loadProducts();
    console.log(`Завантажено ${products.length} товарів з db.json`);

    app.use(cors({
        origin: REACT_ORIGIN,
        methods: ['GET'],
        credentials: true
    }));

    app.get('/products/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: 'Невірний id' });

        const product = products.find(p => p.id === id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json(product);
    });

    app.get('/products', (req, res) => {
        const filters = req.query;

        if (!filters || Object.keys(filters).length === 0) {
            return res.json(products);
        }

        const filteredProducts = products.filter(product => {
            for (const key in filters) {
                const filterValue = filters[key];
                if (filterValue === undefined || filterValue === null || filterValue === '') continue;

                if (key === 'q') {
                    const term = String(filterValue).toLowerCase();
                    const title = String(product.title).toLowerCase();
                    const brand = String(product.brand).toLowerCase();
                    if (!title.includes(term) && !brand.includes(term)) return false;
                    continue;
                }

                if (String(product[key]) !== String(filterValue)) return false;
            }
            return true;
        });

        res.json(filteredProducts);
    });

    app.listen(PORT, () => {
        console.log(`СЕРВЕР ПРАЦЮЄ на порту ${PORT}`);
    });
}

main().catch(err => {
    console.error('Критична помилка при старті сервера:', err.message);
    process.exit(1);
});
