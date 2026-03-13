const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/middleware')
const cartController = require('../controllers/cartController')

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Xử lý giỏ hàng của User
 */

/**
 * @swagger
 * /api/carts/add:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     tags: [Cart]
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
 *               variantId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       200:
 *         description: Đã thêm vào giỏ hàng
 */
router.post("/add", authMiddleware.authMiddleware, cartController.addToCart);

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Lấy giỏ hàng của người dùng hiện tại
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về chi tiết giỏ hàng
 */
router.get("/", authMiddleware.authMiddleware, cartController.getCart);

/**
 * @swagger
 * /api/carts/remove:
 *   post:
 *     summary: Xóa một sản phẩm khỏi giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartItemId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               variantId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Đã xóa khỏi giỏ
 */
router.post("/remove", authMiddleware.authMiddleware,cartController.removeFromCart);

/**
 * @swagger
 * /api/carts/update:
 *   post:
 *     summary: Cập nhật số lượng sản phẩm trong giỏ
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartItemId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               variantId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Đã cập nhật
 */
router.post("/update", authMiddleware.authMiddleware, cartController.updateCartItem);

/**
 * @swagger
 * /api/carts/clearcart:
 *   post:
 *     summary: Xóa toàn bộ giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Giỏ hàng đã được làm sạch
 */
router.post('/clearcart', authMiddleware.authMiddleware,cartController.clearCart);

module.exports = router;
