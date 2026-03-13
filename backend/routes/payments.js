const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Xử lý trạng thái thanh toán của hệ thống
 */

/**
 * @swagger
 * /api/payments/order/{orderId}:
 *   get:
 *     summary: Lấy thông tin thanh toán theo mã đơn hàng
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 */
// Quản lý thanh toán theo Order ID
router.get('/order/:orderId', paymentController.getPaymentByOrderId);

/**
 * @swagger
 * /api/payments/order/{orderId}/status:
 *   put:
 *     summary: Cập nhật trạng thái thanh toán (Thường dùng cho Webhook)
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: orderId
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
 *                 example: completed
 *     responses:
 *       200:
 *         description: Trả về trạng thái đã update
 */
// Route này thường dành cho callback webhook của cổng thanh toán
router.put('/order/:orderId/status', paymentController.updatePaymentStatus);

module.exports = router;
