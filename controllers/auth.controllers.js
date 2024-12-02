'use strict';
const secret = require('../config/secret');
const db = require('../models'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signUp = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  try {
    const existingUser = await db.rawQuery(
      'SELECT * FROM users WHERE email = :email',
      {email},
      db.Sequelize.QueryTypes.SELECT
    )

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: 'Email already exists'
      })
    }

    const hasdPassword = await bcrypt.hash(password, 10);
    
    const result = await db.rawQuery(
      'INSERT INTO users (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)',
      {first_name, last_name, email, password: hasdPassword},
      db.Sequelize.QueryTypes.INSERT
    )

    return res.json({
      status: 0,
      message: 'Registrasi berhasil silahkan login',
      data: null
    })

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message
    })
  }
}

exports.login = async (req, res) => {
  const { email } = req.body;
  try {
    var isValidPassword = function (userpass, password) {
      return bcrypt.compareSync(password, userpass);
    };

    await db.rawQuery(
      'SELECT * FROM users WHERE email = :email',
      {email}
    ).then((data) => {
      if (data.length === 0) {
        return res.status(401).json({
          status: 103,
          message: 'Username atau password salah',
          data: null
        })
      }

      if (!isValidPassword(data[0].password, req.body.password)) {
        return res.status(401).json({
          status: 103,
          message: 'Username atau password salah',
          data: null
        })
      } else {
        var token = jwt.sign(
          { id: data[0].id, email: data[0].email },
          secret.secret,
          {
            algorithm: 'HS256',
            expiresIn: 60 * 60 * 12,
          }
        )

        return res.status(200).json({
          status: 0,
          message: 'Login Sukses',
          data: {
            token: token
          }
        })
      }
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}
