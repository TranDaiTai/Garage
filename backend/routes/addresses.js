const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const { authMiddleware } = require('../middleware/middleware');

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: Token required. API Sổ địa chỉ
 */

/**
 * @swagger
 * /api/addresses:
 *   get:
 *     summary: Lấy danh sách địa chỉ của user (cần token)
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/', authMiddleware, addressController.getUserAddresses);
router.post('/', authMiddleware, addressController.createAddress);
router.put('/:id', authMiddleware, addressController.updateAddress);
router.delete('/:id', authMiddleware, addressController.deleteAddress);

module.exports = router;
