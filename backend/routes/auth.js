const express = require("express");

const router = express.Router();
const authController = require('../controllers/authController')
const {authMiddleware} = require('../middleware/middleware')

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Các API quản lý xác thực người dùng
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập hệ thống
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công, trả về token qua Cookie
 *       401:
 *         description: Sai tài khoản / mật khẩu
 */
router.post("/login",authController.login) ;

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Lấy lại access token mới
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Thành công
 *       401:
 *         description: Không tìm thấy refresh token
 */
router.post("/refresh",authController.refreshToken) 

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Đăng xuất người dùng
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Đăng xuất thành công, xóa cookies
 */
router.post("/logout",authMiddleware,authController.logout) 

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Kiểm tra auth token hiện hành
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 */
router.get('/verify',authController.verify)

module.exports = router;
