const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authMiddleware, adminMiddleware } = require('../middleware/middleware');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Quản lý danh mục sản phẩm
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lấy danh sách danh mục
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Lấy danh mục bằng ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/:id', categoryController.getCategoryById);
router.post('/', authMiddleware, adminMiddleware, categoryController.createCategory);
router.put('/:id', authMiddleware, adminMiddleware, categoryController.updateCategory);
router.delete('/:id', authMiddleware, adminMiddleware, categoryController.deleteCategory);

module.exports = router;
