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
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     variantId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *                     subtotal:
 *                       type: number
 *               totalAmount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *               shippingMethodId:
 *                 type: integer
 *               shippingFee:
 *                 type: number
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

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Cập nhật trạng thái đơn (Admin/Staff)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Trạng thái mới (pending, processing, shipped, delivered, cancelled)
 *     responses:
 *       200:
 *         description: Trả về trạng thái đã cập nhật
 */
router.put('/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus); // Admin update

module.exports = router;
