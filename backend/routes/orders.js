const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/middleware');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API Quản lý đơn hàng và Checkout
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Tạo đơn hàng mới (Checkout)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *               totalAmount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đặt hàng thành công
 */
router.post('/', authMiddleware, orderController.createOrder); // Đặt hàng (checkout)

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lấy danh sách đơn hàng của User
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về danh sách orders
 */
router.get('/', authMiddleware, orderController.getUserOrders); // Lịch sử đơn hàng

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Xem chi tiết đơn hàng
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trả về chi tiết đơn hàng
 */
router.get('/:id', authMiddleware, orderController.getOrderById); // Chi tiết đơn hàng

router.put('/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus); // Admin update

module.exports = router;
