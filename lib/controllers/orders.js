const { Router } = require('express');
const Order = require('../models/Order');

module.exports = Router()
  .post('/', async (req, res) => {
    const order = await Order.insert({
      product: req.body.product,
      quantity: req.body.quantity,
    });
    res.send(order);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const order = await Order.getById(id);
    res.send(order);
  })

  .get('/', async (req, res) => {
    const orders = await Order.getAll();
    res.send(orders);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { product, quantity } = req.body;

      const order = await Order.updateById(id, {
        updateProduct: product,
        updateQuantity: quantity,
      });

      res.send(order);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const order = await Order.deleteById(id);
    res.send(order);
  });
