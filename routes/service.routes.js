const express = require('express');
const router = express.Router();
const serviceControllers = require('../controllers/service.controller');
const auth = require('../middleware/middleware')

/**
 * @swagger
 * /v1/services:
 *   get:
 *     tags: 
 *       - 2. Module Information
 *     summary: Services
 *     description: |
 *       **API Balance Private (memerlukan Token untuk mengaksesnya)**  
 * 
 *       Digunakan untuk mendapatkan informasi balance / saldo terakhir dari User.  
 * 
 *       _Ketentuan:_  
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya.  
 *       2. Tidak ada parameter email di query param URL ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login.  
 *       3. Handling Response sesuai dokumentasi Response di bawah.  
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan balance
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
 *                   example: Get Balance Berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: number
 *                       example: 1000000
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 100
 *                 message:
 *                   type: string
 *                   example: Token tidak valid atau kadaluwarsa
 *                 data:
 *                   type: string
 *                   example: null
 */
router.get('/services', auth.auth, serviceControllers.getService);

module.exports = router;