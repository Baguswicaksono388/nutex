const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth.controllers');
const { singUp, login, validateResults } = require('../validators/auth.validators');

/**
 * @swagger
 * /v1/user/singup:
 *   post:
 *     tags: 
 *      - 1. Module Membership
 *     summary: Registrasi
 *     description: |
 *      **API Registration Public (Tidak perlu Token untuk mengaksesnya)**
 * 
 *      Digunakan untuk melakukan registrasi User agar bisa Login kedalam aplikasi
 * 
 *      _Ketentuan :_
 *      1. Parameter request **email** harus terdapat validasi format email
 *      2. Parameter request **password** Length minimal 8 karakter
 *      3. Handling Response sesuai dokumentasi Response dibawah
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@nutech-integrasi.com
 *               first_name:
 *                 type: string
 *                 example: User
 *               last_name:
 *                 type: string
 *                 example: Nutech
 *               password:
 *                  type: string
 *                  example: abcdef1234
 *     responses:
 *       200:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status:
 *                      type: number
 *                      example: 0                  
 *                  message:
 *                      type: string
 *                      example: Registrasi berhasil silahkan login
 *                  data:
 *                      type: string
 *                      example: null
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status:
 *                      type: number
 *                      example: 102
 *                  message:
 *                      type: string
 *                      example: Paramter email tidak sesuai format
 *                  data:
 *                      type: string
 *                      example: null
 */
router.post('/singup', singUp, validateResults, authControllers.signUp);


/**
 * @swagger
 * /v1/user/login:
 *   post:
 *     tags: 
 *      - 1. Module Membership
 *     summary: Login
 *     description: |
 *      **API Login Public (Tidak perlu Token untuk mengaksesnya)**
 * 
 *      Digunakan untuk melakukan login dan mendapatkan authentication berupa JWT (Json Web Token)
 * 
 *      _Ketentuan :_
 *      1. Parameter request **email** harus terdapat validasi format email
 *      2. Parameter request **password** Length minimal 8 karakter
 *      3. **JWT** yang digenerate harus memuat payload **email** dan di set **expiration** selama 12 jam dari waktu di generate
 *      4. Handling Response sesuai dokumentasi Response dibawah
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@nutech-integrasi.com
 *               password:
 *                  type: string
 *                  example: abcdef1234
 *     responses:
 *       200:
 *         description: Berhasil Login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status:
 *                      type: number
 *                      example: 0                  
 *                  message:
 *                      type: string
 *                      example: Login Sukses
 *                  data:
 *                      type: object
 *                      properties:
 *                          token:
 *                              type: string
 *                              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyQG51dGVjaC1pbnRlZ3Jhc2kuY29tIiwiaWF0IjoxNzMzMDUyNDUwLCJleHAiOjE3MzMwOTU2NTB9.I7kOQoQ4DCRW2XqC-ajrs94UKEnpUDoDEVPCtKbWY28
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status:
 *                      type: number
 *                      example: 102
 *                  message:
 *                      type: string
 *                      example: Paramter email tidak sesuai format
 *                  data:
 *                      type: string
 *                      example: null
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status:
 *                      type: number
 *                      example: 103
 *                  message:
 *                      type: string
 *                      example: Username atau password salah
 *                  data:
 *                      type: string
 *                      example: null
 */
router.post('/login', login, validateResults, authControllers.login);

module.exports = router;