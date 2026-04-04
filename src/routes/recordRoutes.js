const express = require("express");
const router = express.Router();
const controller = require("../controllers/recordController");
const { authenticate, authorize } = require("../middleware/auth");
/**
 * @swagger
 * /records:
 *   post:
 *     summary: Create financial record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Record created
 */
router.post("/", authenticate, authorize(["ADMIN"]), controller.createRecord);

/**
 * @swagger
 * /records:
 *   get:
 *     summary: Get all records
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of records
 */
router.get("/", authenticate, authorize(["ADMIN", "ANALYST"]), controller.getRecords);

/**
 * @swagger
 * /records/{id}:
 *   patch:
 *     summary: Update a financial record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record updated
 */
router.patch("/:id", authenticate, authorize(["ADMIN"]), controller.updateRecord);

/**
 * @swagger
 * /records/{id}:
 *   delete:
 *     summary: Delete a financial record (soft delete)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record deleted
 */
router.delete("/:id", authenticate, authorize(["ADMIN"]), controller.deleteRecord);

module.exports = router;