'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('services',
    [
      {
        service_code: "PAJAK",
        service_name: "Pajak PBB",
        service_icon: "https://minio.nutech-integrasi.com/take-home-test/services/PBB.png",
        service_tarif: 40000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        service_code: "PLN",
        service_name: "Listrik",
        service_icon: "https://minio.nutech-integrasi.com/take-home-test/services/Listrik.png",
        service_tarif: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        service_code: "PDAM",
        service_name: "PDAM Berlangganan",
        service_icon: "https://minio.nutech-integrasi.com/take-home-test/services/PDAM.png",
        service_tarif: 40000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        service_code: "PULSA",
        service_name: "Pulsa",
        service_icon: "https://minio.nutech-integrasi.com/take-home-test/services/Pulsa.png",
        service_tarif: 40000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        service_code: "PGN",
        service_name: "PGN Berlangganan",
        service_icon: "https://minio.nutech-integrasi.com/take-home-test/services/PGN.png",
        service_tarif: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        service_code: "MUSIK",
        service_name: "Musik Berlangganan",
        service_icon: "https://minio.nutech-integrasi.com/take-home-test/services/Musik.png",
        service_tarif: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        service_code: "TV",
        service_name: "TV Berlangganan",
        service_icon: "https://minio.nutech-integrasi.com/take-home-test/services/Televisi.png",
        service_tarif: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        service_code: "PAKET_DATA",
        service_name: "Paket Data",
        service_icon: "https://minio.nutech-integrasi.com/take-home-test/services/Paket-Data.png",
        service_tarif: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        service_code: "VOUCHER_GAME",
        service_name: "Voucher Game",
        service_icon: "https://minio.nutech-integrasi.com/take-home-test/services/Game.png",
        service_tarif: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        service_code: "VOUCHER_MAKANAN",
        service_name: "Voucher Makanan",
        service_icon: "https://minio.nutech-integrasi.com/take-home-test/services/Voucher-Makanan.png",
        service_tarif: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        service_code: "QURBAN",
        service_name: "Qurban",
        service_icon: "https://minio.nutech-integrasi.com/take-home-test/services/Qurban.png",
        service_tarif: 200000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        service_code: "ZAKAT",
        service_name: "Zakat",
        service_icon: "https://minio.nutech-integrasi.com/take-home-test/services/Zakat.png",
        service_tarif: 300000,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("services", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  }
};
