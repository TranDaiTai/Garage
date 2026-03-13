const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Đảm bảo thư mục uploads tồn tại
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình lưu trữ file của Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Thư mục lưu file
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Đặt tên file: timestamp + chuỗi ngẫu nhiên + đuôi file gốc
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Kiểm tra định dạng file (Chỉ cho phép ảnh)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ hỗ trợ định dạng hình ảnh!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Giới hạn 5MB
  }
});

/**
 * Controller xử lý upload 1 ảnh
 */
exports.uploadSingleImage = (req, res) => {
  // Multer sẽ đính kèm file vào req.file
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Vui lòng chọn 1 tấm ảnh để upload' });
  }

  // Tạo URL Public để client gọi đến
  // Giao thức (http/https) + host (localhost:5000) + /uploads/ + tên file
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  res.status(200).json({
    success: true,
    message: 'Upload ảnh thành công!',
    data: {
      imageUrl: fileUrl,
      fileName: req.file.filename,
      size: req.file.size
    }
  });
};

exports.uploadMiddleware = upload.single('image'); // 'image' là tên của field trong form-data khi gửi lên
