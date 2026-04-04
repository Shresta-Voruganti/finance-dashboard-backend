const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://finance-dashboard-backend-lc8v.onrender.com"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: [path.join(__dirname, "routes/*.js")] // 🔥 FIX
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;