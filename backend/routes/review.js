const express = require("express");
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/middleware');

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API Quản lý đánh giá sản phẩm
 */

/**
 * @swagger
 * /api/reviews/product/{productId}:
 *   get:
 *     summary: Lấy danh sách đánh giá của một sản phẩm
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của sản phẩm
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Trang hiện tại
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 8
 *         description: Số lượng đánh giá mỗi trang
 *       - in: query
 *         name: rating
 *         schema:
 *           type: integer
 *           enum: [1, 2, 3, 4, 5]
 *         description: Lọc theo số sao
 *       - in: query
 *         name: hasMedia
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Chỉ lấy các đánh giá có hình ảnh
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [rating-asc, rating-desc, likes-desc]
 *         description: Sắp xếp theo tiêu chí
 *     responses:
 *       200:
 *         description: Thành công, trả về danh sách đánh giá và thống kê (stats)
 */
router.get("/product/:productId", reviewController.getReviewsByProductId);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Gửi đánh giá cho một sản phẩm
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, rating]
 *             properties:
 *               productId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Danh sách URL hình ảnh đã upload
 *     responses:
 *       201:
 *         description: Đánh giá thành công
 */
router.post("/", authMiddleware, reviewController.createReview);

module.exports = router;