const express = require('express');
const productService = require('../services/productService');
const router = express.Router();

router.get('/all', productService.getAll);
router.get('/:id', productService.getOne);
router.get('/search', productService.search);
router.post('/add', productService.add);
router.put('/:id/update', productService.update);


module.exports = router;