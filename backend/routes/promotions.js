const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');
const { authMiddleware, adminMiddleware } = require('../middleware/middleware');

/**
 * @swagger
 * tags:
 *   name: Promotions
 *   description: Xử lý mã giảm giá
 */

/**
 * @swagger
 * /api/promotions:
 *   get:
 *     summary: Lấy danh sách mã giảm giá
 *     tags: [Promotions]
 *     responses:
 *       200:
 *         description: Trả về danh sách
 */
router.get('/', promotionController.getAllPromotions);

/**
 * @swagger
 * /api/promotions/check:
 *   post:
 *     summary: Kiểm tra mã giảm giá có hợp lệ không
 *     tags: [Promotions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trả về thông tin mã giảm giá
 */
router.post('/check', promotionController.checkPromotionCode); // Dùng cho check mã ở checkout

/**
 * @swagger
 * /api/promotions:
 *   post:
 *     summary: Tạo mã giảm giá (Admin)
 *     tags: [Promotions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code: 
 *                 type: string
 *               discountPercent:
 *                 type: number
 *               maxDiscountAmount:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Đã tạo mã giảm giá
 */
router.post('/', authMiddleware, adminMiddleware, promotionController.createPromotion); // Admin/Quản lý

/**
 * @swagger
 * /api/promotions/{id}:
 *   put:
 *     summary: Sửa mã giảm giá (Admin)
 *     tags: [Promotions]
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
 *               discountPercent:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/:id', authMiddleware, adminMiddleware, promotionController.updatePromotion); // Admin/Quản lý

/**
 * @swagger
 * /api/promotions/{id}:
 *   delete:
 *     summary: Xóa mã giảm giá (Admin)
 *     tags: [Promotions]
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
 *         description: Xóa thành công
 */
router.delete('/:id', authMiddleware, adminMiddleware, promotionController.deletePromotion); // Admin/Quản lý

module.exports = router;
