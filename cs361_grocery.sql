SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS roles, users, sales, products, sales_products;
SET FOREIGN_KEY_CHECKS = 1;
SET @@GLOBAL.sql_mode = 'STRICT_TRANS_TABLES';


-- Setup table structure for 'roles'

CREATE TABLE roles(
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(255) NOT NULL,
description VARCHAR(255),
PRIMARY KEY (id)
);


-- Dumping in some starter sample data for 'roles'

INSERT INTO roles(name, description) 
VALUES 
	('manager', 'This role is for users with manager access'), 
	('employee', 'This role is for users with employee access');


-- Setup table structure for 'users'

CREATE TABLE users(
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
email VARCHAR(255),
role_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT ON UPDATE CASCADE
);


-- Dumping in some starter sample data for 'users'

INSERT INTO users(first_name, last_name, role_id) 
VALUES 
	('George', 'Kochera', 1),
	('Quinn', 'Wilkins', 1),
	('Ellen', 'Yang', 1),
	('Kevin', 'Joy', 1),
	('Blake', 'Lester', 1);

-- Setup table structure for 'sales'

CREATE TABLE sales(
id INT AUTO_INCREMENT NOT NULL,
sale_date DATE NOT NULL,
total_before_tax DECIMAL(13,2) NOT NULL,
tax_amount DECIMAL(13,2) NOT NULL,
total_after_tax DECIMAL(13,2) NOT NULL,
user_id INT,
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);


-- Dumping in some starter sample data for 'sales'

INSERT INTO sales(sale_date, total_before_tax, tax_amount, total_after_tax, user_id) 
VALUES 
	('2020-06-23', 24.50, 5.00, 29.50, 1), 
	('2020-06-25', 12.00, 2.35, 14.35, 1),
	('2020-06-29', 78.75, 9.15, 87.90, 2);


-- Setup table structure for 'products'

CREATE TABLE products(
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(255) NOT NULL,
type VARCHAR(255),
price DECIMAL(13,2) NOT NULL,
unit VARCHAR(255) DEFAULT "unit",
description VARCHAR(255),
shelf_quantity INT NOT NULL,
shelf_min_threshold INT,
shelf_max_threshold INT,
wh_quantiy INT NOT NULL,
wh_min_threshold INT,
wh_max_threshold INT,
PRIMARY KEY (id)
);


-- Dumping in some starter sample data for 'products'

INSERT INTO products(name, price, shelf_quantity, wh_quantiy, description) 
VALUES 
	('apple', 2.00,17, 30, 'An apple is an edible fruit prouduced by an apple tree'), 
	('banana', 1.25, 40, 23, 'A banana is a curved, yellow fruit with a thick skin and soft sweet flesh'),
	('pear', 3.50,8, 15,'A pear is an edible fruit with the shape of teardrop');


-- Setup table structure for 'sales_products'

CREATE TABLE sales_products(
sale_id INT NOT NULL,
product_id INT NOT NULL,
FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Dumping in some starter sample data for 'sales_products'

INSERT INTO sales_products(sale_id, product_id) 
VALUES 
	(1, 1), 
	(1, 2),
	(1, 3),
	(2, 3),
	(3, 2);


