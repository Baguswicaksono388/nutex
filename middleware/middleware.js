"use strict";
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

exports.auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        status: 100,
        messsage: "Token tidak valid atau kadaluwarsa",
        data: null
      });
    } else {
      const token = authorization.replace("Bearer ", "");
      await jwt.verify(token, secret.secret, async (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 100,
            messsage: "Token tidak valid atau kadaluwarsa",
            data: null
          });
        }
        const { id, email } = decoded;
        req.userId = id;
        req.email = email;

        next();
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};