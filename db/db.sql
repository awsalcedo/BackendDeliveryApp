DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(180) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(255) NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);


INSERT INTO roles(name, route, created_at, updated_at)
VALUES('CLIENTE', 'client/products/list', '2021-09-14', '2021-09-14');

INSERT INTO roles(name, route, created_at, updated_at)
VALUES('RESTAURANTE', 'restaurant/orders/list', '2021-09-14', '2021-09-14');

INSERT INTO roles(name, route, created_at, updated_at)
VALUES('REPARTIDOR', 'delivery/orders/list', '2021-09-14', '2021-09-14');


DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	phone VARCHAR(80) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	password VARCHAR(255) NOT NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
    id_user BIGSERIAL NOT NULL,
    id_rol BIGSERIAL NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(id_user, id_rol)
);

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);


DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	price DECIMAL DEFAULT 0,
	image1 VARCHAR(255) NOT NULL,
	image2 VARCHAR(255),
	image3 VARCHAR(255),
	id_category BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
); 



//Urls de imagenes usadas
Repartidor: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRouQuDRu9LwDu0gUln7FU_bKYPxG9ioESHQw&usqp=CAU
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzMemj847xRLY493Syw4NgxuVopwS4xEgqXg&usqp=CAU
Restaurant: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLaKNJBLvl0m9xWAL0AOBoPX3koipQKi1bGg&usqp=CAU
Cliente: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrRjdTIH84oC8jmUuaOuRim19hwzKhBHgFIg&usqp=CAU
