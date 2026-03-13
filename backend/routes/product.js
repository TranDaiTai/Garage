// src/routes/products.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const reviewController = require('../controllers/reviewController')

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Xem danh sách và chi tiết Sản Phẩm
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
 *         description: Số lượng item cần lấy mỗi trang
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
 *         description: Lọc giá nhỏ nhất
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: integer
 *         description: Lọc giá lớn nhất
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, best-selling, price-low, price-high]
 *           default: newest
 *         description: Tiêu chí sắp xếp
 *     responses:
 *       200:
 *         description: Trả về danh sách cùng meta-data phân trang
 */
router.get('/', productController.getAllProducts);

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
 *         description: Trả về đầy đủ thông tin sản phẩm và reviews
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
 *         description: Trả về danh sách đánh giá
 */
router.get("/:productId/reviews", reviewController.getReviewsByProductId)  

module.exports = router;