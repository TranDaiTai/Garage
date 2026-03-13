const express = require("express");
const router = express.Router();
const shippingController = require('../controllers/shippingController');

/**
 * @swagger
 * tags:
 *   name: Shipping
 *   description: API Quản lý phương thức vận chuyển
 */

/**
 * @swagger
 * /api/shipping-methods:
 *   get:
 *     summary: Lấy danh sách các phương thức vận chuyển
 *     tags: [Shipping]
 *     responses:
 *       200:
 *         description: Trả về danh sách phí giao hàng
 */
router.get('/', shippingController.getShippingMethods);

module.exports = router;
