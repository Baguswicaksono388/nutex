"use strict";

const db = require("../models");

exports.getBalance = async (req, res) => {
  try {
    var [getBalance] = await db.core.query(
      "SELECT * FROM saldo_balance WHERE user_id = :user_id",
      {
        replacements: { user_id: req.userId },
        type: db.Sequelize.QueryTypes.SELECT,
        raw: true,
      }
    );

    getBalance = getBalance ? getBalance.saldo : 0;

    return res.status(200).json({
      status: 0,
      message: "Get Balance Berhasil",
      data: {
        balance: getBalance,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
