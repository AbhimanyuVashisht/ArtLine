-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 30, 2017 at 12:41 PM
-- Server version: 5.7.20-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectx`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `fk_member_id` varchar(255) NOT NULL,
  `fk_prod_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`fk_member_id`, `fk_prod_id`, `createdAt`, `updatedAt`) VALUES
('109484023739009832780', 7, '2017-11-28 12:52:00', '2017-11-28 12:52:00'),
('109484023739009832780', 8, '2017-11-28 12:52:04', '2017-11-28 12:52:04');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `cat_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`cat_id`, `category_name`, `category_image`, `createdAt`, `updatedAt`) VALUES
(1, 'Photography', 'photography.png', '2017-09-28 10:49:55', '2017-11-26 20:23:58'),
(2, 'Dancer', 'dance.png', '2017-09-28 10:49:55', '2017-11-26 20:23:58'),
(3, 'Artist', 'music.png', '2017-09-28 10:49:55', '2017-11-26 20:23:58');

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `fk_follower_id` varchar(255) NOT NULL,
  `fk_following_id` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userMemberId` varchar(255) DEFAULT NULL,
  `followerMemberId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`fk_follower_id`, `fk_following_id`, `createdAt`, `updatedAt`, `userMemberId`, `followerMemberId`) VALUES
('105864670115367217760', '105864670115367217760', '2017-11-20 18:23:55', '2017-11-20 18:23:55', NULL, NULL),
('105864670115367217760', '109484023739009832780', '2017-11-19 12:34:32', '2017-11-19 12:34:32', NULL, NULL),
('105864670115367220000', '109484023739009832780', '2017-11-12 19:06:09', '2017-11-12 19:06:09', NULL, NULL),
('109484023739009832780', '109484023739009832780', '2017-11-23 16:49:40', '2017-11-23 16:49:40', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orderinfos`
--

CREATE TABLE `orderinfos` (
  `order_id` varchar(255) NOT NULL,
  `fk_member_id` varchar(255) NOT NULL,
  `stripe_trans_id` varchar(255) NOT NULL,
  `stripe_cust_id` varchar(255) NOT NULL,
  `stripe_token` varchar(255) NOT NULL,
  `stripe_email` varchar(255) NOT NULL,
  `amount_paid` int(11) NOT NULL,
  `billing_address` varchar(255) NOT NULL,
  `billing_pincode` int(11) NOT NULL,
  `billing_phone_no` varchar(255) NOT NULL,
  `billing_secondary_phone_no` varchar(255) NOT NULL,
  `billing_country` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orderinfos`
--

INSERT INTO `orderinfos` (`order_id`, `fk_member_id`, `stripe_trans_id`, `stripe_cust_id`, `stripe_token`, `stripe_email`, `amount_paid`, `billing_address`, `billing_pincode`, `billing_phone_no`, `billing_secondary_phone_no`, `billing_country`, `createdAt`, `updatedAt`) VALUES
('tok_1BS4dDJm0TQlA5Rk4bWxVPgx', '109484023739009832780', 'ch_1BS4dLJm0TQlA5RkkCNSoAMf', 'cus_Bpk71VoSkSI8o2', 'tok_1BS4dDJm0TQlA5Rk4bWxVPgx', 'rockysingh.av@gmail.com', 1155, 'R-6/174 Rajnagar', 201001, '9999626755', '9999626755', 'australia', '2017-11-25 14:27:56', '2017-11-25 14:27:56'),
('tok_1BS9X4Jm0TQlA5RkQUWIaO8T', '109484023739009832780', 'ch_1BS9XAJm0TQlA5Rkg55jEb3N', 'cus_BppBFAvV3PhPgM', 'tok_1BS9X4Jm0TQlA5RkQUWIaO8T', 'rockysingh.av@gmail.com', 600, 'R-6/174 Rajnagar', 201001, '9999626755', '9999626755', 'australia', '2017-11-25 19:41:53', '2017-11-25 19:41:53'),
('tok_1BSfp8Jm0TQlA5RkNNCiELe7', '105864670115367217760', 'ch_1BSfpFJm0TQlA5RkcNcyCrnk', 'cus_BqMYrDSz8qq54Y', 'tok_1BSfp8Jm0TQlA5RkNNCiELe7', 'rockysingh.av@gmail.com', 300, 'R-6/174 Rajnagar', 201001, '9999626755', '9999626755', 'india', '2017-11-27 06:10:41', '2017-11-27 06:10:41'),
('tok_1BSiGFJm0TQlA5RkcVnlpeHE', '105864670115367217760', 'ch_1BSiGKJm0TQlA5Rk8P6WyTQM', 'cus_BqP4U4NdtM8QE8', 'tok_1BSiGFJm0TQlA5RkcVnlpeHE', 'rockysingh.av@gmail.com', 1300, 'R-6/174 Rajnagar', 201001, '9999626755', '9999626755', 'india', '2017-11-27 08:46:49', '2017-11-27 08:46:49'),
('tok_1BSPWJJm0TQlA5RkY4Z9cAWb', '109484023739009832780', 'ch_1BSPWPJm0TQlA5RknVav8Bx0', 'cus_Bq5hceyyq6xIXA', 'tok_1BSPWJJm0TQlA5RkY4Z9cAWb', 'rockysingh.av@gmail.com', 600, 'R-6/174 Rajnagar', 201001, '9999626755', '9999626755', 'australia', '2017-11-26 12:46:09', '2017-11-26 12:46:09'),
('tok_1BSUmZJm0TQlA5RkTOvCb3yS', '109484023739009832780', 'ch_1BSUmfJm0TQlA5RkVqz5YJhB', 'cus_BqB8OwMybOEOOr', 'tok_1BSUmZJm0TQlA5RkTOvCb3yS', 'abhimanyuvashisht.av@gmail.com', 1255, 'R-6/174 Rajnagar', 201001, '9999626755', '9999626755', 'india', '2017-11-26 18:23:17', '2017-11-26 18:23:17'),
('tok_1BSUpWJm0TQlA5RkzT3ceiXw', '109484023739009832780', 'ch_1BSUpcJm0TQlA5Rknt6a5t9p', 'cus_BqBBOcQwI3xGIZ', 'tok_1BSUpWJm0TQlA5RkzT3ceiXw', 'abhimanyuvashisht.av@gmail.com', 555, 'R-6/174 Rajnagar', 201001, '9999626755', '9999626755', 'india', '2017-11-26 18:26:20', '2017-11-26 18:26:20');

-- --------------------------------------------------------

--
-- Table structure for table `organisations`
--

CREATE TABLE `organisations` (
  `organization_id` int(11) NOT NULL,
  `organization_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `prod_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `product_path` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) NOT NULL DEFAULT '0',
  `views` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fk_category_id` int(11) DEFAULT NULL,
  `fk_member_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`prod_id`, `product_name`, `description`, `product_path`, `price`, `discount`, `views`, `rating`, `createdAt`, `updatedAt`, `fk_category_id`, `fk_member_id`) VALUES
(1, 'Photography 1', 'description of photograph 1', 'Anaar.jpg', 100, 0, 11, NULL, '2017-11-26 20:55:03', '2017-11-29 10:51:53', 1, '109484023739009832780'),
(2, 'Photography 2', 'description of photograph 2', 'Bokeh.jpg', 200, 0, 24, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(3, 'Photography 3', 'description of photograph 3', 'Bonfire.jpg', 300, 0, 13, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(4, 'Photography 4', 'description of photograph 4', 'Bulb.jpg', 400, 0, 7, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(5, 'Photography 5', 'description of photograph 5', 'Charcoal.jpg', 50, 0, 7, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(6, 'Photography 6', 'description of photograph 6', 'City Life.jpg', 450, 0, 20, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(7, 'Photography 7', 'description of photograph 7', 'DSC_0025.jpg', 350, 0, 21, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(8, 'Photography 8', 'description of photograph 8', 'DSC_0058.jpg', 850, 0, 9, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(9, 'Photography 9', 'description of photograph 9', 'DSC_0059.jpg', 900, 0, 0, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(10, 'Photography 10', 'description of photograph 10', 'DSC_0106.jpg', 477, 0, 1, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(11, 'Photography 11', 'description of photograph 11', 'DSC_0131.jpg', 458, 0, 0, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(12, 'Photography 12', 'description of photograph 12', 'DSC_0133.jpg', 690, 0, 1, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(13, 'Photography 13', 'description of photograph 13', 'DSC_0174.jpg', 554, 0, 1, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(14, 'Photography 14', 'description of photograph 14', 'DSC_0179.jpg', 555, 0, 1, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(15, 'Photography 15', 'description of photograph 15', 'DSC_0188.jpg', 250, 0, 3, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(16, 'Photography 16', 'description of photograph 16', 'DSC_0651.jpg', 260, 0, 2, NULL, '2017-11-26 20:55:03', '2017-11-29 05:49:42', 1, '109484023739009832780'),
(17, 'Dance 1', 'decription of dance 1', 'P8Zkid-Y94I', 100, 0, 3, NULL, '2017-11-26 20:55:03', '2017-11-29 10:52:25', 2, '109484023739009832780'),
(18, 'Dance 2', 'decription of dance 2', '4_wAJHve7KY', 100, 0, 1, NULL, '2017-11-26 20:55:03', '2017-11-27 08:43:10', 2, '109484023739009832780'),
(19, 'Dance 3', 'decription of dance 3', 'XWGcxjTsGl8', 100, 0, 0, NULL, '2017-11-26 20:55:03', '2017-11-26 20:56:57', 2, '109484023739009832780'),
(20, 'Dance 4', 'decription of dance 4', 'LCk88bTSUhk', 100, 0, 0, NULL, '2017-11-26 20:55:03', '2017-11-26 20:56:57', 2, '109484023739009832780'),
(21, 'Dance 5', 'decription of dance 5', 'f8EB5HOGYN4', 100, 0, 3, NULL, '2017-11-26 20:55:03', '2017-11-26 21:04:55', 2, '109484023739009832780'),
(22, 'Dance 6', 'decription of dance 6', 'i9ctNWMsovk', 100, 0, 1, NULL, '2017-11-26 20:55:03', '2017-11-26 20:59:21', 2, '109484023739009832780'),
(23, 'Dance 7', 'decription of dance 7', 'ySG-1jIIHEM', 100, 0, 1, NULL, '2017-11-26 20:55:03', '2017-11-26 20:59:45', 2, '109484023739009832780'),
(24, 'Dance 8', 'decription of dance 8', 'pmDZ0jQRYBE', 100, 0, 0, NULL, '2017-11-26 20:55:03', '2017-11-26 20:56:57', 2, '109484023739009832780'),
(25, 'Dance 9', 'decription of dance 9', 'LA1hbiU8_-U', 100, 0, 0, NULL, '2017-11-26 20:55:03', '2017-11-26 20:56:57', 2, '109484023739009832780'),
(26, 'Dance 11', 'decription of dance 10', 'mQmak6zB1W0', 100, 0, 0, NULL, '2017-11-26 20:55:03', '2017-11-26 20:56:57', 2, '109484023739009832780'),
(27, 'Artist 1', 'description of artist 1', 'KQb4d9N-sQw', 100, 0, 1, NULL, '2017-11-26 20:55:03', '2017-11-27 06:04:40', 3, '109484023739009832780'),
(28, 'Artist 2', 'description of artist 2', 'Wv-ZSnT3rjE', 100, 0, 0, NULL, '2017-11-26 20:55:03', '2017-11-26 20:56:57', 3, '109484023739009832780'),
(29, 'Artist 3', 'description of artist 3', 'gnLGPslfX0c', 100, 0, 0, NULL, '2017-11-26 20:55:03', '2017-11-26 20:56:57', 3, '109484023739009832780'),
(30, 'Artist 4', 'description of artist 4', 'kS7kbzVpdd8', 100, 0, 0, NULL, '2017-11-26 20:55:04', '2017-11-26 20:56:57', 3, '109484023739009832780'),
(31, 'Artist 5', 'description of artist 5', 'SCFwKX1md8M', 100, 0, 0, NULL, '2017-11-26 20:55:04', '2017-11-26 20:56:57', 3, '109484023739009832780'),
(32, 'Artist 6', 'description of artist 6', '53mhhlYD3L8', 100, 0, 0, NULL, '2017-11-26 20:55:04', '2017-11-26 20:56:57', 3, '109484023739009832780'),
(33, 'Artist 7', 'description of artist 7', 'mCF04QVeoP8', 100, 0, 0, NULL, '2017-11-26 20:55:04', '2017-11-26 20:56:57', 3, '109484023739009832780'),
(34, 'Artist 8', 'description of artist 8', 'sVkbV9MUbEI', 100, 0, 0, NULL, '2017-11-26 20:55:04', '2017-11-26 20:56:57', 3, '109484023739009832780'),
(35, 'Artist 9', 'description of artist 9', 'Itqn9cpotY4', 100, 0, 0, NULL, '2017-11-26 20:55:04', '2017-11-26 20:56:57', 3, '109484023739009832780'),
(36, 'Artist 10', 'description of artist 10', 'K4Zjh04Ty1c', 100, 0, 0, NULL, '2017-11-26 20:55:04', '2017-11-26 20:56:57', 3, '109484023739009832780');

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

CREATE TABLE `uploads` (
  `upload_id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `mobile_no` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `price` int(20) NOT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `fk_member_id` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `uploads`
--

INSERT INTO `uploads` (`upload_id`, `email`, `title`, `description`, `mobile_no`, `category`, `type`, `price`, `filename`, `fk_member_id`, `createdAt`, `updatedAt`) VALUES
('109484023739009832780-1511459206200', 'abhimanyuvashisht.av@gmail.com', 'photo', 'my photo', NULL, '1', 'picture', 50, 'fileToUpload-1511459206103.jpg', '109484023739009832780', '2017-11-23 17:46:46', '2017-11-23 17:46:46'),
('109484023739009832780-1511600697259', 'abhimanyuvashisht.av@gmail.com', 'Title', 'some descritpion', '9999626755', '1', 'picture', 500, 'fileToUpload-1511600697045.jpg', '109484023739009832780', '2017-11-25 09:04:57', '2017-11-25 09:04:57'),
('109484023739009832780-1511602723878', 'abhimanyuvashisht.av@gmail.com', 'My photo', 'hello', '9999626755', '1', 'picture', 545, 'fileToUpload-1511602723526.jpg', '109484023739009832780', '2017-11-25 09:38:43', '2017-11-25 09:38:43'),
('109484023739009832780-1511991794689', 'abhimanyuvashisht.av@gmail.com', 'Adult', 'i know adult', '9999626755', '2', 'picture', 100, 'fileToUpload-1511991794676.jpg', '109484023739009832780', '2017-11-29 21:43:14', '2017-11-29 21:43:14'),
('109484023739009832780-1511991881921', 'abhimanyuvashisht.av@gmail.com', 'sex', 'i know adult', '9999626755', '2', 'picture', 100, 'fileToUpload-1511991881911.jpg', '109484023739009832780', '2017-11-29 21:44:41', '2017-11-29 21:44:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `member_id` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `profile_dp` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fk_organisation_id` int(11) DEFAULT NULL,
  `fk_category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`member_id`, `token`, `url`, `username`, `email`, `profile_dp`, `createdAt`, `updatedAt`, `fk_organisation_id`, `fk_category_id`) VALUES
('105864670115367217760', 'ya29.Gl8ABbYe8n0-9ei8V4YLwBk_u0_TooHe0VoajxgN8QRyD6irSM8i0svjoxZ5X-3OvGORxf4chiQwPkN4DpP-QfDt8qgpn2yohLi-rXvD1HOyAEWxGLLp-9lwQyFZTPtd4Q', 'https://plus.google.com/105864670115367217760', 'Rocky Singh', 'rockysingh.av@gmail.com', 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50', '2017-11-10 19:23:07', '2017-11-10 19:23:07', NULL, NULL),
('109484023739009832780', 'ya29.GlzUBASIoa2KsxmTmu0MloEh06ED-J80_AW7n91jLPpbhLCr_O2HysYEMz8JOwdC4hOq_CGByUUTscEPSHj07raIdE6Kq7f2pauC1CeYQXqoWdTeawTMN9PL3YHANg', 'https://plus.google.com/+AbhimanyuVashisht', 'Abhimanyu Vashisht', 'abhimanyuvashisht.av@gmail.com', 'https://lh4.googleusercontent.com/-6dol7T7itOU/AAAAAAAAAAI/AAAAAAAAB4E/gpfGkarznvo/photo.jpg?sz=50', '2017-09-28 10:54:22', '2017-09-28 10:54:22', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`fk_member_id`,`fk_prod_id`),
  ADD UNIQUE KEY `carts_fk_prod_id_fk_member_id_unique` (`fk_member_id`,`fk_prod_id`),
  ADD KEY `fk_prod_id` (`fk_prod_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`fk_follower_id`,`fk_following_id`),
  ADD UNIQUE KEY `follows_userMemberId_followerMemberId_unique` (`userMemberId`,`followerMemberId`),
  ADD KEY `follows_followerMemberId_foreign_idx` (`followerMemberId`);

--
-- Indexes for table `orderinfos`
--
ALTER TABLE `orderinfos`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_member_id` (`fk_member_id`);

--
-- Indexes for table `organisations`
--
ALTER TABLE `organisations`
  ADD PRIMARY KEY (`organization_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`prod_id`),
  ADD KEY `products_fk_category_id_foreign_idx` (`fk_category_id`),
  ADD KEY `products_fk_member_id_foreign_idx` (`fk_member_id`);

--
-- Indexes for table `uploads`
--
ALTER TABLE `uploads`
  ADD PRIMARY KEY (`upload_id`),
  ADD KEY `fk_member_id` (`fk_member_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`member_id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD UNIQUE KEY `users_token_unique` (`token`),
  ADD UNIQUE KEY `token_2` (`token`),
  ADD UNIQUE KEY `token_3` (`token`),
  ADD KEY `users_fk_organisation_id_foreign_idx` (`fk_organisation_id`),
  ADD KEY `users_fk_category_id_foreign_idx` (`fk_category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`fk_member_id`) REFERENCES `users` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`fk_prod_id`) REFERENCES `products` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_followerMemberId_foreign_idx` FOREIGN KEY (`followerMemberId`) REFERENCES `users` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`userMemberId`) REFERENCES `users` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`followerMemberId`) REFERENCES `users` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_userMemberId_foreign_idx` FOREIGN KEY (`userMemberId`) REFERENCES `users` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderinfos`
--
ALTER TABLE `orderinfos`
  ADD CONSTRAINT `orderinfos_ibfk_1` FOREIGN KEY (`fk_member_id`) REFERENCES `users` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_fk_category_id_foreign_idx` FOREIGN KEY (`fk_category_id`) REFERENCES `categories` (`cat_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_fk_member_id_foreign_idx` FOREIGN KEY (`fk_member_id`) REFERENCES `users` (`member_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`fk_category_id`) REFERENCES `categories` (`cat_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`fk_member_id`) REFERENCES `users` (`member_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `uploads`
--
ALTER TABLE `uploads`
  ADD CONSTRAINT `uploads_ibfk_1` FOREIGN KEY (`fk_member_id`) REFERENCES `users` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_fk_category_id_foreign_idx` FOREIGN KEY (`fk_category_id`) REFERENCES `categories` (`cat_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_fk_organisation_id_foreign_idx` FOREIGN KEY (`fk_organisation_id`) REFERENCES `organisations` (`organization_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`fk_organisation_id`) REFERENCES `organisations` (`organization_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`fk_category_id`) REFERENCES `categories` (`cat_id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
