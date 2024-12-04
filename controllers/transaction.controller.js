"use strict";
const db = require("../models");

exports.transaction = async (req, res) => {
  const userId = req.userId;
  const nowDate = new Date();
  const prefix = "INV";
  const datePart = nowDate
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 16);
  const newInvoiceNumber = `${prefix}${datePart}`;

  try {
    const result = await db.transaction(async (t) => {
      // Check service
      const [checkService] = await db.core.query(
        "SELECT * FROM services WHERE service_code = :service_code",
        {
          replacements: { service_code: req.body.service_code },
          type: db.Sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      );

      if (!checkService) {
        throw new Error("Service ataus Layanan tidak ditemukan");
      }

      // Check saldo balance
      const [checkBalance] = await db.core.query(
        "SELECT * FROM saldo_balance WHERE user_id = :user_id",
        {
          replacements: { user_id: userId },
          type: db.Sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      );

      if (!checkBalance || checkBalance.saldo < checkService.service_tarif) {
        throw new Error("Saldo tidak mencukupi");
      }
      // update balance
      await db.core.query(
        `UPDATE saldo_balance 
         SET saldo = saldo - :deducted_amount, updatedAt = :updatedAt 
         WHERE user_id = :user_id`,
        {
          replacements: {
            deducted_amount: checkService.service_tarif,
            updatedAt: nowDate,
            user_id: userId,
          },
          transaction: t,
          type: db.Sequelize.QueryTypes.UPDATE,
        }
      );

      // Insert transaction
      await db.core.query(
        `INSERT INTO transactions 
         (invoice_number, transaction_type, description, total_amount, user_id, service_id, createdAt, updatedAt) 
         VALUES (:invoice_number, :transaction_type, :description, :total_amount, :user_id, :service_id, :createdAt, :updatedAt)`,
        {
          replacements: {
            invoice_number: newInvoiceNumber,
            transaction_type: "PAYMENT",
            description: `Purchase service ${checkService.service_name}`,
            total_amount: checkService.service_tarif,
            user_id: userId,
            service_id: checkService.id,
            createdAt: nowDate,
            updatedAt: nowDate,
          },
          transaction: t,
          type: db.Sequelize.QueryTypes.INSERT,
        }
      );

      return {
        invoice_number: newInvoiceNumber,
        service_code: checkService.service_code,
        service_tarif: checkService.service_tarif,
        transaction_type: "PAYMENT",
        total_amount: checkService.service_tarif,
        created_on: nowDate,
      };
    });

    // Success response
    return res.status(200).json({
      status: 0,
      message: "Transaksi berhasil",
      data: result,
    });
  } catch (error) {
    // Error response
    if (error.message === "Service ataus Layanan tidak ditemukan") {
      return res.status(400).json({
        status: 102,
        message: error.message,
        data: null,
      });
    }
    if (error.message === "Saldo tidak mencukupi") {
      return res.status(400).json({
        status: 102,
        message: error.message,
        data: null,
      });
    }

    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

exports.topUp = async (req, res) => {
  const userId = req.userId;
  const nowDate = new Date();
  const prefix = "INV";
  const datePart = nowDate
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 16);
  const newInvoiceNumber = `${prefix}${datePart}`;

  try {
    const result = await db.transaction(async (t) => {
      // Check saldo balance
      const [checkBalance] = await db.core.query(
        `SELECT * 
          FROM saldo_balance 
          WHERE user_id = :user_id`,
        {
          replacements: { user_id: userId },
          type: db.Sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      );

      let saldo = checkBalance ? checkBalance.saldo : 0;
      saldo += req.body.top_up_amount;

      // Update or Insert Balance
      if (checkBalance) {
        await db.core.query(
          `UPDATE saldo_balance 
            SET saldo = :balance, updatedAt = :updatedAt 
            WHERE user_id = :user_id;`,
          {
            replacements: {
              balance: saldo, // Ensure the "balance" field is in replacements
              updatedAt: nowDate,
              user_id: userId,
            },
            transaction: t,
          }
        );
      } else {
        await db.query(
          `INSERT INTO saldo_balance 
            (user_id, saldo, createdAt, updatedAt) 
            VALUES (:user_id, :balance, :createdAt, :updatedAt);`,
          {
            replacements: {
              user_id: userId,
              balance: saldo,
              createdAt: nowDate,
              updatedAt: nowDate,
            },
            transaction: t,
          }
        );
      }

      // Insert Transaction
      await db.core.query(
        `INSERT INTO transactions 
          (invoice_number, transaction_type, description, total_amount, user_id, service_id, createdAt, updatedAt) 
          VALUES (:invoice_number, :transaction_type, :description, :total_amount, :user_id, :service_id, :createdAt, :updatedAt);`,
        {
          replacements: {
            invoice_number: newInvoiceNumber,
            transaction_type: "TOPUP",
            description: "Top Up balance",
            total_amount: req.body.top_up_amount,
            user_id: userId,
            service_id: null,
            createdAt: nowDate,
            updatedAt: nowDate,
          },
          transaction: t,
        }
      );

      return { balance: saldo };
    });

    return res.status(200).json({
      status: 0,
      message: "Top Up Balance berhasil",
      data: result,
    });
  } catch (error) {
    console.error("Top Up Error:", error.message);

    // Error response
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

exports.getTransactions = async (req, res) => {
  const userId = req.userId;
  try {
    let limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
    let offset = req.query.offset ? parseInt(req.query.offset, 10) : null;

    let query = `SELECT s.service_code, t.invoice_number, t.transaction_type, t.description, t.total_amount, t.createdAt as created_on FROM transactions t LEFT JOIN services s ON t.service_id = s.id WHERE t.user_id = :user_id`;
    let replacements = { user_id: userId };

    if (limit) {
      query += " LIMIT :limit";
      replacements.limit = limit;
    }

    if (offset) {
      query += " OFFSET :offset";
      replacements.offset = offset;
    }

    const transactions = await db.core.query(query, {
      replacements,
      type: db.Sequelize.QueryTypes.SELECT,
      raw: true,
    });

    // Success response
    return res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        offset: offset,
        limit: limit,
        records: transactions,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
