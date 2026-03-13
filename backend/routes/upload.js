const express = require('express');
const router = express.Router();
const { uploadSingleImage, uploadMiddleware } = require('../controllers/uploadController');
const { authMiddleware, adminMiddleware } = require('../middleware/middleware');

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: API Xử lý Upload File
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload 1 File Hình Ảnh
 *     description: Tải lên hình ảnh sản phẩm/avatar. Server sẽ lưu vào thư mục `uploads/` và trả về public link URL hợp lệ. Lấy URL này dán vào body JSON khi tạo Sản phẩm.
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [image]
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Hình ảnh cần tải lên (Chỉ nhận .jpg, .png, .jpeg...)
 *     responses:
 *       200:
 *         description: Trả về URL của tấm ảnh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Upload ảnh thành công!
 *                 data:
 *                   type: object
 *                   properties:
 *                     imageUrl:
 *                       type: string
 *                       example: http://localhost:5000/uploads/image-1698765432-123.jpg
 *       400:
 *         description: Không có file hoặc sai định dạng
 */

// Cho phép tất cả User đã Đăng Nhập được phép upload ảnh (Có thể đổi thành Admin tùy nghiệp vụ)
router.post('/', authMiddleware, uploadMiddleware, uploadSingleImage);

module.exports = router;
