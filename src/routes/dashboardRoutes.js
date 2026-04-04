const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboardController");
const { authorize } = require("../middleware/auth");

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get financial summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary data
 */
router.get("/summary", authorize(["ADMIN", "ANALYST", "VIEWER"]), controller.getSummary);

/**
 * @swagger
 * /dashboard/categories:
 *   get:
 *     summary: Get category-wise totals
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category breakdown data
 */
router.get("/categories", authorize(["ADMIN", "ANALYST"]), controller.getCategoryBreakdown);

/**
 * @swagger
 * /dashboard/recent:
 *   get:
 *     summary: Get recent records
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent activity
 */
router.get("/recent", authorize(["ADMIN", "ANALYST"]), controller.getRecent);

/**
 * @swagger
 * /dashboard/trends:
 *   get:
 *     summary: Get monthly trends
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trends data
 */
router.get(
  "/trends",
  authorize(["ADMIN", "ANALYST"]),
  controller.getTrends
);

module.exports = router;