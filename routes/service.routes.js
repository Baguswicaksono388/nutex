const express = require("express");
const router = express.Router();
const serviceControllers = require("../controllers/service.controller");
const auth = require("../middleware/middleware");

/**
 * @swagger
 * /v1/services:
 *   get:
 *     tags:
 *       - Module Services
 *     summary: Get list of services
 *     description: |
 *       **API Get Services**
 *
 *       Digunakan untuk mendapatkan daftar layanan yang tersedia beserta tarifnya.
 *       API ini memerlukan **Bearer Token JWT** untuk akses.
 *     security:
 *       - bearerAuth: []  # Menambahkan autentikasi Bearer Token
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar layanan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Sukses
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       service_code:
 *                         type: string
 *                         example: PAJAK
 *                       service_name:
 *                         type: string
 *                         example: Pajak PBB
 *                       service_icon:
 *                         type: string
 *                         example: https://nutech-integrasi.app/dummy.jpg
 *                       service_tariff:
 *                         type: number
 *                         example: 40000
 *             examples:
 *               success:
 *                 value:
 *                   status: 0
 *                   message: Sukses
 *                   data:
 *                     - service_code: PAJAK
 *                       service_name: Pajak PBB
 *                       service_icon: https://nutech-integrasi.app/dummy.jpg
 *                       service_tariff: 40000
 *                     - service_code: PLN
 *                       service_name: Listrik
 *                       service_icon: https://nutech-integrasi.app/dummy.jpg
 *                       service_tariff: 10000
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Unauthorized access. Token tidak valid atau kadaluwarsa.
 *                 data:
 *                   type: null
 *                   example: null
 *             examples:
 *               unauthorized:
 *                 value:
 *                   status: 401
 *                   message: Unauthorized access. Token tidak valid atau kadaluwarsa.
 *                   data: null
 */
router.get("/services", auth.auth, serviceControllers.getService);

module.exports = router;
