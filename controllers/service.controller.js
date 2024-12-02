const db = require('../models')

exports.getService = async (req, res) => {
    try {
        const service = await db.rawQuery(
            'SELECT * FROM services',
            { type: db.Sequelize.QueryTypes.SELECT }
        );

        return res.status(200).json({
            status: 0,
            message: "Sukses",
            data: service,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 1,
            message: error.message,
        });
    }
};
