const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/middleware');
const wishlistController = require('../controllers/wishlistController');

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: API Quản lý danh sách sản phẩm yêu thích
 */

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Lấy danh sách sản phẩm yêu thích của người dùng hiện tại
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về danh sách yêu thích
 */
router.get('/', authMiddleware.authMiddleware, wishlistController.getWishlist);

/**
 * @swagger
 * /api/wishlist/add:
 *   post:
 *     summary: Thêm một sản phẩm vào danh sách yêu thích
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: ID của sản phẩm
 *     responses:
 *       200:
 *         description: Đã thêm thành công
 */
router.post('/add', authMiddleware.authMiddleware, wishlistController.addToWishlist);

/**
 * @swagger
 * /api/wishlist/remove:
 *   post:
 *     summary: Xóa một sản phẩm khỏi danh sách yêu thích
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Đã xóa thành công
 */
router.post('/remove', authMiddleware.authMiddleware, wishlistController.removeFromWishlist);

/**
 * @swagger
 * /api/wishlist/clear:
 *   post:
 *     summary: Xóa toàn bộ danh sách yêu thích
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.post('/clear', authMiddleware.authMiddleware, wishlistController.clearWishlist);

module.exports = router;
