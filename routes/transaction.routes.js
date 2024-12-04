const express = require("express");
const router = express.Router();
const transactionControllers = require("../controllers/transaction.controller");
const auth = require("../middleware/middleware");

/**
 * @swagger
 * /v1/transaction:
 *   post:
 *     tags:
 *       - Module Transaction
 *     summary: Transaction
 *     description: |
 *       **API Transaction Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk melakukan transaksi dari services / layanan yang tersedia
 *
 *       _Ketentuan:_
 *       1. Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
 *       2. Tidak ada parameter email di query param URL ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login.
 *       3. Setiap kali melakukan Transaksi harus dipastikan balance / saldo mencukupi
 *       4. Pada saat Transaction set transaction_type di database menjadi PAYMENT
 *       5. Handling Response sesuai dokumentasi Response dibawah
 *       6. Response invoice_number untuk formatnya generate bebas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_code:
 *                 type: string
 *                 example: PULSA
 *     responses:
 *       200:
 *         description: Transaksi Berhasil
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
 *                   example: Transaksi berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                      invoice_number:
 *                          type: string
 *                          example: INV17082023-001
 *                      service_code:
 *                          type: string
 *                          example: PLN_PRABAYAR
 *                      service_name:
 *                          type: string
 *                          example: PLN Prabayar
 *                      transaction_type:
 *                          type: string
 *                          example: PAYMENT
 *                      total_amount:
 *                          type: float
 *                          example: 10000
 *                      created_on:
 *                          type: date
 *                          example: 2023-08-17T10:10:10.000Z
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
router.post("/transaction", auth.auth, transactionControllers.transaction);

/**
 * @swagger
 * /v1/topup:
 *   post:
 *     tags:
 *       - Module Transaction
 *     summary: Topup
 *     description: |
 *       **API Topup Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk melakukan top up balance / saldo dari User
 *
 *       _Ketentuan:_
 *       1. Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
 *       2. Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
 *       3. Setiap kali melakukan Top Up maka balance / saldo dari User otomatis bertambah
 *       4. Parameter amount hanya boleh angka saja dan tidak boleh lebih kecil dari 0
 *       5. Pada saat Top Up set transaction_type di database menjadi TOPUP
 *       6. Handling Response sesuai dokumentasi Response dibawah
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               top_up_amount:
 *                 type: number
 *                 example: 10000
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
router.post("/topup", auth.auth, transactionControllers.topUp);

/**
 * @swagger
 * /v1/transaction/history:
 *   get:
 *     tags:
 *       - Module Transaction
 *     summary: Get paginated or all items
 *     description: |
 *       **API History Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk mendapatkan informasi history transaksi
 *
 *       _Ketentuan:_
 *       1. Service ini harus menggunakan Bearer Token JWT untuk mengaksesnya
 *       2. idak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
 *       3. Terdapat parameter limit yang bersifat opsional, jika limit tidak dikirim maka tampilkan semua data
 *       4. Data di order dari yang paling baru berdasarkan transaction date (created_on)
 *       5. Handling Response sesuai dokumentasi Response dibawah
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar item
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
 *                   example: Get History Berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     offset:
 *                       type: integer
 *                       example: 0
 *                     limit:
 *                       type: integer
 *                       example: 3
 *                     records:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           invoice_number:
 *                             type: string
 *                             example: INV17082023-001
 *                           transaction_type:
 *                             type: string
 *                             example: TOPUP
 *                           description:
 *                             type: string
 *                             example: Top Up balance
 *                           total_amount:
 *                             type: number
 *                             example: 100000
 *                           created_on:
 *                             type: string
 *                             format: date-time
 *                             example: 2023-08-17T10:10:10.000Z
 *             examples:
 *               success:
 *                 value:
 *                   status: 0
 *                   message: Get History Berhasil
 *                   data:
 *                     offset: 0
 *                     limit: 3
 *                     records:
 *                       - invoice_number: "INV17082023-001"
 *                         transaction_type: "TOPUP"
 *                         description: "Top Up balance"
 *                         total_amount: 100000
 *                         created_on: "2023-08-17T10:10:10.000Z"
 *                       - invoice_number: "INV17082023-002"
 *                         transaction_type: "PAYMENT"
 *                         description: "PLN Pascabayar"
 *                         total_amount: 10000
 *                         created_on: "2023-08-17T11:10:10.000Z"
 *                       - invoice_number: "INV17082023-003"
 *                         transaction_type: "PAYMENT"
 *                         description: "Pulsa Indosat"
 *                         total_amount: 40000
 *                         created_on: "2023-08-17T12:10:10.000Z"
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
 *             examples:
 *               unauthorized:
 *                 value:
 *                   status: 401
 *                   message: Unauthorized access. Token tidak valid atau kadaluwarsa.
 *                   data: null
 */
router.get(
  "/transaction/history",
  auth.auth,
  transactionControllers.getTransactions
);

module.exports = router;
