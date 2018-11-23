# sweepstake-api
Bolão API

Running a Docker container for the MySQL:
```
docker run --name=mysql1 -d -e MYSQL_ROOT_PASSWORD=fatec -p 3306:3306 -p 33060:33060 mysql/mysql-server
```

Creating database:
```
CREATE DATABASE node_fatec;
USE node_fatec;
CREATE TABLE user
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL
);
```

Creating new user in MySQL:
```
CREATE USER 'fatec'@'%' IDENTIFIED WITH mysql_native_password BY 'fatec';
GRANT ALL ON node_fatec.* TO 'fatec'@'%';
FLUSH PRIVILEGES;
```

Inserting in the user table:
```
INSERT INTO user(name, username, password, role) VALUES ('ADMIN', 'admin', '@dmin', 'SYSADMIN');
```