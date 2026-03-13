const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');
const { authMiddleware, adminMiddleware } = require('../middleware/middleware');

router.get('/', promotionController.getAllPromotions);
router.post('/check', promotionController.checkPromotionCode); // Dùng cho check mã ở checkout
router.post('/', authMiddleware, adminMiddleware, promotionController.createPromotion); // Admin/Quản lý
router.put('/:id', authMiddleware, adminMiddleware, promotionController.updatePromotion); // Admin/Quản lý
router.delete('/:id', authMiddleware, adminMiddleware, promotionController.deletePromotion); // Admin/Quản lý

module.exports = router;
