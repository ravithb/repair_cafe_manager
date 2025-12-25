-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 25, 2025 at 11:13 AM
-- Server version: 8.0.44-0ubuntu0.24.04.2
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `repair_cafe_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int NOT NULL,
  `title` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `firstname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int NOT NULL,
  `location` varchar(64) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `repairers`
--

CREATE TABLE `repairers` (
  `id` int NOT NULL,
  `title` varchar(8) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `firstname` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastname` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `repair_items`
--

CREATE TABLE `repair_items` (
  `id` int NOT NULL,
  `item` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
  `make` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `model` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fault` text COLLATE utf8mb4_general_ci,
  `weight` float DEFAULT NULL,
  `last_repair_status` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_session_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `repair_sessions_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `repair_item_categories`
--

CREATE TABLE `repair_item_categories` (
  `id` int NOT NULL,
  `category` varchar(256) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `repair_sessions`
--

CREATE TABLE `repair_sessions` (
  `id` int NOT NULL,
  `session_date` date DEFAULT NULL,
  `location_id` int DEFAULT NULL,
  `timeslot` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `token_no` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `repair_session_items`
--

CREATE TABLE `repair_session_items` (
  `repair_session_id` int NOT NULL,
  `repair_item_id` int NOT NULL,
  `repair_status` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `primary_repairer_id` int DEFAULT NULL,
  `secondary_repairer_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `repairers`
--
ALTER TABLE `repairers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `repair_items`
--
ALTER TABLE `repair_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repair_items_category_id_fkey` (`category_id`),
  ADD KEY `repair_items_customer_id_fkey` (`customer_id`),
  ADD KEY `repair_items_repair_sessions_id_fkey` (`repair_sessions_id`);

--
-- Indexes for table `repair_item_categories`
--
ALTER TABLE `repair_item_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `repair_sessions`
--
ALTER TABLE `repair_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repair_sessions_customer_id_fkey` (`customer_id`);

--
-- Indexes for table `repair_session_items`
--
ALTER TABLE `repair_session_items`
  ADD PRIMARY KEY (`repair_session_id`,`repair_item_id`),
  ADD KEY `repair_session_items_repair_item_id_fkey` (`repair_item_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `repairers`
--
ALTER TABLE `repairers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `repair_items`
--
ALTER TABLE `repair_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `repair_item_categories`
--
ALTER TABLE `repair_item_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `repair_sessions`
--
ALTER TABLE `repair_sessions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `repair_items`
--
ALTER TABLE `repair_items`
  ADD CONSTRAINT `repair_items_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `repair_item_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `repair_items_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `repair_items_repair_sessions_id_fkey` FOREIGN KEY (`repair_sessions_id`) REFERENCES `repair_sessions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `repair_sessions`
--
ALTER TABLE `repair_sessions`
  ADD CONSTRAINT `repair_sessions_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `repair_session_items`
--
ALTER TABLE `repair_session_items`
  ADD CONSTRAINT `repair_session_items_repair_item_id_fkey` FOREIGN KEY (`repair_item_id`) REFERENCES `repair_items` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `repair_session_items_repair_session_id_fkey` FOREIGN KEY (`repair_session_id`) REFERENCES `repair_sessions` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;
