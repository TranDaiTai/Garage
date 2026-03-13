const swaggerJsDoc = require("swagger-jsdoc");

// Cấu hình tuỳ biến cho thông tin API
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API Documentation",
      version: "1.0.0",
      description: "Tài liệu API cho dự án E-Commerce",
      contact: {
        name: "Developer",
        email: "dev@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Đường dẫn đến các file chứa custom jsdoc comments
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
