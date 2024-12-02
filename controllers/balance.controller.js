'use strict'

const db = require("../models");

exports.getBalance = async (req, res) => {
    try {
        var getBalance = await db.rawQuery(
            'SELECT * FROM saldo_balance WHERE user_id = :user_id',
            {user_id: req.userId},
            db.Sequelize.QueryTypes.SELECT
        )

        getBalance = getBalance.length === 0 ? 0 : getBalance[0].balance;

        return res.status(200).json({
            status: 0,
            message: "Get Balance Berhasil",
            data: {
                balance: getBalance,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }
}
