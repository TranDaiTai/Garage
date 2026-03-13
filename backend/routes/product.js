const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const reviewController = require('../controllers/reviewController');
const { authMiddleware, adminMiddleware } = require('../middleware/middleware');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Quản lý danh sách và chi tiết Sản Phẩm
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Xem danh sách Sản phẩm (Hỗ trợ Phân trang, Tìm kiếm, Lọc)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số thứ tự trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Số lượng item mỗi trang
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên sản phẩm
 *       - in: query
 *         name: category
 *         schema:
 *           type: integer
 *         description: ID danh mục
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: integer
 *         description: Giá thấp nhất
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: integer
 *         description: Giá cao nhất
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, best-selling, price-low, price-high]
 *           default: newest
 *         description: Tiêu chí sắp xếp
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /api/products/slug/{slug}:
 *   get:
 *     summary: Xem chi tiết 1 sản phẩm theo Slug
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về thông tin chi tiết sản phẩm
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.get('/slug/:slug', productController.getProductBySlug);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Xem chi tiết 1 sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trả về thông tin chi tiết sản phẩm
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products/{productId}/reviews:
 *   get:
 *     summary: Lấy đánh giá của 1 sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách đánh giá
 */
router.get("/:productId/reviews", reviewController.getReviewsByProductId);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Tạo sản phẩm mới (Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               price:
 *                 type: number
 *               originalPrice:
 *                 type: number
 *               description:
 *                 type: string
 *               fullDescription:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post('/', authMiddleware, adminMiddleware, productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm (Admin)
 *     tags: [Products]
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
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/:id', authMiddleware, adminMiddleware, productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm (Admin)
 *     tags: [Products]
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
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;