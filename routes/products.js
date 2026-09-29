import { Router } from 'express';
import { products } from '../data/products.js';

const router = Router();

// Пути — ОТНОСИТЕЛЬНО точки подключения роутера:
//   '/'    -> /api/products
//   '/:id' -> /api/products/:id

// Список товаров, необязательный фильтр ?search=
router.get('/', (req, res) => {
  const search = (req.query.search || '').toLowerCase();

  // Пустая строка входит в любую строку, поэтому без search вернутся все товары
  const result = products.filter((p) => p.name.toLowerCase().includes(search));

  res.json(result);
});

// Один товар по id: /api/products/2
router.get('/:id', (req, res) => {
  const product = products.find((p) => String(p.id) === req.params.id);

  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  res.json(product);
});

export default router;
