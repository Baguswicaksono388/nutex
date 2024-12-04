-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for nutex
DROP DATABASE IF EXISTS `nutex`;
CREATE DATABASE IF NOT EXISTS `nutex` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `nutex`;

-- Dumping structure for table nutex.saldo_balance
DROP TABLE IF EXISTS `saldo_balance`;
CREATE TABLE IF NOT EXISTS `saldo_balance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `saldo` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table nutex.saldo_balance: ~0 rows (approximately)
/*!40000 ALTER TABLE `saldo_balance` DISABLE KEYS */;
INSERT INTO `saldo_balance` (`id`, `user_id`, `saldo`, `createdAt`, `updatedAt`) VALUES
	(5, 1, 67000, '2024-12-04 14:10:27', '2024-12-04 22:25:30');
/*!40000 ALTER TABLE `saldo_balance` ENABLE KEYS */;

-- Dumping structure for table nutex.sequelizemeta
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table nutex.sequelizemeta: ~4 rows (approximately)
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20241201031302-table-users.js'),
	('20241201224248-table-saldo-balance.js'),
	('20241202014331-table-services.js'),
	('20241203071344-table-transaction.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Dumping structure for table nutex.services
DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_code` varchar(255) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_icon` varchar(255) NOT NULL,
  `service_tarif` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service_code` (`service_code`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Dumping data for table nutex.services: ~12 rows (approximately)
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` (`id`, `service_code`, `service_name`, `service_icon`, `service_tarif`, `createdAt`, `updatedAt`) VALUES
	(1, 'PAJAK', 'Pajak PBB', 'https://minio.nutech-integrasi.com/take-home-test/services/PBB.png', 40000, '2024-12-04 07:35:40', '2024-12-04 07:35:40'),
	(2, 'PLN', 'Listrik', 'https://minio.nutech-integrasi.com/take-home-test/services/Listrik.png', 10000, '2024-12-04 07:35:40', '2024-12-04 07:35:40'),
	(3, 'PDAM', 'PDAM Berlangganan', 'https://minio.nutech-integrasi.com/take-home-test/services/PDAM.png', 40000, '2024-12-04 07:35:40', '2024-12-04 07:35:40'),
	(4, 'PULSA', 'Pulsa', 'https://minio.nutech-integrasi.com/take-home-test/services/Pulsa.png', 40000, '2024-12-04 07:35:40', '2024-12-04 07:35:40'),
	(5, 'PGN', 'PGN Berlangganan', 'https://minio.nutech-integrasi.com/take-home-test/services/PGN.png', 50000, '2024-12-04 07:35:40', '2024-12-04 07:35:40'),
	(6, 'MUSIK', 'Musik Berlangganan', 'https://minio.nutech-integrasi.com/take-home-test/services/Musik.png', 50000, '2024-12-04 07:35:40', '2024-12-04 07:35:40'),
	(7, 'TV', 'TV Berlangganan', 'https://minio.nutech-integrasi.com/take-home-test/services/Televisi.png', 50000, '2024-12-04 07:35:40', '2024-12-04 07:35:40'),
	(8, 'PAKET_DATA', 'Paket Data', 'https://minio.nutech-integrasi.com/take-home-test/services/Paket-Data.png', 50000, '2024-12-04 07:35:40', '2024-12-04 07:35:40'),
	(9, 'VOUCHER_GAME', 'Voucher Game', 'https://minio.nutech-integrasi.com/take-home-test/services/Game.png', 100000, '2024-12-04 07:35:40', '2024-12-04 07:35:40'),
	(10, 'VOUCHER_MAKANAN', 'Voucher Makanan', 'https://minio.nutech-integrasi.com/take-home-test/services/Voucher-Makanan.png', 100000, '2024-12-04 07:35:40', '2024-12-04 07:35:40'),
	(11, 'QURBAN', 'Qurban', 'https://minio.nutech-integrasi.com/take-home-test/services/Qurban.png', 200000, '2024-12-04 07:35:40', '2024-12-04 07:35:40'),
	(12, 'ZAKAT', 'Zakat', 'https://minio.nutech-integrasi.com/take-home-test/services/Zakat.png', 300000, '2024-12-04 07:35:40', '2024-12-04 07:35:40');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;

-- Dumping structure for table nutex.transactions
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `invoice_number` varchar(255) NOT NULL,
  `transaction_type` enum('PAYMENT','TOPUP') DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `total_amount` float NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoice_number` (`invoice_number`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;

-- Dumping data for table nutex.transactions: ~12 rows (approximately)
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` (`id`, `invoice_number`, `transaction_type`, `description`, `total_amount`, `user_id`, `service_id`, `createdAt`, `updatedAt`) VALUES
	(60, 'INV2024120407102795', 'PAYMENT', 'Top Up balance', 10000, 1, NULL, '2024-12-04 14:10:27', '2024-12-04 14:10:27'),
	(61, 'INV2024120407491982', 'TOPUP', 'Purchase service Pulsa', 40000, 1, 4, '2024-12-04 14:49:19', '2024-12-04 14:49:19'),
	(62, 'INV2024120407503606', 'TOPUP', 'Purchase service Pulsa', 40000, 1, 4, '2024-12-04 14:50:36', '2024-12-04 14:50:36'),
	(63, 'INV2024120407584076', 'TOPUP', 'Top Up balance', 10000, 1, NULL, '2024-12-04 14:58:40', '2024-12-04 14:58:40'),
	(64, 'INV2024120407584379', 'TOPUP', 'Top Up balance', 10000, 1, NULL, '2024-12-04 14:58:43', '2024-12-04 14:58:43'),
	(65, 'INV2024120407584521', 'TOPUP', 'Top Up balance', 10000, 1, NULL, '2024-12-04 14:58:45', '2024-12-04 14:58:45'),
	(66, 'INV2024120407585383', 'TOPUP', 'Purchase service Pulsa', 40000, 1, 4, '2024-12-04 14:58:53', '2024-12-04 14:58:53'),
	(67, 'INV2024120408002509', 'TOPUP', 'Top Up balance', 1000000, 1, NULL, '2024-12-04 15:00:25', '2024-12-04 15:00:25'),
	(68, 'INV2024120408005011', 'PAYMENT', 'Purchase service Pulsa', 40000, 1, 4, '2024-12-04 15:00:50', '2024-12-04 15:00:50'),
	(69, 'INV2024120408024727', 'PAYMENT', 'Purchase service Pulsa', 40000, 1, 4, '2024-12-04 15:02:47', '2024-12-04 15:02:47'),
	(70, 'INV2024120408032694', 'PAYMENT', 'Purchase service Pulsa', 40000, 1, 4, '2024-12-04 15:03:26', '2024-12-04 15:03:26'),
	(71, 'INV2024120408093904', 'TOPUP', 'Top Up balance', 1000000, 1, NULL, '2024-12-04 15:09:39', '2024-12-04 15:09:39'),
	(72, 'INV2024120409513078', 'TOPUP', 'Top Up balance', 1000, 1, NULL, '2024-12-04 16:51:30', '2024-12-04 16:51:30'),
	(73, 'INV2024120414143439', 'TOPUP', 'Top Up balance', 1000, 1, NULL, '2024-12-04 21:14:34', '2024-12-04 21:14:34'),
	(74, 'INV2024120414220711', 'TOPUP', 'Top Up balance', 100000, 1, NULL, '2024-12-04 21:22:07', '2024-12-04 21:22:07'),
	(75, 'INV2024120415253005', 'PAYMENT', 'Purchase service Pulsa', 40000, 1, 4, '2024-12-04 22:25:30', '2024-12-04 22:25:30');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;

-- Dumping structure for table nutex.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table nutex.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `last_name`, `email`, `first_name`, `password`, `createdAt`, `updatedAt`) VALUES
	(1, 'Nutech', 'user@nutech-integrasi.com', 'User', '$2b$10$8w92/wpxagPztXGsnonmIOf94hH17jmwa/DuaUMU6XOdyKCNFucmG', '2024-12-04 09:58:02', '2024-12-04 09:58:02');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
