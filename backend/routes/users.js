const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID độc nhất của User
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         fullName:
 *           type: string
 *         phone:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API Quản lý tài khoản người dùng
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Trả về danh sách tất cả các người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
// GET tất cả users
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Lấy thông tin user bằng ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thông tin user chi tiết
 *       404:
 *         description: Không tìm thấy
 */
// GET user theo id
router.get('/:id', authMiddleware, userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Tạo người dùng mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Thành công
 */
// POST tạo user mới 
router.post('/', userController.createUser); // Public để đăng ký

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Cập nhật thông tin cơ bản người dùng
 *     tags: [Users]
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
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
// PUT cập nhật user
router.put('/:id', authMiddleware, userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Xóa người dùng bằng ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Đã xóa user
 */
// DELETE user
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;